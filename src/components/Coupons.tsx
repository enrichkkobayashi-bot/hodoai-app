import React, { useState } from 'react';
import { COUPONS } from '../constants';

interface CouponsProps {
  onBack: () => void;
}

export const Coupons: React.FC<CouponsProps> = ({ onBack }) => {
  const [selectedCoupon, setSelectedCoupon] = useState<typeof COUPONS[0] | null>(null);

  const handleShare = async () => {
    if (!selectedCoupon) return;
    const text = `【${selectedCoupon.title}】\nいつもありがとう。この券を使ってね！ #ほどあい`;
    
    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch (e) {
        console.log("Share canceled");
      }
    } else {
      navigator.clipboard.writeText(text);
      alert("クーポンをコピーしました！LINEなどに貼り付けて送ってください。");
    }
  };

  return (
    <div className="animate-fade-in pt-6 pb-20">
      <div className="text-xl font-bold text-[#4A4A4A] mb-2 text-center">デジタルクーポン</div>
      <p className="text-xs text-gray-500 text-center mb-6">パートナーに贈る「肩たたき券」など</p>

      {selectedCoupon ? (
        <div className="px-4">
          <div className={`aspect-[16/9] ${selectedCoupon.color} rounded-3xl border-4 border-dashed border-white shadow-lg flex flex-col items-center justify-center relative overflow-hidden mb-8`}>
            <div className={`absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#FFF9F0] rounded-full`}></div>
            <div className={`absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#FFF9F0] rounded-full`}></div>
            
            <div className="text-sm font-bold opacity-50 mb-2">SPECIAL TICKET</div>
            <div className={`text-2xl font-bold ${selectedCoupon.text} mb-4 text-center px-4`}>
              {selectedCoupon.title}
            </div>
            <div className="text-xs opacity-60">有効期限：いつでもOK</div>
          </div>

          <button 
            onClick={handleShare}
            className="w-full bg-[#06C755] text-white font-bold py-4 rounded-xl shadow-lg mb-4 flex items-center justify-center gap-2 hover:brightness-105"
          >
            <span className="text-xl">💬</span> LINEで送る
          </button>
          
          <button 
            onClick={() => setSelectedCoupon(null)}
            className="w-full text-gray-500 font-bold py-3 text-sm"
          >
            選び直す
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 px-2">
          {COUPONS.map((coupon, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCoupon(coupon)}
              className={`w-full ${coupon.color} p-4 rounded-2xl shadow-sm flex items-center gap-4 transition-transform hover:scale-[1.02] active:scale-95`}
            >
              <div className="w-12 h-12 bg-white/50 rounded-full flex items-center justify-center text-xl shadow-inner">
                🎫
              </div>
              <div className={`font-bold ${coupon.text} text-lg`}>{coupon.title}</div>
            </button>
          ))}
        </div>
      )}

      <div className="mt-8 px-4">
        <button onClick={onBack} className="w-full bg-gray-800 text-white py-4 rounded-xl font-bold shadow-lg">
          ホームへ戻る
        </button>
      </div>
    </div>
  );
};