import { Question } from '@/types/quiz';

export function generateHint(question: Question): string {
  const correctAnswer = question.correct_answer;
  
  // Category-based hint
  const categoryHint = `This is related to ${question.category}`;
  
  // Length hint
  const lengthHint = `The answer is ${correctAnswer.length} characters long`;
  
  // First letter hint
  const firstLetterHint = `The answer starts with '${correctAnswer[0]}'`;
  
  // Choose a random hint
  const hints = [categoryHint, lengthHint, firstLetterHint];
  return hints[Math.floor(Math.random() * hints.length)];
}