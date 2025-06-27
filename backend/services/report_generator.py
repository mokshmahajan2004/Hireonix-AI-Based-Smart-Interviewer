# services/report_generator.py

from datetime import datetime
import os
from utils.cloudinary import upload_markdown_to_cloudinary

def generate_report(name, email, role, skills, experience, achievements, notes, qa_feedback):
    header = f"""# 🧠 AI Interview Report
    
**Candidate:** {name}
**Email:** {email}
**Role:** {role}
**Skills:** {skills}
**Experience:** {experience}
**Achievements:** {achievements}
**Notes:** {notes}

**Total Questions:** {len(qa_feedback)}

---\n\n"""

    sections = ""
    for item in qa_feedback:
        sections += f"""
### Question {item['idx']}
**Q:** {item['question']}
**A:** {item['answer']}

{item['feedback']}

---\n"""

    timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    file_name = f"{name.replace(' ', '_')}_{role.replace(' ', '_')}_{timestamp}.md"
    os.makedirs("reports", exist_ok=True)
    file_path = os.path.join("reports", file_name)

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(header + sections)

    cloudinary_url = upload_markdown_to_cloudinary(file_path)

    return {
        "name": name,
        "email": email,
        "role": role,
        "file_name": file_name,
        "url": cloudinary_url,
        "timestamp": timestamp
    }
