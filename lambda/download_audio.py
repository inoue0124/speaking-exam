import boto3
import subprocess
import json
import zipfile
import os
import smtplib
from email.mime.text import MIMEText
from concurrent.futures import ThreadPoolExecutor

BUCKET_NAME = os.environ['BUCKET_NAME']
ZIP_BUCKET_NAME = os.environ['ZIP_BUCKET_NAME']
FROM_ADDR = os.environ['GMAIL_ACCOUNT']
GMAIL_PASSWORD = os.environ['GMAIL_PASSWORD']

s3 = boto3.resource("s3")
bucket = s3.Bucket(BUCKET_NAME)
zip_bucket = s3.Bucket(ZIP_BUCKET_NAME)


def fetch_audio_object(audio_obj_key):
    webm_path = "/tmp/" + audio_obj_key.split('/')[2]
    mp3_path = webm_path.split('.')[0] + ".mp3"
    file_path = audio_obj_key.split('.')[0] + ".mp3"
    bucket.download_file(audio_obj_key, webm_path)
    subprocess.call(
        [f"ffmpeg -i {webm_path} -loglevel error {mp3_path}"],
        shell=True
    )
    return file_path, mp3_path


def download_audio(event, context):
    try:
        body = json.loads(event['Records'][0]['body'])
        audio_obj_keys = body['audio_obj_keys']
        email = body['email']
        timestamp = body['timestamp']
        csv_url = body['csv_url']
        zip_name = "record_" + timestamp + ".zip"
        zip_path = "/tmp/" + zip_name

        # zipファイルを作成する処理
        with zipfile.ZipFile(zip_path, "w", compression=zipfile.ZIP_DEFLATED) as new_zip:
            process_list = []
            with ThreadPoolExecutor() as executor:
                for audio_obj_key in audio_obj_keys:
                    process_list.append(
                        executor.submit(
                            fetch_audio_object, audio_obj_key
                        )
                    )

                for process in process_list:
                    file_path, mp3_path = process.result()
                    with open(mp3_path, "rb") as mp3_data:
                        new_zip.writestr(
                            "/" + file_path,
                            mp3_data.read()
                        )

        # 作成したzipを一旦s3に格納
        with open(zip_path, "rb") as zip_data:
            zip_bucket.upload_fileobj(
                zip_data,
                zip_name,
                ExtraArgs={"ACL": "public-read"}
            )

        # ファイルURL生成
        zip_url = f"https://{ZIP_BUCKET_NAME}.s3.amazonaws.com/{zip_name}"
        send_email(
            email,
            "[スピーキングテストWEB]mp3ダウンロードURL通知",
            f''' \
スピーキングテストサイトのmp3ファイル変換が完了しました。
以下のURLからダウンロードをお願いします。

音声ファイル：{zip_url}
CSVファイル：{csv_url}
'''
        )
    except OSError:
        send_email(
            email,
            "[スピーキングテストWEB]mp3ダウンロードエラー通知",
            f''' \
スピーキングテストサイトのmp3ファイル変換中にエラーが発生しました。
ダウンロード対象の音声ファイルが多すぎるので、分割してダウンロードをお願いします。
'''
        )


def send_email(to_addr, title_text, body_text):
    msg = MIMEText(body_text)
    msg['Subject'] = title_text
    msg['From'] = FROM_ADDR
    msg['To'] = to_addr
    s = smtplib.SMTP('smtp.gmail.com', 587)
    s.ehlo()
    s.starttls()
    s.login(FROM_ADDR, GMAIL_PASSWORD)
    s.sendmail(FROM_ADDR, to_addr, msg.as_string())
    s.close()
