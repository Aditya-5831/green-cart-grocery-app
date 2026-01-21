import { createContext, type ReactNode, useContext, useState } from "react";

import { useNavigate, type NavigateFunction } from 'react-router-dom';

interface User {
    id: string;
    name: string;
    email?: string
}

interface AppContextType {
    navigate: NavigateFunction;
    user: User | null,
    setUser: (user: User | null) => void;
    isSeller: boolean;
    setIsSeller: (isSeller: boolean) => void;
    showUserLogin: boolean;
    setShowUserLogin: (showUserLogin: boolean) => void
}

type ProviderProps = {
    children: ReactNode
}

export const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({ children }: ProviderProps) => {
    const navigate = useNavigate()
    const [user, setUser] = useState<User | null>(null)
    const [isSeller, setIsSeller] = useState<boolean>(false)
    const [showUserLogin, setShowUserLogin] = useState<boolean>(false)

    const value: AppContextType = {
        navigate,
        user,
        setUser,
        isSeller,
        setIsSeller,
        showUserLogin,
        setShowUserLogin
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