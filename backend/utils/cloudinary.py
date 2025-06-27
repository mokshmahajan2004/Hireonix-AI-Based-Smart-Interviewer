import cloudinary
import cloudinary.uploader
import os
from dotenv import load_dotenv

load_dotenv()

# Configuration       

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)
def upload_markdown_to_cloudinary(file_path):
    file_base = os.path.basename(file_path).split(".")[0]
    result = cloudinary.uploader.upload(
        file_path,
        resource_type="raw",
        folder="interview_reports",
        public_id=file_base,  # ✅ name like "John_Doe_Frontend_2025-06-27_18-48-23"
        use_filename=True,
        unique_filename=False,
        overwrite=False
    )
    return result['secure_url']

