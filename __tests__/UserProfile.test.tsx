import { render, fireEvent, screen } from '@testing-library/react';
import UserProfile from '@/components/UserProfile';

describe('UserProfile', () => {
  it('renders username input and submit button', () => {
    const handleSubmit = jest.fn();
    render(<UserProfile onSubmit={handleSubmit} />);
    
    expect(screen.getByPlaceholderText('Enter your username')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Start Quiz');
  });

  it('calls onSubmit with username when form is submitted', () => {
    const handleSubmit = jest.fn();
    render(<UserProfile onSubmit={handleSubmit} />);
    
    const input = screen.getByPlaceholderText('Enter your username');
    fireEvent.change(input, { target: { value: 'TestUser' } });
    fireEvent.submit(screen.getByRole('form'));
    
    expect(handleSubmit).toHaveBeenCalledWith('TestUser');
  });

  it('does not submit empty username', () => {
    const handleSubmit = jest.fn();
    render(<UserProfile onSubmit={handleSubmit} />);
    
    fireEvent.submit(screen.getByRole('form'));
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});