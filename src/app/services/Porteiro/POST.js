export async function createPorteiro({
    // pessoa
    nomeCompleto,
    cpf,
    email,
    telefone,
    dataNascimento,
    // usuario
    username = email,
    senha = "123456",
    // porteiro
    turno = "MANHA",
    empresaResponsavel,
}) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
 
    const body = {
        pessoa: {
            nomeCompleto,
            cpf,
            email,
            telefone,
            dataNascimento,
        },
        usuario: {
            username,
            senha,
        },
        turno,                // "MANHA" | "TARDE" | "NOITE"
        empresaResponsavel,
    };
 
    try {
        const response = await fetch(`${API_URL}/porteiros`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
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
 