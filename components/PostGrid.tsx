
import React from 'react';
import AdSensePlaceholder from './AdSensePlaceholder';
import { Post } from '../types';

const MOCK_POSTS: Post[] = [
  {
    id: 1,
    title: "Análise Pré-Jogo: O clássico que pode definir o título",
    excerpt: "Tudo o que você precisa saber antes da bola rolar no Maracanã este domingo.",
    category: "Pré-jogo",
    imageUrl: "https://picsum.photos/id/10/800/600",
    date: "10 Jan 2024",
    author: "Felipe Silva"
  },
  {
    id: 2,
    title: "Craques do Passado: A mágica de Garrincha em 1962",
    excerpt: "Relembramos o torneio onde o 'Anjo das Pernas Tortas' carregou o Brasil nas costas.",
    category: "Só Lendas",
    imageUrl: "https://picsum.photos/id/20/800/600",
    date: "09 Jan 2024",
    author: "Zico Jr."
  },
  {
    id: 3,
    title: "Bola Murcha: Por que a defesa do líder está falhando?",
    excerpt: "Dados mostram queda de rendimento nos últimos 5 jogos do campeonato.",
    category: "Análise",
    imageUrl: "https://picsum.photos/id/30/800/600",
    date: "08 Jan 2024",
    author: "Marco Tático"
  },
  {
    id: 4,
    title: "Entendendo o Futebol: O que é o 'Falso 9'?",
    excerpt: "Um guia completo sobre a função que mudou o papel dos atacantes modernos.",
    category: "Olho no Lance",
    imageUrl: "https://picsum.photos/id/40/800/600",
    date: "07 Jan 2024",
    author: "Prof. Pardal"
  },
  {
    id: 5,
    title: "Curiosidades: Os estádios mais bizarros do mundo",
    excerpt: "De campos flutuantes a arenas dentro de pedreiras, veja o inusitado.",
    category: "Curiosidades",
    imageUrl: "https://picsum.photos/id/50/800/600",
    date: "06 Jan 2024",
    author: "Ana Gols"
  },
  {
    id: 6,
    title: "Últimas: Revelação da base assina contrato milionário",
    excerpt: "Promessa de 16 anos já atrai olhares dos gigantes europeus.",
    category: "Brasileirão",
    imageUrl: "https://picsum.photos/id/60/800/600",
    date: "05 Jan 2024",
    author: "André Notícias"
  }
];

const PostGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {MOCK_POSTS.map((post, index) => (
        <React.Fragment key={post.id}>
          {/* Insert Ad after the 3rd post */}
          {index === 3 && (
            <div className="col-span-full">
              <AdSensePlaceholder type="infeed" />
            </div>
          )}
          
          <article className="group cursor-pointer">
            <div className="relative overflow-hidden aspect-video mb-4 bg-zinc-900 rounded-lg">
              <img 
                src={post.imageUrl} 
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-green-500 text-black px-3 py-1 text-[10px] font-black uppercase tracking-wider">
                  {post.category}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-semibold uppercase tracking-widest">
                <span>{post.date}</span>
                <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
                <span>Por {post.author}</span>
              </div>
              <h2 className="text-2xl font-black text-white leading-tight group-hover:text-green-500 transition-colors">
                {post.title}
              </h2>
              <p className="text-zinc-400 text-sm line-clamp-2 leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          </article>
        </React.Fragment>
      ))}
    </div>
  );
};

export default PostGrid;
