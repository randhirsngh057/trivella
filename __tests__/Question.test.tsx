import { render, fireEvent, screen } from '@testing-library/react';
import Question from '@/components/Question';

const mockQuestion = {
  category: 'Science',
  type: 'multiple',
  difficulty: 'medium',
  question: 'What is the capital of France?',
  correct_answer: 'Paris',
  incorrect_answers: ['London', 'Berlin', 'Madrid'],
};

describe('Question Component', () => {
  it('renders question and answers', () => {
    const handleAnswer = jest.fn();
    render(<Question question={mockQuestion} onAnswer={handleAnswer} />);

    expect(screen.getByText(mockQuestion.question)).toBeInTheDocument();
    expect(screen.getByText(mockQuestion.correct_answer)).toBeInTheDocument();
    mockQuestion.incorrect_answers.forEach((answer) => {
      expect(screen.getByText(answer)).toBeInTheDocument();
    });
  });

  it('calls onAnswer when an answer is selected', () => {
    const handleAnswer = jest.fn();
    render(<Question question={mockQuestion} onAnswer={handleAnswer} />);

    fireEvent.click(screen.getByText('Paris'));
    expect(handleAnswer).toHaveBeenCalledWith('Paris');
  });

  it('disables all buttons after selection', () => {
    const handleAnswer = jest.fn();
    render(<Question question={mockQuestion} onAnswer={handleAnswer} />);

    fireEvent.click(screen.getByText('Paris'));
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });
});