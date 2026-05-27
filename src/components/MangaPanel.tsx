import React, { useState } from 'react';

interface MangaPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  soundFx?: string;
  soundFxPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  shadowColor?: 'black' | 'magenta' | 'yellow' | 'cyan' | 'none';
  hasScreentone?: boolean;
  skewAngle?: string; // e.g. "-skew-x-1" for manga cut layout
  soundFxColor?: string;
  hoverScale?: boolean;
  badge?: string;
}

export const MangaPanel: React.FC<MangaPanelProps> = ({
  children,
  soundFx,
  soundFxPosition = 'top-right',
  shadowColor = 'black',
  hasScreentone = false,
  skewAngle = '',
  soundFxColor = 'bg-yellow-400 text-black',
  hoverScale = true,
  badge,
  className = '',
  id,
  ...props
}) => {
  const [fxActive, setFxActive] = useState(false);

  const shadowClasses = {
    black: 'manga-shadow-black',
    magenta: 'manga-shadow-magenta',
    yellow: 'manga-shadow-yellow',
    cyan: 'manga-shadow-cyan',
    none: '',
  };

  const fxPositionClasses = {
    'top-left': '-top-3 -left-3 -rotate-12',
    'top-right': '-top-3 -right-3 rotate-12',
    'bottom-left': '-bottom-3 -left-3 rotate-12',
    'bottom-right': '-bottom-3 -right-3 -rotate-12',
  };

  const handleMouseEnter = () => {
    setFxActive(true);
  };

  const handleMouseLeave = () => {
    setFxActive(false);
  };

  return (
    <div
      id={id}
      className={`
        relative 
        bg-white 
        text-black 
        manga-border-thick 
        ${shadowClasses[shadowColor]} 
        ${skewAngle} 
        transition-all 
        duration-200 
        ${hoverScale ? 'hover:-translate-y-1 hover:translate-x-0.5' : ''}
        ${className}
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Screentone Overlay */}
      {hasScreentone && (
        <div className="absolute inset-0 manga-dots-light opacity-30 pointer-events-none" />
      )}

      {/* Decorative Manga Corner Guards */}
      <div className="absolute top-0 left-0 w-2 h-2 border-b-2 border-r-2 border-black pointer-events-none" />
      <div className="absolute top-0 right-0 w-2 h-2 border-b-2 border-l-2 border-black pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-t-2 border-r-2 border-black pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-t-2 border-l-2 border-black pointer-events-none" />

      {/* Manga Panel Badge */}
      {badge && (
        <span className="absolute -top-3.5 left-4 px-2 py-0.5 text-[10px] uppercase font-mono tracking-widest bg-black text-white rounded-none border border-black z-30">
          {badge}
        </span>
      )}

      {/* Sound Effect (Sound FX) Explosion */}
      {soundFx && (
        <div
          className={`
            absolute 
            ${fxPositionClasses[soundFxPosition]} 
            ${soundFxColor} 
            border-2 
            border-black 
            px-3 
            py-1 
            font-extrabold 
            font-mono 
            tracking-wider 
            text-xs 
            uppercase 
            shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
            pointer-events-none 
            z-40 
            transition-transform 
            duration-150 
            ${fxActive ? 'scale-125 rotate-6' : 'scale-100'}
          `}
        >
          {soundFx}
        </div>
      )}

      {/* Element Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};
