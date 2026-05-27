import React from 'react';

interface MangaSpeechProps {
  children: React.ReactNode;
  speaker?: string;
  className?: string;
  tailPosition?: 'bottom' | 'left' | 'none';
  bubbleColor?: string;
  textColor?: string;
  id?: string;
}

export const MangaSpeech: React.FC<MangaSpeechProps> = ({
  children,
  speaker,
  className = '',
  tailPosition = 'bottom',
  bubbleColor = 'bg-white',
  textColor = 'text-black',
  id,
}) => {
  return (
    <div id={id} className={`relative flex flex-col items-start ${className}`}>
      {/* Speaker Name Tag */}
      {speaker && (
        <div className="bg-black text-white text-[11px] font-mono font-bold tracking-widest px-2.5 py-0.5 border-t-2 border-r-2 border-l-2 border-black -mb-0.5 ml-4 uppercase relative z-10">
          ● {speaker}
        </div>
      )}

      {/* Bubble Container */}
      <div
        className={`
          w-full 
          ${bubbleColor} 
          ${textColor} 
          manga-border-thick 
          p-4 
          shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
          relative 
          z-0
        `}
      >
        <div className="absolute top-0 left-0 w-2.5 h-2.5 border-b-2 border-r-2 border-black pointer-events-none" />
        <div className="absolute top-0 right-0 w-2.5 h-2.5 border-b-2 border-l-2 border-black pointer-events-none" />
        
        {/* Render actual content */}
        <div className="prose prose-sm font-sans tracking-tight leading-snug">
          {children}
        </div>

        {/* Tail Element */}
        {tailPosition === 'bottom' && (
          <div className="absolute -bottom-4 left-8">
            <div className="w-4 h-4 bg-black speech-tip-bottom" />
            <div className="w-3 h-3 bg-white speech-tip-bottom absolute top-0 left-[2px] z-10" />
          </div>
        )}

        {tailPosition === 'left' && (
          <div className="absolute top-6 -left-4">
            <div className="w-4 h-4 bg-black speech-tip-left" />
            <div className="w-3 h-3 bg-white speech-tip-left absolute top-[2px] left-0.5 z-10" />
          </div>
        )}
      </div>
    </div>
  );
};
