'use client';

import { motion } from 'framer-motion';
import { Film, Calendar, Tag } from 'lucide-react';
import CopyButton from './CopyButton';

interface Movie {
  title: string;
  year?: string;
  genre?: string;
  description: string;
  whyRecommend: string;
}

interface MovieRecommendationsProps {
  movies: Movie[];
}

export default function MovieRecommendations({ movies }: MovieRecommendationsProps) {
  const copyAllRecommendations = () => {
    const text = movies
      .map((movie, index) => {
        let result = `${index + 1}. ${movie.title}`;
        if (movie.year) result += ` (${movie.year})`;
        if (movie.genre) result += ` - ${movie.genre}`;
        result += `\n${movie.description}\nWhy: ${movie.whyRecommend}\n`;
        return result;
      })
      .join('\n');
    return text;
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-white">
          Recommended Movies ({movies.length})
        </h2>
        <CopyButton text={copyAllRecommendations()} />
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {movies.map((movie, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="glassmorphic rounded-2xl p-6 space-y-4 hover:border-blue-500/50 transition-all border border-gray-700"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Film className="w-5 h-5 text-blue-400" />
                  <h3 className="text-2xl font-bold text-white">{movie.title}</h3>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-3">
                  {movie.year && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{movie.year}</span>
                    </div>
                  )}
                  {movie.genre && (
                    <div className="flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      <span>{movie.genre}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-gray-300 leading-relaxed">{movie.description}</p>
              </div>
              <div className="pt-2 border-t border-gray-700">
                <p className="text-sm text-blue-300 font-medium mb-1">Why we recommend this:</p>
                <p className="text-gray-400 text-sm leading-relaxed">{movie.whyRecommend}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

