export async function updateMorador(id, dados) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
 
    try {
        const response = await fetch(`${API_URL}/moradores/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados),
        });
 
        if (!response.ok) {
            const contentType = response.headers.get("content-type");
            const errorData = contentType?.includes("application/json")
                ? await response.json()
                : { message: `Erro ${response.status}: ${response.statusText}` };
 
            throw new Error(errorData.message || "Erro ao atualizar morador");
        }
 
        return true;
    } catch (error) {
        console.error("Erro ao atualizar morador:", error);
        throw error;
    }
}