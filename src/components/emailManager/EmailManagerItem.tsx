import React from 'react';

interface GameManagerItemProps {
  title: string;
  summary: string;
  usage: string;
}

const GameManagerItem: React.FC<GameManagerItemProps> = ({ title, summary, usage }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 w-64 m-2 shadow-sm">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 italic mb-1">{summary}</p>
      <p className="text-sm text-gray-700">{usage}</p>
    </div>
  );
};

export default GameManagerItem;
