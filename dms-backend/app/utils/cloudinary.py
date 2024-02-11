import cloudinary
from cloudinary.uploader import upload


def configure_cloudinary(cloud_name, api_key, api_secret):
    cloudinary.config(
        cloud_name=cloud_name,
        api_key=api_key,
        api_secret=api_secret
    )


def upload_file_to_cloudinary(file, resource_type='image'):
    try:
        if resource_type == 'image':
            upload_result = upload(file.file)
        else:
            upload_result = upload(file.file, resource_type=resource_type)

        return upload_result["secure_url"]
    except Exception as e:
        raise e
