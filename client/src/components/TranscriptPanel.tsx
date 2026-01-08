import { TranscriptEntry } from '../types';

interface TranscriptPanelProps {
  transcript: TranscriptEntry[];
  currentQuestion?: string | null;
}

export function TranscriptPanel({
  transcript,
  currentQuestion,
}: TranscriptPanelProps) {
  if (transcript.length === 0 && !currentQuestion) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wide mb-4">
        Transcript
      </h3>

      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {transcript.map((entry, index) => (
          <div key={index} className="border-l-2 border-slate-900 pl-4">
            <p className="text-sm text-slate-500 mb-1">
              {entry.question}
            </p>
            <p className="text-slate-700">{entry.answer}</p>
          </div>
        ))}

        {currentQuestion && (
          <div className="border-l-2 border-slate-200 pl-4">
            <p className="text-sm text-slate-400 mb-1">
              {currentQuestion}
            </p>
            <p className="text-slate-300 italic text-sm">Waiting for answer...</p>
          </div>
        )}
      </div>
    </div>
  );
}
