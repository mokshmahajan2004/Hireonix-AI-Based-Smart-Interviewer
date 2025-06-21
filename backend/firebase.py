import firebase_admin
from firebase_admin import credentials, firestore, storage

# Initialize the Firebase app only once
if not firebase_admin._apps:
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
    # Create blob path: e.g., profile_images/user@example.com.jpg
    blob = bucket.blob(f"profile_images/{email}.jpg")
    
    # Upload the image file
    blob.upload_from_filename(image_path)

    # Optional: Make it publicly accessible
    blob.make_public()

    # Get the public URL
    image_url = blob.public_url

    # Save the URL in Firestore
    doc_ref = db.collection("users").document(email)
    doc_ref.update({"profile_image_url": image_url})

    return image_url