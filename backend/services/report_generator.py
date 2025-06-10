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

    report = header + sections
    with open("interview_report.md", "w", encoding="utf-8") as f:
        f.write(report)
    return "interview_report.md"
