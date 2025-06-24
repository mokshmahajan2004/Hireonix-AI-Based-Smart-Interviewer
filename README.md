# 🚀 Hireonix – AI-Based Smart Interviewer

Hireonix is an AI-powered platform that helps job seekers identify skill gaps, prepare for interviews, and enhance their resumes with personalized feedback and practice sessions. It combines smart mock interviews, resume screening, and voice-based evaluations into a single powerful tool.

![Hireonix Banner](./assets/hireonix-banner.png) <!-- Replace with actual image path or remove this line if not using -->

---

## 🌟 Features

- 🎤 **Mock Interviews with AI Evaluation**
- 📄 **Resume Screening with ATS Compatibility Scoring**
- 🎯 **Skill & Role-Based Question Generation**
- 🧠 **Smart Feedback on Fluency, Clarity, Confidence**
- 📊 **Post-Interview Performance Reports**
- 📝 **Resume Bullet Suggestions & Rewrites**
- ☁️ **Audio Transcription & TTS using Whisper/OpenAI**

---

## 🔧 Tech Stack

| Frontend               | Backend          | AI/ML Services           | Database            | Storage                |
|------------------------|------------------|--------------------------|---------------------|------------------------|
| React.js (Tailwind CSS)| FastAPI (Python) | OpenAI GPT, Whisper      | Firebase Firestore  | Firebase / Cloudinary  |


---

## 🧪 How It Works

1. **User logs in** and fills a pre-interview form with role, skills, and experience.
2. **AI generates** personalized questions using Mixtral-8x7B.
3. **User responds via voice**, which is transcribed using Whisper.
4. **AI evaluates** each answer for fluency, clarity, and relevance.
5. **Final report** summarizes scores, feedback, and improvement tips.
6. **Resume screening** checks JD alignment and rewrites weak resume bullets.

---
## 🚀 Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/hireonix.git
cd hireonix
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 3. Backend Setup

```bash
cd ../backend
pip install -r requirements.txt
uvicorn main:app --reload

```
> ✅ Make sure to add a `.env` file in the `backend/` directory with the following:


---

### 4. Connect Frontend to Backend

If your frontend uses an API config file (like `config.js` or `api.js`), make sure to update the base URL:

```js
export const API_BASE_URL = "http://127.0.0.1:8000";
