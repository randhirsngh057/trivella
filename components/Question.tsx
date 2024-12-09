'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Question as QuestionType } from '@/types/quiz';
import { generateHint } from '@/lib/hints';
import Timer from './Timer';

interface QuestionProps {
  question: QuestionType;
  onAnswer: (answer: string | null) => void;
}

export default function Question({ question, onAnswer }: QuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [hint, setHint] = useState<string>('');
  const [showHint, setShowHint] = useState(true);

  // Reset answers when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setShowHint(false);
    setHint(generateHint(question));
    setAnswers([...question.incorrect_answers, question.correct_answer].sort(
      () => Math.random() - 0.5
    ));
  }, [question]);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    onAnswer(answer);
  };

  const handleTimeout = () => {
    onAnswer(null);
  };

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-muted-foreground font-semibold">
            {question.category}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium px-2 py-1 bg-primary/10 rounded-full font-semibold">
              {question.difficulty}
            </span>
          </div>
        </div>

        <Timer duration={30} onTimeout={handleTimeout} />

        <h3
          className="text-xl font-semibold mb-4"
          dangerouslySetInnerHTML={{ __html: question.question }}
        />

        <div className="grid gap-3">
          {answers.map((answer) => (
            <Button
              key={answer}
              variant={selectedAnswer === answer ? 'default' : 'outline'}
              className="w-full text-left h-auto py-4 px-6 font-semibold"
              onClick={() => handleAnswer(answer)}
              disabled={selectedAnswer !== null}
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          ))}
        </div>
        {hint !== "" && (
            <div className="mt-4 p-3 bg-secondary/50 rounded-lg">
            <p className="text-sm text-muted-foreground font-semibold">Hint: {hint}</p>
          </div>
        )
        }
      </div>
    </Card>
  );
}