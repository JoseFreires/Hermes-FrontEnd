export async function updateMorador(id, {
    nomeCompleto,
    telefone,
    dataNascimento,
    moradiaIdMoradia,
    dataChegada,
    dataSaida,
    foto,
}) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const formData = new FormData();

    formData.append("nomeCompleto", nomeCompleto);
    formData.append("telefone", telefone);
    formData.append("dataNascimento", dataNascimento);
  
    formData.append("dataChegada", dataChegada);

   if (moradiaIdMoradia && !isNaN(moradiaIdMoradia)) {
     formData.append('moradiaIdMoradia', moradiaIdMoradia);
}

    if (dataSaida) {
        formData.append("dataSaida", dataSaida);
    }

    if (foto instanceof Blob) {
        formData.append("foto", foto, foto.name || `morador-${Date.now()}.jpg`);
    }

    try {
        const response = await fetch(`${API_URL}/moradores/${id}`, {
            method: "PUT",
            credentials: "include",
            body: formData,
        });

        if (!response.ok) {
            const contentType = response.headers.get("content-type");
            const errorData = contentType?.includes("application/json")
                ? await response.json()
                : { message: `Erro ${response.status}: ${response.statusText}` };

            throw new Error(errorData.message || "Erro ao atualizar morador");
        }

        return true;
    } catch (error) {
        console.error("Erro ao atualizar morador:", error);
        throw error;
    }
}