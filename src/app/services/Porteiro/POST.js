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
    turno,
    empresaResponsavel,
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

    // Porteiro
    formData.append("turno", turno);
    formData.append("empresaResponsavel", empresaResponsavel)

    if (foto instanceof Blob) {
        formData.append("foto", foto, foto.name || `foto-${Date.now()}.jpg`);
    }

    try {
        const response = await fetch(`${API_URL}/porteiros`, {
            method: "POST",
            credentials: "include",
            body: formData,
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
 

