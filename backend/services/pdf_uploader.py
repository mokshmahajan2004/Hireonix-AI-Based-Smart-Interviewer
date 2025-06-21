import markdown2
from weasyprint import HTML
from firebase_admin import storage
import os
import uuid

def convert_md_to_pdf(md_path, pdf_path):
    with open(md_path, "r", encoding="utf-8") as f:
        md_content = f.read()

    html = markdown2.markdown(md_content)
    HTML(string=html.encode("utf-8")).write_pdf(target=pdf_path)
    return pdf_path


def upload_pdf_to_firebase(pdf_path):
    bucket = storage.bucket()
    blob_name = f"interview_reports/{uuid.uuid4().hex}_{os.path.basename(pdf_path)}"
    blob = bucket.blob(blob_name)

    blob.upload_from_filename(pdf_path)
    blob.make_public()  # Optional: Makes it accessible via URL

    return blob.public_url
