
import React from 'react';
import AdSensePlaceholder from './AdSensePlaceholder';

const Sidebar: React.FC = () => {
  const trendingPosts = [
    { id: 1, rank: "01", title: "Os segredos da preparação física do Palmeiras" },
    { id: 2, rank: "02", title: "Onde assistir aos jogos da Champions League" },
    { id: 3, rank: "03", title: "Flamengo busca reforço de peso na Europa" },
    { id: 4, rank: "04", title: "Análise: Por que o 4-3-3 está voltando com tudo?" },
    { id: 5, rank: "05", title: "Top 10 camisas mais bonitas da temporada" },
  ];

  return (
    <aside className="space-y-12">
      {/* Search Widget - Alternative for Desktop */}
      <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
        <h3 className="text-white font-black uppercase tracking-tighter mb-4 border-l-4 border-green-500 pl-3">
          Pesquisar no Blog
        </h3>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Ex: Tática, Craques..."
            className="w-full bg-black border border-zinc-800 text-white p-3 pr-10 rounded text-sm focus:border-green-500 focus:outline-none transition-colors"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
        </div>
      </div>

      {/* Ad Widget */}
      <div className="sticky top-24 space-y-12">
        <AdSensePlaceholder type="rectangle" />

        {/* Trending Widget */}
        <div className="bg-zinc-950 p-0">
          <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-green-500 inline-block"></span>
            MAIS LIDAS
          </h3>
          <div className="space-y-6">
            {trendingPosts.map((post) => (
              <a key={post.id} href="#" className="flex gap-4 group cursor-pointer">
                <span className="text-3xl font-black text-zinc-800 group-hover:text-green-500/30 transition-colors">
                  {post.rank}
                </span>
                <p className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors leading-snug">
                  {post.title}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter Widget */}
        <div className="bg-green-600 p-8 rounded-2xl relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-20 transform group-hover:scale-110 transition-transform duration-500">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <h4 className="text-black font-black text-xl mb-2 relative z-10">BOLA NA CAIXA</h4>
            <p className="text-black/80 text-sm font-semibold mb-6 relative z-10">Receba as melhores análises e notícias direto no seu e-mail.</p>
            <div className="space-y-2 relative z-10">
                <input type="email" placeholder="Seu melhor e-mail" className="w-full bg-white/20 border border-black/10 p-3 rounded text-sm placeholder:text-black/50 text-black font-medium focus:bg-white transition-all"/>
                <button className="w-full bg-black text-white p-3 rounded font-black text-xs uppercase tracking-widest hover:bg-zinc-800 transition-colors">Inscrever-se</button>
            </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
