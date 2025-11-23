import React from 'react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose, onUpgrade }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-5 animate-fade-in">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl relative overflow-hidden border border-yellow-400">
        <div className="h-32 bg-gradient-to-br from-yellow-400 to-orange-300 flex items-center justify-center relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="text-5xl drop-shadow-md">👑</div>
        </div>

        <div className="p-6 text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Premium Plan</h2>
          <p className="text-xs text-gray-500 mb-6">
            ふたりの関係を「一生モノ」にするための<br/>特別な機能を開放します。
          </p>

          <div className="space-y-4 mb-8 text-left">
            <div className="flex items-start gap-3">
              <div className="bg-yellow-100 p-2 rounded-full text-yellow-600 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-gray-800 text-sm">愛のバランス分析</div>
                <div className="text-[10px] text-gray-500">5つの愛情表現の偏りをグラフで可視化。「最近、言葉が足りてないかも？」といった気づきを得られます。</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-pink-100 p-2 rounded-full text-pink-500 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M4.5 9.75a6 6 0 0111.573-2.226 3.75 3.75 0 014.133 4.303A4.5 4.5 0 0118 20.25H6.75a5.25 5.25 0 01-2.25-10.5z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-gray-800 text-sm">アプリカラー変更</div>
                <div className="text-[10px] text-gray-500">オレンジだけでなく、ピンク、ブルー、グリーンなど、パートナーやあなたの好きな色にアプリを着せ替えられます。</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-full text-blue-500 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                  <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-gray-800 text-sm">過去ログ無制限</div>
                <div className="text-[10px] text-gray-500">積み重ねた愛の記録をずっと振り返ることができます。</div>
              </div>
            </div>
          </div>

          <button 
            onClick={onUpgrade}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold py-4 rounded-xl shadow-lg hover:brightness-105 transition-all mb-3"
          >
            ¥300 で機能を解放
          </button>
          <button 
            onClick={onClose}
            className="text-xs text-gray-400 font-medium hover:text-gray-600"
          >
            今はまだいいです
          </button>
        </div>
      </div>
    </div>
  );
};