// backend/controllers/interviewController.js
import { admin,db } from "../firebaseAdmin.js";

export const saveInterviewResult = async (req, res) => {
  try {
    const { uid, questions, answers, scores, suggestion } = req.body;

    if (!uid || !questions || !answers) {
      return res.status(400).json({ error: "Missing fields in request" });
    }

    const docRef = await db.collection("pastInterviews").add({
      uid,
      date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric'
      }),
      questionCount: questions.length,
      questions,
      answers,
      scores,
      suggestion,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.status(200).json({ message: "Interview saved", id: docRef.id });
  } catch (err) {
    console.error("Error saving interview:", err);
    res.status(500).json({ error: "Failed to save interview" });
  }
};
