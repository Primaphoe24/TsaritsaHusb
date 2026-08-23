'use client';

import React, { useState, useRef } from 'react';
import { Music, Play, Pause, Volume2, X } from 'lucide-react';

export interface AudioPlayerProps {
  audioSrc?: string; // Path file audio (default: '/assets/audio/winter_romance.mp3')
}

/**
 * Music Note Button & Background Audio Player Component using Lucide icons.
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
        title="Pemutar Musik Background"
        className={`relative flex items-center justify-center h-9 w-9 rounded-lg border transition-all ${
          isPlaying
            ? 'bg-sky-500/20 border-sky-400/50 text-sky-300 shadow-md shadow-sky-500/20'
            : 'bg-slate-900/80 border-white/10 text-slate-300 hover:text-white hover:border-white/20'
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
        <div className="absolute right-0 mt-3 w-60 rounded-2xl border border-white/15 bg-slate-950/90 p-4 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <Music className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-xs font-semibold text-white">Musik Latar</span>
            </div>
            <button
              onClick={() => setIsPopoverOpen(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Play/Pause Button & Title */}
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={togglePlay}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-400 to-teal-300 text-slate-950 font-bold shadow-md shadow-sky-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>
            <div className="overflow-hidden">
              <p className="text-xs font-medium text-white truncate">
                {isPlaying ? 'Memutar Musik Winter' : 'Putar Musik Winter'}
              </p>
              <p className="text-[10px] text-slate-400">Atmospheric Audio Track</p>
            </div>
          </div>

          {/* Volume Slider */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <Volume2 className="w-3 h-3 text-slate-400" /> Volume
              </span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
            />
          </div>
        </div>
      )}
    </div>
  );
}
