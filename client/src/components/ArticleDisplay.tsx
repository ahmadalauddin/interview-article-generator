import { useState } from 'react';

interface ArticleDisplayProps {
  article: string;
  topic: string;
  onReset: () => void;
}

export function ArticleDisplay({ article, topic, onReset }: ArticleDisplayProps) {
  const [copied, setCopied] = useState(false);

  const wordCount = article.split(/\s+/).filter(word => word.length > 0).length;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(article);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="mb-6">
        <button
          onClick={onReset}
          className="text-slate-500 hover:text-slate-700 flex items-center gap-1.5 text-sm transition"
        >
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Start New Interview
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium mb-1">
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Article Generated
              </div>
              <h1 className="text-2xl font-semibold text-slate-900">{topic}</h1>
            </div>
            <div className="text-sm text-slate-400">
              {wordCount} words
            </div>
          </div>
        </div>

        <div className="px-8 py-8">
          <article className="prose prose-slate max-w-none">
            {article.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('# ')) {
                return (
                  <h1
                    key={index}
                    className="text-2xl font-semibold text-slate-900 mb-4 mt-8 first:mt-0"
                  >
                    {paragraph.replace('# ', '')}
                  </h1>
                );
              }
              if (paragraph.startsWith('## ')) {
                return (
                  <h2
                    key={index}
                    className="text-lg font-semibold text-slate-800 mb-3 mt-6"
                  >
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.trim()) {
                return (
                  <p
                    key={index}
                    className="text-slate-600 mb-4 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                );
              }
              return null;
            })}
          </article>
        </div>

        <div className="px-8 py-4 bg-slate-50 border-t border-slate-100">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition"
          >
            {copied ? (
              <>
                <svg
                  className="w-4 h-4 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Copied!
              </>
            ) : (
              <>
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
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy Article
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
