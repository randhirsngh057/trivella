import { Question } from '@/types/quiz';

export async function fetchQuizQuestions(category?: number, difficulty?: string) {
  const baseUrl = 'https://opentdb.com/api.php?amount=10';
  const url = `${baseUrl}${category ? `&category=${category}` : ''}${
    difficulty ? `&difficulty=${difficulty}` : ''
  }`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.response_code !== 0) {
    throw new Error('Failed to fetch questions');
  }

  return data.results as Question[];
}

export async function fetchCategories() {
  const response = await fetch('https://opentdb.com/api_category.php');
  const data = await response.json();
  return data.trivia_categories;
}