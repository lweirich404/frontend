// One possible answer
export type Answer = {
    index: number;  // 0, 1, 2, 3
    text: string;   // answer word or sentence
}

// One question with 4 answers
export type Question = {
    id: number;
    questionText: string;  // matches backend field
    options: string[];     // array of 4 answer texts
}

// One category with progress
export type Category = {
    id: number;
    name: string;
    totalQuestions: number;
    correctAnswers: number;
}

// Result after submitting an answer
export type AnswerResult  = {
    correct: boolean;
    message: string;
}

// Response from next-question endpoint
export type NextQuestionResponse = Question | AllDoneResponse;

export type AllDoneResponse = {
  message: string;
};

// Type guard to check if response is a Question
export function isQuestion(response: NextQuestionResponse): response is Question {
  return "questionText" in response;
}