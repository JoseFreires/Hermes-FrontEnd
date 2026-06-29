import { useState, useEffect, useCallback } from "react";
import { listPorteiros } from "@/app/services/Porteiro/GET.js";
import { softDeletePorteiro } from "@/app/services/Porteiro/DELETE.js";

const POLL_INTERVAL_MS = 30000;

export function usePorteiros() {
    const [data, setData] = useState(null);

    const fetchPorteiros = useCallback(async () => {
        setData(await listPorteiros());
    }, []);

    useEffect(() => {
        fetchPorteiros();
        const intervalId = setInterval(fetchPorteiros, POLL_INTERVAL_MS);
        return () => clearInterval(intervalId);
    }, [fetchPorteiros]);

    const removePorteiros = useCallback(async (ids, reason) => {
        try {
            await Promise.all(ids.map((id) => softDeletePorteiro(id, reason)));
            setData((prev) =>
                prev ? prev.filter((item) => !ids.includes(item.idPorteiro)) : prev
            );
        } catch (error) {
            console.error("Erro ao excluir porteiros:", error);
            alert("Erro ao excluir os porteiros. Tente novamente.");
        }
    }, []);

    return { data, fetchPorteiros, removePorteiros, isLoading: data === null };
}