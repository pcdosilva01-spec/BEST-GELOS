import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://bestgelo.com.br';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/pedido/novo/sucesso',
        '/pedido/[id]',
        '/cadastro',
        '/esqueci-senha',
        '/login',
        '/conta/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}