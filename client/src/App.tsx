import { useEffect } from 'react';
import { useInterview } from './hooks/useInterview';
import { TopicInput } from './components/TopicInput';
import { QuestionCard } from './components/QuestionCard';
import { AnswerInput } from './components/AnswerInput';
import { TranscriptPanel } from './components/TranscriptPanel';
import { ArticleDisplay } from './components/ArticleDisplay';
import { InterviewProgress } from './components/InterviewProgress';

function App() {
  const {
    phase,
    topic,
    questions,
    currentQuestionIndex,
    currentQuestion,
    transcript,
    article,
    isLoading,
    error,
    progress,
    startInterview,
    submitAnswer,
    generateArticle,
    reset,
  } = useInterview();

  useEffect(() => {
    if (phase === 'generating' && !isLoading) {
      generateArticle();
    }
  }, [phase, isLoading, generateArticle]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="max-w-xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {phase === 'topic' && (
          <TopicInput onSubmit={startInterview} isLoading={isLoading} />
        )}

        {phase === 'interview' && currentQuestion && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <button
                onClick={reset}
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
                Start Over
              </button>
              <h1 className="text-2xl font-semibold text-slate-900 mt-2">
                {topic}
              </h1>
            </div>

            <InterviewProgress
              currentQuestion={currentQuestionIndex}
              totalQuestions={questions.length}
              progress={progress}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <QuestionCard
                  question={currentQuestion}
                  questionNumber={currentQuestionIndex + 1}
                  totalQuestions={questions.length}
                />
                <AnswerInput
                  onSubmit={submitAnswer}
                  isLastQuestion={currentQuestionIndex === questions.length - 1}
                  questionIndex={currentQuestionIndex}
                />
              </div>
              <div className="lg:sticky lg:top-8 lg:self-start">
                <TranscriptPanel
                  transcript={transcript}
                  currentQuestion={currentQuestion}
                />
              </div>
            </div>
          </div>
        )}

        {phase === 'generating' && (
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 mb-6">
                <svg
                  className="animate-spin h-8 w-8 text-slate-600"
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
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-2">
                Generating Article
              </h2>
              <p className="text-slate-500">
                Creating your article from the interview...
              </p>
            </div>
          </div>
        )}

        {phase === 'article' && article && (
          <ArticleDisplay article={article} topic={topic} onReset={reset} />
        )}
      </div>
    </div>
  );
}

export default App;
