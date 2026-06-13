export async function listMorador() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
        const response = await fetch(`${API_URL}/moradores`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Erro ao buscar moradores:", error);
        return null;
    }
}

export function getMoradorId(morador) {
    return morador?.idUsuario ?? morador?.id ?? morador?.ID ?? morador?.Id;
}
