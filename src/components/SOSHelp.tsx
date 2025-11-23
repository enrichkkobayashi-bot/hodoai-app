import React from 'react';
import { UserType } from '../types';
import { SOS_ADVICE, TYPE_LABEL_JP } from '../constants';
import { Vase } from './Vase';

interface SOSHelpProps {
  userType: UserType;
  onResolve: () => void;
  onBack: () => void;
}

export const SOSHelp: React.FC<SOSHelpProps> = ({ userType, onResolve, onBack }) => {
  const advice = SOS_ADVICE[userType.main];

  return (
    <div className="animate-fade-in pt-6 pb-20 bg-[#EFEBE9] min-h-screen fixed inset-0 z-40 overflow-y-auto px-5">
      <div className="text-center pt-10">
        <div className="text-xl font-bold text-[#5D4037] mb-2">緊急SOSモード</div>
        <p className="text-xs text-gray-500 mb-4">
          大丈夫、修復できます。
        </p>

        <Vase level={20} variant="sos" animate={true} />

        <div className="bg-white p-6 rounded-3xl shadow-lg mb-8 text-left border-l-4 border-[#8D6E63]">
          <div className="text-xs font-bold text-[#8D6E63] mb-2 uppercase tracking-wider">
            {TYPE_LABEL_JP[userType.main]}タイプのパートナーへの対処法
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            {advice}
          </p>
        </div>

        <button 
          onClick={onResolve}
          className="w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white py-4 rounded-xl font-bold shadow-lg mb-4 hover:brightness-105"
        >
          仲直りした（モード解除）
        </button>
        
        <button 
          onClick={onBack}
          className="text-gray-500 text-sm font-bold underline"
        >
          ホームへ戻る（モード継続）
        </button>
      </div>
    </div>
  );
};