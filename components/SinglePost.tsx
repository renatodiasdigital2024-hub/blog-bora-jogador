import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sanityClient, urlFor } from "../lib/sanity";
import { PortableText } from "@portabletext/react";
import { Calendar, User, Clock } from "lucide-react";

interface Post {
  title: string;
  mainImage: any;
  body: any;
  publishedAt: string;
  author: {
    name: string;
  };
  categories: {
    title: string;
  }[];
}

const SinglePost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      // Busca a notícia completa pelo Slug
      const query = `*[slug.current == $slug][0]{
        title,
        mainImage,
        body,
        publishedAt,
        author->{name},
        categories[]->{title}
      }`;

      const data = await sanityClient.fetch(query, { slug });
      setPost(data);
    };

    if (slug) fetchPost();
  }, [slug]);

  if (!post) return <div className="text-white text-center py-20">Carregando notícia...</div>;

  return (
    <div className="bg-black min-h-screen text-white font-sans pb-20">

      {/* 1. Cabeçalho da Notícia (Imagem de Fundo + Título) */}
      <div className="relative h-[60vh] w-full">
        {post.mainImage && (
          <img
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            className="w-full h-full object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

        <div className="absolute bottom-0 left-0 w-full p-4 md:p-10 container mx-auto">
          {/* Categorias (Tags) */}
          <div className="flex space-x-2 mb-4">
            {post.categories?.map((cat, index) => (
              <span key={index} className="bg-green-600 text-black px-3 py-1 text-xs font-bold uppercase tracking-wider rounded">
                {cat.title}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-5xl font-black italic uppercase leading-tight mb-6 max-w-4xl shadow-black drop-shadow-lg">
            {post.title}
          </h1>

          <div className="flex items-center space-x-6 text-zinc-300 text-sm font-medium">
            <div className="flex items-center"><User size={16} className="mr-2 text-green-500" /> {post.author?.name || "Redação"}</div>
            <div className="flex items-center"><Calendar size={16} className="mr-2 text-green-500" /> {new Date(post.publishedAt).toLocaleDateString()}</div>
          </div>
        </div>
      </div>

      {/* 2. Conteúdo do Texto (Corpo da Notícia) */}
      <div className="container mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <article className="prose prose-invert prose-lg prose-green max-w-none">
            {/* O PortableText transforma o texto rico do Sanity em HTML */}
            <PortableText
              value={post.body}
              components={{
                types: {
                  image: ({ value }: any) => (
                    <img src={urlFor(value).url()} alt="Foto da matéria" className="w-full rounded-lg my-8" />
                  ),
                }
              }}
            />
          </article>
        </div>

        {/* Sidebar Lateral (Espaço para Ads ou Mais Lidas) */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-zinc-900 p-6 rounded border border-zinc-800 text-center">
            <span className="text-xs font-bold text-zinc-500 uppercase block mb-2">Publicidade</span>
            <div className="w-full h-64 bg-zinc-800 flex items-center justify-center text-zinc-600 font-bold">
              ADSENSE 300x250
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
