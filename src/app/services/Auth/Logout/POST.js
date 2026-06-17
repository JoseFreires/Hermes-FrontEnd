const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Busca o usuário autenticado atual através de chamada à API de autenticação.
// Retorna os dados do usuário se autenticado, ou null se não autenticado ou em caso de erro.
// Usa credentials 'include' para enviar cookies de autenticação automaticamente.
export async function logout() {
    try {
        const response = await fetch(`${API_URL}/auth/sair`, {
            method: 'POST',
            credentials: 'include', // autenticação pelo cookie
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            return null;  // não autenticado ou erro
        }
        return ;
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        return null;
    }
}
