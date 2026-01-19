import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { sanityClient, urlFor } from '../lib/sanity';
import { Clock, ArrowRight, Search, AlertCircle } from 'lucide-react';

interface Post {
    title: string;
    slug: string;
    excerpt: string;
    mainImage: any;
    publishedAt: string;
    author: string;
    category: string;
}

const Category = () => {
    const { slug } = useParams();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const query = `*[_type == "post" && category->slug.current == $slug] | order(publishedAt desc) {
          title,
          "slug": slug.current,
          excerpt,
          mainImage,
          publishedAt,
          "category": category->title
        }`;

                const catQuery = `*[_type == "category" && slug.current == $slug][0]`;

                const [postsData, catData] = await Promise.all([
                    sanityClient.fetch(query, { slug }),
                    sanityClient.fetch(catQuery, { slug })
                ]);

                setPosts(postsData);
                setCategoryName(catData?.title || slug);
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar posts:", error);
                setLoading(false);
            }
        };

        fetchPosts();
    }, [slug]);

    if (loading) return <div className="bg-black min-h-screen text-white flex items-center justify-center">Carregando táticas...</div>;

    return (
        <div className="bg-black text-white min-h-screen font-sans selection:bg-green-500 selection:text-black">

            {/* --- ADSENSE 1: TOPO (BILLBOARD) --- 
          Estratégia: Alta visibilidade logo que a página carrega.
      */}
            <div className="container mx-auto px-4 pt-6 pb-2 flex justify-center">
                <div className="bg-zinc-900 w-full md:w-[728px] h-[90px] flex flex-col items-center justify-center border border-zinc-800 rounded overflow-hidden">
                    <span className="text-[10px] text-zinc-600 uppercase tracking-widest mb-1">Publicidade</span>
                    {/* COLE O CÓDIGO DO ADSENSE (Display Horizontal) AQUI */}
                    <span className="text-zinc-500 font-bold text-sm">ESPAÇO ADSENSE 728x90</span>
                </div>
            </div>

            {/* Título da Categoria */}
            <div className="bg-zinc-900 border-b border-zinc-800 mt-4">
                <div className="container mx-auto px-4 py-12">
                    <span className="text-green-500 font-bold text-sm uppercase tracking-widest mb-2 block">Editoria</span>
                    <h1 className="text-4xl md:text-6xl font-black italic uppercase text-white">
                        {categoryName}
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* LISTA DE NOTÍCIAS (Esquerda) */}
                    <div className="lg:col-span-8">
                        {posts.length > 0 ? (
                            <div className="grid grid-cols-1 gap-8">
                                {posts.map((post, index) => (
                                    <React.Fragment key={post.slug}>

                                        {/* O POST */}
                                        <article className="flex flex-col md:flex-row gap-6 bg-zinc-900/30 p-4 rounded-lg border border-zinc-800 hover:border-green-600 transition group cursor-pointer">
                                            <div className="w-full md:w-1/3 h-48 overflow-hidden rounded relative">
                                                <img
                                                    src={post.mainImage ? urlFor(post.mainImage).url() : "https://via.placeholder.com/400x300?text=Sem+Imagem"}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                                                />
                                            </div>
                                            <div className="w-full md:w-2/3 flex flex-col justify-center">
                                                <div className="text-green-500 text-xs font-bold uppercase mb-2 flex items-center">
                                                    <Clock size={12} className="mr-1" />
                                                    {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
                                                </div>
                                                <h3 className="text-xl md:text-2xl font-bold leading-tight mb-3 text-white group-hover:text-green-500 transition">
                                                    {post.title}
                                                </h3>
                                                <p className="text-zinc-400 text-sm line-clamp-2 mb-4">
                                                    {post.excerpt}
                                                </p>
                                                <span className="text-white text-xs font-bold uppercase tracking-wider flex items-center group-hover:underline">
                                                    Ler Matéria <ArrowRight size={14} className="ml-1 text-green-500" />
                                                </span>
                                            </div>
                                        </article>

                                        {/* --- ADSENSE 2: IN-FEED (NATIVO) --- 
                        Estratégia: Aparece após a 3ª notícia (índice 2). 
                        Captura a atenção do usuário no meio da rolagem.
                    */}
                                        {index === 2 && (
                                            <div className="w-full py-6 flex flex-col items-center justify-center border-y border-zinc-800 my-4 bg-zinc-900/50">
                                                <span className="text-[10px] text-zinc-600 uppercase tracking-widest mb-2">Publicidade</span>
                                                <div className="w-full md:w-[70%] h-[150px] bg-zinc-800 rounded flex items-center justify-center text-zinc-500 font-bold border border-zinc-700">
                                                    {/* COLE O CÓDIGO ADSENSE (In-Article ou Display) AQUI */}
                                                    ESPAÇO ADSENSE IN-FEED
                                                </div>
                                            </div>
                                        )}

                                    </React.Fragment>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-zinc-900 rounded border border-zinc-800 border-dashed">
                                <AlertCircle className="mx-auto text-zinc-600 mb-4" size={48} />
                                <h3 className="text-xl font-bold text-zinc-400">Nenhuma notícia encontrada</h3>
                            </div>
                        )}
                    </div>

                    {/* SIDEBAR */}
                    <aside className="lg:col-span-4 space-y-12">

                        {/* Widget: Pesquisa */}
                        <div className="bg-zinc-900 p-6 rounded border border-zinc-800">
                            <h3 className="text-sm font-bold uppercase border-l-4 border-green-500 pl-3 mb-4">Pesquisar</h3>
                            <div className="relative">
                                <input type="text" placeholder="Buscar..." className="w-full bg-black border border-zinc-700 text-white py-3 px-4 pl-4 rounded focus:outline-none focus:border-green-500 transition" />
                                <Search className="absolute right-3 top-3 text-zinc-500" size={20} />
                            </div>
                        </div>

                        {/* --- ADSENSE 3: SIDEBAR (RETÂNGULO) --- 
                Estratégia: Clássico 300x250. Ótimo CTR em desktop.
            */}
                        <div className="bg-zinc-900 h-[280px] flex flex-col items-center justify-center border border-zinc-800 rounded">
                            <span className="text-[10px] text-zinc-600 uppercase tracking-widest mb-1">Publicidade</span>
                            {/* COLE O CÓDIGO ADSENSE (Display Quadrado) AQUI */}
                            <span className="text-zinc-500 font-bold text-sm">ADSENSE 300x250</span>
                        </div>

                        {/* Widget: Newsletter */}
                        <div className="bg-green-600 p-8 rounded-xl text-center">
                            <h3 className="text-black font-black text-2xl uppercase italic mb-2">Bola na Caixa</h3>
                            <p className="text-black/80 text-sm mb-6 font-medium">Receba as melhores análises direto no seu e-mail.</p>
                            <input type="email" placeholder="Seu e-mail" className="w-full p-3 rounded bg-green-700/50 placeholder-green-900 text-black font-bold focus:outline-none focus:bg-white transition mb-3 border-0" />
                            <button className="w-full bg-black text-white font-black uppercase py-3 rounded hover:bg-zinc-800 transition">Inscrever-se</button>
                        </div>

                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Category;
