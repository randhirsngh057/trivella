'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface UserProfileProps {
  onSubmit: (username: string) => void;
}

export default function UserProfile({ onSubmit }: UserProfileProps) {
  const [username, setUsername] = useState('');
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username);
    }
  };

  return (
    <Card className="p-6 w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={avatarUrl} alt="User avatar" />
            <AvatarFallback>
              {username.slice(0, 2).toUpperCase() || '?'}
            </AvatarFallback>
          </Avatar>
          <Input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="max-w-xs"
            required
          />
        </div>
        <Button type="submit" className="w-full font-semibold text-white">
          Start Quiz
        </Button>
      </form>
    </Card>
  );
}