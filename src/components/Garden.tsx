import React from 'react';
import { FLOWERS } from '../constants';

interface GardenProps {
  totalActions: number;
  onBack: () => void;
}

export const Garden: React.FC<GardenProps> = ({ totalActions, onBack }) => {
  const nextFlower = FLOWERS.find(f => f.threshold > totalActions);
  const nextThreshold = nextFlower ? nextFlower.threshold : FLOWERS[FLOWERS.length-1].threshold;
  const progress = Math.min(100, (totalActions / nextThreshold) * 100);

  return (
    <div className="animate-fade-in pt-6 pb-20">
      <div className="text-xl font-bold text-[#4A4A4A] mb-2 text-center">思い出の庭</div>
      <p className="text-xs text-gray-500 text-center mb-6">
        行動を積み重ねて、愛の花を咲かせましょう
      </p>

      <div className="bg-white p-4 rounded-2xl shadow-sm mb-6 mx-2 border border-green-100">
        <div className="flex justify-between text-sm font-bold text-gray-600 mb-2">
          <span>これまでの行動数</span>
          <span>{totalActions}回</span>
        </div>
        {nextFlower ? (
          <>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-2">
              <div className="bg-green-400 h-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="text-xs text-gray-400 text-right">
              あと {nextFlower.threshold - totalActions} 回で「{nextFlower.name}」が咲きます
            </div>
          </>
        ) : (
          <div className="text-xs text-green-600 text-center font-bold">
            すべての花が咲き誇っています！
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 px-2">
        {FLOWERS.map((flower, idx) => {
          const isUnlocked = totalActions >= flower.threshold;
          return (
            <div 
              key={idx} 
              className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-2 transition-all ${
                isUnlocked ? 'bg-white shadow-md border border-orange-100' : 'bg-gray-100 opacity-60'
              }`}
            >
              <div className={`text-4xl mb-2 ${isUnlocked ? 'scale-100' : 'scale-75 grayscale blur-[1px]'}`}>
                {flower.emoji}
              </div>
              <div className="text-[10px] font-bold text-gray-600 text-center leading-tight">
                {isUnlocked ? flower.name : '???'}
              </div>
              {isUnlocked && (
                <div className="text-[8px] text-orange-400 mt-1">
                  {flower.desc}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 px-4">
        <button onClick={onBack} className="w-full bg-gray-800 text-white py-4 rounded-xl font-bold shadow-lg">
          ホームへ戻る
        </button>
      </div>
    </div>
  );
};