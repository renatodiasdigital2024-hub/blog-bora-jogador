
import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  category: string;
  subCategory?: string;
  title: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ category, subCategory, title }) => {
  return (
    <nav className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-500 mb-8 overflow-x-auto whitespace-nowrap pb-2 md:pb-0">
      <a href="#" className="hover:text-green-500 transition-colors flex items-center gap-1">
        <Home size={12} />
        Início
      </a>
      <ChevronRight size={12} />
      <a href="#" className="hover:text-green-500 transition-colors">{category}</a>
      {subCategory && (
        <>
          <ChevronRight size={12} />
          <a href="#" className="hover:text-green-500 transition-colors">{subCategory}</a>
        </>
      )}
      <ChevronRight size={12} />
      <span className="text-zinc-300 truncate max-w-[150px] md:max-w-none">{title}</span>
    </nav>
  );
};

export default Breadcrumbs;
