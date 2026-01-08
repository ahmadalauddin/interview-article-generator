import { useState, useCallback } from 'react';
import { InputMode } from '../types';
import { VoiceRecorder } from './VoiceRecorder';

interface AnswerInputProps {
  onSubmit: (answer: string) => void;
  isLastQuestion: boolean;
  questionIndex: number;
}

export function AnswerInput({ onSubmit, isLastQuestion, questionIndex }: AnswerInputProps) {
  const [mode, setMode] = useState<InputMode>('text');
  const [textAnswer, setTextAnswer] = useState('');
  const [voiceAnswer, setVoiceAnswer] = useState('');

  const currentAnswer = mode === 'text' ? textAnswer : voiceAnswer;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentAnswer.trim()) {
      onSubmit(currentAnswer.trim());
      setTextAnswer('');
      setVoiceAnswer('');
    }
  };

  const handleVoiceTranscriptChange = useCallback((transcript: string) => {
    setVoiceAnswer(transcript);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => setMode('text')}
          className={`flex-1 py-2.5 px-4 rounded-xl font-medium text-sm transition ${
            mode === 'text'
              ? 'bg-slate-900 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Text
          </span>
        </button>
        <button
          type="button"
          onClick={() => setMode('voice')}
          className={`flex-1 py-2.5 px-4 rounded-xl font-medium text-sm transition ${
            mode === 'voice'
              ? 'bg-slate-900 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
            Voice
          </span>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {mode === 'text' ? (
          <textarea
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            placeholder="Type your answer here..."
            rows={4}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition resize-none mb-4 bg-slate-50 placeholder:text-slate-400"
          />
        ) : (
          <div className="mb-4">
            <VoiceRecorder
              key={questionIndex}
              onTranscriptChange={handleVoiceTranscriptChange}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={!currentAnswer.trim()}
          className="w-full py-3 px-4 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 focus:ring-4 focus:ring-slate-200 disabled:bg-slate-300 disabled:cursor-not-allowed transition"
        >
          {isLastQuestion ? 'Generate Article' : 'Next Question'}
        </button>
      </form>
    </div>
  );
}
