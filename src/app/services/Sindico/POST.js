export async function createSindico({
    nomeCompleto,
    email,
    cpf,
    telefone,
    dataNascimento,
    ativo,
}) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
 
    const sindico = {
        nomeCompleto,
        email,
        cpf,
        telefone,
        dataNascimento,
        ativo: ativo ?? true,
    };
 
    try {
        const response = await fetch(`${API_URL}/sindicos`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sindico),
        });
 
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Erro ao cadastrar síndico");
        }
 
        return await response.json();
    } catch (error) {
        console.error("Erro ao cadastrar síndico:", error);
        throw error;
    }
}