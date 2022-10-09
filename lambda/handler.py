import base64
import boto3
import zipfile
import json

s3 = boto3.resource("s3")
bucket = s3.Bucket("speaking-exam")


def download_audio(event, context):
    body = json.loads(event['body'])
    audio_obj_keys = body['audioObjKeys']
    zip_path = "/tmp/recordings.zip"

    # zipファイルを作成する処理
    with zipfile.ZipFile(zip_path, "w", compression=zipfile.ZIP_DEFLATED) as new_zip:
        for audio_obj_key in audio_obj_keys:
            obj = bucket.Object(audio_obj_key)

            s3_object = obj.get()
            body = s3_object["Body"].read()
            new_zip.writestr(audio_obj_key, body)

    # 作成したzipをレスポンスとして返す処理
    with open(zip_path, "rb") as zip_data:
        zip_bytes = zip_data.read()

        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/zip",
                "Access-Control-Allow-Origin": "https://speaking.komabastar.com",
            },
            "body": base64.b64encode(zip_bytes).decode("utf-8"),
            "isBase64Encoded": True,
        }
