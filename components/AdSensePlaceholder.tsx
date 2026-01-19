
import React from 'react';

interface AdProps {
  type: 'leaderboard' | 'rectangle' | 'infeed';
}

const AdSensePlaceholder: React.FC<AdProps> = ({ type }) => {
  const styles = {
    leaderboard: "w-full h-[90px] max-w-[728px] mx-auto",
    rectangle: "w-full h-[250px] max-w-[300px] mx-auto",
    infeed: "w-full h-auto min-h-[150px] border-y border-zinc-800 my-8 py-4",
  };

  return (
    <div className={`bg-zinc-900 flex flex-col items-center justify-center text-zinc-500 border border-zinc-800 text-xs uppercase tracking-widest ${styles[type]}`}>
      <span className="mb-1 text-[10px] opacity-50">Publicidade</span>
      <div className="flex items-center gap-2">
        <span className="font-bold">ADSENSE</span>
        <span>{type === 'leaderboard' ? '728x90' : type === 'rectangle' ? '300x250' : 'In-feed'}</span>
      </div>
    </div>
  );
};

export default AdSensePlaceholder;
