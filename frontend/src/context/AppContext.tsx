import { createContext, type ReactNode, useContext, useState, type Dispatch, type SetStateAction, useEffect } from "react";

import { useNavigate, type NavigateFunction } from 'react-router-dom';
import { dummyProducts } from "../constants/assets";
import type { CartItems, Product, User } from "../lib/types";
import toast from "react-hot-toast";

interface AppContextType {
    navigate: NavigateFunction;
    user: User | null,
    setUser: Dispatch<SetStateAction<User | null>>;
    isSeller: boolean;
    setIsSeller: Dispatch<SetStateAction<boolean>>;
    showUserLogin: boolean;
    setShowUserLogin: Dispatch<SetStateAction<boolean>>;
    products: Product[];
    setProducts: Dispatch<SetStateAction<Product[]>>;
    currency: string;
    cartItems: CartItems;
    setCartItems: Dispatch<SetStateAction<CartItems>>;
    addToCart: (itemId: string) => void;
    decrementCartItem: (itemId: string) => void;
    removeFromCart: (itemId: string) => void;
}

type ProviderProps = {
    children: ReactNode
}

export const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({ children }: ProviderProps) => {
    const currency = import.meta.env.VITE_CURRENCY;

    const navigate = useNavigate()
    const [user, setUser] = useState<User | null>(null)
    const [isSeller, setIsSeller] = useState<boolean>(false)
    const [showUserLogin, setShowUserLogin] = useState<boolean>(false)
    const [products, setProducts] = useState<Product[]>([]);
    const [cartItems, setCartItems] = useState<CartItems>({});


    // Fetch All Products
    const fetchProducts = () => {
        setProducts(dummyProducts)
    }
    
    // Add Product to Cart
    const addToCart = (itemId: string) => {
        setCartItems(prev => ({
            ...prev, 
            [itemId]: (prev[itemId] || 0) + 1
        }));

        toast.success("Added to cart")
    }

      // Update Cart Item Quantity
      const decrementCartItem = (itemId: string) => {
        setCartItems(prev => {
            const updatedCart = {...prev};

            if(updatedCart[itemId] > 1){
                updatedCart[itemId] -= 1
            }else{
                delete updatedCart[itemId]
            }

            return updatedCart;
        });

        toast.success("Cart updated")
    }

    // Remove from cart
    const removeFromCart = (itemId: string) => {
        setCartItems(prev => {
            const updatedCart = { ...prev };
            delete updatedCart[itemId];
            return updatedCart;
        })

        toast.success("Removed from cart")
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    const value: AppContextType = {
        navigate,
        user,
        setUser,
        isSeller,
        setIsSeller,
        showUserLogin,
        setShowUserLogin,
        products,
        setProducts,
        currency,
        cartItems,
        setCartItems,
        addToCart,
        decrementCartItem,
        removeFromCart
    };
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    const context = useContext(AppContext)

    if (!context) throw new Error("useAppContext must be used within AppContextProvider");

    return context;
}