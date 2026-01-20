import React, { useEffect, useState } from 'react';
import { sanityClient, urlFor } from '../lib/sanity';
import { ChevronRight, Search, Calendar, User } from 'lucide-react';

const Home = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const query = `*[_type == "post"] | order(publishedAt desc)[0..9]{
          _id, title, "slug": slug.current, mainImage, excerpt, publishedAt, _createdAt,
          author->{name}, "category": categories[0]->{title}
        }`;
                const data = await sanityClient.fetch(query);
                setPosts(data || []);
            } catch (error) { console.error(error); } finally { setLoading(false); }
        };
        fetchPosts();
    }, []);

    if (loading) return <div className="bg-black h-screen flex items-center justify-center text-white font-bold uppercase tracking-widest italic">Carregando Bora Jogador...</div>;

    const featured = posts[0];
    const list = posts.slice(1);

    return (
        <div className="bg-black text-white font-sans min-h-screen pb-20">
            {featured && (
                <section className="relative h-[60vh] w-full group overflow-hidden border-b border-zinc-800">
                    {featured.mainImage && (
                        <img src={urlFor(featured.mainImage).width(1200).url()} className="absolute inset-0 w-full h-full object-cover opacity-60" alt={featured.title} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    <div className="absolute bottom-10 left-0 w-full p-6 container mx-auto">
                        <span className="bg-green-600 text-black text-[10px] font-black px-3 py-1 uppercase mb-4 inline-block">{featured.category?.title || "Destaque"}</span>
                        <h1 className="text-4xl md:text-6xl font-black italic uppercase leading-none mb-6 max-w-4xl tracking-tighter">
                            <a href={`/post/${featured.slug}`} className="hover:text-green-500 transition">{featured.title}</a>
                        </h1>
                        <a href={`/post/${featured.slug}`} className="bg-white text-black font-black uppercase text-xs px-8 py-3 hover:bg-green-500 transition">Ler Matéria</a>
                    </div>
                </section>
            )}

            <div className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 space-y-12">
                    {list.map((post) => (
                        <div key={post._id} className="flex flex-col md:flex-row gap-6 border-b border-zinc-900 pb-10 group">
                            <div className="md:w-5/12 h-48 overflow-hidden rounded border border-zinc-800">
                                {post.mainImage ? <img src={urlFor(post.mainImage).width(500).url()} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt={post.title} /> : <div className="w-full h-full bg-zinc-900" />}
                            </div>
                            <div className="md:w-7/12 flex flex-col justify-center">
                                <h3 className="text-xl font-black italic uppercase mb-3"><a href={`/post/${post.slug}`} className="hover:text-green-500 transition">{post.title}</a></h3>
                                <p className="text-zinc-400 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                                <div className="flex items-center text-zinc-500 text-[10px] font-bold uppercase tracking-widest gap-4">
                                    <span className="flex items-center"><Calendar size={12} className="mr-1 text-green-600" /> {new Date(post.publishedAt || post._createdAt).toLocaleDateString()}</span>
                                    <span className="flex items-center"><User size={12} className="mr-1 text-green-600" /> {post.author?.name}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <aside className="lg:col-span-4 space-y-10">
                    <div className="bg-[#0a0a0a] p-6 rounded border border-zinc-800">
                        <h3 className="text-xs font-black text-green-500 uppercase mb-4 border-l-4 border-green-500 pl-3">Pesquisar</h3>
                        <div className="relative"><input type="text" placeholder="Ex: Tática..." className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded text-sm" /><Search className="absolute right-4 top-3 text-zinc-500" size={18} /></div>
                    </div>
                    <div className="bg-zinc-900/20 p-6 rounded border border-zinc-800 flex flex-col items-center">
                        <span className="text-[9px] text-zinc-600 font-bold uppercase mb-3">Publicidade</span>
                        <div className="w-[300px] h-[250px] bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-700 font-bold text-xs uppercase">Espaço Google Ads</div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Home;