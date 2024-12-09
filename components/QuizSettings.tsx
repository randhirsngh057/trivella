'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Category, QuizSettings } from '@/types/quiz';

interface QuizSettingsProps {
  categories: Category[];
  onStart: (settings: QuizSettings) => void;
}

export default function QuizSettings({ categories, onStart }: QuizSettingsProps) {
  const [settings, setSettings] = useState<QuizSettings>({
    category: 0,
    difficulty: 'medium',
  });

  return (
    <Card className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Quiz Settings</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium font-semibold">Category</label>
          <Select
            value={settings.category.toString()}
            onValueChange={(value) =>
              setSettings({ ...settings, category: parseInt(value) })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0" className='font-semibold'>Any Category</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()} className='font-semibold'>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium font-semibold">Difficulty</label>
          <Select
            value={settings.difficulty}
            onValueChange={(value: 'easy' | 'medium' | 'hard') =>
              setSettings({ ...settings, difficulty: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy" className='font-semibold'>Easy</SelectItem>
              <SelectItem value="medium" className='font-semibold'>Medium</SelectItem>
              <SelectItem value="hard" className='font-semibold'>Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          className="w-full mt-4 font-semibold text-white"
          onClick={() => onStart(settings)}
          size="lg"
        >
          Start Quiz
        </Button>
      </div>
    </Card>
  );
}