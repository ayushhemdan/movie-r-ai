'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ResultCard from './ResultCard';

interface PlatformData {
  titles: string[];
  description: string;
  tags: string[];
  hashtags: string[];
  thumbnailIdeas: string[];
}

interface PlatformTabsProps {
  data: Record<string, PlatformData>;
  selectedPlatforms: string[];
}

const PLATFORM_LABELS: Record<string, string> = {
  youtube: 'YouTube',
  shorts: 'Shorts',
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
};

const CARD_TITLES: Record<keyof PlatformData, string> = {
  titles: 'Viral Titles',
  description: 'SEO-Optimized Description',
  tags: 'SEO Tags',
  hashtags: 'Trending Hashtags',
  thumbnailIdeas: 'Thumbnail Concepts',
};

export default function PlatformTabs({ data, selectedPlatforms }: PlatformTabsProps) {
  const [activeTab, setActiveTab] = React.useState<string>(selectedPlatforms[0] || '');

  React.useEffect(() => {
    if (selectedPlatforms.length > 0 && !selectedPlatforms.includes(activeTab)) {
      setActiveTab(selectedPlatforms[0]);
    }
  }, [selectedPlatforms, activeTab]);

  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  const availablePlatforms = selectedPlatforms.filter(p => data[p.toLowerCase()]);

  return (
    <div className="w-full space-y-6">
      {/* Tab Buttons */}
      <div className="flex flex-wrap gap-3 border-b border-gray-800 pb-4">
        {availablePlatforms.map((platform) => {
          const platformKey = platform.toLowerCase();
          const isActive = activeTab === platformKey;
          return (
            <motion.button
              key={platform}
              onClick={() => setActiveTab(platformKey)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                relative px-6 py-3 rounded-lg font-semibold transition-all duration-300
                ${
                  isActive
                    ? 'glassmorphic glow border-2 border-blue-500 text-white bg-blue-500/20'
                    : 'glassmorphic border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600'
                }
              `}
            >
              {PLATFORM_LABELS[platformKey] || platform}
            </motion.button>
          );
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {data[activeTab] && (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <ResultCard
              title={CARD_TITLES.titles}
              content={data[activeTab].titles}
              type="titles"
            />
            <ResultCard
              title={CARD_TITLES.description}
              content={data[activeTab].description}
              type="description"
            />
            <ResultCard
              title={CARD_TITLES.tags}
              content={data[activeTab].tags}
              type="tags"
            />
            <ResultCard
              title={CARD_TITLES.hashtags}
              content={data[activeTab].hashtags}
              type="hashtags"
            />
            <ResultCard
              title={CARD_TITLES.thumbnailIdeas}
              content={data[activeTab].thumbnailIdeas}
              type="thumbnailIdeas"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

