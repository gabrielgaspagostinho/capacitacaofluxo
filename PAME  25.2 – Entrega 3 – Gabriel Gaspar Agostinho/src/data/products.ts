// tags
export const TAGS = [
    { id: 1, label: "Vegano" },
    { id: 2, label: "Vegetariano" },
    { id: 3, label: "Sem Glúten" },
    { id: 4, label: "Sem Lactose" },
    { id: 5, label: "Zero Açúcar" },
    { id: 6, label: "Proteico" }
];

// interface prodito
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: "doces" | "bebidas";
    image: string;
    highlight?: boolean;
    tagIds: number[];
    favorited: boolean;
}


export const products: Product[] = [
    // =========================
    // DOCES (12 Itens)
    // =========================
    {
        id: 1,
        name: "Cheesecake de Frutas Vermelhas",
        description: "Base crocante, creme suave e calda de frutas vermelhas.",
        price: 18.90,
        category: "doces",
        image: "/assets/doces/cheesecake.webp",
        highlight: true,
        tagIds: [2], // Vegetariano
        favorited: false
    },
    {
        id: 2,
        name: "Torta de Limão Siciliano",
        description: "Massa sablé, recheio de limão e merengue.",
        price: 15.50,
        category: "doces",
        image: "/assets/doces/tortalimao.webp",
        tagIds: [2], // Vegetariano
        favorited: false
    },
    {
        id: 3,
        name: "Brownie Fit Funcional",
        description: "Feito com farinha de amêndoas e xilitol. Rico e denso.",
        price: 12.00,
        category: "doces",
        image: "/assets/doces/brownie.webp",
        tagIds: [3, 4, 5], // Sem Glúten, Sem Lactose, Zero Açúcar
        favorited: true
    },
    {
        id: 4,
        name: "Macarons (3 un)",
        description: "Farinha de amêndoas. Sabores: Pistache, Framboesa e Baunilha.",
        price: 22.00,
        category: "doces",
        image: "/assets/doces/macarons.webp",
        tagIds: [3, 2], // Sem Glúten, Vegetariano
        favorited: false
    },
    {
        id: 5,
        name: "Mousse de Abacate com Cacau",
        description: "Abacate, cacau em pó e leite de coco. Super cremoso.",
        price: 14.90,
        category: "doces",
        image: "/assets/doces/mousse.jpg",
        tagIds: [1, 3, 4], // Vegano, Sem Glúten, Sem Lactose
        favorited: false
    },
    {
        id: 6,
        name: "Trufas de Tâmaras e Coco",
        description: "Doce natural feito com tâmaras, coco ralado e castanhas.",
        price: 8.50,
        category: "doces",
        highlight: true,
        image: "/assets/doces/trufas.jpg",
        tagIds: [1, 3, 4, 5], // Vegano, Sem Glúten, Sem Lactose, Zero Açúcar
        favorited: false
    },
    {
        id: 7,
        name: "Brigadeiro de Whey Protein",
        description: "A clássica receita brasileira em versão proteica para o pós-treino.",
        price: 9.00,
        category: "doces",
        image: "/assets/doces/brigadeiro.webp",
        tagIds: [6, 5, 3], // Proteico, Zero Açúcar, Sem Glúten
        favorited: false
    },
    {
        id: 8,
        name: "Cupcake Low Carb de Baunilha",
        description: "Fofinho, feito com farinha de coco e adoçante natural.",
        price: 11.50,
        category: "doces",
        image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80",
        tagIds: [3, 5, 2], // Sem Glúten, Zero Açúcar, Vegetariano
        favorited: false
    },
    {
        id: 9,
        name: "Torta de Maçã Integral",
        description: "Massa crocante integral, maçãs frescas e canela. Sem leite.",
        price: 16.00,
        category: "doces",
        image: "/assets/doces/tortamaca.jpeg",
        tagIds: [1, 4], // Vegano, Sem Lactose
        favorited: false
    },
    {
        id: 10,
        name: "Barra Proteica Caseira",
        description: "Aveia, pasta de amendoim, mel e whey protein isolado.",
        price: 13.00,
        category: "doces",
        image: "/assets/doces/barrinha.jpeg",
        tagIds: [6, 2], // Proteico, Vegetariano
        favorited: false
    },
    {
        id: 11,
        name: "Pavê de Doce de Leite",
        description: "Camadas de biscoito champagne e doce de leite argentino.",
        price: 19.50,
        category: "doces",
        highlight: true,
        image: "/assets/doces/pave.jpg",
        tagIds: [2], // Vegetariano
        favorited: false
    },
    {
        id: 12,
        name: "Bombom de Pasta de Amendoim",
        description: "Chocolate 70% recheado com pasta de amendoim cremosa.",
        price: 6.50,
        category: "doces",
        image: "/assets/doces/bombom.jpg",
        tagIds: [1, 6, 3], // Vegano, Proteico, Sem Glúten
        favorited: true
    },

    // =========================
    // BEBIDAS (12 Itens)
    // =========================
    {
        id: 13,
        name: "Cappuccino Italiano",
        description: "Expresso, leite vaporizado e espuma.",
        price: 10.00,
        category: "bebidas",
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80",
        tagIds: [2, 3], // Vegetariano, Sem Glúten
        favorited: false
    },
    {
        id: 14,
        name: "Matcha Latte Gelado",
        description: "Chá verde, leite de amêndoas e gelo.",
        price: 14.50,
        category: "bebidas",
        image: "/assets/bebidas/matcha.webp",
        tagIds: [1, 3, 4], // Vegano, Sem Glúten, Sem Lactose
        favorited: false
    },
    {
        id: 15,
        name: "Soda Italiana Maçã Verde",
        description: "Água com gás e xarope artesanal.",
        price: 12.00,
        category: "bebidas",
        image: "/assets/bebidas/soda.webp",
        tagIds: [1, 3, 4], // Vegano, Sem Glúten, Sem Lactose
        favorited: false
    },
    {
        id: 16,
        name: "Chocolate Quente",
        description: "Chocolate nobre derretido.",
        price: 13.00,
        category: "bebidas",
        image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=800&q=80",
        tagIds: [2, 3], // Vegetariano, Sem Glúten
        favorited: true
    },
    {
        id: 17,
        name: "Chá de Hibisco",
        description: "Infusão com pedaços de fruta.",
        price: 9.50,
        category: "bebidas",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80",
        tagIds: [1, 5, 3, 4], // Vegano, Zero Açúcar, Sem Glúten, Sem Lactose
        favorited: false
    },
    {
        id: 18,
        name: "Shake de Whey Chocolate",
        description: "Shake cremoso batido com gelo e whey protein isolado.",
        price: 18.00,
        category: "bebidas",
        image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=800&q=80",
        tagIds: [6, 3, 5], // Proteico, Sem Glúten, Zero Açúcar
        favorited: false
    },
    {
        id: 19,
        name: "Smoothie Tropical Proteico",
        description: "Manga, maracujá e proteína vegetal de ervilha.",
        price: 19.90,
        category: "bebidas",
        image: "/assets/bebidas/smotie.jpg",
        tagIds: [1, 6, 3, 4], // Vegano, Proteico, Sem Glúten, Sem Lactose
        favorited: false
    },
    {
        id: 20,
        name: "Iced Coffee Proteico",
        description: "Café gelado, canela e dose de proteína de baunilha.",
        price: 16.50,
        category: "bebidas",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80",
        tagIds: [6, 3, 5], // Proteico, Sem Glúten, Zero Açúcar
        favorited: false
    },
    {
        id: 21,
        name: "Golden Milk (Leite Dourado)",
        description: "Leite de coco, cúrcuma, gengibre e especiarias.",
        price: 14.00,
        category: "bebidas",
        image: "/assets/bebidas/milk.webp",
        tagIds: [1, 3, 4, 5], // Vegano, Sem Glúten, Sem Lactose, Zero Açúcar (opcional)
        favorited: false
    },
    {
        id: 22,
        name: "Suco Detox Verde",
        description: "Couve, limão, maçã verde e gengibre. Sem adição de açúcar.",
        price: 12.90,
        category: "bebidas",
        image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=800&q=80",
        tagIds: [1, 3, 4, 5], // Vegano, Sem Glúten, Sem Lactose, Zero Açúcar
        favorited: false
    },
    {
        id: 23,
        name: "Frappuccino de Caramelo",
        description: "Café, gelo, leite e calda de caramelo salgado.",
        price: 17.00,
        category: "bebidas",
        image: "/assets/bebidas/frapo.webp",
        tagIds: [2, 3], // Vegetariano, Sem Glúten
        favorited: false
    },
    {
        id: 24,
        name: "Limonada Suíça com Coco",
        description: "Limão batido com casca e leite de coco cremoso.",
        price: 11.00,
        category: "bebidas",
        image: "/assets/bebidas/limonada.webp",
        tagIds: [1, 3, 4], // Vegano, Sem Glúten, Sem Lactose
        favorited: true
    }
];

// funcao para ajudar a pegar o texto das tags com id
export function getTagName(id: number): string {
    const tag = TAGS.find(t => t.id === id);
    return tag ? tag.label : "";
}