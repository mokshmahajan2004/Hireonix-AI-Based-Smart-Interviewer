import firebase_admin
from firebase_admin import credentials, firestore, storage

# Initialize the Firebase app only once
if not firebase_admin._apps:
    cred = credentials.Certificate("serviceAccountKey.json")
    firebase_admin.initialize_app(cred, {
        'storageBucket': 'fir-login-5efb8'  # update in Step 5
    })

db = firestore.client()
bucket = storage.bucket()


def save_profile_to_firestore(profile_data):
    doc_ref = db.collection("users").document(profile_data["email"])
    doc_ref.set(profile_data)
    return True