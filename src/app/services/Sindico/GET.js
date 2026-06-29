export async function listSindicos() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
        const response = await fetch(`${API_URL}/sindicos`, {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) return null;

        return await response.json();
    } catch (error) {
        console.error("Erro ao buscar sindicos:", error);
        return null;
    }
}