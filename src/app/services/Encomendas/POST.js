export async function createEncomenda({
    nomePacote,
    observacao,
    idDestinatario,
    emailDestinatario,
    foto
}) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const encomenda = {
        nomePacote: nomePacote,
        foto: "aaaaa",
        status: "RECEBIDA",
        emailDestinatario: emailDestinatario,
        idDestinatario: Number(idDestinatario),
        observacao: observacao,
    }
    try {
        const response = await fetch(`${API_URL}/encomendas`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                encomenda
            ),
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
