export async function createPackage(nomePacote, idDestinatario, emailDestinatario, foto, observacao) {
    setLoading(true);
    setError(null);
    //array de objetos, cada objeto tem a descrição, o id do morador, o andar e o apartamento
    payload = {
        nomePacote,
        idDestinatario,
        emailDestinatario,
        foto,
        observacao
    }
    try {
      const res = await fetch("/api/packages", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erro ao registrar encomenda");
      }

        const novaEncomenda = await res.json();

      return novaEncomenda;

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };