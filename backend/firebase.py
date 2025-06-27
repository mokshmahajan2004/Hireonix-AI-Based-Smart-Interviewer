import os
import json
import firebase_admin
from firebase_admin import credentials, firestore, storage

# Determine whether to use environment variable or local JSON file
if not firebase_admin._apps:
    firebase_json = os.environ.get("FIREBASE_CREDENTIALS")

    if firebase_json:
        # Load from environment (for Render or production)
        cred = credentials.Certificate(json.loads(firebase_json))
    else:
        # Fallback for local development
        cred = credentials.Certificate("serviceAccountKey.json")
    
    firebase_admin.initialize_app(cred, {
        'storageBucket': 'fir-login-5efb8.appspot.com'
    })

db = firestore.client()
bucket = storage.bucket()


def save_profile_to_firestore(profile_data):
    doc_ref = db.collection("users").document(profile_data["email"])
    doc_ref.set(profile_data)
    return True


def upload_profile_picture_and_save_url(email: str, image_path: str):
    blob = bucket.blob(f"profile_images/{email}.jpg")
    blob.upload_from_filename(image_path)
    blob.make_public()
    image_url = blob.public_url

    doc_ref = db.collection("users").document(email)
    doc_ref.update({"profile_image_url": image_url})

    return image_url

def save_report_metadata(report: dict):
    db = firestore.client()
    db.collection("interview_reports").add({
        "name": report["name"],
        "email": report["email"],
        "role": report["role"],
        "file_name": report["file_name"],
        "url": report["url"],
        "timestamp": report["timestamp"]
    })
