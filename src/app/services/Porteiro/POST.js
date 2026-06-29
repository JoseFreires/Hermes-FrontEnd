export async function createPorteiro({
    nomeCompleto,
    email,
    cpf,
    telefone,
    turno,
    empresaResponsavel,
}) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const porteiro = {
        nomeCompleto,
        email,
        cpf,
        telefone,
        turno,               // "MANHA" | "TARDE" | "NOITE"
        empresaResponsavel,
    };

    try {
        const response = await fetch(`${API_URL}/porteiros`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(porteiro),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Erro ao cadastrar porteiro");
        }

        return await response.json();
    } catch (error) {
        console.error("Erro ao cadastrar porteiro:", error);
        throw error;
    }
}