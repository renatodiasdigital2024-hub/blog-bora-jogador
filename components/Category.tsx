import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sanityClient, urlFor } from "../lib/sanity";
import { Clock } from "lucide-react";

interface Post {
    title: string;
    slug: string;
    mainImage: any;
    excerpt: string;
    publishedAt: string;
    author: { name: string };
    category: { title: string };
}

const Category = () => {
    const { slug } = useParams();
    const [posts, setPosts] = useState<Post[]>([]);
    const [categoryTitle, setCategoryTitle] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            // Busca posts que tenham a categoria especificada no slug
            const query = `*[_type == "post" && $slug in categories[]->slug.current] | order(publishedAt desc){
        title,
        "slug": slug.current,
        mainImage,
        excerpt,
        publishedAt,
        "category": categories[0]->{title}
      }`;

            const result = await sanityClient.fetch(query, { slug });
            setPosts(result);

            // Define o título da página baseado no primeiro post ou no slug
            if (result.length > 0) {
                setCategoryTitle(result[0].category?.title);
            } else {
                setCategoryTitle(slug?.replace("-", " ") || "Categoria");
            }
        };

        if (slug) fetchPosts();
    }, [slug]);

    return (
        <div className="bg-black text-white font-sans min-h-screen">
            <div className="bg-zinc-900 py-12 border-b border-zinc-800">
                <div className="container mx-auto px-4">
                    <span className="text-green-500 text-xs font-black uppercase tracking-widest">Editoria</span>
                    <h1 className="text-4xl md:text-5xl font-black italic uppercase mt-2">{categoryTitle}</h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                {posts.length === 0 ? (
                    <div className="text-center py-20 text-zinc-500">
                        <p className="text-xl">Nenhuma notícia encontrada nesta categoria.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {posts.map((post, index) => (
                            <div key={index} className="group cursor-pointer">
                                <div className="overflow-hidden rounded-lg mb-4 relative h-56">
                                    {/* AQUI ESTAVA O PROBLEMA: Link corrigido para /post/ */}
                                    <a href={`/post/${post.slug}`}>
                                        {post.mainImage && (
                                            <img
                                                src={urlFor(post.mainImage).width(600).url()}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                            />
                                        )}
                                    </a>
                                </div>
                                <div className="flex items-center text-zinc-500 text-xs font-bold mb-2 space-x-2">
                                    <Clock size={12} />
                                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                                </div>
                                <h3 className="text-lg font-bold uppercase leading-tight group-hover:text-green-500 transition">
                                    <a href={`/post/${post.slug}`}>{post.title}</a>
                                </h3>
                                <p className="text-zinc-400 text-sm mt-2 line-clamp-3">{post.excerpt}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Category;
