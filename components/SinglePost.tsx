import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sanityClient, urlFor } from "../lib/sanity";
import { PortableText } from "@portabletext/react";
import { Calendar, Clock, Share2, Twitter, Link as LinkIcon, Search, ChevronRight, Home as HomeIcon } from "lucide-react";

const SinglePost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const query = `*[slug.current == $slug][0]{
        title, mainImage, body, content, publishedAt, _createdAt,
        author->{name}, categories[]->{title},
        "related": *[_type == "post" && slug.current != $slug][0..2]{ title, mainImage, "slug": slug.current }
      }`;
      const data = await sanityClient.fetch(query, { slug });
      setPost(data);
    };
    if (slug) fetchPost();
  }, [slug]);

  if (!post) return <div className="bg-black min-h-screen flex items-center justify-center text-white font-bold uppercase italic">Carregando Notícia...</div>;

  return (
    <div className="bg-black min-h-screen text-white font-sans pt-10 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center text-[10px] font-bold uppercase text-zinc-500 mb-6 tracking-widest">
          <a href="/" className="hover:text-green-500 flex items-center"><HomeIcon size={12} className="mr-2" /> INÍCIO</a>
          <ChevronRight size={10} className="mx-2" />
          <span className="text-green-600">{post.title}</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black italic uppercase leading-none mb-8 tracking-tighter">{post.title}</h1>

        <div className="flex flex-col md:flex-row md:items-center border-t border-b border-zinc-800 py-6 mb-10 gap-6">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center font-bold text-black mr-3">{post.author?.name?.charAt(0)}</div>
            <div><span className="text-[9px] font-bold text-zinc-500 uppercase block">Por</span><span className="text-xs font-bold uppercase">{post.author?.name}</span></div>
          </div>
          <div className="flex items-center gap-6 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            <div className="flex items-center"><Calendar size={14} className="mr-2 text-green-500" /> {new Date(post.publishedAt || post._createdAt).toLocaleDateString()}</div>
            <div className="flex items-center"><Clock size={14} className="mr-2 text-green-500" /> 5 min leitura</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            {post.mainImage && <img src={urlFor(post.mainImage).width(1200).url()} className="w-full rounded-xl mb-12 border border-zinc-800" alt={post.title} />}
            <article className="prose prose-invert prose-lg max-w-none prose-p:text-zinc-300 prose-headings:font-black prose-headings:italic prose-headings:uppercase prose-a:text-green-500">
              <PortableText value={post.body || post.content} components={{ types: { image: ({ value }: any) => <img src={urlFor(value).url()} className="w-full rounded-lg my-8 border border-zinc-800" alt="post" /> } }} />
            </article>

            <div className="mt-16 bg-zinc-900/20 p-8 border border-zinc-800 rounded text-center">
              <span className="text-[9px] text-zinc-600 font-bold uppercase mb-4 block">Publicidade In-Feed</span>
              <div className="h-40 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-700 font-bold uppercase">Google Adsense Banner</div>
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-10">
            <div className="bg-[#0a0a0a] p-6 rounded border border-zinc-800"><h3 className="text-xs font-black text-green-500 uppercase mb-4 border-l-4 border-green-500 pl-3">Pesquisar</h3><div className="relative"><input type="text" className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded text-sm" /><Search className="absolute right-4 top-3 text-zinc-500" size={18} /></div></div>
            <div className="bg-zinc-900/20 p-6 rounded border border-zinc-800 flex flex-col items-center"><span className="text-[9px] text-zinc-600 font-bold uppercase mb-3">Anúncio Lateral</span><div className="w-[300px] h-[600px] bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-700 font-bold text-xs uppercase text-center">Espaço Vertical<br />Google Ads</div></div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;