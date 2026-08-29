export async function createEncomenda({
    nomePacote,
    observacao,
    idDestinatario,
    emailDestinatario,
    foto
}) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const formData = new FormData();

    formData.append("nomePacote", nomePacote);
    formData.append("status", "RECEBIDA");
    formData.append("emailDestinatario", emailDestinatario);
    formData.append("idDestinatario", String(Number(idDestinatario)));
    formData.append("observacao", observacao);
    formData.append(
        "idUsuarioPorteiro",
        String(Number(localStorage.getItem("idUsuario"))),
    );

    if (foto instanceof Blob) {
        formData.append("foto", foto, foto.name || `foto-${Date.now()}.jpg`);
    }

    try {
        const response = await fetch(`${API_URL}/encomendas`, {
            method: "POST",
            credentials: "include",
            body: formData,
        });



        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Erro ao registrar encomenda");
        }
        return await response.json();
    } catch (error) {
        console.error("Erro ao registrar encomenda:", error);
        throw error;
    }
}
