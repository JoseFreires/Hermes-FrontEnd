export async function createSindico({
  nomeCompleto,
  email,
  cpf,
  telefone,
  username = email,
  senha = "123456",
  dataNascimento,
}) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const body = {
    pessoa: {
      nomeCompleto,
      email,
      cpf,
      telefone,
      dataNascimento,
    },
    login: {
      username,
      senha,
    },
  };

  try {
    const response = await fetch(`${API_URL}/sindicos`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
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
