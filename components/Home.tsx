import React, { useEffect, useState } from 'react';
import { sanityClient, urlFor } from '../lib/sanity';
import { ChevronRight, Search, Calendar, User } from 'lucide-react';

interface Post {
    _id: string;
    title: string;
    slug: string;
    mainImage: any;
    excerpt: string;
    publishedAt: string;
    _createdAt: string;
    author: { name: string };
    category: { title: string; slug: string };
}

const Home = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const query = `*[_type == "post"] | order(publishedAt desc)[0..9]{
          _id, title, "slug": slug.current, mainImage, excerpt, publishedAt, _createdAt,
          author->{name},
          "category": categories[0]->{title, "slug": slug.current}
        }`;
                const data = await sanityClient.fetch(query);
                setPosts(data || []);
            } catch (error) { console.error("Erro:", error); } finally { setLoading(false); }
        };
        fetchPosts();
    }, []);

    if (loading) return <div className="bg-black h-screen flex items-center justify-center text-white font-bold uppercase tracking-widest">Carregando Bora Jogador...</div>;

    const featuredPost = posts[0];
    const listPosts = posts.slice(1);

    return (
        <div className="bg-black text-white font-sans min-h-screen pb-20">

            {/* --- 1. HERO SECTION (DESTAQUE GIGANTE) --- */}
            {featuredPost && (
                <section className="relative h-[65vh] w-full group overflow-hidden border-b border-zinc-800">
                    <div className="absolute inset-0">
                        {featuredPost.mainImage ? (
                            <img
                                src={urlFor(featuredPost.mainImage).width(1200).height(800).url()}
                                alt={featuredPost.title}
                                className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition duration-700 ease-out"
                            />
                        ) : (
                            <div className="w-full h-full bg-zinc-900" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10 container mx-auto">
                        {featuredPost.category && (
                            <span className="bg-green-600 text-black text-[10px] font-black px-3 py-1 uppercase tracking-widest mb-4 inline-block shadow shadow-green-500/50">
                                {featuredPost.category.title}
                            </span>
                        )}
                        <h1 className="text-3xl md:text-6xl font-black italic uppercase leading-none mb-4 max-w-4xl drop-shadow-2xl">
                            <a href={`/post/${featuredPost.slug}`} className="hover:text-green-500 transition duration-300">
                                {featuredPost.title}
                            </a>
                        </h1>
                        <div className="flex items-center text-xs font-bold text-zinc-300 mb-6 space-x-4 uppercase tracking-widest">
                            <span>{new Date(featuredPost.publishedAt || featuredPost._createdAt).toLocaleDateString()}</span>
                            <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                            <span>{featuredPost.author?.name || "Redação"}</span>
                        </div>

                        <a href={`/post/${featuredPost.slug}`} className="inline-flex items-center bg-white text-black font-black uppercase text-xs px-8 py-4 hover:bg-green-500 transition shadow-lg">
                            Ler Matéria <ChevronRight size={14} className="ml-2" />
                        </a>
                    </div>
                </section>
            )}

            {/* --- 2. CONTEÚDO PRINCIPAL --- */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* COLUNA ESQUERDA (LISTA DE NOTÍCIAS) */}
                    <div className="lg:col-span-8">
                        <div className="flex items-center mb-10 border-l-4 border-green-500 pl-4">
                            <h2 className="text-2xl font-black italic uppercase tracking-tighter">Últimas <span className="text-green-500">Notícias</span></h2>
                        </div>

                        {listPosts.length > 0 ? (
                            <div className="flex flex-col gap-10">
                                {listPosts.map((post) => (
                                    <div key={post._id} className="flex flex-col md:flex-row gap-6 border-b border-zinc-900 pb-10 group">
                                        {/* Imagem da Notícia */}
                                        <div className="md:w-5/12 h-52 overflow-hidden rounded-lg relative border border-zinc-800">
                                            <a href={`/post/${post.slug}`}>
                                                {post.mainImage ? (
                                                    <img
                                                        src={urlFor(post.mainImage).width(600).height(400).url()}
                                                        alt={post.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-700 font-bold text-xs uppercase">Sem Foto</div>
                                                )}
                                                {post.category && (
                                                    <span className="absolute top-3 left-3 bg-black/80 text-white border border-green-500 text-[9px] font-black px-2 py-1 uppercase tracking-wider">
                                                        {post.category.title}
                                                    </span>
                                                )}
                                            </a>
                                        </div>

                                        {/* Texto da Notícia */}
                                        <div className="md:w-7/12 flex flex-col justify-center">
                                            <h3 className="text-xl md:text-2xl font-black italic uppercase leading-tight mb-3">
                                                <a href={`/post/${post.slug}`} className="hover:text-green-500 transition text-white">
                                                    {post.title}
                                                </a>
                                            </h3>
                                            <p className="text-zinc-400 text-sm line-clamp-2 mb-4 font-medium leading-relaxed">
                                                {post.excerpt || "Clique para ler a matéria completa sobre este assunto no Bora Jogador."}
                                            </p>
                                            <div className="flex items-center text-zinc-500 text-[10px] font-bold uppercase tracking-widest space-x-4">
                                                <span className="flex items-center"><Calendar size={12} className="mr-1 text-green-600" /> {new Date(post.publishedAt || post._createdAt).toLocaleDateString()}</span>
                                                <span className="flex items-center"><User size={12} className="mr-1 text-green-600" /> {post.author?.name || "Redação"}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-10 border border-dashed border-zinc-800 bg-zinc-900/30 text-center rounded-lg">
                                <p className="text-zinc-400 font-bold mb-2">A lista está vazia!</p>
                                <p className="text-zinc-600 text-sm">Crie mais posts no Sanity (com imagens!) para preencher este espaço.</p>
                            </div>
                        )}
                    </div>

                    {/* --- 3. SIDEBAR DIREITA --- */}
                    <div className="lg:col-span-4 space-y-10">

                        {/* WIDGET PESQUISAR */}
                        <div className="bg-[#0a0a0a] p-6 rounded-lg border border-zinc-800 shadow-lg">
                            <h3 className="text-xs font-black text-green-500 uppercase mb-4 border-l-4 border-green-500 pl-3 tracking-widest">Pesquisar no Blog</h3>
                            <div className="relative">
                                <input type="text" placeholder="Ex: Tática, Craques..." className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-4 rounded focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-sm font-medium transition placeholder-zinc-600" />
                                <Search className="absolute right-4 top-4 text-zinc-500" size={18} />
                            </div>
                        </div>

                        {/* ADSENSE (Quadrado) */}
                        <div className="bg-zinc-900/20 p-6 rounded border border-zinc-800 flex flex-col items-center justify-center">
                            <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest mb-3">Publicidade</span>
                            <div className="w-[300px] h-[250px] bg-zinc-900 flex items-center justify-center text-zinc-700 font-bold border border-zinc-800 uppercase tracking-widest text-xs">
                                Espaço Google Ads
                            </div>
                        </div>

                        {/* MAIS LIDAS */}
                        <div>
                            <h3 className="text-xl font-black italic uppercase mb-8 border-l-4 border-green-500 pl-4">Mais <span className="text-green-500">Lidas</span></h3>
                            <div className="space-y-6">
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <div key={num} className="flex items-center group cursor-pointer border-b border-zinc-900/50 pb-4 last:border-0">
                                        <span className="text-4xl font-black text-zinc-800 mr-5 leading-none group-hover:text-green-900 transition">0{num}</span>
                                        <div>
                                            <h4 className="font-bold leading-tight text-xs text-zinc-300 group-hover:text-green-500 transition uppercase">
                                                Análise Tática: Como o Palmeiras dominou o meio-campo
                                            </h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Home;