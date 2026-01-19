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

            {/* DESTAQUE */}
            {featuredPost && (
                <section className="relative h-[60vh] md:h-[70vh] w-full group overflow-hidden border-b border-zinc-800">
                    <div className="absolute inset-0">
                        {featuredPost.mainImage && (
                            <img src={urlFor(featuredPost.mainImage).width(1200).url()} alt={featuredPost.title} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition duration-700" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10 container mx-auto">
                        {featuredPost.category && <span className="bg-green-600 text-black text-xs font-black px-3 py-1 uppercase tracking-widest mb-4 inline-block">{featuredPost.category.title}</span>}
                        <h1 className="text-3xl md:text-5xl font-black italic uppercase leading-tight mb-4 max-w-4xl drop-shadow-xl">
                            <a href={`/post/${featuredPost.slug}`} className="hover:text-green-500 transition">{featuredPost.title}</a>
                        </h1>
                        <a href={`/post/${featuredPost.slug}`} className="inline-flex items-center bg-white text-black font-bold uppercase text-sm px-6 py-3 hover:bg-green-500 transition">Ler Matéria <ChevronRight size={16} className="ml-2" /></a>
                    </div>
                </section>
            )}

            {/* CONTEÚDO + SIDEBAR */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* LISTA DE NOTÍCIAS */}
                    <div className="lg:col-span-8">
                        <div className="flex items-center mb-8 border-l-4 border-green-500 pl-4">
                            <h2 className="text-2xl font-black italic uppercase">Últimas <span className="text-green-500">do Futebol</span></h2>
                        </div>

                        {listPosts.length > 0 ? (
                            <div className="space-y-8">
                                {listPosts.map((post) => (
                                    <div key={post._id} className="flex flex-col md:flex-row gap-6 border-b border-zinc-800 pb-8 group">
                                        <div className="md:w-5/12 h-48 overflow-hidden rounded">
                                            <a href={`/post/${post.slug}`}>
                                                {post.mainImage ? (
                                                    <img src={urlFor(post.mainImage).width(600).url()} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                                                ) : (
                                                    <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-600">Sem Foto</div>
                                                )}
                                            </a>
                                        </div>
                                        <div className="md:w-7/12 flex flex-col justify-center">
                                            {post.category && <span className="text-green-500 text-xs font-bold uppercase mb-2">{post.category.title}</span>}
                                            <h3 className="text-xl font-bold uppercase leading-tight mb-2">
                                                <a href={`/post/${post.slug}`} className="hover:text-zinc-300 transition">{post.title}</a>
                                            </h3>
                                            <div className="flex items-center text-zinc-500 text-xs mt-2 space-x-3">
                                                <span className="flex items-center"><Clock size={12} className="mr-1" /> {new Date(post.publishedAt || post._createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-10 border border-dashed border-zinc-700 text-center text-zinc-500 rounded bg-zinc-900/50">
                                <p className="mb-2 font-bold text-white text-lg">A lista está esperando!</p>
                                <p className="text-zinc-400">Você só tem 1 notícia (que já está no destaque lá em cima 👆).<br />Crie mais notícias no Sanity para elas aparecerem aqui em fila!</p>
                            </div>
                        )}
                    </div>

                    {/* SIDEBAR */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-zinc-900 p-6 rounded border-l-4 border-green-500">
                            <h3 className="font-bold text-white uppercase text-sm mb-4 flex items-center">
                                <TrendingUp size={16} className="mr-2 text-green-500" /> Mais Lidas
                            </h3>
                            <ul className="space-y-4">
                                <li className="text-zinc-400 text-sm border-b border-zinc-800 pb-2 hover:text-green-500 cursor-pointer">
                                    1. Tabela do Brasileirão atualizada
                                </li>
                                <li className="text-zinc-400 text-sm border-b border-zinc-800 pb-2 hover:text-green-500 cursor-pointer">
                                    2. Os 10 maiores artilheiros do ano
                                </li>
                                <li className="text-zinc-400 text-sm hover:text-green-500 cursor-pointer">
                                    3. Final da Libertadores: Onde assistir
                                </li>
                            </ul>
                        </div>

                        <div className="bg-zinc-900 p-6 rounded border border-zinc-800 text-center">
                            <span className="text-xs font-bold text-zinc-500 uppercase block mb-2">Publicidade</span>
                            <div className="w-full h-64 bg-zinc-800 flex items-center justify-center text-zinc-600 font-bold">ADSENSE 300x250</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Home;