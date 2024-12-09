import { render, act } from '@testing-library/react';
import Timer from '@/components/Timer';

jest.useFakeTimers();

describe('Timer Component', () => {
  it('calls onTimeout after duration', () => {
    const onTimeout = jest.fn();
    render(<Timer duration={30} onTimeout={onTimeout} />);

    act(() => {
      jest.advanceTimersByTime(30000);
    });

    expect(onTimeout).toHaveBeenCalled();
  });

  it('updates time left every second', () => {
    const onTimeout = jest.fn();
    const { getByText } = render(<Timer duration={30} onTimeout={onTimeout} />);

    expect(getByText('30s')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(getByText('29s')).toBeInTheDocument();
  });
});