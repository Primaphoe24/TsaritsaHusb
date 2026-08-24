import React from 'react';

/**
 * Snowflake Exit/Close Icon shaped like an 'X'.
 * Combines an unmistakable exit 'X' shape with crystalline snowflake side branches
 * and central ice dots for a theme-consistent close button.
 */
export function SnowflakeXIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Primary X Diagonal Arms */}
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />

      {/* Top-Left Snowflake Arm Branches */}
      <line x1="8" y1="8" x2="5.2" y2="8" />
      <line x1="8" y1="8" x2="8" y2="5.2" />

      {/* Top-Right Snowflake Arm Branches */}
      <line x1="16" y1="8" x2="18.8" y2="8" />
      <line x1="16" y1="8" x2="16" y2="5.2" />

      {/* Bottom-Left Snowflake Arm Branches */}
      <line x1="8" y1="16" x2="5.2" y2="16" />
      <line x1="8" y1="16" x2="8" y2="18.8" />

      {/* Bottom-Right Snowflake Arm Branches */}
      <line x1="16" y1="16" x2="18.8" y2="16" />
      <line x1="16" y1="16" x2="16" y2="18.8" />

      {/* Subtle Cardinal Ice Crystal Tips */}
      <line x1="12" y1="3.5" x2="12" y2="6.5" />
      <line x1="12" y1="17.5" x2="12" y2="20.5" />
      <line x1="3.5" y1="12" x2="6.5" y2="12" />
      <line x1="17.5" y1="12" x2="20.5" y2="12" />

      {/* Center Ice Crystal Core */}
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}
