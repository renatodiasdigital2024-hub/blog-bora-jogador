import React from 'react';

const About = () => {
    return (
        <div className="bg-black text-white min-h-screen font-sans selection:bg-green-500 selection:text-black">
            {/* Hero Sobre */}
            <div className="bg-zinc-900 py-16 border-b border-zinc-800">
                <div className="container mx-auto px-4 text-center">
                    <span className="text-green-500 font-bold tracking-widest uppercase mb-4 block">Institucional</span>
                    <h1 className="text-4xl md:text-6xl font-black italic uppercase mb-6">
                        Resenha com <span className="text-green-500">Fundamento</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        Não somos apenas mais um blog de futebol. Somos o ponto de encontro de quem entende que o jogo vai muito além das quatro linhas.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <img
                            src="https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=800"
                            alt="Equipe Bora Jogador"
                            className="rounded-lg shadow-2xl shadow-green-900/20 border border-zinc-800 rotate-2 hover:rotate-0 transition duration-500"
                        />
                    </div>
                    <div className="space-y-6 text-zinc-300">
                        <h2 className="text-3xl font-black text-white uppercase italic">Nossa Missão</h2>
                        <p>
                            O <strong>Bora Jogador</strong> nasceu em 2024 com um objetivo claro: acabar com a análise rasa. Aqui, a gente discute tática, mercado da bola e história com a profundidade que o torcedor de verdade merece.
                        </p>
                        <p>
                            Nossa equipe é formada por apaixonados por futebol, jornalistas e analistas de desempenho que vivem o esporte 24 horas por dia.
                        </p>

                        <div className="grid grid-cols-2 gap-6 mt-8">
                            <div className="bg-zinc-900 p-4 rounded border-l-4 border-green-500">
                                <span className="block text-2xl font-black text-white">500+</span>
                                <span className="text-sm uppercase tracking-wide">Artigos Publicados</span>
                            </div>
                            <div className="bg-zinc-900 p-4 rounded border-l-4 border-green-500">
                                <span className="block text-2xl font-black text-white">50k</span>
                                <span className="text-sm uppercase tracking-wide">Leitores Mensais</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
