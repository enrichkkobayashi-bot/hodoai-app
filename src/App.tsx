import { useEffect, useState } from 'react';
import { AppState, ViewState, Score, Action, BeforeInstallPromptEvent, ThemeColor } from './types';
import { calculateType, diffDays, getTankMessage, pickTodayActions, today, getThemeColors } from './utils';
import { TYPE_INFO_JP, ACTIONS } from './constants';

// Components
import { Quiz } from './components/Quiz';
import { Home } from './components/Home';
import { WeeklyReport } from './components/WeeklyReport';
import { Vase } from './components/Vase';
import { UpgradeModal } from './components/UpgradeModal';
import { DatePlanner } from './components/DatePlanner';
import { Coupons } from './components/Coupons';
import { Garden } from './components/Garden';
import { SOSHelp } from './components/SOSHelp';
import { Anniversary } from './components/Anniversary';
import { ResetModal } from './components/ResetModal';

// Global confetti type
declare const confetti: any;

const INITIAL_STATE: AppState = {
  tank: 60,
  dailyLogs: [],
  score: { QT: 0, Service: 0, Words: 0, Touch: 0, Gift: 0 },
  userType: null,
  todaysCount: 0,
  lastDate: null,
  currentActions: [],
  isPremium: false,
  customActions: [],
  totalLifetimeActions: 0,
  isSOSMode: false,
  anniversaryDate: null,
  anniversaryTitle: '記念日',
  theme: 'orange'
};

function App() {
  const [state, setState] = useState<AppState>(INITIAL_STATE);
  const [view, setView] = useState<ViewState>('LOADING');
  const [justIncreased, setJustIncreased] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<{title: string, recovery: number} | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  const themeColors = getThemeColors(state.theme);

  useEffect(() => {
    // PWA Install Event Listener
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    try {
      const raw = localStorage.getItem("hodoiState");
      if (raw) {
        const loaded = JSON.parse(raw);
        if (loaded && loaded.userType && loaded.userType.main) {
          const baseState = { ...INITIAL_STATE, ...loaded };
          if (!baseState.theme) baseState.theme = 'orange';
          
          if (!baseState.currentActions || baseState.currentActions.length === 0) {
             baseState.currentActions = pickTodayActions(baseState.userType, baseState.tank);
          }
          setState(baseState);
          setView(baseState.isSOSMode ? 'SOS' : 'START_SAVED');
        } else {
           setView('WELCOME');
        }
      } else {
         setView('WELCOME');
      }
    } catch (e) {
      console.error("Failed to load state", e);
      setView('WELCOME');
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  useEffect(() => {
    if (view !== 'LOADING') {
        localStorage.setItem("hodoiState", JSON.stringify(state));
    }
  }, [state, view]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  const updateDailyState = () => {
    const todayStr = today();
    let newState = { ...state };
    
    if (newState.lastDate === null) {
        newState.lastDate = todayStr;
        if (newState.userType && newState.currentActions.length === 0) {
            newState.currentActions = pickTodayActions(newState.userType, newState.tank);
        }
    } else if (todayStr !== newState.lastDate) {
        const diff = diffDays(newState.lastDate, todayStr);
        if (diff > 0) {
            const decrease = 5 * diff;
            newState.tank = Math.max(0, newState.tank - decrease);
        }
        newState.todaysCount = 0;
        newState.lastDate = todayStr;
        if (newState.userType) {
            newState.currentActions = pickTodayActions(newState.userType, newState.tank);
        }
    }

    let logs = [...newState.dailyLogs];
    let logIndex = logs.findIndex(d => d.date === todayStr);
    if (logIndex === -1) {
        logs.push({ date: todayStr, tank: newState.tank, actions: newState.todaysCount });
    } else {
        logs[logIndex] = { ...logs[logIndex], tank: newState.tank, actions: newState.todaysCount };
    }
    newState.dailyLogs = logs;

    setState(newState);
  };

  const handleQuizComplete = (finalScore: Score) => {
    const userType = calculateType(finalScore);
    const initialActions = pickTodayActions(userType, 60);
    setState(prev => ({ 
        ...prev, 
        score: finalScore, 
        userType,
        currentActions: initialActions 
    }));
    setView('RESULT');
  };

  const handleStartSaved = () => {
    updateDailyState();
    if (state.isSOSMode) {
      setView('SOS');
    } else {
      setView('HOME');
    }
  };

  const handleRestartRequest = () => {
    setShowResetModal(true);
  };

  const handleRestartConfirm = () => {
    localStorage.removeItem("hodoiState");
    setState(INITIAL_STATE);
    setView('QUIZ');
    setShowResetModal(false);
  };

  const handleActionComplete = (action: Action) => {
    const recovery = action.baseRecovery;
    const newTank = Math.min(100, state.tank + recovery);
    const newCount = state.todaysCount + 1;
    
    const todayStr = today();
    const logs = [...state.dailyLogs];
    const logIndex = logs.findIndex(d => d.date === todayStr);
    
    if (logIndex >= 0) {
        logs[logIndex] = { ...logs[logIndex], tank: newTank, actions: newCount, lastActionId: action.id };
    } else {
        logs.push({ date: todayStr, tank: newTank, actions: newCount, lastActionId: action.id });
    }

    setState(prev => ({
        ...prev,
        tank: newTank,
        todaysCount: newCount,
        dailyLogs: logs,
        totalLifetimeActions: (prev.totalLifetimeActions || 0) + 1
    }));

    setJustIncreased(true);
    setActionFeedback({ title: action.title, recovery });
    
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: [themeColors.main, themeColors.sub, '#ffffff']
      });
    }
  };

  const handleActionReplace = (actionId: string) => {
    const currentIds = new Set(state.currentActions.map(a => a.id));
    const candidates = ACTIONS.filter(a => !currentIds.has(a.id));
    
    if (candidates.length === 0) return;

    const newAction = candidates[Math.floor(Math.random() * candidates.length)];
    const newActions = state.currentActions.map(a => 
        a.id === actionId ? newAction : a
    );

    setState(prev => ({ ...prev, currentActions: newActions }));
  };

  const handleCreateCustomAction = () => {
    if (!state.isPremium) {
        setShowUpgradeModal(true);
        return;
    }
    const title = prompt("新しい行動を入力してください");
    if (!title) return;
    
    const newAction: Action = {
        id: `custom_${Date.now()}`,
        love: state.userType?.main || 'QT',
        level: 'medium',
        title: title,
        detail: 'あなただけのオリジナルアクションです',
        baseRecovery: 7
    };

    setState(prev => ({
        ...prev,
        customActions: [...prev.customActions, newAction],
        currentActions: [...prev.currentActions.slice(0, 3), newAction]
    }));
  };

  const handleUpgrade = () => {
    setTimeout(() => {
        setState(prev => ({ ...prev, isPremium: true }));
        setShowUpgradeModal(false);
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 150,
                spread: 100,
                colors: ['#FFD700', '#FFA500', '#FFFFFF']
            });
        }
        alert("プレミアムプランへの登録ありがとうございます！機能が開放されました。");
    }, 500);
  };

  const handleChangeTheme = (theme: ThemeColor) => {
    setState(prev => ({ ...prev, theme }));
  };

  const handleEnableSOS = () => {
    setState(prev => ({ ...prev, isSOSMode: true }));
    setView('SOS');
  };

  const handleResolveSOS = () => {
    setState(prev => ({ ...prev, isSOSMode: false }));
    setView('HOME');
    if (typeof confetti === 'function') {
      confetti({
          particleCount: 200,
          spread: 150,
          colors: ['#64B5F6', '#E1F5FE', '#FFFFFF']
      });
    }
  };

  const handleShowCoupons = () => setView('COUPONS');
  const handleShowGarden = () => setView('GARDEN');
  const handleShowAnniversary = () => setView('ANNIVERSARY');
  const handleShowDatePlan = () => setView('DATE_PLAN');
  const handleShowWeekly = () => setView('WEEKLY');

  const handleSaveAnniversary = (date: string, title: string) => {
    setState(prev => ({ ...prev, anniversaryDate: date, anniversaryTitle: title }));
    setView('HOME');
  };

  const closeFeedback = () => {
    setActionFeedback(null);
    setJustIncreased(false);
  };

  const renderContent = () => {
    if (view === 'LOADING') return null;

    if (view === 'WELCOME' || view === 'QUIZ') {
      return <Quiz onComplete={handleQuizComplete} />;
    }

    if (view === 'RESULT') {
        if (!state.userType) return null;
        const mainInfo = TYPE_INFO_JP[state.userType.main];
        const subInfo = TYPE_INFO_JP[state.userType.sub];
        return (
            <div className="animate-fade-in pt-8 pb-10 flex flex-col min-h-screen justify-center items-center">
                <h2 className="text-2xl font-bold text-[#4A4A4A] mb-4">診断完了！</h2>
                <div className="bg-white p-8 rounded-3xl shadow-sm mb-6 border border-[#FFE0B2] text-center mx-4">
                    <div className="text-2xl font-bold text-gray-800 mb-2">{mainInfo.label}</div>
                    <div className="text-sm text-gray-600">{subInfo.label}</div>
                </div>
                <button 
                    onClick={handleStartSaved} 
                    className="text-white px-8 py-4 rounded-xl font-bold shadow-lg"
                    style={{ background: themeColors.main }}
                >
                    ホームへ
                </button>
            </div>
        );
    }

    if (view === 'START_SAVED') {
        if (!state.userType) return null;
        return (
            <div className="text-center animate-fade-in flex flex-col min-h-screen justify-center pb-10">
                <h2 className="text-2xl font-bold text-[#4A4A4A] mb-2">おかえりなさい</h2>
                <p className="text-xs text-gray-500 mb-8">前回の続きから始めます</p>
                <Vase level={state.tank} theme={state.theme} />
                <div className="bg-white p-4 rounded-2xl shadow-sm mb-8 mx-4 border" style={{ borderColor: themeColors.sub }}>
                  <p className="text-sm font-medium leading-relaxed" style={{ color: themeColors.text }}>
                      {getTankMessage(state.tank)}
                  </p>
                </div>
                <div className="space-y-3 px-4">
                  <button 
                    onClick={handleStartSaved} 
                    className="w-full text-white font-bold py-4 rounded-xl shadow-lg hover:brightness-105 transition-all"
                    style={{ background: themeColors.main }}
                  >
                      ホームへ
                  </button>
                  <button onClick={handleRestartRequest} className="w-full bg-white text-gray-400 font-bold py-4 rounded-xl border border-gray-200 text-sm">診断をやり直す</button>
                </div>
            </div>
        );
    }

    if (view === 'HOME') {
        return (
            <>
                <Home 
                    state={state} 
                    onActionComplete={handleActionComplete}
                    onActionReplace={handleActionReplace}
                    onShowWeekly={handleShowWeekly}
                    onShowDatePlan={handleShowDatePlan}
                    onShowCoupons={handleShowCoupons}
                    onShowGarden={handleShowGarden}
                    onShowSOS={handleEnableSOS}
                    onShowAnniversary={handleShowAnniversary}
                    onRestart={handleRestartRequest}
                    onInstall={handleInstallClick}
                    animateVase={justIncreased}
                    canInstall={!!deferredPrompt}
                    onCreateCustomAction={handleCreateCustomAction}
                    onChangeTheme={handleChangeTheme}
                    onRequestUpgrade={() => setShowUpgradeModal(true)}
                />
                
                {actionFeedback && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-5 animate-fade-in">
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={closeFeedback}></div>
                        <div className="bg-white w-full max-w-sm p-8 rounded-3xl shadow-2xl relative z-10 text-center">
                            <h2 className="text-xl font-bold text-gray-800 mb-2">ナイスアクション！</h2>
                            <p className="text-gray-500 text-sm mb-6">{actionFeedback.title}</p>
                            <div className="text-4xl font-bold mb-8" style={{ color: themeColors.main }}>+{actionFeedback.recovery}%</div>
                            <button 
                                onClick={closeFeedback} 
                                className="w-full text-white font-bold py-3 rounded-xl shadow-lg"
                                style={{ background: themeColors.main }}
                            >
                                閉じる
                            </button>
                        </div>
                    </div>
                )}
            </>
        );
    }

    if (view === 'WEEKLY') {
        return (
            <WeeklyReport 
                logs={state.dailyLogs}
                isPremium={state.isPremium}
                onBack={() => setView('HOME')}
                onRequestUpgrade={() => setShowUpgradeModal(true)}
            />
        );
    }

    if (view === 'DATE_PLAN') {
        if (!state.userType) return null;
        return <DatePlanner userType={state.userType} onBack={() => setView('HOME')} />;
    }

    if (view === 'COUPONS') {
        return <Coupons onBack={() => setView('HOME')} />;
    }

    if (view === 'GARDEN') {
        return <Garden totalActions={state.totalLifetimeActions || 0} onBack={() => setView('HOME')} />;
    }

    if (view === 'SOS') {
        if (!state.userType) return null;
        return <SOSHelp userType={state.userType} onResolve={handleResolveSOS} onBack={() => setView('HOME')} />;
    }

    if (view === 'ANNIVERSARY') {
        return (
            <Anniversary 
                currentDate={state.anniversaryDate || ''} 
                currentTitle={state.anniversaryTitle}
                onSave={handleSaveAnniversary} 
                onBack={() => setView('HOME')} 
            />
        );
    }

    return null;
  };

  return (
    <div 
        className={`max-w-[420px] mx-auto min-h-screen px-5 box-border relative overflow-x-hidden transition-colors duration-500 ${state.isSOSMode ? 'bg-[#E0E0E0]' : themeColors.bg}`}
    >
      {renderContent()}
      <UpgradeModal 
        isOpen={showUpgradeModal} 
        onClose={() => setShowUpgradeModal(false)}
        onUpgrade={handleUpgrade}
      />
      <ResetModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onReset={handleRestartConfirm}
      />
    </div>
  );
}

export default App;