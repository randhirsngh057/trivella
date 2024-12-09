import { generateHint } from '@/lib/hints';
import { Question } from '@/types/quiz';

describe('Hints System', () => {
  const mockQuestion: Question = {
    category: 'Science',
    type: 'multiple',
    difficulty: 'medium',
    question: 'What is the capital of France?',
    correct_answer: 'Paris',
    incorrect_answers: ['London', 'Berlin', 'Madrid'],
  };

  it('generates a hint for a question', () => {
    const hint = generateHint(mockQuestion);
    expect(hint).toBeTruthy();
    expect(typeof hint).toBe('string');
  });

  it('includes relevant information in the hint', () => {
    const hint = generateHint(mockQuestion);
    const possibleHints = [
      'This is related to Science',
      'The answer is 5 characters long',
      "The answer starts with 'P'",
    ];
    expect(possibleHints).toContain(hint);
  });
});