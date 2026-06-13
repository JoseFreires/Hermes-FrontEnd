export async function updatePackage(id, descricao, moradorId, andar, apartamento) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
        const response = await fetch(`${API_URL}/encomendas/${id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ descricao, moradorId, andar, apartamento }),
        });

        if (!response.ok) {
            const contentType = response.headers.get("content-type");
            let errorData;
            
            if (contentType && contentType.includes("application/json")) {
                errorData = await response.json();
            } else {
                errorData = { message: `Erro ${response.status}: ${response.statusText}` };
            }
            
            throw new Error(errorData.message || "Erro ao atualizar a encomenda");
        }
        
        return true; // atualização bem-sucedida
    } catch (error) {
        console.error("Erro ao atualizar a encomenda:", error);
        throw error;
    }
}