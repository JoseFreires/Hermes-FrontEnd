export async function createSindico({
  nomeCompleto,
  email,
  cpf,
  telefone,
  username = email,
  senha = "123456",
  dataNascimento,
  foto,
}) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const formData = new FormData();

  // Objeto pessoa
  formData.append("pessoa.nomeCompleto", nomeCompleto);
  formData.append("pessoa.email", email);
  formData.append("pessoa.cpf", cpf);
  formData.append("pessoa.telefone", telefone);
  formData.append("pessoa.dataNascimento", dataNascimento);

  // Objeto login
  formData.append("login.username", username);
  formData.append("login.senha", senha);

  if (foto instanceof Blob) {
    formData.append("foto", foto, foto.name || `foto-${Date.now()}.jpg`);
  }

  try {
    const response = await fetch(`${API_URL}/sindicos`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (!response.ok) {
      const contentType = response.headers.get("content-type");
      const errorData = contentType?.includes("application/json")
        ? await response.json()
        : { message: `Erro ${response.status}: ${response.statusText}` };

      throw new Error(errorData.message || "Erro ao cadastrar síndico");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao cadastrar síndico:", error);
    throw error;
  }
}