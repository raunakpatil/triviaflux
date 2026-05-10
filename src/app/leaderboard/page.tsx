"use client";

import { Trophy, ArrowLeft, Zap, Play, Shuffle, Globe } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const MODES = [
  { id: 'classic',   label: 'CLASSIC',   color: '#00E5A0', icon: <Play className="w-3 h-3" /> },
  { id: 'trivia',    label: 'TRIVIA',    color: '#8B7FFF', icon: <Shuffle className="w-3 h-3" /> },
  { id: 'challenge', label: 'CHALLENGE', color: '#FF5C35', icon: <Zap className="w-3 h-3" /> },
  { id: 'daily',     label: 'DAILY',     color: '#FFB800', icon: <Globe className="w-3 h-3" /> },
];

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState('classic');
  const [scores, setScores] = useState<Record<string, number>>({});

  useEffect(() => {
    const result: Record<string, number> = {};
    MODES.forEach(({ id }) => {
      result[id] = parseInt(localStorage.getItem(`tf-score-${id}`) || '0');
    });
    setScores(result);
  }, []);

  const activeMode = MODES.find(m => m.id === activeTab)!;
  const score = scores[activeTab] ?? 0;

  return (
    <main className="h-[100svh] max-w-[430px] mx-auto flex flex-col p-6 bg-[#08090E] overflow-hidden">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/" className="panel p-2 hover:bg-white/5 border-white/10 rounded-full box-glow-teal">
          <ArrowLeft className="w-4 h-4 text-white" />
        </Link>
        <h1 className="hud-label text-white text-sm tracking-[0.3em] text-glow-white">HALL_OF_FAME.DAT</h1>
      </div>

      {/* Mode tabs */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {MODES.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setActiveTab(mode.id)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-mono tracking-widest border rounded transition-all',
              activeTab === mode.id
                ? 'border-current'
                : 'border-white/10 text-white/30'
            )}
            style={activeTab === mode.id ? { color: mode.color, borderColor: mode.color, boxShadow: `0 0 10px ${mode.color}33` } : {}}
          >
            {mode.icon}
            {mode.label}
          </button>
        ))}
      </div>

      {/* Best score display */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <Trophy className="w-14 h-14" style={{ color: activeMode.color, filter: `drop-shadow(0 0 12px ${activeMode.color})` }} />
        <p className="hud-label text-[9px] text-white/30 tracking-[0.4em]">YOUR BEST SCORE</p>
        <p
          className="pixel-num text-[72px] leading-none"
          style={{ color: activeMode.color, textShadow: `0 0 30px ${activeMode.color}` }}
        >
          {score.toString().padStart(5, '0')}
        </p>
        <p className="hud-label text-[9px] tracking-[0.3em]" style={{ color: activeMode.color }}>
          {activeMode.label}_MODE
        </p>
      </div>

      {/* All scores summary */}
      <div className="panel p-4 mt-4 space-y-3">
        <p className="hud-label text-[8px] text-white/30 tracking-widest mb-3">ALL_TIME_RECORDS</p>
        {MODES.map((mode) => (
          <div key={mode.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2" style={{ color: mode.color }}>
              {mode.icon}
              <span className="hud-label text-[8px] tracking-widest">{mode.label}</span>
            </div>
            <span className="pixel-num text-[11px] text-white">
              {(scores[mode.id] ?? 0).toString().padStart(5, '0')}
            </span>
          </div>
        ))}
      </div>

      <p className="text-center text-white/15 text-[7px] font-mono mt-4 tracking-widest">
        OFFLINE MODE — LOCAL SCORES ONLY
      </p>
    </main>
  );
}
