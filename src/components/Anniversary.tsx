import React, { useState } from 'react';

interface AnniversaryProps {
  currentDate: string | null | undefined;
  currentTitle: string | undefined;
  onSave: (date: string, title: string) => void;
  onBack: () => void;
}

export const Anniversary: React.FC<AnniversaryProps> = ({ currentDate, currentTitle, onSave, onBack }) => {
  const [date, setDate] = useState(currentDate || '');
  const [title, setTitle] = useState(currentTitle || '記念日');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(date, title);
  };

  return (
    <div className="animate-fade-in pt-6 pb-20">
      <div className="text-xl font-bold text-[#4A4A4A] mb-6 text-center">記念日設定</div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-3xl shadow-sm mb-6">
        <div className="mb-4">
          <label className="block text-xs font-bold text-gray-500 mb-2">なんの記念日？</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-orange-400 font-bold text-gray-700"
            placeholder="結婚記念日、誕生日など"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-xs font-bold text-gray-500 mb-2">日付</label>
          <input 
            type="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-orange-400 text-gray-700"
            required
          />
        </div>

        <button type="submit" className="w-full bg-[#FF9F45] text-white font-bold py-4 rounded-xl shadow-lg hover:brightness-105">
          保存する
        </button>
      </form>

      <button onClick={onBack} className="w-full bg-gray-200 text-gray-500 font-bold py-4 rounded-xl">
        キャンセル
      </button>
    </div>
  );
};