import React, { useEffect, useState } from 'react';
import { sanityClient, urlFor } from '../lib/sanity';
import { Clock, ChevronRight, TrendingUp } from 'lucide-react';

interface Post {
    _id: string;
    title: string;
    slug: string;
    mainImage: any;
    excerpt: string;
    publishedAt: string;
    author: { name: string };
    category: { title: string; slug: string };
}

const Home = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // ESTRATÉGIA BLINDADA: Busca tudo de uma vez (Top 10 mais recentes)
                // Isso evita erros se faltar alguma categoria específica
                const query = `*[_type == "post"] | order(publishedAt desc)[0..9]{
          _id,
          title, 
          "slug": slug.current, 
          mainImage, 
          excerpt,
          publishedAt,
          "category": categories[0]->{title, "slug": slug.current}
        }`;

                const data = await sanityClient.fetch(query);
                // Se der erro ou vier vazio, garante que seja um array vazio para não quebrar a tela
                setPosts(data || []);
            } catch (error) {
                console.error("Erro ao carregar notícias:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (loading) return <div className="bg-black h-screen text-white flex items-center justify-center">Carregando o jogo...</div>;

    // ORGANIZAÇÃO INTELIGENTE DOS DADOS
    const featuredPost = posts[0]; // A notícia nº 1 vira o Destaque
    const latestPosts = posts.slice(1, 4); // As notícias 2, 3 e 4 viram "Últimas"
    // Procura se tem alguma notícia de Mercado da Bola nas 10 buscadas
    const marketPosts = posts.filter(p => p.category?.slug === 'mercado-da-bola').slice(0, 2);

    return (
        <div className="bg-black text-white font-sans min-h-screen">

            {/* 1. SEÇÃO HERO (DESTAQUE PRINCIPAL) */}
            {featuredPost ? (
                <section className="relative h-[70vh] w-full group overflow-hidden">
                    <div className="absolute inset-0">
                        {featuredPost.mainImage && (
                            <img
                                src={urlFor(featuredPost.mainImage).width(1200).url()}
                                alt={featuredPost.title}
                                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition duration-700 ease-in-out"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10 container mx-auto">
                        {featuredPost.category && (
                            <span className="bg-green-600 text-black text-xs font-black px-3 py-1 uppercase tracking-widest mb-4 inline-block">
                                {featuredPost.category.title}
                            </span>
                        )}
                        <h1 className="text-3xl md:text-6xl font-black italic uppercase leading-tight mb-4 max-w-4xl drop-shadow-xl">
                            <a href={`/post/${featuredPost.slug}`} className="hover:text-green-500 transition">
                                {featuredPost.title}
                            </a>
                        </h1>
                        <p className="hidden md:block text-zinc-300 text-lg max-w-2xl mb-6 line-clamp-2">
                            {featuredPost.excerpt}
                        </p>
                        <a href={`/post/${featuredPost.slug}`} className="inline-flex items-center bg-white text-black font-bold uppercase text-sm px-6 py-3 hover:bg-green-500 transition">
                            Ler Análise <ChevronRight size={16} className="ml-2" />
                        </a>
                    </div>
                </section>
            ) : (
                // Fallback caso não tenha NENHUM post publicado
                <div className="h-64 flex items-center justify-center text-zinc-500">
                    Publique sua primeira notícia no Painel para ela aparecer aqui!
                </div>
            )}

            {/* 2. SEÇÃO ÚLTIMAS NOTÍCIAS (GRID) */}
            <section className="container mx-auto px-4 py-16">
                <div className="flex items-center mb-8 border-l-4 border-green-500 pl-4">
                    <h2 className="text-2xl font-black italic uppercase">Últimas <span className="text-green-500">Notícias</span></h2>
                </div>

                {latestPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {latestPosts.map((post) => (
                            <div key={post._id} className="group cursor-pointer">
                                <div className="overflow-hidden rounded-lg mb-4 relative h-64">
                                    <a href={`/post/${post.slug}`}>
                                        {post.mainImage && (
                                            <img
                                                src={urlFor(post.mainImage).width(600).url()}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                            />
                                        )}
                                        {post.category && (
                                            <span className="absolute top-4 left-4 bg-green-600 text-black text-[10px] font-bold px-2 py-1 uppercase">
                                                {post.category.title}
                                            </span>
                                        )}
                                    </a>
                                </div>
                                <div className="flex items-center text-zinc-500 text-xs font-bold mb-2 space-x-2">
                                    <Clock size={12} />
                                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                                </div>
                                <h3 className="text-xl font-bold uppercase leading-tight group-hover:text-green-500 transition">
                                    <a href={`/post/${post.slug}`}>{post.title}</a>
                                </h3>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-zinc-500">Mais notícias em breve...</p>
                )}
            </section>

            {/* 3. SEÇÃO MERCADO DA BOLA (Só aparece se tiver notícia dessa categoria) */}
            {marketPosts.length > 0 && (
                <section className="bg-zinc-900 py-16 border-y border-zinc-800">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center mb-8">
                            <TrendingUp className="text-green-500 mr-3" />
                            <h2 className="text-2xl font-black italic uppercase">Mercado da <span className="text-green-500">Bola</span></h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {marketPosts.map((post) => (
                                <div key={post._id} className="flex flex-col md:flex-row bg-black rounded-lg overflow-hidden border border-zinc-800 hover:border-green-500 transition group">
                                    <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                                        <a href={`/post/${post.slug}`}>
                                            {post.mainImage && (
                                                <img
                                                    src={urlFor(post.mainImage).width(600).url()}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                                />
                                            )}
                                        </a>
                                    </div>
                                    <div className="p-6 md:w-1/2 flex flex-col justify-center">
                                        <h3 className="text-xl font-bold uppercase leading-tight mb-3">
                                            <a href={`/post/${post.slug}`} className="hover:text-green-400 transition">{post.title}</a>
                                        </h3>
                                        <p className="text-zinc-500 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                                        <a href={`/post/${post.slug}`} className="text-xs font-bold uppercase tracking-widest text-white hover:text-green-500">Ler matéria →</a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default Home;
