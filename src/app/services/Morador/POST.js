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
    dataChegada,
    foto,
}) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const formData = new FormData();

    // Objeto pessoa
    formData.append("pessoa.nomeCompleto", nomeCompleto);
    formData.append("pessoa.cpf", cpf);
    formData.append("pessoa.email", email);
    formData.append("pessoa.telefone", telefone);
    formData.append("pessoa.dataNascimento", dataNascimento);

    // Objeto usuario
    formData.append("usuario.username", username);
    formData.append("usuario.senha", senha);

    // Morador
    formData.append("idMoradia", String(Number(idMoradia)));
    formData.append("dataChegada", dataChegada);


    if (foto instanceof Blob) {
        formData.append("foto", foto, foto.name || `foto-${Date.now()}.jpg`);
    }

    try {
        const response = await fetch(`${API_URL}/moradores`, {
            method: "POST",
            credentials: "include",
            body: formData,
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