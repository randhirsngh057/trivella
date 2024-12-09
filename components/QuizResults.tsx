import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trophy } from 'lucide-react';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  username:string;
}

export default function QuizResults({
  score,
  totalQuestions,
  onRestart,
  username
}: QuizResultsProps) {
  const percentage = (score / totalQuestions) * 100;

  return (
    <Card className="p-8 w-full max-w-md mx-auto text-center">
      <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
      <h2 className="text-3xl font-bold mb-4">Quiz Complete {username}!</h2>
      <p className="text-xl mb-2">
        Your score: {score} out of {totalQuestions}
      </p>
      <p className="text-2xl font-bold mb-6 text-primary">
        {percentage.toFixed(0)}%
      </p>
      <Button onClick={onRestart} size="lg" className='font-semibold text-white'>
        Try Again
      </Button>
    </Card>
  );
}