const API_BASE = "http://localhost:8080/api";

export async function fetchCategories() {
    const res = await fetch(`${API_BASE}/categories`);
    if (!res.ok) throw new Error("Fehler beim Laden der Kategorien");
    return res.json();
}

export async function fetchNextQuestion(categoryId: number) {
  const res = await fetch(`${API_BASE}/categories/${categoryId}/next-question`);
  if (!res.ok) throw new Error("Fehler beim Laden der Frage");
  return res.json();
}

export async function submitAnswer(questionId: number, answerIndex: number) {
    const res = await fetch(`${API_BASE}/questions/${questionId}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answerIndex }),
    });
    if (!res.ok) throw new Error("Fehler beim Senden der Antwort");
    return res.json();
}