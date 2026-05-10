"use client";

import { useState, useEffect, useCallback, Suspense, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Globe, Film, Rocket, Laptop, Trophy, Zap, Activity, Clock, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { GAME_LIBRARY, type Entity } from '@/lib/game-library';
import confetti from 'canvas-confetti';
import { toast } from '@/hooks/use-toast';

type GameMode = 'classic' | 'trivia' | 'challenge' | 'daily';

const MODE_COLORS: Record<GameMode, string> = {
  classic: "#00E5A0",
  trivia: "#8B7FFF",
  challenge: "#FF5C35",
  daily: "#FFB800"
};

const CATEGORY_ICONS: Record<string, any> = {
  geography: Globe,
  entertainment: Film,
  science_cosmos: Rocket,
  tech_future: Laptop
};

const CATEGORY_IDS: Record<string, string> = {
  geography: "ID_GEO",
  entertainment: "ID_ENT",
  science_cosmos: "ID_SCI",
  tech_future: "ID_TEC"
};

const CATEGORY_COLORS: Record<string, string> = {
  geography: "#00E5A0",
  entertainment: "#8B7FFF",
  science_cosmos: "#FF5C35",
  tech_future: "#00B5B5"
};

function seededShuffle(array: any[], seed: string) {
  const result = [...array];
  let s = 0;
  for (let i = 0; i < seed.length; i++) s = (s << 5) - s + seed.charCodeAt(i);
  
  const random = () => {
    s = Math.sin(s) * 10000;
    return s - Math.floor(s);
  };

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function GameContent() {
  const searchParams = useSearchParams();
  const selectedMode = (searchParams.get('mode') as GameMode) || 'classic';

  const [phase, setPhase] = useState<'setup' | 'loading' | 'playing' | 'revealing' | 'over'>('setup');
  const [entities, setEntities] = useState<Entity[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [nextIdx, setNextIdx] = useState(1);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(1);
  const [timer, setTimer] = useState(12);
  const [fluxLevel, setFluxLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [shake, setShake] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [systemTime, setSystemTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setSystemTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(`tf-score-${selectedMode}`);
    if (saved) setHighScore(parseInt(saved));
  }, [selectedMode]);

  const maxTimer = useMemo(() => {
    if (selectedMode !== 'challenge') return 12;
    return Math.max(4, 12 - (fluxLevel - 1) * 2);
  }, [selectedMode, fluxLevel]);

  const fireConfetti = useCallback(() => {
    const colors = ['#00E5A0', '#8B7FFF', '#FF5C35', '#FFB800'];
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors,
    });
  }, []);

  const handleGameOver = useCallback((perfect: boolean) => {
    if (selectedMode === 'daily') {
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem('tf-daily-last-played', today);
      if (perfect) {
        const streakCount = parseInt(localStorage.getItem('tf-daily-streak') || '0');
        localStorage.setItem('tf-daily-streak', (streakCount + 1).toString());
      } else {
        localStorage.setItem('tf-daily-streak', '0');
      }
    }
    


    if (score > highScore) {
      localStorage.setItem(`tf-score-${selectedMode}`, score.toString());
      setHighScore(score);
    }
    setPhase('over');
  }, [score, highScore, selectedMode]);

  const handleShare = useCallback(() => {
    const origin = window.location.origin;
    const text = `I scored ${score.toString().padStart(5, '0')} on TriviaFlux (${selectedMode.toUpperCase()} mode)! Can you beat me? ⚡️👾\n\nPlay here: ${origin}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'TriviaFlux Score',
        text: text,
        url: origin,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        toast({
          title: "SCORE_COPIED",
          description: "Transmission ready for manual broadcast.",
        });
      });
    }
  }, [score, selectedMode]);

  const handleAnswer = useCallback((answer: 'up' | 'down') => {
    if (phase !== 'playing') return;

    const current = entities[currentIdx];
    const next = entities[nextIdx];
    if (!current || !next) return;

    setPhase('revealing');

    const correct = answer === 'up' ? next.value >= current.value : next.value <= current.value;
    setIsCorrect(correct);

    if (correct) {
      setScore(s => s + 1);
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      if (nextStreak > 0 && nextStreak % 3 === 0) fireConfetti();
      if (selectedMode === 'challenge' && nextStreak % 3 === 0) setFluxLevel(l => l + 1);

      setTimeout(() => {
        const nextNext = nextIdx + 1;
        if (selectedMode === 'daily' && nextNext >= 10) {
          handleGameOver(true);
          return;
        }
        if (nextNext >= entities.length) {
          handleGameOver(false);
          return;
        }
        setCurrentIdx(nextIdx);
        setNextIdx(nextNext);
        setPhase('playing');
        setIsCorrect(null);
        setTimer(maxTimer);
      }, 800);
    } else {
      setShake(true);
      setStreak(0);
      setTimeout(() => setShake(false), 400);
      const newLives = lives - 1;
      setLives(newLives);
      
      if (selectedMode === 'classic' || newLives <= 0) {
        setTimeout(() => handleGameOver(false), 800);
      } else {
        setTimeout(() => {
          const nextNext = nextIdx + 1;
          if (nextNext >= entities.length) {
            handleGameOver(false);
            return;
          }
          setNextIdx(nextNext);
          setPhase('playing');
          setIsCorrect(null);
          setTimer(maxTimer);
        }, 800);
      }
    }
  }, [phase, entities, currentIdx, nextIdx, lives, selectedMode, streak, maxTimer, fireConfetti, handleGameOver]);

  const startLevel = useCallback(async (topicKey: string) => {
    setPhase('loading');
    
    let sourcePool: Entity[] = [];
    const deck = GAME_LIBRARY[topicKey];
    
    if (selectedMode === 'daily') {
      const today = new Date().toISOString().split('T')[0];
      const allEntities = Object.values(GAME_LIBRARY).flatMap(d => d.entities);
      const grouped = allEntities.reduce((acc, ent) => {
        if (!acc[ent.type]) acc[ent.type] = [];
        acc[ent.type].push(ent);
        return acc;
      }, {} as Record<string, Entity[]>);
      
      const types = Object.keys(grouped).filter(t => grouped[t].length >= 10);
      const typeIndex = (today.charCodeAt(today.length - 1)) % types.length;
      const selectedType = types[typeIndex];
      sourcePool = seededShuffle(grouped[selectedType], today).slice(0, 11);
    } else {
      const grouped = deck.entities.reduce((acc, ent) => {
        if (!acc[ent.type]) acc[ent.type] = [];
        acc[ent.type].push(ent);
        return acc;
      }, {} as Record<string, Entity[]>);
      
      const types = Object.keys(grouped).filter(t => grouped[t].length >= 2);
      const randomType = types[Math.floor(Math.random() * types.length)];
      sourcePool = [...grouped[randomType]].sort(() => Math.random() - 0.5);
    }
    
    setEntities(sourcePool);
    setScore(0);
    setFluxLevel(1);
    setStreak(0);
    setLives(selectedMode === 'challenge' ? 3 : 1);
    setCurrentIdx(0);
    setNextIdx(1);
    setPhase('playing');
    setTimer(maxTimer);
  }, [selectedMode, maxTimer]);

  useEffect(() => {
    if (phase !== 'playing') return;
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          handleAnswer(entities[nextIdx]?.value >= entities[currentIdx]?.value ? 'down' : 'up');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phase, handleAnswer, entities, currentIdx, nextIdx]);

  useEffect(() => {
    if (selectedMode === 'daily' && phase === 'setup') startLevel('geography');
  }, [selectedMode, phase, startLevel]);

  if (phase === 'setup') {
    return (
      <main className="h-[100svh] max-w-[430px] mx-auto flex flex-col p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-hidden bg-[#08090E] relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center gap-4">
            <Link href="/" className="panel p-2 hover:bg-white/5 rounded-full border-white/10 box-glow-teal">
              <ArrowLeft className="w-5 h-5 text-white" />
            </Link>
            <div className="flex flex-col">
              <h2 className="pixel-num text-xs sm:text-sm text-white flex items-center gap-2">
                SET_SOURCE <span className="opacity-40">//</span> <span className="text-glow-white" style={{ color: MODE_COLORS[selectedMode] }}>{selectedMode.toUpperCase()}</span>
              </h2>
              <p className="hud-label text-[8px] opacity-40">LOCAL_KNOWLEDGE_STREAM_ACTIVE</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 flex-1 overflow-y-auto z-10 min-h-0 pr-1">
          {Object.entries(GAME_LIBRARY).map(([key, deck]) => {
            const Icon = CATEGORY_ICONS[key] || Globe;
            const color = CATEGORY_COLORS[key] || "#FFFFFF";
            return (
              <button
                key={key}
                onClick={() => startLevel(key)}
                className="panel group p-4 sm:p-5 text-left flex flex-col relative transition-all active:scale-[0.97] hover:bg-white/[0.02] border-white/10 overflow-hidden min-h-[160px]"
              >
                <div className="absolute top-4 right-4 p-1.5 rounded-md border border-white/10 opacity-40 group-hover:opacity-100 group-hover:border-current transition-all" style={{ color }}>
                  <ArrowRight className="w-3 h-3" />
                </div>

                <span className="hud-label text-[7px] mb-6 sm:mb-8" style={{ color }}>{CATEGORY_IDS[key]}</span>
                
                <div className="flex-1 flex flex-col items-start gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 rounded-lg bg-black/40 border border-white/5 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_10px_rgba(255,255,255,0.05)]" style={{ color, borderColor: `${color}33` }}>
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  
                  <div className="space-y-1 sm:space-y-2 mt-auto">
                    <h3 className="pixel-num text-[9px] sm:text-[10px] text-white uppercase leading-tight tracking-wider text-glow-white">{deck.category}</h3>
                    <div className="w-4 h-[1px] opacity-30 bg-current" style={{ color }} />
                    <p className="hud-label text-[7px] opacity-40 lowercase leading-relaxed line-clamp-2">{deck.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="shrink-0 flex items-center justify-between pt-4 border-t border-white/5 z-10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border border-[#00E5A0] flex items-center justify-center text-[#00E5A0] text-[10px] font-bold shadow-[0_0_8px_rgba(0,229,160,0.3)]">N</div>
            <span className="hud-label text-[7px] opacity-40">LOCAL_BOOT_v4.0</span>
          </div>
          <Link href="/leaderboard" className="flex items-center gap-2 group">
            <Trophy className="w-4 h-4 text-[#FFB800] text-glow-gold" />
            <span className="hud-label text-[8px] opacity-60 group-hover:opacity-100 transition-opacity">HALL OF FAME</span>
          </Link>
        </div>
      </main>
    );
  }

  if (phase === 'loading') {
    return (
      <main className="h-[100svh] max-w-[430px] mx-auto flex flex-col items-center justify-center bg-[#08090E]">
        <div className="pixel-num text-4xl animate-pulse mb-6 text-glow-teal" style={{ color: MODE_COLORS[selectedMode] }}>█</div>
        <span className="hud-label tracking-[0.5em] text-white text-[11px] text-glow-white">CACHING_METRICS...</span>
      </main>
    );
  }

  if (phase === 'over') {
    return (
      <main className="h-[100svh] max-w-[430px] mx-auto flex flex-col items-center justify-center p-8 space-y-8 sm:space-y-12 bg-[#08090E]">
        <h2 className="pixel-num text-xl sm:text-2xl text-[#FF5C35] animate-pulse text-glow-coral">{selectedMode === 'daily' ? 'DAILY_SYNC_END' : 'TERMINAL_CLOSED'}</h2>
        <div className="w-full space-y-6 sm:space-y-8 text-center">
          <div>
            <span className="hud-label mb-3 text-[10px] block">FINAL_SCORE</span>
            <span className="pixel-num text-3xl sm:text-4xl text-white text-glow-teal">{score.toString().padStart(5, '0')}</span>
          </div>
          <div>
            <span className="hud-label mb-2 text-[8px] opacity-40 block">BEST_SCORE</span>
            <span className="pixel-num text-lg text-[#FFB800] text-glow-gold">{highScore.toString().padStart(5, '0')}</span>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
           <Button onClick={handleShare} className="panel h-14 sm:h-16 bg-[#00E5A0]/5 border-[#00E5A0] text-[#00E5A0] pixel-num text-[11px] tracking-[0.2em] rounded-none hover:bg-[#00E5A0]/10 box-glow-teal flex items-center justify-center gap-3">
             <Share2 className="w-4 h-4" /> [ SHARE_RESULTS ]
           </Button>
           {selectedMode !== 'daily' && (
             <Button onClick={() => setPhase('setup')} className="panel h-14 sm:h-16 bg-transparent border-[#8B7FFF] text-[#8B7FFF] pixel-num text-[11px] tracking-[0.2em] rounded-none hover:bg-[#8B7FFF]/10 box-glow-purple">
               [ REBOOT_LEVEL ]
             </Button>
           )}
           <Button asChild variant="outline" className="panel h-12 sm:h-14 bg-transparent border-[#4A4D60] text-[#6B6E82] hud-label rounded-none hover:bg-white/5">
             <Link href="/">[ EXIT_CMD ]</Link>
           </Button>
        </div>
      </main>
    );
  }

  return (
    <main className={cn(
      "h-[100svh] max-w-[430px] mx-auto flex flex-col relative bg-[#08090E] overflow-hidden",
      shake && "animate-shake"
    )}>
      <div className="p-4 sm:p-6 flex items-start justify-between shrink-0 z-20 bg-gradient-to-b from-[#08090E] to-transparent">
        <Link href="/" className="flex items-center gap-2 group">
          <ArrowLeft className="w-4 h-4 text-white group-hover:text-[#00E5A0] transition-colors" />
          <div className="flex flex-col">
            <span className="pixel-num text-[10px] sm:text-xs text-white uppercase text-glow-white">{selectedMode}</span>
            <span className="hud-label text-[6px] opacity-40">{systemTime}</span>
          </div>
        </Link>
        <div className="flex flex-col items-end">
          <span className="hud-label text-[8px] mb-1 opacity-60">SCORE</span>
          <span className="pixel-num text-xl sm:text-2xl text-[#00E5A0] text-glow-teal">{score.toString().padStart(5, '0')}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col px-4 sm:px-6 space-y-3 sm:space-y-4 overflow-hidden mb-4 sm:mb-6 z-10 min-h-0">
        <div className="flex items-center justify-between px-2 shrink-0">
          <div className="flex items-center gap-2">
            <Activity className="w-3 h-3 text-[#FF5C35] text-glow-coral" />
            <span className="hud-label text-[8px] text-[#FF5C35] text-glow-coral">FLUX_LVL: {fluxLevel}</span>
          </div>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <Zap key={i} className={cn(
                "w-3 h-3",
                i < lives ? "text-[#FFB800] fill-[#FFB800] text-glow-gold" : "text-white/10"
              )} />
            ))}
          </div>
        </div>

        <div className="space-y-2 shrink-0">
          <div className="flex justify-between items-end mb-1">
             <span className="hud-label text-[7px] opacity-40 flex items-center gap-1">
               <Clock className="w-2 h-2" /> TIME_REMAINING
             </span>
             <span className={cn(
               "pixel-num text-[9px] sm:text-[10px]",
               timer < 3 ? "text-[#FF5C35] blink text-glow-coral" : "text-white text-glow-white"
             )}>{timer.toString().padStart(2, '0')}.00s</span>
          </div>
          <div className="h-[2px] bg-[#161820] w-full border border-[#4A4D60]/20 box-glow-teal">
            <div 
              className="h-full transition-all duration-1000 shadow-[0_0_8px_currentcolor]"
              style={{ 
                width: `${(timer / maxTimer) * 100}%`,
                backgroundColor: timer < 3 ? '#FF5C35' : MODE_COLORS[selectedMode]
              }}
            />
          </div>
        </div>

        {/* Current Entity Card */}
        <div className="panel flex-1 flex flex-col overflow-hidden group bg-black/40 min-h-0">
          <div className="relative z-10 p-4 sm:p-6 flex flex-col items-center justify-center text-center h-full">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 transform group-hover:scale-125 transition-transform duration-300 select-none">{entities[currentIdx]?.emoji}</div>
            <span className="hud-label text-[7px] opacity-40 mb-2 sm:mb-3">FIXED_POINT</span>
            <h3 className="pixel-num text-[11px] sm:text-sm text-white uppercase leading-tight mb-2 text-glow-white line-clamp-2">{entities[currentIdx]?.name}</h3>
            <p className="hud-label text-[7px] text-white/40 mb-3 sm:mb-4">{entities[currentIdx]?.type.toUpperCase()} // {entities[currentIdx]?.unit.toUpperCase()}</p>
            <div className="pixel-num text-xl sm:text-2xl text-[#00E5A0] text-glow-teal break-all">
              {entities[currentIdx]?.value.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 shrink-0 py-1">
           <div className="h-[1px] flex-1 bg-[#4A4D60]/20" />
           <span className="hud-label text-[8px] text-white/20 tracking-[0.4em]">VS</span>
           <div className="h-[1px] flex-1 bg-[#4A4D60]/20" />
        </div>

        {/* Next Entity Card */}
        <div className={cn(
          "panel flex-1 flex flex-col overflow-hidden transition-all duration-300 bg-black/40 min-h-0",
          phase === 'revealing' && (isCorrect ? "border-[#00E5A0] box-glow-teal shadow-[0_0_30px_rgba(0,229,160,0.1)]" : "border-[#FF5C35] box-glow-coral shadow-[0_0_30px_rgba(255,92,53,0.1)]")
        )}>
          <div className="relative z-10 p-4 sm:p-6 flex flex-col items-center justify-center text-center h-full">
            <div className={cn("text-3xl sm:text-4xl mb-3 sm:mb-4 transition-all duration-300", phase === 'playing' ? "blur-sm opacity-20" : "blur-0 opacity-100")}>{entities[nextIdx]?.emoji}</div>
            <span className="hud-label text-[8px] sm:text-[9px] text-[#00E5A0] tracking-[0.1em] mb-2 sm:mb-3 text-glow-teal">
              IS THE {entities[currentIdx]?.type.toUpperCase()} OF...
            </span>
            <h3 className="pixel-num text-[11px] sm:text-sm text-white uppercase leading-tight mb-2 text-glow-white line-clamp-2">{entities[nextIdx]?.name}</h3>
            
            {phase === 'playing' ? (
              <div className="flex flex-col items-center w-full mt-1 sm:mt-2">
                <div className="pixel-num text-lg sm:text-xl text-white/10 blink mb-3 sm:mb-4">??????</div>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
                  <Button 
                    onClick={() => handleAnswer('up')}
                    className="h-14 sm:h-16 panel bg-transparent border-[#00E5A0] text-[#00E5A0] rounded-none hover:bg-[#00E5A0]/10 flex flex-col items-center justify-center box-glow-teal px-1"
                  >
                    <span className="text-xl mb-1 shrink-0">▲</span>
                    <span className="pixel-num text-[8px] sm:text-[9px] text-center leading-tight">HIGHER</span>
                  </Button>
                  <Button 
                    onClick={() => handleAnswer('down')}
                    className="h-14 sm:h-16 panel bg-transparent border-[#FF5C35] text-[#FF5C35] rounded-none hover:bg-[#FF5C35]/10 flex flex-col items-center justify-center box-glow-coral px-1"
                  >
                    <span className="text-xl mb-1 shrink-0">▼</span>
                    <span className="pixel-num text-[8px] sm:text-[9px] text-center leading-tight">LOWER</span>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="animate-in zoom-in duration-300 flex flex-col items-center mt-1 sm:mt-2">
                 <div className={cn(
                   "pixel-num text-lg sm:text-xl mb-2 sm:mb-3 break-all",
                   isCorrect ? "text-[#00E5A0] text-glow-teal" : "text-[#FF5C35] text-glow-coral"
                 )}>
                   {entities[nextIdx]?.value.toLocaleString()}
                 </div>
                 <p className="hud-label text-[7px] normal-case text-white/40 italic text-center max-w-[200px] leading-relaxed line-clamp-2">
                   "{entities[nextIdx]?.fact}"
                 </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function GamePage() {
  return (
    <Suspense fallback={<div className="h-[100svh] bg-[#08090E]" />}>
      <GameContent />
    </Suspense>
  );
}