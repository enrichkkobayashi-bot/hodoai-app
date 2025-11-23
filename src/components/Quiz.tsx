import React, { useState } from 'react';
import { QUESTIONS } from '../constants';
import { Score } from '../types';
import { Vase } from './Vase';

interface QuizProps {
  onComplete: (finalScore: Score) => void;
}

export const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [step, setStep] = useState(-1);
  const [score, setScore] = useState<Score>({ QT: 0, Service: 0, Words: 0, Touch: 0, Gift: 0 });

  const handleAnswer = (optionIndex: number) => {
    const q = QUESTIONS[step];
    const selectedOption = q.options[optionIndex];
    
    const newScore = { ...score };
    Object.entries(selectedOption.score).forEach(([key, val]) => {
      const k = key as keyof Score;
      if (typeof val === 'number') {
        newScore[k] += val;
      }
    });
    setScore(newScore);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(newScore);
    }
  };

  if (step === -1) {
    return (
      <div className="text-center animate-fade-in flex flex-col min-h-screen justify-center pb-10">
        <div className="text-3xl font-bold text-[#FF9F45] mb-4">ほどあい</div>
        <p className="text-sm text-gray-600 mb-2">
          パートナーの“愛情タンク”を満たす<br/>
          日常のケアアプリ
        </p>

        <Vase level={60} />

        <div className="bg-white p-6 rounded-2xl shadow-sm mx-2 mb-6 border border-[#FFE0B2]">
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            パートナーが「されるとうれしそうなこと」についての質問に答えるだけで、ぴったりの行動が見つかります。
          </p>
          <button 
            onClick={() => setStep(0)}
            className="w-full bg-[#FF9F45] text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-200 hover:brightness-105 transition-all text-lg"
          >
            診断をはじめる
          </button>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[step];
  const progress = ((step + 1) / QUESTIONS.length) * 100;

  return (
    <div className="animate-fade-in pt-6">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-2 rounded-full mb-6 overflow-hidden">
        <div className="bg-[#FF9F45] h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="text-xs font-bold text-[#FF9F45] mb-2">Q.{step + 1}</div>
      
      <div className="text-xl font-bold text-gray-800 mb-8 leading-relaxed">
        {q.q}
      </div>

      <div className="space-y-4">
        {q.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(idx)}
            className="w-full text-left p-5 bg-white border-2 border-transparent rounded-2xl shadow-sm hover:border-[#FF9F45] hover:shadow-md transition-all text-gray-700 font-medium active:scale-[0.99]"
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
};