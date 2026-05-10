"use client";

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Play, Shuffle, Zap, Trophy, Globe, Terminal } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [booting, setBooting] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);
  const [dailyStatus, setDailyStatus] = useState<{ completed: boolean; streak: number }>({
    completed: false,
    streak: 0,
  });

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setBootProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setBooting(false), 200);
          return 100;
        }
        return prev + 10;
      });
    }, 15);

    const today = new Date().toISOString().split('T')[0];
    const lastPlayed = localStorage.getItem('tf-daily-last-played');
    const streak = parseInt(localStorage.getItem('tf-daily-streak') || '0');
    
    setDailyStatus({
      completed: lastPlayed === today,
      streak: streak,
    });

    return () => clearInterval(progressInterval);
  }, []);

  if (booting) {
    return (
      <main className="h-[100svh] max-w-[430px] mx-auto flex flex-col items-center justify-center p-8 bg-[#08090E] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="w-full space-y-8 z-10">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 border border-[#00E5A0] flex items-center justify-center text-[#00E5A0] animate-pulse box-glow-teal mb-4">
              <Terminal className="w-6 h-6" />
            </div>
            <h2 className="pixel-num text-[10px] text-[#00E5A0] tracking-[0.4em] text-glow-teal">RAUNAK PATIL STUDIOS</h2>
            <h1 className="hud-label text-[12px] text-white/40 tracking-[0.2em]">INITIALIZING_FLUX_ENGINE</h1>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between hud-label text-[8px] opacity-40">
              <span className="animate-pulse">BOOTLOADER_v4.2.0</span>
              <span>{bootProgress}%</span>
            </div>
            <div className="h-[2px] bg-white/5 w-full relative overflow-hidden">
              <div 
                className="h-full bg-[#00E5A0] transition-all duration-100 shadow-[0_0_10px_#00E5A0]"
                style={{ width: `${bootProgress}%` }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="hud-label text-[7px] text-[#00E5A0]/60">{'>'} MOUNTING_CORE_DATA...</p>
              {bootProgress > 40 && <p className="hud-label text-[7px] text-[#00E5A0]/60">{'>'} SYNCING_GLOBAL_METRICS...</p>}
              {bootProgress > 70 && <p className="hud-label text-[7px] text-[#00E5A0]/60">{'>'} ALLOCATING_FLUX_BUFFERS...</p>}
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="h-[100svh] max-w-[430px] mx-auto flex flex-col p-4 relative overflow-hidden bg-[#08090E] animate-in fade-in duration-1000">
      <div className="flex items-center justify-between shrink-0 pb-4 z-20">
        <div className="flex items-center gap-2 px-3 py-1 bg-black/40 border border-white/10 rounded-full box-glow-teal">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E5A0] animate-pulse shadow-[0_0_8px_#00E5A0]" />
          <span className="hud-label text-[8px] tracking-[0.2em] text-glow-teal">ENGINE_v4.2</span>
        </div>
        
        <Link href="/leaderboard" className="panel p-2 hover:bg-white/5 border-white/10 rounded-full box-glow-gold group transition-all">
          <Trophy className="w-5 h-5 text-[#FFB800] text-glow-gold group-hover:scale-110 transition-transform" />
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center shrink-0 mb-12 mt-8">
        <h1 className="flex flex-col items-center relative select-none">
          <span className="pixel-num text-[32px] sm:text-[36px] text-[#F3F4F6] leading-none animate-glitch text-glow-white tracking-tighter">TRIVIA</span>
          <span className="pixel-num text-[48px] sm:text-[56px] text-[#00E5A0] italic leading-none mt-1 animate-glitch text-glow-teal tracking-tight">FLUX</span>
        </h1>
      </div>

      <div className="flex-1 flex flex-col gap-3 min-h-0 overflow-hidden mb-2">
        <div className="flex-[1.2] min-h-0">
          <ModePanel 
            href="/game?mode=classic"
            code="MODE_01"
            title="CLASSIC"
            description="ENDLESS_DATA_STREAM"
            tagline="— ONE_STRIKE_OUT"
            color="#00E5A0"
            glowClass="text-glow-teal"
            icon={<Play className="w-6 h-6 fill-current" />}
            layout="featured"
          />
        </div>

        <div className="flex-[1] grid grid-cols-2 gap-3 min-h-0">
          <ModePanel 
            href="/game?mode=trivia"
            code="MODE_02"
            title="TRIVIA MIX"
            description="RAPID_SYNC"
            color="#8B7FFF"
            glowClass="text-glow-purple"
            icon={<Shuffle className="w-5 h-5" />}
            layout="centered"
          />
          <ModePanel 
            href="/game?mode=challenge"
            code="MODE_03"
            title="CHALLENGE"
            description="OVERCLOCK_TIMER"
            color="#FF5C35"
            glowClass="text-glow-coral"
            icon={<Zap className="w-5 h-5" />}
            layout="centered"
          />
        </div>

        <div className="flex-[0.8] min-h-0">
          <ModePanel 
            href={dailyStatus.completed ? "#" : "/game?mode=daily"}
            code={dailyStatus.completed ? "MODE_04_COMPLETE" : "MODE_04_DAILY"}
            title="DAILY SYNC"
            description={dailyStatus.completed ? "NEXT_REBOOT_IN_24H" : "GLOBAL_SEED_ACTIVE"}
            color={dailyStatus.completed ? "#4A4D60" : "#FFB800"}
            glowClass={dailyStatus.completed ? "" : "text-glow-gold"}
            icon={<Globe className="w-5 h-5" />}
            layout="daily"
            extra={<div className="pixel-num text-[9px] text-[#FFB800] text-glow-gold">STREAK: {dailyStatus.streak}</div>}
          />
        </div>
      </div>

      <footer className="shrink-0 py-4 flex flex-col items-center gap-1 opacity-20">
        <p className="pixel-num text-[8px] tracking-[0.2em] text-[#00E5A0] text-glow-teal uppercase">Raunak Patil Studios</p>
      </footer>
    </main>
  );
}

function ModePanel({ 
  href, code, title, description, tagline, color, glowClass, icon, layout, extra
}: { 
  href: string; code: string; title: string; description: string; tagline?: string; color: string; glowClass?: string; icon: React.ReactNode; layout: 'featured' | 'centered' | 'daily'; extra?: React.ReactNode;
}) {
  return (
    <Link href={href} className={cn("h-full block active:scale-[0.98] transition-transform min-h-0", href === "#" && "cursor-default opacity-60")}>
      <div 
        className={cn(
          "panel p-3 sm:p-4 flex group transition-colors h-full min-h-0 panel-bg-stack relative",
          layout === 'centered' ? "flex-col items-center justify-center text-center gap-2" : "items-center gap-4"
        )}
        style={{ borderTop: `2px solid ${color}`, boxShadow: `0 0 15px ${color}11` }}
      >
        <div className={cn("flex flex-col z-10 min-w-0", (layout === 'centered' || layout === 'daily') ? "order-last items-start" : "flex-1")}>
          <span className={cn("hud-label text-[7px] mb-1 truncate", glowClass)} style={{ color }}>{code}</span>
          <h3 className={cn("pixel-num text-white tracking-wide truncate text-glow-white", layout === 'featured' ? "text-[14px]" : "text-[11px]")}>{title}</h3>
          <div className={cn("mt-1", layout === 'centered' && "hidden sm:block")}>
            <p className="hud-label text-[7px] opacity-40 lowercase leading-tight truncate">{description}</p>
            {tagline && <p className="hud-label text-[7px] opacity-30 mt-1 truncate">{tagline}</p>}
          </div>
        </div>
        
        <div 
          className={cn(
            "flex items-center justify-center rounded-lg bg-black/40 border border-white/5 p-2 sm:p-3 transition-transform duration-300 group-hover:scale-110 shrink-0 z-10",
            (layout === 'centered' || layout === 'daily') ? "order-first" : ""
          )}
          style={{ color, borderColor: `${color}33`, boxShadow: `0 0 15px ${color}22` }}
        >
          {icon}
        </div>

        {layout === 'daily' && extra && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-right">
            {extra}
          </div>
        )}
      </div>
    </Link>
  );
}
