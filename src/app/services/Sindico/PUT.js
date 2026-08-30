export async function updateSindico(id, {
    // pessoa
    nomeCompleto,
    cpf,
    email,
    telefone,
    dataNascimento,
    // login (opcionais na edição)
    username,
    senha,
    // foto
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

    // Objeto login (só envia se preenchido)
    if (username) {
        formData.append("login.username", username);
    }
    if (senha) {
        formData.append("login.senha", senha);
    }

    if (foto instanceof Blob) {
        formData.append("foto", foto, foto.name || `foto-${Date.now()}.jpg`);
    }

    try {
        const response = await fetch(`${API_URL}/sindicos/${id}`, {
            method: "PUT",
            credentials: "include",
            body: formData,
        });

        if (!response.ok) {
            const contentType = response.headers.get("content-type");
            const errorData = contentType?.includes("application/json")
                ? await response.json()
                : { message: `Erro ${response.status}: ${response.statusText}` };

            throw new Error(errorData.message || "Erro ao atualizar Sindico");
        }

        return true;
    } catch (error) {
        console.error("Erro ao atualizar sindico:", error);
        throw error;
    }
}