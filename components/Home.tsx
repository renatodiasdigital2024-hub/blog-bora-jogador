import React, { useEffect, useState } from 'react';
import { sanityClient, urlFor } from '../lib/sanity';
import { Clock, ChevronRight, Search, Mail } from 'lucide-react';

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
                const query = `*[_type == "post"] | order(_createdAt desc)[0..9]{
          _id, title, "slug": slug.current, mainImage, excerpt, publishedAt, _createdAt,
          "category": categories[0]->{title, "slug": slug.current}
        }`;
                const data = await sanityClient.fetch(query);
                setPosts(data || []);
            } catch (error) { console.error("Erro:", error); } finally { setLoading(false); }
        };
        fetchPosts();
    }, []);

    if (loading) return <div className="bg-black h-screen text-white flex items-center justify-center">Carregando...</div>;

    const featuredPost = posts[0];
    const listPosts = posts.slice(1);

    return (
        <div className="bg-black text-white font-sans min-h-screen">

            {/* --- HERO SECTION (DESTAQUE) --- */}
            {featuredPost && (
                <section className="relative h-[65vh] w-full group overflow-hidden border-b border-zinc-800">
                    <div className="absolute inset-0">
                        {featuredPost.mainImage && (
                            <img src={urlFor(featuredPost.mainImage).width(1200).url()} alt={featuredPost.title} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition duration-700" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10 container mx-auto">
                        {featuredPost.category && <span className="bg-green-600 text-black text-xs font-black px-3 py-1 uppercase tracking-widest mb-4 inline-block">{featuredPost.category.title}</span>}
                        <h1 className="text-3xl md:text-6xl font-black italic uppercase leading-tight mb-4 max-w-4xl drop-shadow-xl">
                            <a href={`/post/${featuredPost.slug}`} className="hover:text-green-500 transition">{featuredPost.title}</a>
                        </h1>
                        <a href={`/post/${featuredPost.slug}`} className="inline-flex items-center bg-white text-black font-bold uppercase text-sm px-6 py-3 hover:bg-green-500 transition">Ler Matéria <ChevronRight size={16} className="ml-2" /></a>
                    </div>
                </section>
            )}

            {/* --- CONTEÚDO PRINCIPAL --- */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* COLUNA ESQUERDA (NOTÍCIAS) */}
                    <div className="lg:col-span-8">
                        <div className="flex items-center mb-8 border-l-4 border-green-500 pl-4">
                            <h2 className="text-2xl font-black italic uppercase">Últimas <span className="text-green-500">Notícias</span></h2>
                        </div>

                        {listPosts.length > 0 ? (
                            <div className="grid grid-cols-1 gap-8">
                                {listPosts.map((post) => (
                                    <div key={post._id} className="flex flex-col md:flex-row gap-6 border-b border-zinc-800 pb-8 group">
                                        <div className="md:w-5/12 h-56 overflow-hidden rounded relative">
                                            <a href={`/post/${post.slug}`}>
                                                {post.mainImage ? (
                                                    <img src={urlFor(post.mainImage).width(600).url()} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                                                ) : (<div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-600">Sem Foto</div>)}
                                                {post.category && <span className="absolute top-2 left-2 bg-green-600 text-black text-[10px] font-bold px-2 py-1 uppercase">{post.category.title}</span>}
                                            </a>
                                        </div>
                                        <div className="md:w-7/12 flex flex-col justify-center">
                                            <h3 className="text-xl font-bold uppercase leading-tight mb-3">
                                                <a href={`/post/${post.slug}`} className="hover:text-green-500 transition">{post.title}</a>
                                            </h3>
                                            <p className="text-zinc-400 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                                            <div className="flex items-center text-zinc-500 text-xs font-bold space-x-3">
                                                <span className="flex items-center"><Clock size={12} className="mr-1 text-green-500" /> {new Date(post.publishedAt || post._createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 border border-zinc-800 bg-zinc-900 text-center rounded">
                                <p className="text-zinc-500">Publique mais notícias no Sanity para preencher esta lista.</p>
                            </div>
                        )}
                    </div>

                    {/* --- SIDEBAR (DIREITA) --- */}
                    <div className="lg:col-span-4 space-y-10">

                        {/* WIDGET: PESQUISAR */}
                        <div className="bg-zinc-900 p-6 rounded border border-zinc-800">
                            <h3 className="text-xs font-bold text-green-500 uppercase mb-4 border-l-2 border-green-500 pl-2">Pesquisar</h3>
                            <div className="relative">
                                <input type="text" placeholder="Ex: Tática, Craques..." className="w-full bg-black border border-zinc-700 text-white px-4 py-3 rounded focus:outline-none focus:border-green-500 text-sm" />
                                <Search className="absolute right-3 top-3 text-zinc-500" size={18} />
                            </div>
                        </div>

                        {/* WIDGET: PUBLICIDADE (Quadrado) */}
                        <div className="bg-zinc-900 p-6 rounded border border-zinc-800 flex flex-col items-center justify-center">
                            <span className="text-[10px] font-bold text-zinc-600 uppercase mb-2 tracking-widest">Publicidade</span>
                            <div className="w-[300px] h-[250px] bg-zinc-800 flex items-center justify-center text-zinc-600 font-bold border border-zinc-700">
                                ADSENSE 300x250
                            </div>
                        </div>

                        {/* WIDGET: MAIS LIDAS (Estilo Numérico) */}
                        <div>
                            <h3 className="text-xl font-black italic uppercase mb-6 border-l-4 border-green-500 pl-3">Mais <span className="text-green-500">Lidas</span></h3>
                            <div className="space-y-6">
                                {/* Item 01 */}
                                <div className="flex items-start group cursor-pointer">
                                    <span className="text-5xl font-black text-zinc-800 mr-4 leading-none group-hover:text-green-900 transition">01</span>
                                    <div>
                                        <span className="text-[10px] font-bold text-green-500 uppercase">Futebol Europeu</span>
                                        <h4 className="font-bold leading-tight group-hover:text-green-500 transition">Onde assistir aos jogos da Champions League desta semana</h4>
                                    </div>
                                </div>
                                {/* Item 02 */}
                                <div className="flex items-start group cursor-pointer">
                                    <span className="text-5xl font-black text-zinc-800 mr-4 leading-none group-hover:text-green-900 transition">02</span>
                                    <div>
                                        <span className="text-[10px] font-bold text-green-500 uppercase">Brasileirão</span>
                                        <h4 className="font-bold leading-tight group-hover:text-green-500 transition">Flamengo busca reforço de peso na Europa</h4>
                                    </div>
                                </div>
                                {/* Item 03 */}
                                <div className="flex items-start group cursor-pointer">
                                    <span className="text-5xl font-black text-zinc-800 mr-4 leading-none group-hover:text-green-900 transition">03</span>
                                    <div>
                                        <span className="text-[10px] font-bold text-green-500 uppercase">Análise</span>
                                        <h4 className="font-bold leading-tight group-hover:text-green-500 transition">Top 10 camisas mais bonitas da temporada</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* WIDGET: BOLA NA CAIXA (Newsletter Verde) */}
                        <div className="bg-green-600 p-8 rounded-lg text-center shadow-lg shadow-green-900/20">
                            <h3 className="font-black italic uppercase text-black text-2xl mb-2">BOLA NA CAIXA</h3>
                            <p className="text-black text-sm font-medium mb-6 px-2">Receba as melhores análises e notícias direto no seu e-mail.</p>
                            <input type="email" placeholder="Seu melhor e-mail" className="w-full bg-white/90 border-0 text-black px-4 py-3 rounded mb-3 focus:outline-none placeholder-zinc-500 font-bold text-sm" />
                            <button className="bg-black text-white w-full py-3 font-black uppercase text-sm hover:bg-zinc-800 transition shadow-lg">INSCREVER-SE</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;