from models.openrouter_client import client

def evaluate_answer(question, answer):
    prompt = f"""
    Evaluate the following Q&A:
    Question: {question}
    Answer: {answer}
    Provide scores and markdown feedback with improvements."""
    
    response = client.chat.completions.create(
        model="mistralai/mixtral-8x7b-instruct",
        messages=[
            {"role": "system", "content": "Mock interview evaluator with markdown formatting"},
            {"role": "user", "content": prompt}
        ],
        temperature=0.9
    )
    return response.choices[0].message.content
