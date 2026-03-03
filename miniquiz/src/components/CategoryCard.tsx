"use client";

import { Category } from "@/types/quiz";

interface Props {
  category: Category;
  onClick: (id: number) => void;
}

export default function CategoryCard({ category, onClick }: Props) {
    const percent = category.totalQuestions > 0
    ? Math.round((category.correctAnswers / category.totalQuestions) * 100)
    : 0;

    const isDone = category.correctAnswers === category.totalQuestions
    && category.totalQuestions > 0;

    return (
        <button
            onClick={() => onClick(category.id)}
            className="w-full text-left bg-white border rounded-xl p-5 hover:shadow-md transition"
            >
            <div className="flex justify-between items-start mb-3">
                <div>
                <h2 className="text-lg font-semibold">{category.name}</h2>
                <p className="text-sm text-gray-500">
                    {category.correctAnswers} von {category.totalQuestions} richtig
                </p>
                </div>
                {isDone && <span title="Abgeschlossen">🏆</span>}
            </div>

            {/* Fortschrittsbalken */}
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                className={`h-2 rounded-full transition-all ${isDone ? "bg-emerald-500" : "bg-indigo-500"}`}
                style={{ width: `${percent}%` }}
                />
            </div>
            <p className="text-right text-xs text-gray-400 mt-1">{percent}%</p>
        </button>
    );
}