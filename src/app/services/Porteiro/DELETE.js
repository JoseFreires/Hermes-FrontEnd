export async function softDeletePorteiro(id, reason) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
        const response = await fetch(`${API_URL}/porteiros/${id}`, {
            method: "DELETE",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                deleted: true,
                deleteReason: reason,
            }),
        });

        if (!response.ok) {
            const contentType = response.headers.get("content-type");
            const errorData = contentType?.includes("application/json")
                ? await response.json()
                : { message: `Erro ${response.status}: ${response.statusText}` };

            throw new Error(errorData.message || "Erro ao excluir porteiro");
        }

        return true;
    } catch (error) {
        console.error("Erro ao excluir porteiro:", error);
        throw error;
    }
}