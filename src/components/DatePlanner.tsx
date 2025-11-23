import React from 'react';
import { UserType, LoveType } from '../types';
import { TYPE_LABEL_JP } from '../constants';

interface DatePlannerProps {
  userType: UserType;
  onBack: () => void;
}

const DATE_PLANS: Record<LoveType, { title: string; description: string; spots: string[] }> = {
  QT: {
    title: "二人きりの会話を楽しむカフェデート",
    description: "「一緒の時間」を大切にするパートナーには、騒がしい場所よりも、落ち着いて話せる場所がベストです。スマホを置いて、お互いの顔を見て話す時間を30分作るだけで満足度が上がります。",
    spots: ["静かなカフェ", "景色の良い公園", "個室のあるレストラン"]
  },
  Service: {
    title: "日頃の疲れを癒やすリラックスデート",
    description: "「行動」で愛情を感じるパートナーは、普段何かと忙しくしているかも。あなたが段取りを全て引き受け、相手が何もしなくていい（エスコートされる）時間を作ると大変喜ばれます。",
    spots: ["マッサージ・スパ", "予約必須の人気ランチ", "映画館（プレミアムシート）"]
  },
  Words: {
    title: "想いを伝えるロマンチックディナー",
    description: "「言葉」を大切にするパートナーには、雰囲気が良く、自然と感謝や愛情を伝えられる場所がおすすめ。最後に手紙やカードを渡すと、最高の思い出になります。",
    spots: ["夜景の見えるレストラン", "雰囲気の良いバー", "静かな海辺"]
  },
  Touch: {
    title: "距離が縮まるアクティブ＆コージーデート",
    description: "「スキンシップ」が鍵のパートナーには、手をつないで歩ける場所や、隣同士で座れるお店がおすすめ。カウンター席や、狭めの個室などが安心感を生みます。",
    spots: ["水族館", "カップルシートのあるお店", "カウンター席のビストロ"]
  },
  Gift: {
    title: "宝物探しショッピングデート",
    description: "「贈り物」が好きなパートナーとは、ウィンドウショッピング自体がイベントになります。「これ似合いそう」とお互いに選び合ったり、帰りに小さなスイーツを買うのがおすすめ。",
    spots: ["雑貨屋めぐり", "デパ地下スイーツ", "アウトレットモール"]
  },
  Special: {
    title: "いつもと違う特別デート",
    description: "普段行かない場所へ。",
    spots: ["カフェ", "レストラン"]
  }
};

export const DatePlanner: React.FC<DatePlannerProps> = ({ userType, onBack }) => {
  const mainPlan = DATE_PLANS[userType.main];

  const searchNearby = (keyword: string) => {
    const url = `https://www.google.com/maps/search/${encodeURIComponent(keyword)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="animate-fade-in pt-6 pb-20">
      <div className="text-xl font-bold text-[#4A4A4A] mb-6 text-center">今月のデート提案</div>

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-8 border border-[#FFE0B2]">
        <div className="bg-[#FF9F45] px-6 py-4">
          <div className="text-white/90 text-xs font-bold mb-1">
            {TYPE_LABEL_JP[userType.main]}タイプのパートナーへ
          </div>
          <div className="text-white text-xl font-bold">
            {mainPlan.title}
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            {mainPlan.description}
          </p>

          <div className="space-y-3">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">おすすめスポット (タップして検索)</div>
            {mainPlan.spots.map((spot, idx) => (
              <button
                key={idx}
                onClick={() => searchNearby(spot)}
                className="w-full flex items-center justify-between bg-[#FFF9F0] hover:bg-[#FFE0B2] text-[#5D4037] px-4 py-3 rounded-xl transition-colors group"
              >
                <span className="font-bold text-sm">{spot}</span>
                <div className="bg-white p-1.5 rounded-full text-[#FF9F45] group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <h3 className="text-lg font-bold text-[#4A4A4A] mb-4 px-2">近くのお店を探す</h3>
      <div className="grid grid-cols-2 gap-3 mb-8">
        <button 
          onClick={() => searchNearby("雰囲気の良いカフェ")}
          className="bg-white p-4 rounded-2xl shadow-sm text-left hover:shadow-md transition-all border border-transparent hover:border-orange-200"
        >
          <div className="text-2xl mb-2">☕️</div>
          <div className="font-bold text-gray-700 text-sm">近くのカフェ</div>
          <div className="text-[10px] text-gray-400">休憩・おしゃべりに</div>
        </button>

        <button 
          onClick={() => searchNearby("美味しい レストラン ディナー")}
          className="bg-white p-4 rounded-2xl shadow-sm text-left hover:shadow-md transition-all border border-transparent hover:border-orange-200"
        >
          <div className="text-2xl mb-2">🍽️</div>
          <div className="font-bold text-gray-700 text-sm">ディナーのお店</div>
          <div className="text-[10px] text-gray-400">記念日やデートに</div>
        </button>

        <button 
          onClick={() => searchNearby("おしゃれ 雑貨屋 ギフト")}
          className="bg-white p-4 rounded-2xl shadow-sm text-left hover:shadow-md transition-all border border-transparent hover:border-orange-200"
        >
          <div className="text-2xl mb-2">🎁</div>
          <div className="font-bold text-gray-700 text-sm">雑貨・ギフト</div>
          <div className="text-[10px] text-gray-400">プレゼント探し</div>
        </button>

        <button 
          onClick={() => searchNearby("ケーキ屋 スイーツ")}
          className="bg-white p-4 rounded-2xl shadow-sm text-left hover:shadow-md transition-all border border-transparent hover:border-orange-200"
        >
          <div className="text-2xl mb-2">🍰</div>
          <div className="font-bold text-gray-700 text-sm">スイーツ</div>
          <div className="text-[10px] text-gray-400">手土産・お祝いに</div>
        </button>
      </div>

      <button onClick={onBack} className="w-full bg-gray-800 text-white py-4 rounded-xl font-bold shadow-lg">
        ホームへ戻る
      </button>
    </div>
  );
};