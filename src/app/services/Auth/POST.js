const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
