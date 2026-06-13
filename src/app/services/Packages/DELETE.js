export async function softDeletePackage(id, reason) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
        const response = await fetch(`${API_URL}/encomendas/${id}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                deleted: true,
                deleteReason: reason,
            }),
        });

        if (!response.ok) {
            const contentType = response.headers.get("content-type");
            let errorData;

            if (contentType && contentType.includes("application/json")) {
                errorData = await response.json();
            } else {
                errorData = { message: `Erro ${response.status}: ${response.statusText}` };
            }

            throw new Error(errorData.message || "Erro ao excluir a encomenda");
        }

        return true;
    } catch (error) {
        console.error("Erro ao excluir a encomenda:", error);
        throw error;
    }
}
