import { useState } from 'react';
import controlButtonImg from '@assets/version_2_1773196773290.png';
import { ControlPanel } from './ControlPanel';

export function FloatingControlButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-6 top-32 md:right-8 md:top-40 z-40 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center transition-all duration-300 ease-out hover:scale-110 focus:outline-none group"
        aria-label="Open control panel"
        data-testid="button-control-panel"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Button background */}
        <div className="absolute inset-0 rounded-full bg-white dark:bg-slate-900 shadow-lg dark:shadow-2xl group-hover:shadow-2xl dark:group-hover:shadow-primary/50 transition-all duration-300" />
        
        {/* Icon */}
        <img
          src={controlButtonImg}
          alt="Control panel"
          className="w-10 h-10 md:w-12 md:h-12 relative z-10"
        />
      </button>

      <ControlPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
