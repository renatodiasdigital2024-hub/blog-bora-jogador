
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-[500px] lg:h-[650px] overflow-hidden bg-black group">
      {/* Background Image with Overlay */}
      <img 
        src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=2000" 
        alt="Destaque da Rodada"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-12 lg:pb-20">
        <div className="max-w-4xl">
          <span className="inline-block bg-green-500 text-black px-4 py-1 text-sm font-black uppercase mb-4 tracking-tighter">
            Bola Cheia da Rodada
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight drop-shadow-2xl">
            COMO O MEIO-CAMPO MODERNO REVOLUCIONOU O BRASILEIRÃO
          </h1>
          <p className="text-zinc-300 text-lg md:text-xl max-w-2xl mb-8 font-medium leading-relaxed">
            Analisamos como as novas formações táticas estão transformando o ritmo do nosso futebol e quem são os craques que ditam as regras.
          </p>
          <a 
            href="#" 
            className="inline-flex items-center justify-center bg-white text-black px-8 py-4 font-black uppercase text-base hover:bg-green-500 transition-colors duration-300"
          >
            Ler Matéria Completa
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
