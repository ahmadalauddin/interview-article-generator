import { AIService, TranscriptEntry } from '../types';

const questionTemplates = [
  "What inspired you to get involved with {topic}?",
  "Can you describe your experience with {topic}?",
  "What are the biggest challenges you've faced related to {topic}?",
  "How do you see {topic} evolving in the future?",
  "What advice would you give to someone new to {topic}?",
  "What has been your most memorable moment involving {topic}?",
  "How has {topic} impacted your professional or personal life?",
  "What misconceptions do people commonly have about {topic}?",
  "What resources would you recommend for learning more about {topic}?",
  "How do you stay updated with the latest developments in {topic}?",
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export class MockAIService implements AIService {
  async generateQuestions(topic: string): Promise<string[]> {
    await delay(800);

    const shuffled = shuffleArray(questionTemplates);
    const numQuestions = Math.floor(Math.random() * 3) + 3;

    return shuffled
      .slice(0, numQuestions)
      .map(q => q.replace('{topic}', topic));
  }

  async generateArticle(topic: string, transcript: TranscriptEntry[]): Promise<string> {
    await delay(1200);

    const qaSection = transcript
      .map((entry, index) => {
        const answerPreview = entry.answer.length > 100
          ? entry.answer.substring(0, 100) + '...'
          : entry.answer;
        return `insight ${index + 1}: "${answerPreview}"`;
      })
      .join(', ');

    const article = `
# Exploring ${topic}: An Insightful Interview

In today's fast-paced world, ${topic} has become an increasingly relevant subject that touches many aspects of our lives. Through an in-depth interview, we gathered valuable perspectives and insights that shed light on this fascinating topic.

## Key Insights

Our conversation revealed several important themes. The interviewee shared their personal journey with ${topic}, highlighting both the challenges and rewards that come with deep engagement in this area. From their experience, it's clear that ${topic} requires dedication, continuous learning, and a willingness to adapt to new developments.

## Challenges and Opportunities

When discussing the challenges associated with ${topic}, our interviewee emphasized the importance of staying informed and maintaining a growth mindset. They noted that while obstacles are inevitable, they often serve as catalysts for innovation and improvement. The key lies in viewing these challenges as opportunities rather than setbacks.

## Looking Ahead

The future of ${topic} appears bright, with numerous possibilities on the horizon. Our interviewee expressed optimism about upcoming developments and encouraged others to remain curious and engaged. They believe that by fostering a community of learners and practitioners, we can collectively advance our understanding and application of ${topic}.

## Advice for Newcomers

For those just beginning their journey with ${topic}, the advice is clear: start with the fundamentals, seek out mentors and resources, and don't be afraid to ask questions. Every expert was once a beginner, and the path to mastery is paved with persistence and passion.

## Conclusion

This interview has provided valuable insights into ${topic}, offering perspectives that can benefit both newcomers and seasoned practitioners alike. As we continue to explore and understand this subject, we look forward to the innovations and discoveries that lie ahead.

*This article was generated based on interview responses covering: ${qaSection}*
    `.trim();

    return article;
  }
}

export const mockAIService = new MockAIService();
