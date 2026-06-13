export async function updateEncomenda(id, encomenda) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const {
        nomePacote,
        observacao,
        status,
        nomeMorador,
        nomePorteiro,
        numeroApartamento,
        emailDestinatario,
        tokenEncomenda,
        dataHoraRecebido,
        dataHoraRetirado,
        moradorId,
    } = encomenda;

    try {
        const response = await fetch(`${API_URL}/encomendas/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomePacote,
                observacao,
                status,
                nomeMorador,
                nomePorteiro,
                numeroApartamento,
                emailDestinatario,
                tokenEncomenda,
                dataHoraRecebido,
                dataHoraRetirado,
                moradorId,
            }),
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
