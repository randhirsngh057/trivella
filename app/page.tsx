'use client';

import { useEffect, useState } from 'react';
import { fetchQuizQuestions, fetchCategories } from '@/lib/api';
import QuizSettings from '@/components/QuizSettings';
import Question from '@/components/Question';
import QuizResults from '@/components/QuizResults';
import UserProfile from '@/components/UserProfile';
import { Category, Question as QuestionType, QuizSettings as Settings } from '@/types/quiz';
import { Progress } from '@/components/ui/progress';
import { Brain } from 'lucide-react';

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  const startQuiz = async (settings: Settings) => {
    setLoading(true);
    try {
      const data = await fetchQuizQuestions(
        settings.category || undefined,
        settings.difficulty
      );
      setQuestions(data);
      setCurrentQuestionIndex(0);
      setScore(0);
      setQuizStarted(true);
    } catch (error) {
      console.error('Failed to fetch questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (answer: string | null) => {
    if (answer === questions[currentQuestionIndex].correct_answer) {
      setScore((prev) => prev + 1);
    }
    setTimeout(() => {
      setCurrentQuestionIndex((prev) => prev + 1);
    }, 1000);
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuestions([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-4">
          <Progress value={33} className="w-full" />
          <p className="text-center mt-4">Loading quiz...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Brain className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold text-center">Trivella</h1>
        </div>

        {!username && <UserProfile onSubmit={setUsername} />}

        {username && !quizStarted && (
          <QuizSettings categories={categories} onStart={startQuiz}  />
        )}

        {quizStarted && currentQuestionIndex < questions.length && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium font-semibold">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium font-semibold">Score: {score}</span>
            </div>
            <Progress
              value={((currentQuestionIndex + 1) / questions.length) * 100}
              className="mb-6"
            />
            <Question
              key={currentQuestionIndex}
              question={questions[currentQuestionIndex]}
              onAnswer={handleAnswer}
            />
          </div>
        )}

        {quizStarted && currentQuestionIndex >= questions.length && (
          <QuizResults
            score={score}
            totalQuestions={questions.length}
            onRestart={restartQuiz}
            username={username}
          />
        )}
      </div>
    </main>
  );
}