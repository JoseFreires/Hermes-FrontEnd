import { useState, useEffect } from "react";

export function usePackages() {
    // Trazemos o state para dentro do hook
    const [data, setdata] = useState(null);

    useEffect(() => {
        // A função de requisição fica isolada aqui dentro
        async function getPackages() {
            const API_URL = process.env.NEXT_PUBLIC_API_URL;
            try {
                const response = await fetch(`${API_URL}/packages/all`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    return null;
                }

                return await response.json();
            } catch (error) {
                console.error("Erro ao buscar as encomendas:", error);
                return null;
            }
        }

        async function fetchPackages() {
            const registredData = await getPackages();
            setdata(registredData);
        }

        // 1. Chamada inicial
        fetchPackages();

        // 2. Configuração do Polling (recarregamento)
        const tempoDeRecarregamento = 3000; // 30 segundos
        const intervalId = setInterval(() => {
            fetchPackages();
        }, tempoDeRecarregamento);

        // 3. Limpeza do relógio
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    // O hook retorna o data e o setdata para a página que for utilizá-lo
    return { data, setdata };
}