import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  targetTime: Date;
  onEnd?: () => void;
  size?: 'sm' | 'lg';
}

export default function CountdownTimer({
  targetTime,
  onEnd,
  size = 'sm',
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(calcTimeLeft());

  function calcTimeLeft() {
    const diff = targetTime.getTime() - Date.now();
    if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 };
    return {
      hours: Math.floor(diff / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const tl = calcTimeLeft();
      setTimeLeft(tl);
      if (tl.hours === 0 && tl.minutes === 0 && tl.seconds === 0) {
        clearInterval(timer);
        onEnd?.();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetTime, onEnd]);

  const pad = (n: number) => String(n).padStart(2, '0');
  const sizeClass = size === 'lg' ? 'text-xl' : 'text-xs';
  const boxSizeClass = size === 'lg' ? 'w-9 h-9' : 'w-6 h-6 text-[10px]';

  return (
    <div className="flex items-center gap-1">
      {size === 'lg' && (
        <span className={`${sizeClass} font-bold text-primary mr-1`}>距结束</span>
      )}
      <div className={`${boxSizeClass} bg-primary text-white rounded flex items-center justify-center font-bold ${sizeClass} transition-transform`}>
        {pad(timeLeft.hours)}
      </div>
      <span className={`${sizeClass} text-primary font-bold`}>:</span>
      <div className={`${boxSizeClass} bg-primary text-white rounded flex items-center justify-center font-bold ${sizeClass}`}>
        {pad(timeLeft.minutes)}
      </div>
      <span className={`${sizeClass} text-primary font-bold`}>:</span>
      <div className={`${boxSizeClass} bg-primary text-white rounded flex items-center justify-center font-bold ${sizeClass} animate-pulse`}>
        {pad(timeLeft.seconds)}
      </div>
    </div>
  );
}
