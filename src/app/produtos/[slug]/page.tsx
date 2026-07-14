import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';

const products = {
  'gelo-cubos-5kg': {
    id: 'gelo-cubos-5kg',
    name: 'Gelo em Cubos - 5kg',
    description: 'Gelo cristalino em cubos perfeitos, ideal para bebidas, drinks e resfriamento rápido. Produzido com água purificada por osmose reversa e tratamento UV, garantindo pureza e sabor neutro.',
    longDescription: 'Nosso gelo em cubos de 5kg é a escolha ideal para uso doméstico e comercial leve. Cada cubo é produzido em fábrica própria com rigoroso controle de qualidade, garantindo transparência total e ausência de impurezas. A embalagem plástica alimentícia lacrada mantém a integridade do produto até o momento do uso.',
    category: 'CUBES',
    weight: 5,
    price: 12.90,
    originalPrice: 14.90,
    image: '/images/products/gelo-cubos.svg',
    images: ['/images/products/gelo-cubos.svg'],
    featured: true,
    stock: 500,
    specs: {
      'Tipo': 'Cubos cristalinos',
      'Peso líquido': '5 kg',
      'Dimensões da embalagem': '35 x 25 x 15 cm',
      'Validade': 'Indeterminada (congelado)',
      'Armazenamento': 'Freezer a -18°C ou inferior',
      'Certificação': 'ANVISA / Ministério da Agricultura',
      'Origem': 'Fábrica própria Mauá/SP',
    },
    features: [
      'Água purificada (osmose reversa + UV)',
      'Cubos perfeitos e transparentes',
      'Embalagem alimentícia lacrada',
      'Caixa térmica na entrega',
      'Rastreabilidade por lote',
    ],
    warnings: [],
  },
  'gelo-cubos-10kg': {
    id: 'gelo-cubos-10kg',
    name: 'Gelo em Cubos - 10kg',
    description: 'Embalagem econômica para maior volume. Gelo cristalino em cubos perfeitos para eventos e estabelecimentos.',
    longDescription: 'Embalagem de 10kg com excelente custo-benefício para bares, restaurantes e eventos de médio porte. Mesma qualidade premium do gelo em cubos 5kg, com desconto por volume.',
    category: 'CUBES',
    weight: 10,
    price: 22.90,
    originalPrice: 25.90,
    image: '/images/products/gelo-cubos-10kg.svg',
    images: ['/images/products/gelo-cubos-10kg.svg'],
    featured: true,
    stock: 300,
    specs: {
      'Tipo': 'Cubos cristalinos',
      'Peso líquido': '10 kg',
      'Dimensões da embalagem': '45 x 30 x 20 cm',
      'Validade': 'Indeterminada (congelado)',
      'Armazenamento': 'Freezer a -18°C ou inferior',
      'Certificação': 'ANVISA / Ministério da Agricultura',
      'Origem': 'Fábrica própria Mauá/SP',
    },
    features: [
      'Água purificada (osmose reversa + UV)',
      'Desconto por volume (10kg)',
      'Embalagem reforçada para transporte',
      'Caixa térmica na entrega',
      'Ideal para bares e restaurantes',
    ],
    warnings: [],
  },
  'gelo-triturado-5kg': {
    id: 'gelo-triturado-5kg',
    name: 'Gelo Triturado - 5kg',
    description: 'Gelo em escamas finas, ideal para resfriamento rápido, expositores de frutos do mar, caixas térmicas e drinks batidos.',
    longDescription: 'O gelo triturado Best Gelo é produzido a partir dos mesmos cubos cristalinos, processado em equipamento dedicado para obter escamas uniformes. Perfeito para resfriamento rápido de bebidas, conservação de pescados em expositores, preparo de drinks batidos (caipirinhas, frozen) e preenchimento de caixas térmicas para transporte.',
    category: 'CRUSHED',
    weight: 5,
    price: 14.90,
    originalPrice: 16.90,
    image: '/images/products/gelo-triturado.svg',
    images: ['/images/products/gelo-triturado.svg'],
    featured: true,
    stock: 400,
    specs: {
      'Tipo': 'Escamas finas (triturado)',
      'Peso líquido': '5 kg',
      'Dimensões da embalagem': '35 x 25 x 15 cm',
      'Validade': 'Indeterminada (congelado)',
      'Armazenamento': 'Freezer a -18°C ou inferior',
      'Certificação': 'ANVISA / Ministério da Agricultura',
      'Origem': 'Fábrica própria Mauá/SP',
    },
    features: [
      'Escamas uniformes para melhor contato',
      'Resfriamento 40% mais rápido que cubos',
      'Ideal para caipirinhas e drinks frozen',
      'Perfeito para expositores de frutos do mar',
      'Embalagem alimentícia lacrada',
      'Caixa térmica na entrega',
    ],
    warnings: [
      'Derrete mais rápido que cubos inteiros',
      'Armazenar em freezer até o momento do uso',
    ],
  },
  'gelo-seco-1kg': {
    id: 'gelo-seco-1kg',
    name: 'Gelo Seco - 1kg',
    description: 'CO2 sólido a -78,5°C para transporte de perecíveis, efeitos especiais, limpeza criogênica e conservação ultra-rápida.',
    longDescription: 'Gelo seco (CO2 sólido) de grau alimentício e industrial. Temperatura de sublimação -78,5°C. Não deixa resíduo líquido, ideal para transporte de produtos sensíveis à umidade, conservação de vacinas e medicamentos, efeitos de neblina em eventos, limpeza criogênica industrial e congelamento rápido. Vendido em caixa térmica isolante inclusa.',
    category: 'DRY_ICE',
    weight: 1,
    price: 45.00,
    originalPrice: 50.00,
    image: '/images/products/gelo-seco.svg',
    images: ['/images/products/gelo-seco.svg'],
    featured: false,
    stock: 100,
    specs: {
      'Tipo': 'CO2 Sólido (Gelo Seco)',
      'Peso líquido': '1 kg',
      'Temperatura': '-78,5°C (sublimação)',
      'Dimensões da caixa térmica': '30 x 20 x 20 cm',
      'Duração estimada': '24-48h em caixa térmica fechada',
      'Certificação': 'Grau alimentício / Industrial',
      'Origem': 'Fábrica própria Mauá/SP',
    },
    features: [
      'Temperatura extrema: -78,5°C',
      'Não deixa resíduo líquido (sublima)',
      'Caixa térmica isolante inclusa',
      'Grau alimentício e industrial',
      'Ideal para transporte de perecíveis',
      'Efeitos especiais (neblina/teatro)',
      'Limpeza criogênica industrial',
    ],
    warnings: [
      'MANUSEIO COM LUVAS TÉRMICAS OBRIGATÓRIO',
      'Não tocar com as mãos nuas - risco de queimadura criogênica',
      'Não armazenar em recipientes herméticos - risco de explosão',
      'Usar em local ventilado - CO2 desloca oxigênio',
      'Manter fora do alcance de crianças e animais',
      'Não ingerir - uso externo apenas',
    ],
  },
  'gelo-personalizado': {
    id: 'gelo-personalizado',
    name: 'Gelo Personalizado',
    description: 'Cubos de gelo com sua marca, logo ou design exclusivo. Ideal para eventos corporativos, casamentos, bares e restaurantes que querem diferenciar sua apresentação.',
    longDescription: 'Gelo personalizado Best Gelo: sua marca em alto relevo dentro do cubo de gelo cristalino. Tecnologia de moldagem exclusiva que garante definição nítida do logotipo sem comprometer a pureza do gelo. Pedido mínimo: 50kg. Prazo de produção: 5 dias úteis após aprovação da arte. Entregue em caixas térmicas personalizadas.',
    category: 'CUSTOM',
    weight: 5,
    price: 35.00,
    originalPrice: 40.00,
    image: '/images/products/gelo-personalizado.svg',
    images: ['/images/products/gelo-personalizado.svg'],
    featured: false,
    stock: 50,
    specs: {
      'Tipo': 'Cubos personalizados com logo/marca',
      'Peso mínimo do pedido': '50 kg',
      'Peso por embalagem': '5 kg',
      'Dimensões do cubo': '3,5 x 3,5 x 3,5 cm',
      'Área de impressão': '2,5 x 2,5 cm (alto relevo)',
      'Prazo de produção': '5 dias úteis após aprovação da arte',
      'Validade': 'Indeterminada (congelado)',
      'Armazenamento': 'Freezer a -18°C ou inferior',
      'Certificação': 'ANVISA / Ministério da Agricultura',
      'Origem': 'Fábrica própria Mauá/SP',
    },
    features: [
      'Logo/marca em alto relevo nítido',
      'Gelo cristalino mesma qualidade premium',
      'Aprovação de arte digital prévia',
      'Caixas térmicas personalizadas opcionais',
      'Ideal para casamentos, eventos, marcas',
      'Diferenciação visual premium',
      'Não altera sabor da bebida',
    ],
    warnings: [
      'Pedido mínimo: 50kg',
      'Prazo de produção: 5 dias úteis',
      'Requer aprovação de arte digital',
      'Cancelamento não aceito após aprovação da arte',
    ],
  },
};

const categoryLabels: Record<string, string> = {
  CUBES: 'Cubos',
  CRUSHED: 'Triturado',
  DRY_ICE: 'Gelo Seco',
  CUSTOM: 'Personalizado',
};

const categoryIcons = {
  CUBES: 'Box',
  CRUSHED: 'Droplets',
  DRY_ICE: 'Flame',
  CUSTOM: 'Sparkles',
};

const relatedProducts = [
  { id: 'gelo-cubos-5kg', name: 'Gelo em Cubos - 5kg', price: 12.90, image: '/images/products/gelo-cubos.svg', category: 'CUBES' },
  { id: 'gelo-triturado-5kg', name: 'Gelo Triturado - 5kg', price: 14.90, image: '/images/products/gelo-triturado.svg', category: 'CRUSHED' },
  { id: 'gelo-seco-1kg', name: 'Gelo Seco - 1kg', price: 45.00, image: '/images/products/gelo-seco.svg', category: 'DRY_ICE' },
  { id: 'gelo-personalizado', name: 'Gelo Personalizado', price: 35.00, image: '/images/products/gelo-personalizado.svg', category: 'CUSTOM' },
];

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const product = products[resolvedParams.slug as keyof typeof products];

  if (!product) {
    return {
      title: 'Produto não encontrado | Best Gelo',
      description: 'O produto solicitado não foi encontrado.',
    };
  }

  return {
    title: `${product.name} | Best Gelo`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Best Gelo`,
      description: product.description,
      images: [{ url: product.image, width: 400, height: 400 }],
      type: 'website',
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = products[resolvedParams.slug as keyof typeof products];

  if (!product) {
    notFound();
  }

  return (
    <ProductDetailClient
      product={product}
      categoryLabels={categoryLabels}
      categoryIcons={categoryIcons}
      relatedProducts={relatedProducts.filter(p => p.id !== product.id)}
    />
  );
}