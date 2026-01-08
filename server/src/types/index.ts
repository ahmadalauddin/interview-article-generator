export interface TranscriptEntry {
  question: string;
  answer: string;
}

export interface GenerateQuestionsRequest {
  topic: string;
}

export interface GenerateQuestionsResponse {
  questions: string[];
}

export interface GenerateArticleRequest {
  topic: string;
  transcript: TranscriptEntry[];
}

export interface GenerateArticleResponse {
  article: string;
}

export interface AIService {
  generateQuestions(topic: string): Promise<string[]>;
  generateArticle(topic: string, transcript: TranscriptEntry[]): Promise<string>;
}
