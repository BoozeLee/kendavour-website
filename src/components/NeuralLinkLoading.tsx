'use client';

import { useState, useEffect } from 'react';

const NeuralLinkLoading = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('Initializing Jazz Mafia Protocol...');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const messages = [
      'Establishing Neural Link...',
      'Synchronizing with Base Øf Raves...',
      'Loading Hypnotic Frequencies...',
      'Decrypting Syndicate Data...',
      'Connection Established.',
    ];

    let currentMessage = 0;
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 20;
        if (newProgress >= 100) {
          setIsComplete(true);
          return 100;
        }
        return newProgress;
      });

      if (progress > (currentMessage + 1) * 20) {
        setText(messages[currentMessage]);
        currentMessage++;
      }
    }, 500);

    return () => clearInterval(interval);
  }, [progress]);

  useEffect(() => {
    if (isComplete) {
      onComplete();
    }
  }, [isComplete, onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center text-acid-green font-mono">
      <div className="text-4xl mb-8">KENDAVØUR</div>
      <div className="w-64 h-2 bg-gray-800 mb-4">
        <div
          className="h-full bg-acid-green transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-lg">{text}</div>
      <div className="mt-4 text-sm opacity-70">// SYSTEM STATUS: LOADING</div>
    </div>
  );
};

export default NeuralLinkLoading;