interface QuestionCardProps {
  question: string;
  questionNumber: number;
  totalQuestions: number;
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
}: QuestionCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
      <div className="text-sm text-slate-400 mb-3">
        Question {questionNumber} of {totalQuestions}
      </div>
      <h2 className="text-xl font-medium text-slate-900 leading-relaxed">{question}</h2>
    </div>
  );
}
