import { Question, Action, LoveType, ThemeColor } from './types';

export const TYPE_LABEL_JP: Record<string, string> = {
  QT: "一緒の時間（クオリティタイム）",
  Service: "気遣いの行動（サービスタイプ）",
  Words: "言葉でのねぎらい（ほめ言葉）",
  Touch: "さりげない距離感（スキンシップ）",
  Gift: "ちょっとした贈りもの（ギフト）"
};

export const TYPE_INFO_JP: Record<string, { label: string; feature: string; actionTips: string }> = {
  QT: {
    label: TYPE_LABEL_JP.QT,
    feature: "一緒に過ごす時間そのものが、パートナーにとっての安心や愛情につながりやすいタイプです。会話の内容よりも「そばにいてくれる」「自分の話を聞いてくれる」ことが大きな安心になります。",
    actionTips: "意識したいのは、『少しの時間でも、落ち着いて向き合う時間をとること』です。長い外出よりも、家で10〜15分ゆっくり話したり、お茶を飲む習慣があるとタンクが満ちやすくなります。"
  },
  Service: {
    label: TYPE_LABEL_JP.Service,
    feature: "言葉よりも、実際の行動や手助けで愛情を感じやすいタイプです。家事や用事が軽くなると、心も軽くなる傾向があります。",
    actionTips: "意識したいのは、『気づいたときに一つだけ手を貸す』ことです。全部をやろうとせず、ゴミ出し、皿洗い、送り迎えなど、負担を少し減らす行動がタンクを大きく満たします。"
  },
  Words: {
    label: TYPE_LABEL_JP.Words,
    feature: "感謝やねぎらいの言葉によって、愛情や安心を受け取りやすいタイプです。心の中で思っているだけでは伝わりにくく、『言ってもらえたかどうか』が大事になります。",
    actionTips: "意識したいのは、『具体的に一言そえる』ことです。「ありがとう」だけでなく、「◯◯してくれて助かったよ」「あなたがいてくれて心強いよ」と、理由をそえて伝えるとタンクが満ちやすくなります。"
  },
  Touch: {
    label: TYPE_LABEL_JP.Touch,
    feature: "さりげないスキンシップや距離感で、安心やつながりを感じやすいタイプです。言葉が少なくても、そばにいてくれる・軽く触れてくれることで気持ちが落ち着きやすくなります。",
    actionTips: "意識したいのは、『無理のない範囲で、自然な触れ方を増やす』ことです。肩や背中に軽く触れる、隣に座る、寝る前に少し近くで話すなど、小さな動きがタンクを温かく満たします。"
  },
  Gift: {
    label: TYPE_LABEL_JP.Gift,
    feature: "物そのものというより、『自分のことを思い出して選んでくれた』という気持ちに愛情を感じやすいタイプです。大きなプレゼントでなくても、日常の小さな差し入れで十分です。",
    actionTips: "意識したいのは、『パートナーの好みを覚えておく』ことです。好きなお菓子や飲み物、ちょっと良い日用品などを、ときどきさりげなく渡すことでタンクがじわっと満ちていきます。"
  }
};

export const TYPE_PRIORITY: LoveType[] = ["QT", "Service", "Words", "Touch", "Gift"];

export const THEMES: Record<ThemeColor, { name: string; main: string; sub: string; bg: string; text: string }> = {
  orange: { name: 'オレンジ', main: '#FF9F45', sub: '#FFE0B2', bg: 'bg-[#FFF9F0]', text: '#5D4037' },
  pink: { name: 'ピンク', main: '#F48FB1', sub: '#F8BBD0', bg: 'bg-[#FCE4EC]', text: '#880E4F' },
  blue: { name: 'ブルー', main: '#64B5F6', sub: '#BBDEFB', bg: 'bg-[#E3F2FD]', text: '#0D47A1' },
  green: { name: 'グリーン', main: '#81C784', sub: '#C8E6C9', bg: 'bg-[#E8F5E9]', text: '#1B5E20' },
};

export const QUESTIONS: Question[] = [
  {
    q: "パートナーが家でのんびりしているとき、どんな時間があると一番ほっとしていそうですか？",
    options: [
      { text: "世間話でもいいので、あなたとゆっくり話している時間", score: { QT: 2, Words: 1 } },
      { text: "気づいたら家事がひとつ終わっていて、負担が軽くなっているとき", score: { Service: 2 } },
      { text: "「おつかれさま」など、ひとこと声をかけてもらえたとき", score: { Words: 2 } }
    ]
  },
  {
    q: "最近の様子を見ていて、「今のはパートナーにとってありがたかっただろうな」と感じたのはどんな場面ですか？",
    options: [
      { text: "忙しそうなときに、あなたが家事や用事をさっと手伝った場面", score: { Service: 2, QT: 1 } },
      { text: "パートナーの話を、途中でさえぎらずに最後まで聞いた場面", score: { QT: 2 } },
      { text: "ふとしたときに、気遣いやねぎらいの一言をかけた場面", score: { Words: 2 } }
    ]
  },
  {
    q: "パートナーが一日よく働いて帰ってきたとき、どんなことをすると一番喜びそうだと思いますか？",
    options: [
      { text: "まず「おつかれさま」とねぎらいの言葉をかける", score: { Words: 2 } },
      { text: "家のことを少し整えておいて、すぐにくつろげるようにしておく", score: { Service: 2 } },
      { text: "特別な会話でなくても、そばで静かに一緒に過ごす", score: { QT: 1, Touch: 1 } }
    ]
  },
  {
    q: "週末、あなたができることの中で、パートナーが一番うれしそうなのはどれだと思いますか？",
    options: [
      { text: "一緒にお茶を飲んだり、ゆっくり話す時間をとる", score: { QT: 2 } },
      { text: "家事や用事を少し多めに引き受けて、負担を軽くする", score: { Service: 2 } },
      { text: "好きそうな飲み物やお菓子をさりげなく用意しておく", score: { Gift: 2 } }
    ]
  },
  {
    q: "日々の中で、パートナーが「助かったなあ」と感じていそうなのはどんなときだと思いますか？",
    options: [
      { text: "手が回らない家事や用事を、あなたが代わりに引き受けたとき", score: { Service: 2 } },
      { text: "パートナーのがんばりに気づいて、それを言葉で伝えたとき", score: { Words: 2 } },
      { text: "気持ちが沈みがちなときに、そばで話を聞いてあげたとき", score: { QT: 2 } }
    ]
  },
  {
    q: "もしパートナーにとって“続けてほしいな”と思っていることがあるとしたら、どれが一番近いですか？",
    options: [
      { text: "ときどきでいいので、ゆっくり話せる時間を一緒に持つこと", score: { QT: 2 } },
      { text: "気づいたときに、家事や用事を少し手伝ってあげること", score: { Service: 2 } },
      { text: "心に思っている感謝やねぎらいを、ときどき言葉で伝えること", score: { Words: 2 } }
    ]
  },
  {
    q: "あなたを見ていて、パートナーに対して“つい自然にやっている気遣い”として一番近いのはどれですか？",
    options: [
      { text: "「ありがとう」など、言葉でねぎらうことが多い", score: { Words: 2 } },
      { text: "何も言わずに、家事や用事を引き受けてしまうことが多い", score: { Service: 2 } },
      { text: "一緒に過ごす時間を作ろうと、意識していることが多い", score: { QT: 2 } }
    ]
  },
  {
    q: "ご夫婦の関係が「今はうまくいっているな」と感じるのは、パートナーの様子がどんなときですか？",
    options: [
      { text: "会話がほどよくあって、パートナーが話しやすそうにしているとき", score: { QT: 2, Words: 1 } },
      { text: "家事や負担を自然に分け合えていて、パートナーが少し楽そうなとき", score: { Service: 2 } },
      { text: "スキンシップや距離感が自然で、表情がやわらいでいるとき", score: { Touch: 2 } }
    ]
  },
  {
    q: "パートナーの様子が少し不安定なとき、何をすると一番落ち着きそうだと感じますか？",
    options: [
      { text: "隣に座って、ゆっくり話を聞く時間をとる", score: { QT: 2 } },
      { text: "負担になっている家事や用事を、少しだけ代わりにやってあげる", score: { Service: 2 } },
      { text: "「大丈夫だよ」など、安心する一言をそっとかける", score: { Words: 2 } }
    ]
  },
  {
    q: "これまでを振り返って、パートナーの表情を思い出したとき、「あのときは特にうれしそうだったな」と感じるのはどんな場面ですか？",
    options: [
      { text: "一緒に過ごした時間や、どこかに出かけた思い出の場面", score: { QT: 3 } },
      { text: "あなたが何かを手伝ったり、行動で支えた場面", score: { Service: 3 } },
      { text: "「ありがとう」「助かったよ」などの言葉をかけた場面", score: { Words: 3 } },
      { text: "自然なスキンシップや、そばに静かにいてあげた場面", score: { Touch: 3 } },
      { text: "さりげなく渡した贈りものや差し入れに喜んでいた場面", score: { Gift: 3 } }
    ]
  },
  {
    q: "パートナーが家事や仕事でとても疲れていそうな日に、いちばん喜びそうなのはどれだと思いますか？",
    options: [
      { text: "ゆっくり話を聞きながら、一緒にお茶を飲む時間をとる", score: { QT: 2 } },
      { text: "その日はなるべく家事を引き受けて、早めに休めるようにする", score: { Service: 2 } },
      { text: "「いつも本当にありがとうね」と一言、気持ちを伝える", score: { Words: 2 } }
    ]
  },
  {
    q: "特に理由がなくても、パートナーがふっと表情をゆるめそうなのはどんなことですか？",
    options: [
      { text: "パートナーの好きな飲み物やお菓子を、何気なく差し出す", score: { Gift: 2 } },
      { text: "テレビを消して、少しだけ二人で静かに過ごす", score: { QT: 2 } },
      { text: "「あなたのおかげで助かってるよ」と素直に言う", score: { Words: 2 } }
    ]
  },
  {
    q: "外出するとき、パートナーが一番うれしそうに見えるのはどんなパターンですか？",
    options: [
      { text: "特別な場所でなくても、二人でゆっくり歩いたりお茶をする", score: { QT: 2 } },
      { text: "用事や段取りをあなたが少し多めに引き受けて、相手を楽にしてあげる", score: { Service: 2 } },
      { text: "パートナーが好きそうなお店や景色を事前に調べて連れていく", score: { Gift: 2 } }
    ]
  },
  {
    q: "パートナーがさみしそうにしているとき、いちばん心に届きそうなのはどれですか？",
    options: [
      { text: "隣に座って、ゆっくり話を聞く時間をとる", score: { QT: 2 } },
      { text: "そっと肩や背中に触れて、「ここにいるよ」と伝える", score: { Touch: 2 } },
      { text: "「さみしい思いをさせてごめんね」と、気持ちを言葉で伝える", score: { Words: 2 } }
    ]
  },
  {
    q: "これから先のことを考えたとき、パートナーが一番うれしく感じそうなあなたの姿に近いのはどれですか？",
    options: [
      { text: "これからも、できるだけ一緒に過ごす時間を大事にしているあなた", score: { QT: 3 } },
      { text: "無理のない範囲で、家事や用事を自然に分け合っているあなた", score: { Service: 3 } },
      { text: "感謝やねぎらいを、これからも言葉にして伝えているあなた", score: { Words: 3 } },
      { text: "年齢を重ねても、さりげない距離感やスキンシップを大事にしているあなた", score: { Touch: 3 } },
      { text: "ときどき小さな贈りものやサプライズで笑顔にしているあなた", score: { Gift: 3 } }
    ]
  }
];

export const ACTIONS: Action[] = [
  // QT
  { id: "qt_5min_talk", love: "QT", level: "small", title: "5分だけ、向き合って話す", detail: "テレビやスマホをいったん置いて、今日あったことをお互い1つずつ話してみましょう。", baseRecovery: 4 },
  { id: "qt_tea_time", love: "QT", level: "small", title: "一緒にお茶を飲む時間をつくる", detail: "寝る前や食後など、5〜10分だけ一緒にお茶を飲みながら過ごしてみましょう。", baseRecovery: 4 },
  { id: "qt_walk", love: "QT", level: "medium", title: "少しだけ一緒に歩いてみる", detail: "近所や家のまわりを20分ほど一緒に歩き、空や季節のことなど、気楽な話をしてみてください。", baseRecovery: 7 },
  { id: "qt_meal", love: "QT", level: "medium", title: "できるだけ同じ時間に食事をとる", detail: "忙しくても、今日はできるだけ同じ時間に食事をとってみましょう。一緒に食べることが大事です。", baseRecovery: 7 },
  // Service
  { id: "sv_one_housework", love: "Service", level: "small", title: "家事をひとつだけ代わる", detail: "食器洗い、ゴミ出し、洗濯物を取り込むなど、相手がいつもしている家事をひとつ代わりましょう。", baseRecovery: 4 },
  { id: "sv_prepare_bath", love: "Service", level: "small", title: "お風呂や寝る準備を先に整える", detail: "相手が帰ってくる前や寝る前に、お風呂や布団などをさっと整えておくと、ほっとできる時間になります。", baseRecovery: 4 },
  { id: "sv_errand", love: "Service", level: "medium", title: "相手の小さな用事を引き受ける", detail: "銀行、買い物、支払いなど、『もしよかったら、これやっておこうか？』と声をかけてみましょう。", baseRecovery: 7 },
  { id: "sv_drive", love: "Service", level: "medium", title: "送り迎えや運転を代わる", detail: "用事があるとき、送り迎えや運転を引き受けてみましょう。安全第一で、無理のない範囲で。", baseRecovery: 7 },
  // Words
  { id: "wd_thanks_today", love: "Words", level: "small", title: "今日の『ありがとう』を一言伝える", detail: "『今日は◯◯してくれて助かったよ』と、具体的なひとことを口にしてみましょう。", baseRecovery: 4 },
  { id: "wd_recognize_effort", love: "Words", level: "small", title: "相手のがんばりに触れてみる", detail: "『最近◯◯を続けてくれているよね、すごいと思う』など、気づいていたことを言葉にしてみてください。", baseRecovery: 4 },
  { id: "wd_line_short", love: "Words", level: "medium", title: "短いメモやメッセージを送る", detail: "『いつもありがとう』『助かってます』など、短い一文をメモやメッセージで伝えてみましょう。", baseRecovery: 7 },
  { id: "wd_apology", love: "Words", level: "medium", title: "気になっていたことを一言だけ謝る", detail: "以前から少し気になっていたことがあれば、『あのときはごめんね』と一言だけでも伝えてみましょう。", baseRecovery: 7 },
  // Touch
  { id: "tc_sit_near", love: "Touch", level: "small", title: "いつもより少し近くに座る", detail: "テレビや食事のとき、いつもより少しだけ近くに座ってみましょう。無理のない距離で大丈夫です。", baseRecovery: 4 },
  { id: "tc_back_pat", love: "Touch", level: "small", title: "一言と一緒に、軽く肩や背中に触れる", detail: "『おつかれさま』と言うときに、軽く肩や背中に触れてみましょう。自然にできそうなときだけでOKです。", baseRecovery: 4 },
  { id: "tc_goodnight", love: "Touch", level: "small", title: "寝る前に声をかけて、そばに座る", detail: "『おやすみ』の一言と一緒に、少しだけそばに座る時間を作ってみてもよいかもしれません。", baseRecovery: 4 },
  { id: "tc_short_hug", love: "Touch", level: "medium", title: "自然な流れで短いハグや肩を抱く", detail: "もしお互いに抵抗がなければ、短いハグや肩を抱くスキンシップを試してみてください。", baseRecovery: 7 },
  // Gift - Updated with Keywords for Affiliate
  { id: "gf_drink", love: "Gift", level: "small", title: "相手の好きな飲み物を1本買う", detail: "コンビニやスーパーで、相手が好きそうな飲み物やお菓子をひとつだけ選んで帰ってみましょう。", baseRecovery: 4, keywords: "おしゃれ ドリンク ギフト" },
  { id: "gf_snack", love: "Gift", level: "small", title: "相手の好みを思い出して選ぶ", detail: "相手が以前好きだと言っていたものを思い出して、さりげなく買ってきみましょう。", baseRecovery: 4, keywords: "人気 お菓子 スイーツ" },
  { id: "gf_daily_item", love: "Gift", level: "medium", title: "よく使う日用品を、少し良いものに", detail: "お茶やコーヒー、調味料など、相手がよく使うものを少しだけ良いものにしておくのも、立派な贈りものです。", baseRecovery: 7, keywords: "高級 日用品 ギフト" },
  { id: "gf_little_surprise", love: "Gift", level: "medium", title: "特別な日でなくても、小さなサプライズ", detail: "記念日でなくても、『これ、あなたに合いそうだと思って』と、ささやかな品を渡してみましょう。", baseRecovery: 7, keywords: "プチギフト 雑貨" }
];

export const SPECIAL_ACTIONS: Action[] = [
  { id: "sp_cafe_date", love: "Special", level: "special", title: "少しだけ特別な時間をとる", detail: "「今度の週末、どこかでお茶でもしようか？」など、軽いお誘いをしてみましょう。", baseRecovery: 3 },
  { id: "sp_favorite_place_walk", love: "Special", level: "special", title: "二人の好きな場所まで足をのばす", detail: "以前よく行っていた場所や、ふたりが好きな風景の場所まで、少しだけ足をのばしてみましょう。", baseRecovery: 3 },
  { id: "sp_home_special_meal", love: "Special", level: "special", title: "家で少しだけ特別な食事時間にする", detail: "好きなお惣菜を買ったり、いつもより少し良い飲み物を用意して、『今日はちょっとしたごほうびだね』と声をかけてみましょう。", baseRecovery: 3 }
];

export const COUPONS = [
  { title: "肩たたき券 (10分)", color: "bg-amber-100", text: "text-amber-700" },
  { title: "お皿洗い代行券", color: "bg-blue-100", text: "text-blue-700" },
  { title: "好きな話を聞く券", color: "bg-pink-100", text: "text-pink-700" },
  { title: "お出かけリクエスト券", color: "bg-green-100", text: "text-green-700" },
  { title: "マッサージ券", color: "bg-purple-100", text: "text-purple-700" },
  { title: "なんでも許す券", color: "bg-red-100", text: "text-red-700" }
];

export const FLOWERS = [
  { threshold: 10, emoji: "🌱", name: "双葉", desc: "愛の始まり" },
  { threshold: 30, emoji: "🌷", name: "チューリップ", desc: "思いやり" },
  { threshold: 60, emoji: "🌼", name: "ガーベラ", desc: "希望と前進" },
  { threshold: 100, emoji: "🌻", name: "ひまわり", desc: "あなただけを見つめる" },
  { threshold: 150, emoji: "🌹", name: "バラ", desc: "情熱と愛情" },
  { threshold: 200, emoji: "🌸", name: "桜", desc: "精神の美" },
  { threshold: 300, emoji: "💐", name: "花束", desc: "感謝の集大成" }
];

export const SOS_ADVICE: Record<LoveType, string> = {
  QT: "QTタイプのパートナーには、まず話を聞く姿勢を見せてください。",
  Service: "Serviceタイプには、言葉より行動（片付けなど）で示しましょう。",
  Words: "Wordsタイプには、誠実な言葉で謝罪と愛情を伝えてください。",
  Touch: "Touchタイプには、そっと手を握るなどのスキンシップが有効です。",
  Gift: "Giftタイプには、小さなお詫びの品（好物など）が心を溶かします。",
  Special: "深呼吸して、相手の立場になって謝りましょう。"
};