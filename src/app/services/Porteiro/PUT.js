export async function updatePorteiro(id, {
    // pessoa
    nomeCompleto,
    cpf,
    email,
    telefone,
    dataNascimento,
    // usuario
    username,
    senha,
    // porteiro
    turno,
    empresaResponsavel,
    foto,
}) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const formData = new FormData();

    // Objeto pessoa
    formData.append("nomeCompleto", nomeCompleto);
    formData.append("cpf", cpf);
    formData.append("email", email);
    formData.append("telefone", telefone);
    formData.append("dataNascimento", dataNascimento);

    
    if (username) {
        formData.append("usuario.username", username);
    }
    if (senha) {
        formData.append("usuario.senha", senha);
    }

    // Porteiro
    formData.append("turno", turno);
    formData.append("empresaResponsavel", empresaResponsavel);

    if (foto instanceof Blob) {
        formData.append("foto", foto, foto.name || `foto-${Date.now()}.jpg`);
    }

    try {
        const response = await fetch(`${API_URL}/porteiros/${id}`, {
            method: "PUT",
            credentials: "include",
            body: formData,
        });

        if (!response.ok) {
            const contentType = response.headers.get("content-type");
            const errorData = contentType?.includes("application/json")
                ? await response.json()
                : { message: `Erro ${response.status}: ${response.statusText}` };

            throw new Error(errorData.message || "Erro ao atualizar porteiro");
        }

        return true;
    } catch (error) {
        console.error("Erro ao atualizar porteiro:", error);
        throw error;
    }
}