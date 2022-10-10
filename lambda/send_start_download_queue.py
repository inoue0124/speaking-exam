
import json
import os
import io
import boto3
import uuid
import base64
import datetime

ZIP_BUCKET_NAME = os.environ['ZIP_BUCKET_NAME']
QUEUE_NAME = os.environ['QUEUE_NAME']
SERVICE_URL = os.environ['SERVICE_URL']

sqs = boto3.resource('sqs')
s3 = boto3.resource("s3")
zip_bucket = s3.Bucket(ZIP_BUCKET_NAME)


def send_start_download_queue(event, context):
    body = json.loads(event['body'])
    audio_obj_keys = body['audioObjKeys']
    email = body['email']
    csv = body['csv']
    timestamp = datetime.datetime.now().isoformat()
    csv_name = "record_" + timestamp + ".csv"

    # ダウンロードファイル一覧csvをs3にアップロード
    zip_bucket.upload_fileobj(
        io.BytesIO(base64.b64decode(csv)),
        csv_name,
        ExtraArgs={"ACL": "public-read"}
    )

    # ダウンロードzip生成queueを送信
    queue = sqs.get_queue_by_name(QueueName=QUEUE_NAME)
    queue_msg = {
        "audio_obj_keys": audio_obj_keys,
        "email": email,
        "timestamp": datetime.datetime.now().isoformat(),
        "csv_url": f"https://{ZIP_BUCKET_NAME}.s3.amazonaws.com/{csv_name}"
    }
    messageGroupId = "0001"
    queue.send_message(
        MessageBody=json.dumps(queue_msg),
        MessageGroupId=messageGroupId,
        MessageDeduplicationId=str(uuid.uuid4()),
    )

    return {
        'statusCode': 200,
        "headers": {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Credentials": "true"
        },
        'body': json.dumps('Queue is sent.')
    }
