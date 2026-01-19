
export interface NavItem {
  label: string;
  href?: string;
  subItems?: { label: string; href: string }[];
}

export interface Post {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  date: string;
  author: string;
}

export const NAVIGATION: NavItem[] = [
  { label: 'Home', href: '#' },
  {
    label: 'Brasileirão',
    subItems: [
      { label: 'Pré-jogo', href: '#' },
      { label: 'Bola Cheia / Bola Murcha', href: '#' },
      { label: 'Últimas', href: '#' },
    ],
  },
  {
    label: 'Só Lendas',
    subItems: [
      { label: 'Craques do Passado', href: '#' },
      { label: 'Curiosidades', href: '#' },
    ],
  },
  {
    label: 'Olho no Lance',
    subItems: [
      { label: 'Formação Tática', href: '#' },
      { label: 'Entendendo o Futebol', href: '#' },
    ],
  },
  { label: 'Nossa História', href: '#' },
  { label: 'Contato', href: '#' },
];
