export async function updateEncomenda(id, {
    nomePacote,
    status,
    observacao,
    idDestinatario,
    emailDestinatario,
    foto
}) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const formData = new FormData();

    formData.append("nomePacote", nomePacote);
    formData.append("status", status);
    formData.append("emailDestinatario", emailDestinatario);
    formData.append("idDestinatario", String(Number(idDestinatario)));
    formData.append("observacao", observacao);

    if (foto instanceof Blob) {
        formData.append("foto", foto, foto.name || `foto-${Date.now()}.jpg`);
    }

    try {
        const response = await fetch(`${API_URL}/encomendas/${id}`, {
            method: "PUT",
            credentials: "include",
            body: formData,
        });

        if (!response.ok) {
            const contentType = response.headers.get("content-type");
            const errorData = contentType?.includes("application/json")
                ? await response.json()
                : { message: `Erro ${response.status}: ${response.statusText}` };

            throw new Error(errorData.message || "Erro ao atualizar encomenda");
        }

        return true;
    } catch (error) {
        console.error("Erro ao atualizar encomenda:", error);
        throw error;
    }
}