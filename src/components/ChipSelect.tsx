import React, { useState } from 'react';

interface ChipSelectProps {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}

export const ChipSelect: React.FC<ChipSelectProps> = ({ items, onChange, placeholder = 'Hinzufügen...' }) => {
  const [input, setInput] = useState('');
  const [removedItems, setRemovedItems] = useState<Set<string>>(new Set());

  const toggleItem = (item: string) => {
    const newRemoved = new Set(removedItems);
    if (newRemoved.has(item)) {
      newRemoved.delete(item);
    } else {
      newRemoved.add(item);
    }
    setRemovedItems(newRemoved);
    onChange(items.filter(i => !newRemoved.has(i)));
  };

  const addItem = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    if (!items.includes(trimmed)) {
      const newItems = [...items, trimmed];
      onChange(newItems);
    }
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addItem();
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-3">
        {items.map(item => (
          <button
            key={item}
            type="button"
            onClick={() => toggleItem(item)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
              removedItems.has(item)
                ? 'border-gray-700 bg-gray-800 text-gray-500 opacity-50'
                : 'border-primary bg-primary/20 text-white hover:bg-primary/30'
            }`}
          >
            {removedItems.has(item) ? (
              <span className="flex items-center gap-1">
                <span className="text-gray-500">+</span> {item}
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <span className="text-accent">✓</span> {item}
                <span className="text-gray-400 ml-1">×</span>
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary"
        />
        <button
          type="button"
          onClick={addItem}
          className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg text-white text-sm font-medium transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
};
