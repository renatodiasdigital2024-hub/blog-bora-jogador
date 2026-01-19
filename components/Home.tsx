import React from 'react';
import { Clock, ArrowRight, Search, TrendingUp } from 'lucide-react';

const Home = () => {
    // Dados simulados (em breve virão do Sanity)
    const posts = [
        {
            id: 1,
            title: "Análise Pré-Jogo: O clássico que pode definir o título",
            excerpt: "Tudo o que você precisa saber antes da bola rolar no Maracanã este domingo.",
            image: "https://images.unsplash.com/photo-1522778119026-d647f0565c6a?auto=format&fit=crop&q=80&w=800",
            category: "Pré-Jogo",
            date: "10 JAN 2026",
            author: "Felipe Silva"
        },
        {
            id: 2,
            title: "Craques do Passado: A mágica de Garrincha em 1962",
            excerpt: "Relembramos o torneio onde o 'Anjo das Pernas Tortas' carregou o Brasil nas costas.",
            image: "https://images.unsplash.com/photo-1579952363873-27f3bde9be2e?auto=format&fit=crop&q=80&w=800",
            category: "Só Lendas",
            date: "09 JAN 2026",
            author: "Zico Jr."
        },
        {
            id: 3,
            title: "Bola Murcha: Por que a defesa do líder está falhando?",
            excerpt: "Dados mostram queda de rendimento nos últimos 5 jogos do campeonato.",
            image: "https://images.unsplash.com/photo-1518605348400-437731df4dc1?auto=format&fit=crop&q=80&w=800",
            category: "Análise",
            date: "08 JAN 2026",
            author: "Marco Tático"
        },
        {
            id: 4,
            title: "Mercado da Bola: As promessas que vão brilhar na Europa",
            excerpt: "Scouts apontam os 5 nomes que devem sair do Brasil na próxima janela.",
            image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80&w=800",
            category: "Mercado",
            date: "08 JAN 2026",
            author: "Redação"
        }
    ];

    return (
        <div className="bg-black text-white min-h-screen font-sans selection:bg-green-500 selection:text-black">

            {/* --- ADSENSE 1: TOPO (BILLBOARD) --- 
          Estratégia: O "Prime Time" do seu blog. Visibilidade máxima.
      */}
            <div className="container mx-auto px-4 pt-6 pb-2 flex justify-center">
                <div className="bg-zinc-900 w-full md:w-[728px] h-[90px] flex flex-col items-center justify-center border border-zinc-800 rounded overflow-hidden">
                    <span className="text-[10px] text-zinc-600 uppercase tracking-widest mb-1">Publicidade</span>
                    <span className="text-zinc-500 font-bold text-sm">ESPAÇO ADSENSE 728x90</span>
                </div>
            </div>

            {/* HERO SECTION (Destaque Gigante) */}
            <section className="container mx-auto px-4 mb-12 mt-6">
                <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden group cursor-pointer border border-zinc-800">
                    <img
                        src="https://images.unsplash.com/photo-1579952363873-27f3bde9be2e?auto=format&fit=crop&q=80&w=1600"
                        alt="Destaque"
                        className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    {/* Degradê para leitura */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full md:w-2/3">
                        <span className="bg-green-600 text-black text-xs font-black px-3 py-1 uppercase mb-4 inline-block tracking-wider">
                            Bola Cheia da Rodada
                        </span>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase leading-tight mb-4 group-hover:text-green-400 transition-colors">
                            Como o meio-campo moderno revolucionou o Brasileirão
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl hidden md:block mb-6">
                            Analisamos como as novas formações táticas estão transformando o ritmo do nosso futebol.
                        </p>
                        <button className="bg-white text-black font-bold text-sm px-8 py-4 uppercase tracking-wide hover:bg-green-500 transition">
                            Ler Análise Completa
                        </button>
                    </div>
                </div>
            </section>

            {/* CONTEÚDO PRINCIPAL (Grid + Sidebar) */}
            <section className="container mx-auto px-4 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* COLUNA ESQUERDA (Notícias) - Ocupa 8 colunas */}
                    <div className="lg:col-span-8">
                        <div className="flex items-center mb-8 border-b border-zinc-800 pb-4">
                            <h2 className="text-3xl font-black italic uppercase mr-4">Últimas <span className="text-green-500">Notícias</span></h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {posts.map((post, index) => (
                                <React.Fragment key={post.id}>
                                    <article className="group cursor-pointer flex flex-col h-full">
                                        <div className="relative h-56 overflow-hidden rounded-lg mb-4 border border-zinc-800">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                                            />
                                            <span className="absolute top-4 left-4 bg-green-500 text-black text-[10px] font-bold px-2 py-1 uppercase tracking-wide">
                                                {post.category}
                                            </span>
                                        </div>
                                        <div className="text-zinc-500 text-xs font-bold uppercase mb-2 flex items-center">
                                            <Clock size={12} className="mr-1 text-green-600" /> {post.date}
                                        </div>
                                        <h3 className="text-xl font-bold leading-tight mb-3 group-hover:text-green-500 transition flex-grow">
                                            {post.title}
                                        </h3>
                                        <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                    </article>

                                    {/* --- ADSENSE 2: IN-FEED (NATIVO) --- 
                      Estratégia: Insere um bloco de anúncio que ocupa 2 colunas após o 2º post.
                      Isso quebra o grid visualmente e chama muita atenção.
                  */}
                                    {index === 1 && (
                                        <div className="md:col-span-2 py-8 w-full">
                                            <div className="w-full bg-zinc-900/50 border-y border-zinc-800 py-6 flex flex-col items-center justify-center">
                                                <span className="text-[10px] text-zinc-600 uppercase tracking-widest mb-2">Publicidade</span>
                                                <div className="w-[90%] md:w-[728px] h-[90px] md:h-[90px] bg-zinc-800 rounded flex items-center justify-center text-zinc-500 font-bold border border-zinc-700">
                                                    ESPAÇO ADSENSE HORIZONTAL (IN-FEED)
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>

                        {/* Botão Carregar Mais */}
                        <div className="mt-12 text-center">
                            <button className="w-full md:w-auto border border-zinc-700 text-white px-12 py-4 text-sm font-bold uppercase tracking-widest hover:bg-green-600 hover:border-green-600 hover:text-black transition">
                                Carregar Mais Publicações
                            </button>
                        </div>
                    </div>

                    {/* COLUNA DIREITA (Sidebar) - Ocupa 4 colunas */}
                    <aside className="lg:col-span-4 space-y-12">

                        {/* Widget: Pesquisa */}
                        <div className="bg-zinc-900 p-6 rounded border border-zinc-800">
                            <h3 className="text-sm font-bold uppercase border-l-4 border-green-500 pl-3 mb-4">Pesquisar</h3>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Ex: Tática, Craques..."
                                    className="w-full bg-black border border-zinc-700 text-white py-3 px-4 pl-4 rounded focus:outline-none focus:border-green-500 transition"
                                />
                                <Search className="absolute right-3 top-3 text-zinc-500" size={20} />
                            </div>
                        </div>

                        {/* --- ADSENSE 3: SIDEBAR (RETÂNGULO) --- 
                Estratégia: O clássico "quadradão" que converte muito bem em desktop.
            */}
                        <div className="bg-zinc-900 h-[280px] flex flex-col items-center justify-center border border-zinc-800 rounded">
                            <span className="text-[10px] text-zinc-600 uppercase tracking-widest mb-1">Publicidade</span>
                            <span className="text-zinc-500 font-bold text-sm">ADSENSE 300x250</span>
                        </div>

                        {/* Widget: Mais Lidas */}
                        <div>
                            <h3 className="text-2xl font-black italic uppercase mb-8">Mais <span className="text-green-500">Lidas</span></h3>
                            <ul className="space-y-0">
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <li key={item} className="flex items-start py-5 border-b border-zinc-800 group cursor-pointer transition first:pt-0 last:border-0">
                                        <span className="text-4xl font-black text-zinc-800 mr-5 leading-none group-hover:text-green-600 transition-colors duration-300 select-none">
                                            0{item}
                                        </span>
                                        <div className="pt-1">
                                            <h4 className="font-bold text-[15px] leading-tight text-white group-hover:text-green-500 transition-colors duration-300">
                                                Onde assistir aos jogos da Champions League desta semana
                                            </h4>
                                            <span className="text-[10px] font-bold text-zinc-500 uppercase mt-2 block tracking-wider group-hover:text-zinc-400 transition">Futebol Europeu</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Widget: Newsletter */}
                        <div className="bg-green-600 p-8 rounded-xl text-center shadow-lg shadow-green-900/20">
                            <h3 className="text-black font-black text-2xl uppercase italic mb-2">Bola na Caixa</h3>
                            <p className="text-black/80 text-sm mb-6 font-medium">Receba as melhores análises e notícias direto no seu e-mail.</p>
                            <input
                                type="email"
                                placeholder="Seu melhor e-mail"
                                className="w-full p-3 rounded bg-green-700/50 placeholder-green-900 text-black font-bold focus:outline-none focus:bg-white focus:text-black transition mb-3 border-0"
                            />
                            <button className="w-full bg-black text-white font-black uppercase py-3 rounded hover:bg-zinc-800 transition shadow-lg">
                                Inscrever-se
                            </button>
                        </div>

                    </aside>
                </div>
            </section>
        </div>
    );
};

export default Home;
