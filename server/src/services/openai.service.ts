import OpenAI from 'openai';
import { AIService, TranscriptEntry } from '../types';
import { config } from '../config';

export class OpenAIService implements AIService {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: config.openaiApiKey,
    });
  }

  async generateQuestions(topic: string): Promise<string[]> {
    const completion = await this.client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert interviewer. Generate thoughtful, open-ended interview questions that encourage detailed responses. Return only the questions, one per line, without numbering or bullet points.',
        },
        {
          role: 'user',
          content: `Generate 4 interview questions about the topic: "${topic}". The questions should be engaging and help gather interesting insights for an article.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const content = completion.choices[0]?.message?.content || '';
    const questions = content
      .split('\n')
      .map(q => q.trim())
      .filter(q => q.length > 0 && q.endsWith('?'));

    return questions.slice(0, 5).length >= 3
      ? questions.slice(0, 5)
      : questions.concat([
          `What inspired you to explore ${topic}?`,
          `What challenges have you faced with ${topic}?`,
        ]).slice(0, 5);
  }

  async generateArticle(topic: string, transcript: TranscriptEntry[]): Promise<string> {
    const transcriptText = transcript
      .map((entry, i) => `Q${i + 1}: ${entry.question}\nA${i + 1}: ${entry.answer}`)
      .join('\n\n');

    const completion = await this.client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a skilled journalist and content writer. Write engaging, well-structured articles based on interview transcripts. Use a professional yet accessible tone.',
        },
        {
          role: 'user',
          content: `Based on the following interview transcript about "${topic}", write a 300-500 word article. The article should have a clear structure with an introduction, body paragraphs covering the key insights, and a conclusion. Make it engaging and informative.

Interview Transcript:
${transcriptText}

Write the article now:`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return completion.choices[0]?.message?.content || 'Unable to generate article.';
  }
}

let openAIServiceInstance: OpenAIService | null = null;

export const getOpenAIService = (): OpenAIService => {
  if (!openAIServiceInstance) {
    openAIServiceInstance = new OpenAIService();
  }
  return openAIServiceInstance;
};
