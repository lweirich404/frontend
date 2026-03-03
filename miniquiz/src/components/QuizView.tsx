"use client";

import { useState, useEffect, useRef } from "react";
import { fetchNextQuestion, submitAnswer, fetchCategories } from "@/lib/api";
import { Question, isQuestion } from "@/types/quiz";

interface Props {
    categoryId: number;
    categoryName: string;
    onBack: () => void;
}

export default function QuizView({ categoryId, categoryName, onBack }: Props) {
    const [question, setQuestion] = useState<Question | null>(null);
    const [allDone, setAllDone] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);
    const [answerSaved, setAnswerSaved] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const isFetching = useRef(false);

    const loadNextQuestion = async () => {
        if (isFetching.current) return;
        isFetching.current = true;

        setLoading(true);
        setQuestion(null); 
        setSelectedIndex(null);
        setIsCorrect(null);
        setAnswerSaved(false);
    
        const data = await fetchNextQuestion(categoryId);

        if (isQuestion(data)) {
            setQuestion(data);
        } else {
            const categories = await fetchCategories();
            const current = categories.find((c: { id: number }) => c.id === categoryId);
            if (current) {
                setCorrectCount(current.correctAnswers);
                setTotalCount(current.totalQuestions);
            }
            setAllDone(true);
        }
        setLoading(false);
        isFetching.current = false;
  };

  useEffect(() => {
    loadNextQuestion();
  }, []);

  const handleAnswer = async (index: number) => {
    if (selectedIndex !== null || !question) return;

    const result = await submitAnswer(question.id, index);
    setSelectedIndex(index); 
    setIsCorrect(result.correct);
    setAnswerSaved(true);
  };

  const handleNextQuestion = async () => {
    setAnswerSaved(false);
    await loadNextQuestion();
  };

  if (loading) return (
    <p className="text-center mt-20 text-gray-500">Lädt...</p>
  );

  if (allDone) return (
    <div className="text-center mt-20">
      {correctCount === totalCount ? (
                <>
                    <p className="text-5xl mb-4">🏆</p>
                    <p className="text-xl font-semibold mb-1">Alle Fragen richtig beantwortet!</p>
                </>
            ) : (
                <>
                    <p className="text-5xl mb-4">✅</p>
                    <p className="text-xl font-semibold mb-1">
                        Kategorie abgeschlossen! {correctCount} von {totalCount} richtig
                    </p>
                </>
            )}
            <p className="text-gray-500 mb-6">Super gemacht!</p>
      <button
        onClick={onBack}
        className="text-indigo-600 underline hover:text-indigo-800"
      >
        ← Zurück zur Übersicht
      </button>
    </div>
    );

    return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <button
        onClick={onBack}
        className="text-sm text-gray-500 mb-6 hover:underline"
      >
        ← Zurück
      </button>

      <h1 className="text-xl font-bold mb-6">{categoryName}</h1>

      {question && (
        <>
          <p className="text-lg font-medium mb-6">{question.questionText}</p>

          <div className="grid grid-cols-1 gap-3">
            {question.options.map((option, index) => {
              let style = "border bg-white hover:bg-indigo-50";
              if (selectedIndex !== null) {
                if (index === selectedIndex && isCorrect)
                  style = "border-2 border-green-500 bg-green-50";
                else if (index === selectedIndex && !isCorrect)
                  style = "border-2 border-red-500 bg-red-50";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedIndex !== null}
                  className={`w-full text-left p-4 rounded-xl transition ${style}`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {answerSaved && (
            <div className="mt-6 text-center">
              <p className={`text-lg font-semibold ${isCorrect ? "text-green-600" : "text-red-500"}`}>
                {isCorrect ? "Richtig! 🎉" : "Leider falsch!"}
              </p>
              <button
                onClick={handleNextQuestion}
                className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Nächste Frage →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}