import React from 'react';

interface ResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
}

export const ResetModal: React.FC<ResetModalProps> = ({ isOpen, onClose, onReset }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-5 animate-fade-in">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl relative overflow-hidden border-2 border-red-100 p-6 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-2">本当にリセットしますか？</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          これまでの行動履歴、タンクの貯まり具合、記念日設定など、<span className="font-bold text-red-500">すべてのデータが消去されます。</span>
          <br/>この操作は元に戻せません。
        </p>

        <div className="space-y-3">
          <button 
            onClick={onReset}
            className="w-full bg-red-500 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-red-600 transition-all"
          >
            すべて消去してリセット
          </button>
          <button 
            onClick={onClose}
            className="w-full bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200 transition-all"
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
  );
};