export async function deliverEncomenda(id, tipo_retirada, receptor) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const deliveryData = {
    status: "Entregue",
    receptor: receptor,
    tipoRetirada: tipo_retirada,
  };

  try {
    const response = await fetch(`${API_URL}/packeds/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(deliveryData),
    });

    if (!response.ok) {
      // Aqui você pode tratar caso o Token seja inválido no backend
      const errorData = await response.json();
      throw new Error(errorData.message || "Falha ao registrar entrega.");
    }

    // Sucesso! Fecha o modal e atualiza a tabela
    onSuccess();
  } catch (error) {
    setErro(error.message);
  } finally {
    setLoading(false);
  }
}
