"use client";
import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Camelo, Try/catch evita que falhas de rede, indisponibilidade da API
// ou outros erros inesperados interrompam a aplicação. É boa prática para
// garantir que o app continue funcionando mesmo quando algo der errado.
// Use sempre que possível em qualquer chamada de API. (Apaga isso dps)

export async function getCurrentUser() {
    try { // necessário confirmar se essa é a rota correta da API dps
        const response = await fetch(`${API_URL}/auth/me`, {
            method: 'GET',
            credentials: 'include', // autenticação pelo cookie
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            return null;  // não autenticado ou erro
        }

        const user = await response.json();
        return user;
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        return null;
    }
}

export async function login(username, senha) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, senha }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Erro ao fazer login");
        }

        return true; // login bem-sucedido
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        throw error;
    }
}

export async function logout() {
    try {
        const response = await fetch(`${API_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Erro ao fazer logout");
        }
        return true; // logout bem-sucedido
    } catch (error) {
        console.error("Erro ao fazer logout:", error);
        throw error;
    }
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        window.setUser = setUser;
        window.user = user;

        if (token) {
            const decoded = jwtDecode(token);
            setUser(decoded);
        }
    }, []);

    async function loadUser() {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        setLoading(false);

        // Mock de autenticação para desenvolvimento local sem backend
        if (process.env.NEXT_PUBLIC_MOCK_AUTH === "true") {
            setUser({
                id: 1,
                nome: "Nome mockado",
                username: "Admin",
                roles: ["ROLE_ADMIN", "ROLE_MORADOR"],
            });

            setLoading(false);
            return;
        }
    }

    async function signIn(username, senha) {
        await login(username, senha);

        const currentUser = await getCurrentUser();
        setUser(currentUser);
    }

    async function signOut() {
        await logout();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signOut, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    };
    return context;
}