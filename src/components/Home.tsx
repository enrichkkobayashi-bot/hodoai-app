import React from 'react';
import { AppState, Action, ThemeColor } from '../types';
import { Vase } from './Vase';
import { getTankMessage, getThemeColors, today } from '../utils';
import { TYPE_LABEL_JP, THEMES } from '../constants';

interface HomeProps {
  state: AppState;
  onActionComplete: (action: Action) => void;
  onActionReplace: (actionId: string) => void;
  onShowWeekly: () => void;
  onShowDatePlan: () => void;
  onShowCoupons: () => void;
  onShowGarden: () => void;
  onShowSOS: () => void;
  onShowAnniversary: () => void;
  onRestart: () => void;
  onInstall?: () => void;
  onCreateCustomAction: () => void;
  onChangeTheme: (theme: ThemeColor) => void;
  onRequestUpgrade: () => void;
  animateVase: boolean;
  canInstall: boolean;
}

export const Home: React.FC<HomeProps> = ({ 
  state, 
  onActionComplete, 
  onActionReplace, 
  onShowWeekly, 
  onShowDatePlan,
  onShowCoupons,
  onShowGarden,
  onShowSOS,
  onShowAnniversary,
  onRestart, 
  onInstall,
  onCreateCustomAction,
  onChangeTheme,
  onRequestUpgrade,
  animateVase,
  canInstall 
}) => {
  const actions = state.currentActions || [];
  const { userType, tank, todaysCount, isPremium, isSOSMode, anniversaryDate, anniversaryTitle, theme } = state;
  const themeColors = getThemeColors(theme);

  if (!userType) return null;

  const canDoAction = todaysCount < 2;

  let anniversaryDays = null;
  if (anniversaryDate) {
    const t = new Date(today());
    let target = new Date(anniversaryDate);
    target.setFullYear(t.getFullYear());
    if (target < t) {
      target.setFullYear(t.getFullYear() + 1);
    }
    const diffTime = Math.abs(target.getTime() - t.getTime());
    anniversaryDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  const handleAffiliateClick = (e: React.MouseEvent, keywords: string) => {
      e.stopPropagation();
      const url = `https://www.amazon.co.jp/s?k=${encodeURIComponent(keywords)}`;
      window.open(url, '_blank');
  };

  return (
    <div className={`animate-fade-in pb-10 ${isSOSMode ? 'grayscale-[0.2]' : ''}`}>
      
      {/* Anniversary Banner */}
      {anniversaryDays !== null ? (
        <div 
            className="text-white text-center py-2 px-4 rounded-b-2xl shadow-md text-sm font-bold flex justify-between items-center" 
            style={{ background: isSOSMode ? '#9E9E9E' : `linear-gradient(to right, ${themeColors.main}, ${themeColors.sub})` }}
            onClick={onShowAnniversary}
        >
          <span>{anniversaryTitle}まで</span>
          <span className="text-lg">あと {anniversaryDays} 日</span>
        </div>
      ) : (
        <div className="text-center pt-2">
          <button onClick={onShowAnniversary} className="text-[10px] text-gray-400 underline">記念日を設定する</button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mt-4 mb-1">
        <div className="text-xl font-bold text-[#4A4A4A]">パートナー</div>
        <div className="flex items-center gap-2">
            {isPremium && (
                <div className="bg-yellow-100 px-2 py-1 rounded-full text-[10px] font-bold text-yellow-700 shadow-sm border border-yellow-200 flex items-center gap-1">
                    <span>👑</span> Premium
                </div>
            )}
            <div className="bg-white px-3 py-1 rounded-full text-xs font-bold shadow-sm border flex items-center gap-1" style={{ color: themeColors.main, borderColor: themeColors.sub }}>
               {TYPE_LABEL_JP[userType.main].split("（")[0]}
            </div>
        </div>
      </div>

      <Vase level={tank} animate={animateVase} variant={isSOSMode ? 'sos' : 'normal'} theme={theme} />

      {/* Message Bubble */}
      <div 
        className={`bg-white rounded-xl p-4 shadow-sm mb-5 border`}
        style={{ borderColor: isSOSMode ? '#9E9E9E' : themeColors.sub }}
      >
        <p className={`text-sm font-medium leading-relaxed ${isSOSMode ? 'text-gray-600' : 'text-[#5D4037]'}`}>
          {isSOSMode ? "現在SOSモード中です。無理せず、まずは落ち着きましょう。" : getTankMessage(tank)}
        </p>
      </div>

      {/* SOS Button */}
      {!isSOSMode && (
        <div className="flex justify-end mb-4">
          <button onClick={onShowSOS} className="bg-gray-200 hover:bg-gray-300 text-gray-500 text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors">
            <span>🆘</span> 喧嘩した・雰囲気悪い
          </button>
        </div>
      )}

      {/* Menu Grid */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {[
            { icon: "🎫", label: "クーポン", action: onShowCoupons },
            { icon: "🌷", label: "お庭", action: onShowGarden },
            { icon: "📍", label: "デート", action: onShowDatePlan },
            { icon: "📊", label: "レポート", action: onShowWeekly }
        ].map((item, i) => (
            <button key={i} onClick={item.action} className="flex flex-col items-center justify-center bg-white p-2 rounded-xl shadow-sm border border-transparent hover:border-gray-200 transition-all">
                <span className="text-2xl mb-1">{item.icon}</span>
                <span className="text-[10px] font-bold text-gray-600">{item.label}</span>
            </button>
        ))}
      </div>

      {/* Theme Selector */}
      <div className="mb-6 overflow-x-auto whitespace-nowrap py-2">
        <div className="flex gap-3">
            {Object.entries(THEMES).map(([key, val]) => {
                const isSelected = theme === key;
                const tKey = key as ThemeColor;
                return (
                    <button 
                        key={key}
                        onClick={() => isPremium ? onChangeTheme(tKey) : onRequestUpgrade()}
                        className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border-2 transition-all ${isSelected ? 'bg-white shadow-md scale-105' : 'bg-gray-50 opacity-70'}`}
                        style={{ borderColor: val.main }}
                    >
                        <div className="w-4 h-4 rounded-full" style={{ background: val.main }}></div>
                        <span className={`text-xs font-bold ${isSelected ? 'text-gray-800' : 'text-gray-400'}`}>
                            {val.name} {!isPremium && !isSelected && "🔒"}
                        </span>
                    </button>
                )
            })}
        </div>
      </div>

      {/* Actions Section */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-[#4A4A4A]">おすすめの行動</h2>
        <span className="text-xs text-gray-500">今日: {todaysCount}/2回</span>
      </div>

      <div className="space-y-3">
        {actions.length === 0 && (
             <div className="text-center py-8 text-gray-500 text-sm bg-white rounded-2xl border border-dashed border-gray-300">
                 現在表示できる行動がありません。
             </div>
        )}
        {actions.map((a, idx) => {
            const isMain = a.love === userType.main;
            return (
                <div 
                  key={a.id + idx} 
                  className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-3 transition-all border border-transparent hover:border-gray-100 group"
                >
                    <div className="flex items-start justify-between">
                        <div className="flex-1 pr-3">
                            <div className="flex items-center gap-2 mb-1.5">
                                <div className="font-bold text-gray-800 text-base leading-tight">{a.title}</div>
                                {isMain && (
                                <span className="shrink-0 text-[10px] font-bold text-white px-1.5 py-0.5 rounded" style={{ background: themeColors.main }}>
                                    Main
                                </span>
                                )}
                                {canDoAction && (
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); onActionReplace(a.id); }}
                                        className="ml-1 p-1 rounded-full text-gray-300 hover:bg-gray-100 transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                            <div className="text-sm text-gray-600 leading-relaxed">
                                {a.detail}
                            </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2 shrink-0 ml-1">
                            <div className="font-bold text-xl" style={{ color: themeColors.main }}>
                                +{a.baseRecovery}%
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-1">
                        {a.keywords && (
                            <button
                                onClick={(e) => handleAffiliateClick(e, a.keywords!)}
                                className="flex items-center gap-1 bg-gray-100 text-gray-600 text-xs font-bold px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                                Amazon
                            </button>
                        )}

                        {canDoAction ? (
                            <button 
                                onClick={() => onActionComplete(a)}
                                className="text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm whitespace-nowrap hover:brightness-105"
                                style={{ background: themeColors.main }}
                            >
                                実行した
                            </button>
                        ) : (
                            <span className="text-gray-300 text-xs font-bold px-2 py-1 whitespace-nowrap flex items-center">
                                完了
                            </span>
                        )}
                    </div>
                </div>
            );
        })}
      </div>

      <button 
        onClick={onCreateCustomAction}
        className="w-full mt-4 border-2 border-dashed border-gray-300 text-gray-400 font-bold py-3 rounded-xl hover:bg-gray-50 hover:text-gray-500 hover:border-gray-400 transition-all flex items-center justify-center gap-2 text-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        {isPremium ? '自分だけのアクションを追加' : '自分だけのアクションを追加（Premium）'}
      </button>

      <div className="mt-8 space-y-4">
        {canInstall && onInstall && (
           <button 
             onClick={onInstall} 
             className="w-full bg-[#4A4A4A] text-white py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
           >
             アプリをインストール
           </button>
        )}

        <button 
            onClick={onRestart} 
            className="w-full bg-gray-200 text-gray-500 py-3 rounded-xl font-bold text-sm shadow-sm hover:bg-gray-300 transition-colors"
        >
            設定リセット
        </button>
      </div>
    </div>
  );
};