interface InterviewProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  progress: number;
}

export function InterviewProgress({
  currentQuestion,
  totalQuestions,
  progress,
}: InterviewProgressProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-slate-500">
          {currentQuestion} of {totalQuestions} answered
        </span>
        <span className="text-sm font-medium text-slate-700">{progress}%</span>
      </div>
      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-slate-900 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
