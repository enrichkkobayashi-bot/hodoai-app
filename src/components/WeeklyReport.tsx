import React from 'react';
import { DailyLog, LoveType } from '../types';
import { TYPE_LABEL_JP } from '../constants';

interface WeeklyReportProps {
  logs: DailyLog[];
  isPremium: boolean;
  onBack: () => void;
  onRequestUpgrade: () => void;
}

export const WeeklyReport: React.FC<WeeklyReportProps> = ({ logs, isPremium, onBack, onRequestUpgrade }) => {
  const safeLogs = Array.isArray(logs) ? logs : [];
  const last14 = safeLogs.slice(-14);
  const last7 = last14.slice(-7);
  const prev7 = last14.slice(-14, -7);

  const avg = last7.length ? last7.reduce((s, d) => s + d.tank, 0) / last7.length : 0;
  const avgPrev = prev7.length ? prev7.reduce((s, d) => s + d.tank, 0) / prev7.length : null;
  const actionDays = last7.filter(d => (d.actions || 0) > 0).length;

  // Mock Data
  const loveDistribution: Record<LoveType, number> = {
    QT: 30, Service: 45, Words: 10, Touch: 5, Gift: 10, Special: 0
  };

  let diffText = "";
  if (avgPrev !== null) {
    const diff = Math.round((avg - avgPrev) * 10) / 10;
    if (diff > 0) {
      diffText = `先週より +${diff}% 上昇`;
    } else if (diff < 0) {
      diffText = `先週より -${Math.abs(diff)}% 低下`;
    } else {
      diffText = "先週と同じ水準";
    }
  } else {
    diffText = "比較データ収集中";
  }

  let advice = "";
  if (avg >= 75) {
    advice = actionDays >= 4 
      ? "素晴らしい状態です！今のペースを保ちつつ、特別なデートも計画してみましょう。" 
      : "潤いは高いですが行動は少なめ。自然体で過ごせている証拠ですね。";
  } else if (avg >= 50) {
    advice = "安定しています。週にあと1回、意識的な行動をプラスするとさらに良くなります。";
  } else {
    advice = "少し疲れが見えます。無理せず、1日1回「ありがとう」と言うだけで十分です。";
  }

  const visibleLogs = isPremium ? last7 : last7.slice(-3);
  const blurredLogsCount = last7.length - visibleLogs.length;

  return (
    <div className="animate-fade-in pt-6 pb-20">
      <div className="text-xl font-bold text-[#4A4A4A] mb-6 text-center">今週のレポート</div>
      
      {/* Summary Card */}
      <div className="bg-[#FF9F45] text-white p-6 rounded-3xl shadow-lg shadow-orange-200 mb-6 text-center relative overflow-hidden">
        {!isPremium && (
            <div className="absolute top-2 right-2 bg-white/20 px-2 py-1 rounded-lg text-[10px] font-bold">
                Free
            </div>
        )}
        <div className="text-sm opacity-90 mb-1">平均タンク残量</div>
        <div className="text-5xl font-bold mb-2">{Math.round(avg)}%</div>
        <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs backdrop-blur-sm">
          {diffText}
        </div>
      </div>

      {/* Premium Analytics Chart (Locked for Free) */}
      <div className="bg-white rounded-2xl shadow-sm mb-6 p-5 relative overflow-hidden">
        <div className="font-bold text-gray-700 mb-4">愛のバランス分析</div>
        
        <div className={`space-y-3 ${!isPremium ? 'blur-sm opacity-60' : ''}`}>
            {Object.entries(loveDistribution).map(([key, val]) => {
                if (key === 'Special') return null;
                const k = key as LoveType;
                return (
                    <div key={key} className="flex items-center gap-2">
                        <div className="w-16 text-[10px] font-bold text-gray-500">{TYPE_LABEL_JP[k].split("（")[0]}</div>
                        <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-[#FF9F45] h-full" style={{ width: `${val}%` }}></div>
                        </div>
                        <div className="w-8 text-[10px] text-right text-gray-400">{val}%</div>
                    </div>
                )
            })}
        </div>

        {!isPremium && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/40">
                <div className="text-2xl mb-1">📊</div>
                <div className="text-xs font-bold text-gray-600 mb-2">バランス分析はプレミアム限定</div>
                <button 
                    onClick={onRequestUpgrade}
                    className="bg-yellow-400 text-white text-xs font-bold px-4 py-2 rounded-full shadow-md hover:brightness-105"
                >
                    ロックを解除
                </button>
            </div>
        )}
      </div>

      {/* Log Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6 relative">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
           <span className="font-bold text-gray-700">行動ログ</span>
           <span className="text-sm text-gray-500">{actionDays}日記録</span>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-[#FFF9F0] text-gray-600">
            <tr>
              <th className="px-4 py-3 font-medium">日付</th>
              <th className="px-4 py-3 font-medium">残量</th>
              <th className="px-4 py-3 font-medium text-right">回数</th>
            </tr>
          </thead>
          <tbody>
            {[...visibleLogs].reverse().map((d, i) => (
              <tr key={i} className="border-b border-gray-50 last:border-b-0">
                <td className="px-4 py-3 text-gray-600">{d.date.slice(5).replace('-', '/')}</td>
                <td className="px-4 py-3 font-bold text-gray-800">{d.tank}%</td>
                <td className="px-4 py-3 text-gray-600 text-right">{d.actions || 0}</td>
              </tr>
            ))}
            
            {!isPremium && blurredLogsCount > 0 && (
                <tr className="relative">
                    <td colSpan={3} className="px-4 py-12 text-center relative">
                        <div className="absolute inset-0 backdrop-blur-[3px] bg-white/60 z-10 flex flex-col items-center justify-center">
                            <div className="text-2xl mb-1">🔒</div>
                            <p className="text-xs text-gray-500 font-bold mb-2">過去ログ無制限閲覧</p>
                            <button 
                                onClick={onRequestUpgrade}
                                className="bg-yellow-400 text-white text-xs font-bold px-4 py-2 rounded-full shadow-md hover:brightness-105"
                            >
                                プレミアムへ
                            </button>
                        </div>
                        <div className="opacity-30">
                            <div className="flex justify-between py-2"><span>--/--</span><span>--%</span><span>-</span></div>
                        </div>
                    </td>
                </tr>
            )}
            {last7.length === 0 && (
               <tr><td colSpan={3} className="px-4 py-8 text-center text-gray-400">データがありません</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm mb-6 border-l-4 border-[#FF9F45]">
        <h3 className="font-bold text-gray-800 mb-2">今週のアドバイス</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{advice}</p>
      </div>

      <button onClick={onBack} className="w-full bg-gray-800 text-white py-4 rounded-xl font-bold shadow-lg">
        ホームへ戻る
      </button>
    </div>
  );
};