import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'publishedAt',
            title: 'Data de Publicação',
            type: 'datetime',
        }),
        defineField({
            name: 'featuredImage',
            title: 'Imagem de Destaque (DALL-E 3)',
            type: 'image',
            options: { hotspot: true },
            fields: [
                { name: 'alt', type: 'string', title: 'Texto Alternativo' }
            ]
        }),
        defineField({
            name: 'category',
            title: 'Categoria',
            type: 'reference',
            to: { type: 'category' },
        }),
        defineField({
            name: 'content',
            title: 'Conteúdo',
            type: 'array',
            of: [{ type: 'block' }, { type: 'image' }],
        }),
        defineField({
            name: 'excerpt',
            title: 'Resumo (SEO)',
            type: 'text',
            rows: 3,
        }),
    ],
})
