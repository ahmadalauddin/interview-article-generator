import { useState } from 'react';

interface TopicInputProps {
  onSubmit: (topic: string) => void;
  isLoading: boolean;
}

const exampleTopics = [
  'Artificial Intelligence',
  'Remote Work',
  'Climate Change',
  'Startups',
  'Health & Wellness',
];

export function TopicInput({ onSubmit, isLoading }: TopicInputProps) {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && !isLoading) {
      onSubmit(topic.trim());
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-xl px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 mb-6">
            <svg
              className="w-8 h-8 text-slate-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-semibold text-slate-900 tracking-tight mb-3">
            Interview to Article
          </h1>
          <p className="text-lg text-slate-500">
            Enter a topic, answer a few questions, get an article.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <label
              htmlFor="topic"
              className="block text-sm font-medium text-slate-700 mb-3"
            >
              What would you like to discuss?
            </label>
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter your topic..."
              className="w-full px-4 py-3.5 text-lg border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition bg-slate-50 placeholder:text-slate-400"
              disabled={isLoading}
              autoFocus
            />

            <div className="mt-4 flex flex-wrap gap-2">
              {exampleTopics.map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => setTopic(example)}
                  className="px-3 py-1.5 text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                >
                  {example}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={!topic.trim() || isLoading}
              className="w-full mt-6 py-3.5 px-4 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 focus:ring-4 focus:ring-slate-200 disabled:bg-slate-300 disabled:cursor-not-allowed transition"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Generating Questions...
                </span>
              ) : (
                'Start Interview'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
