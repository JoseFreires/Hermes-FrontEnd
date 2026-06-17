export async function deliverEncomenda(id, tipoRetirada) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const deliveryData = {
        idEncomenda: id,
        tipoRetirada,
    };

    const response = await fetch(`${API_URL}/encomendas/${id}/entrega`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deliveryData),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Falha ao registrar entrega.");
    }

    return response.json();

}
