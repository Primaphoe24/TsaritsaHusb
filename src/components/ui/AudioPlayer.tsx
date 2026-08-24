'use client';

import React, { useState, useRef } from 'react';
import { Music, Play, Pause, Volume2 } from 'lucide-react';
import { SnowflakeXIcon } from './SnowflakeXIcon';

export interface AudioPlayerProps {
  audioSrc?: string; // Path file audio (default: '/assets/audio/winter_romance.mp3')
}

/**
 * Music Note Button & Background Audio Player Component using Lucide icons.
 * Features sharp diamond Play/Pause button, custom active volume trail, and bright frosted glass container.
 */
export function AudioPlayer({ audioSrc = '/assets/audio/winter_romance.mp3' }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Audio play failed:', err);
        });
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  return (
    <div className="relative">
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={audioSrc} loop />

      {/* Music Note Trigger Button */}
      <button
        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        title="Musik Latar Belakang"
        className={`relative flex items-center justify-center h-9 w-9 transition-all ${
          isPlaying
            ? 'text-sky-300 shadow-md shadow-sky-500/20'
            : 'text-slate-300 hover:text-white hover:border-white/20'
        }`}
      >
        {isPlaying ? (
          <div className="flex items-end gap-0.5 h-3.5">
            <span className="w-0.5 bg-sky-400 rounded-full animate-bounce [animation-delay:0ms] h-full" />
            <span className="w-0.5 bg-sky-300 rounded-full animate-bounce [animation-delay:150ms] h-2.5" />
            <span className="w-0.5 bg-teal-300 rounded-full animate-bounce [animation-delay:300ms] h-3" />
          </div>
        ) : (
          <Music className="w-4 h-4 text-sky-400" />
        )}
      </button>

      {/* Popover Audio Controls */}
      {isPopoverOpen && (
        <div className="absolute right-0 mt-3 w-64 rounded-lg border border-white/25 bg-slate-800/40 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-3xl z-50 animate-in fade-in slide-in-from-top-2 duration-200 text-white">
          <div className="flex items-center justify-between mb-3 border-b border-white/20 pb-2">
            <div className="flex items-center gap-2">
              <Music className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-xs font-semibold text-white">Putar Musik</span>
            </div>
            <button
              onClick={() => setIsPopoverOpen(false)}
              className="group text-slate-300 hover:text-white transition-colors p-0.5"
            >
              <SnowflakeXIcon className="w-3.5 h-3.5 text-sky-200 group-hover:text-white group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          {/* Sharp Diamond Play/Pause Button & Title */}
          <div className="flex items-center gap-4 mb-3.5 px-1">
            {/* Belah Ketupat Runcing (Sharp Rhombus / Diamond) Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="relative flex h-8 w-8 shrink-0 items-center justify-center rotate-45 rounded-sm bg-gradient-to-tr from-sky-400 via-teal-300 to-sky-200 text-slate-950 font-bold shadow-md shadow-sky-500/30 border border-white/40 hover:scale-110 active:scale-95 transition-all my-1.5 ml-1"
            >
              {isPlaying ? (
                <Pause className="-rotate-45 w-3.5 h-3.5 fill-current text-slate-950" />
              ) : (
                <Play className="-rotate-45 w-3.5 h-3.5 fill-current text-slate-950 ml-0.5" />
              )}
            </button>
            <div className="overflow-hidden ml-1">
              <p className="text-xs font-bold text-white truncate leading-tight">
                {isPlaying ? 'Memutar Musik Winter' : 'Snezhnaya Audio Track'}
              </p>
              <p className="text-[10px] text-slate-200 mt-0.5">Dingin membeku</p>
            </div>
          </div>

          {/* Custom Volume Slider with Active Gradient Trail */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] text-slate-200 font-medium">
              <span className="flex items-center gap-1">
                <Volume2 className="w-3 h-3 text-sky-400" /> Volume
              </span>
              <span className="font-mono text-sky-300">{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              style={{
                background: `linear-gradient(to right, #38bdf8 0%, #2dd4bf ${
                  volume * 100
                }%, rgba(255, 255, 255, 0.2) ${volume * 100}%, rgba(255, 255, 255, 0.2) 100%)`,
              }}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-sky-400 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-sky-400 [&::-webkit-slider-thumb]:shadow-[0_0_10px_#38bdf8] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white transition-all"
            />
          </div>
        </div>
      )}
    </div>
  );
}
