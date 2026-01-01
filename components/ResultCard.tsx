'use client';

import CopyButton from './CopyButton';

interface ResultCardProps {
  title: string;
  content: string | string[];
  type: 'titles' | 'description' | 'tags' | 'hashtags' | 'thumbnailIdeas';
}

export default function ResultCard({ title, content, type }: ResultCardProps) {
  const formatContent = () => {
    if (Array.isArray(content)) {
      if (type === 'titles') {
        return (
          <div className="space-y-3">
            {content.map((item, index) => (
              <div key={index} className="p-4 rounded-lg bg-black/20 border border-white/5">
                <p className="text-white font-medium">{item}</p>
                <div className="mt-2 flex justify-end">
                  <CopyButton text={item} />
                </div>
              </div>
            ))}
          </div>
        );
      } else if (type === 'tags' || type === 'hashtags') {
        return (
          <div className="flex flex-wrap gap-2">
            {content.map((item, index) => (
              <span
                key={index}
                className="px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-sm border border-blue-500/30"
              >
                {item}
              </span>
            ))}
          </div>
        );
      } else {
        return (
          <ul className="space-y-2 list-disc list-inside text-gray-300">
            {content.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        );
      }
    } else {
      return (
        <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{content}</p>
      );
    }
  };

  const getCopyText = () => {
    if (Array.isArray(content)) {
      return content.join(type === 'tags' || type === 'hashtags' ? ' ' : '\n');
    }
    return content;
  };

  return (
    <div className="glassmorphic rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <CopyButton text={getCopyText()} />
      </div>
      <div className="pt-2">{formatContent()}</div>
    </div>
  );
}

