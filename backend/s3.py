import boto3
bucket_name = 'hacked-2023-lifestone'
aws_access_key_id = 'AKIATJOW6HCHJIUF66T6'
aws_secret_access_key = '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'

# Create an S3 resource
s3 = boto3.resource('s3', aws_access_key_id=aws_access_key_id, aws_secret_access_key=aws_secret_access_key)

def upload(file_path: str, file_name: str):
    # Use the S3 resource to upload the file to the bucket
    s3.Bucket(bucket_name).upload_file(file_path, file_name)

def download(file_name: str, file_path: str) -> bytes:
    # Use the S3 resource to download the file from the bucket
    s3.Object(bucket_name, file_name).download_file(file_path)
