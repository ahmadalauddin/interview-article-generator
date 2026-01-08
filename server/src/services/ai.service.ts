import { AIService } from '../types';
import { config } from '../config';
import { mockAIService } from './mock.service';
import { getOpenAIService } from './openai.service';

export function getAIService(): AIService {
  if (config.isOpenAIEnabled) {
    console.log('Using OpenAI service');
    return getOpenAIService();
  }
  console.log('Using Mock AI service (no OpenAI API key provided)');
  return mockAIService;
}
