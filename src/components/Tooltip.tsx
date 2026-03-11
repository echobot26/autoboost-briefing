import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  content: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ content }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block ml-1">
      <button
        type="button"
        className="w-5 h-5 rounded-full bg-gray-600 hover:bg-accent text-white text-xs flex items-center justify-center transition-colors focus:outline-none"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onClick={() => setVisible(!visible)}
        aria-label="Info"
      >
        i
      </button>
      {visible && (
        <div className="absolute z-50 left-6 top-0 w-64 bg-gray-800 border border-gray-600 rounded-lg p-3 text-sm text-gray-200 shadow-xl">
          <div className="absolute left-[-6px] top-2 w-3 h-3 bg-gray-800 border-l border-t border-gray-600 rotate-[-45deg]" />
          {content}
        </div>
      )}
    </div>
  );
};
