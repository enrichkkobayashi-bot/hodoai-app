import { Action, UserType, Score, LoveType, ThemeColor } from './types';
import { ACTIONS, SPECIAL_ACTIONS, TYPE_PRIORITY, THEMES } from './constants';

export function today(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function diffDays(a: string, b: string): number {
  const da = new Date(a);
  const db = new Date(b);
  const diffMs = db.getTime() - da.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

export function shuffle<T>(list: T[]): T[] {
  const arr = list.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function calculateType(score: Score): UserType {
  const entries = Object.entries(score) as [LoveType, number][];
  if (entries.length === 0) {
    return { main: "QT", sub: "Service" };
  }

  const maxScore = Math.max(...entries.map(([_, v]) => v));
  const mainCandidates = entries
    .filter(([_, v]) => v === maxScore)
    .map(([k]) => k);

  mainCandidates.sort(
    (a, b) => TYPE_PRIORITY.indexOf(a) - TYPE_PRIORITY.indexOf(b)
  );
  const main = mainCandidates[0];

  const restEntries = entries.filter(([k]) => k !== main);
  if (restEntries.length === 0) {
    return { main, sub: main };
  }
  const secondMax = Math.max(...restEntries.map(([_, v]) => v));
  const subCandidates = restEntries
    .filter(([_, v]) => v === secondMax)
    .map(([k]) => k);

  subCandidates.sort(
    (a, b) => TYPE_PRIORITY.indexOf(a) - TYPE_PRIORITY.indexOf(b)
  );
  const sub = subCandidates[0];

  return { main, sub };
}

export function pickTodayActions(userType: UserType, tankLevel: number): Action[] {
  const primary   = ACTIONS.filter(a => a.love === userType.main);
  const secondary = ACTIONS.filter(a => a.love === userType.sub);
  const others    = ACTIONS.filter(a => a.love !== userType.main && a.love !== userType.sub);

  const primarySmall   = shuffle(primary.filter(a => a.level === "small"));
  const primaryMedium  = shuffle(primary.filter(a => a.level === "medium"));
  const secondarySmall = shuffle(secondary.filter(a => a.level === "small"));
  const secondaryMedium= shuffle(secondary.filter(a => a.level === "medium"));
  const otherSmall     = shuffle(others.filter(a => a.level === "small"));
  const otherMedium    = shuffle(others.filter(a => a.level === "medium"));

  const result: Action[] = [];

  // 1) Ensure at least one very simple "small" task
  const easy =
    primarySmall[0] ||
    secondarySmall[0] ||
    otherSmall[0];

  if (easy) {
    result.push(easy);
  }

  function notPicked(a: Action) {
    return !result.some(r => r.id === a.id);
  }

  let smallPool = [
    ...primarySmall.filter(notPicked),
    ...secondarySmall.filter(notPicked),
    ...otherSmall.filter(notPicked)
  ];
  let mediumPool = [
    ...primaryMedium,
    ...secondaryMedium,
    ...otherMedium
  ];

  smallPool  = shuffle(smallPool);
  mediumPool = shuffle(mediumPool);

  let smallCount  = result.filter(a => a.level === "small").length;
  let mediumCount = result.filter(a => a.level === "medium").length;

  // Changed from 5 to 3 to fit in one screen
  while (result.length < 3 && (smallPool.length > 0 || mediumPool.length > 0)) {
    let pickFromSmall = false;

    if (smallCount < mediumCount) {
      pickFromSmall = true;
    } else if (mediumCount < smallCount) {
      pickFromSmall = false;
    } else {
      pickFromSmall = Math.random() < 0.5;
    }

    let next: Action | undefined = undefined;
    if (pickFromSmall && smallPool.length > 0) {
      next = smallPool.shift();
    } else if (!pickFromSmall && mediumPool.length > 0) {
      next = mediumPool.shift();
    } else if (smallPool.length > 0) {
      next = smallPool.shift();
    } else if (mediumPool.length > 0) {
      next = mediumPool.shift();
    }

    if (!next) break;
    if (!result.some(a => a.id === next!.id)) {
      result.push(next);
      if (next.level === "small")  smallCount++;
      if (next.level === "medium") mediumCount++;
    }
  }

  // 3) If tank is high, add a special action
  if (tankLevel >= 80 && SPECIAL_ACTIONS.length > 0) {
    const specialList = shuffle(SPECIAL_ACTIONS);
    const special = specialList[0];
    if (special) {
      const exists = result.some(a => a.id === special.id);
      if (!exists) {
        if (result.length < 3) {
          result.push(special);
        } else {
          result[result.length - 1] = special;
        }
      }
    }
  }

  return result.slice(0, 3);
}

export function getTankMessage(level: number): string {
  if (level >= 90) return "パートナーの心は今、とても落ち着いていそうです。今のペースを大切にしながら、週に1回だけ“いつもと少し違う時間”も試してみましょう。";
  if (level >= 70) return "パートナーのタンクは、よく満たされています。無理のない小さな一歩を続けることで、この状態を保ちやすくなります。";
  if (level >= 50) return "まずまずの状態です。平日のどこか1日だけ、パートナーのタイプに合った行動を意識してみるのがおすすめです。";
  if (level >= 30) return "少し疲れがたまっているかもしれません。大きなことではなく、『今日はこれだけ』という小さな一歩を選んでみましょう。";
  return "パートナーのタンクはかなり乾いているかもしれません。まずは5分だけ話を聞く、家事をひとつ引き受けるなど、いちばんやさしい行動から試してみてください。";
}

export function getThemeColors(theme: ThemeColor = 'orange') {
  return THEMES[theme] || THEMES.orange;
}