export interface TranscriptEntry {
  question: string;
  answer: string;
}

export interface GenerateQuestionsResponse {
  questions: string[];
}

export interface GenerateArticleResponse {
  article: string;
}

export type InterviewPhase = 'topic' | 'interview' | 'generating' | 'article';

export type InputMode = 'text' | 'voice';

export interface InterviewState {
  phase: InterviewPhase;
  topic: string;
  questions: string[];
  currentQuestionIndex: number;
  transcript: TranscriptEntry[];
  article: string;
  isLoading: boolean;
  error: string | null;
}
