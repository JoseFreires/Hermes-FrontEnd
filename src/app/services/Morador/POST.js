export async function createMorador({
    // pessoa
    nomeCompleto,
    cpf,
    email,
    telefone,
    dataNascimento,
    // usuario
    username = email,
    senha = "123456",
    // morador
    idMoradia,
    fotoPerfil="meucaminho",
    dataChegada,
}) {

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
 
   const body = {
    pessoa: { nomeCompleto, cpf, email, telefone, dataNascimento },
    usuario: { username, senha },
    idMoradia: Number(idMoradia),
    fotoPerfil:fotoPerfil,
    dataChegada,
};

    try {
        const response = await fetch(`${API_URL}/moradores`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
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