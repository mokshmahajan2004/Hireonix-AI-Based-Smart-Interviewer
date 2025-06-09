import { db } from "../Config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "../Config";

export const saveInterviewResult = async ({ questions, answers, scores, suggestion }) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const docRef = await addDoc(collection(db, "pastInterviews"), {
      uid: user.uid,
      date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric'
      }),
      questionCount: questions.length,
      questions,
      answers,
      scores,
      suggestion,
      createdAt: serverTimestamp()
    });

    console.log("Interview report saved with ID:", docRef.id);
    return true;
  } catch (err) {
    console.error("Error saving interview:", err);
    return false;
  }
};
