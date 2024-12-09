'use client';

import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Clock } from 'lucide-react';

interface TimerProps {
  duration: number;
  onTimeout: () => void;
}

export default function Timer({ duration, onTimeout }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeout]);

  const progress = (timeLeft / duration) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">{timeLeft}s</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}