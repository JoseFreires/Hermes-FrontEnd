import { useState, useEffect, useCallback } from "react";
import  {listMorador}  from "@/app/services/Morador/GET.js";
import { softDeleteMorador } from "@/app/services/Morador/DELETE.js";

const POLL_INTERVAL_MS = 30000;//intervalo de autualização automatica via fetch

export function useMoradores() {
    const [data, setData] = useState(null);

    const fetchMoradores = useCallback(async () => {
        setData(await listMorador());
    }, []);

    useEffect(() => {
        fetchMoradores();
        const intervalId = setInterval(fetchMoradores, POLL_INTERVAL_MS);
        return () => clearInterval(intervalId);
    }, [fetchMoradores]);

    const removeMoradores = useCallback(async (ids, reason) => {
        try {
            await Promise.all(ids.map((id) => softDeleteMorador(id, reason)));
            setData((prev) =>
                prev ? prev.filter((item) => !ids.includes(item.idMorador)) : prev
            );
        } catch (error) {
            console.error("Erro ao excluir moradores:", error);
            alert("Erro ao excluir os moradores. Tente novamente.");
        }
    }, []);

    return { data, fetchMoradores, removeMoradores, isLoading: data === null };
}