export type LoveType = 'QT' | 'Service' | 'Words' | 'Touch' | 'Gift' | 'Special';
export type ThemeColor = 'orange' | 'pink' | 'blue' | 'green';

export interface Score {
  QT: number;
  Service: number;
  Words: number;
  Touch: number;
  Gift: number;
}

export interface Option {
  text: string;
  score: Partial<Score>;
}

export interface Question {
  q: string;
  options: Option[];
}

export interface UserType {
  main: LoveType;
  sub: LoveType;
}

export interface Action {
  id: string;
  love: LoveType;
  level: 'small' | 'medium' | 'special';
  title: string;
  detail: string;
  baseRecovery: number;
  keywords?: string;
}

export interface DailyLog {
  date: string;
  tank: number;
  actions: number;
  lastActionId?: string;
}

export interface AppState {
  tank: number;
  dailyLogs: DailyLog[];
  score: Score;
  userType: UserType | null;
  todaysCount: number;
  lastDate: string | null;
  currentActions: Action[];
  isPremium: boolean;
  customActions: Action[];
  totalLifetimeActions: number;
  isSOSMode: boolean;
  anniversaryDate: string | null;
  anniversaryTitle: string;
  theme: ThemeColor;
}

export type ViewState = 'LOADING' | 'WELCOME' | 'START_SAVED' | 'QUIZ' | 'RESULT' | 'HOME' | 'WEEKLY' | 'DATE_PLAN' | 'COUPONS' | 'GARDEN' | 'SOS' | 'ANNIVERSARY';

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}