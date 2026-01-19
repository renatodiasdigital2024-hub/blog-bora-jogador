import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Categoria',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nome da Categoria',
      type: 'string', 
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'group',
      title: 'Grupo do Menu',
      type: 'string',
      options: {
        list: [
          {title: 'Brasileirão', value: 'brasileirao'},
          {title: 'Só Lendas', value: 'so-lendas'},
          {title: 'Olho no Lance', value: 'olho-no-lance'},
          {title: 'Institucional', value: 'institucional'},
        ],
      },
    }),
  ],
})
