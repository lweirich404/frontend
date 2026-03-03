"use client";

import { useEffect, useState } from "react";
import { fetchCategories } from "@/lib/api";
import CategoryCard from "@/components/CategoryCard";
import QuizView from "@/components/QuizView";
import { Category } from "@/types/quiz";


export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  const loadCategories = async () => {
    setLoading(true);
    const data = await fetchCategories();
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  if (selected) {
    return (
      <QuizView
        categoryId={selected.id}
        categoryName={selected.name}
        onBack={() => {
          setSelected(null);
          loadCategories(); // reload progress
        }}
      />
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Mini Quiz</h1>
      <p className="text-gray-500 mb-8">Wähle eine Kategorie und starte das Quiz!</p>

      {loading ? (
        <p className="text-gray-400">Lädt Kategorien...</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onClick={() => setSelected(cat)}
            />
          ))}
        </div>
      )}
    </main>
  );
}
