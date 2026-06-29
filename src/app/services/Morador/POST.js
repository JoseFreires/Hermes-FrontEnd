export async function createMorador({
    nome,
    email,
    cpf,
    telefone,
    numeroApartamento,
    bloco,
    dataChegada,
    nascimento,
    foto,
}) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
 
    const morador = {
        nome,
        email,
        cpf,
        telefone,
        numeroApartamento,
        bloco,
        dataChegada,
        nascimento,
        foto: foto ?? null,
    };
 
    try {
        const response = await fetch(`${API_URL}/moradores`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(morador),
        });
 
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Erro ao cadastrar morador");
        }
 
        return await response.json();
    } catch (error) {
        console.error("Erro ao cadastrar morador:", error);
        throw error;
    }
}