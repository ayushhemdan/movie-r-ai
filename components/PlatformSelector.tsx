'use client';

import { Sparkles } from 'lucide-react';

interface PlatformSelectorProps {
  platforms: string[];
  selectedPlatforms: string[];
  onToggle: (platform: string) => void;
}

const PLATFORMS = [
  { id: 'youtube', label: 'YouTube' },
  { id: 'shorts', label: 'Shorts' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'facebook', label: 'Facebook' },
  { id: 'all', label: 'All' },
];

export default function PlatformSelector({
  platforms,
  selectedPlatforms,
  onToggle,
}: PlatformSelectorProps) {
  const handleToggle = (platformId: string) => {
    if (platformId === 'all') {
      const allPlatformIds = PLATFORMS.filter(p => p.id !== 'all').map(p => p.id);
      const allSelected = allPlatformIds.every(p => selectedPlatforms.includes(p));
      
      if (allSelected) {
        // Clear all selections by toggling each selected platform
        const currentSelected = [...selectedPlatforms];
        currentSelected.forEach(p => onToggle(p));
      } else {
        // Select all platforms that aren't already selected
        allPlatformIds.forEach(p => {
          if (!selectedPlatforms.includes(p)) {
            onToggle(p);
          }
        });
      }
    } else {
      onToggle(platformId);
    }
  };

  const isSelected = (id: string) => {
    if (id === 'all') {
      return PLATFORMS.filter(p => p.id !== 'all').every(p => selectedPlatforms.includes(p.id));
    }
    return selectedPlatforms.includes(id);
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {PLATFORMS.map((platform) => {
        const selected = isSelected(platform.id);
        return (
          <button
            key={platform.id}
            onClick={() => handleToggle(platform.id)}
            className={`
              relative px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300
              ${
                selected
                  ? 'glassmorphic glow border-2 border-blue-500 text-white bg-blue-500/20'
                  : 'glassmorphic border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600'
              }
            `}
          >
            {selected && (
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-blue-400 animate-pulse" />
            )}
            {platform.label}
          </button>
        );
      })}
    </div>
  );
}

