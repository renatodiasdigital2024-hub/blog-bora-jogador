
import React from 'react';
import { Share2, MessageCircle, Twitter, Link as LinkIcon } from 'lucide-react';

const ShareButtons: React.FC = () => {
  const shareLinks = [
    { icon: <MessageCircle size={18} />, name: 'WhatsApp', color: 'bg-[#25D366]', text: 'Compartilhar' },
    { icon: <Twitter size={18} />, name: 'Twitter', color: 'bg-[#1DA1F2]', text: 'Tweetar' },
    { icon: <LinkIcon size={18} />, name: 'Copiar', color: 'bg-zinc-800', text: 'Copiar Link' },
  ];

  return (
    <div className="flex flex-wrap gap-3 my-8">
      {shareLinks.map((link) => (
        <button 
          key={link.name}
          className={`${link.color} text-white flex items-center gap-2 px-4 py-2 rounded font-black text-[10px] uppercase tracking-tighter hover:opacity-90 transition-opacity`}
        >
          {link.icon}
          <span>{link.text}</span>
        </button>
      ))}
    </div>
  );
};

export default ShareButtons;
