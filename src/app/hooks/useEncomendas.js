import { useState, useEffect, useCallback } from "react";
import { listEncomendas } from "@/app/services/Encomendas/GET.js";
import { softDeleteEncomenda } from "@/app/services/Encomendas/DELETE.js";

const POLL_INTERVAL_MS = 30000;

export function useEncomendas() {
    const [data, setData] = useState(null);

    const fetchEncomendas = useCallback(async () => {
        setData(await listEncomendas());
    }, []);

    useEffect(() => {
        fetchEncomendas();
        const intervalId = setInterval(fetchEncomendas, POLL_INTERVAL_MS);
        return () => clearInterval(intervalId);
    }, [fetchEncomendas]);

    const removeEncomendas = useCallback(async (ids, reason) => {
        try {
            await Promise.all(ids.map((id) => softDeleteEncomenda(id, reason)));
            setData((prev) => (prev ? prev.filter((item) => !ids.includes(item.id)) : prev));
        } catch (error) {
            console.error("Erro ao excluir encomendas:", error);
            alert("Erro ao excluir as encomendas. Tente novamente.");
        }
    }, []);

    return { data, fetchEncomendas, removeEncomendas, isLoading: data === null };
}
