export type User = {
    id: string;
    name: string;
    email?: string
}

export type Product = {
    _id: string,
    name: string,
    category: string,
    price: number,
    offerPrice: number,
    quantity?: number,
    image: string[],
    description: string[],
    createdAt: string,
    updatedAt: string,
    inStock: boolean,
}

export type CartItems = Record<string, number>;