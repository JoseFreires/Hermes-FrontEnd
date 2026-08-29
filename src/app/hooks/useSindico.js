import { useState, useEffect, useCallback } from "react";
import { listSindicos } from "@/app/services/Sindico/GET.js";
import { softDeleteSindico } from "@/app/services/Sindico/DELETE.js";
 
const POLL_INTERVAL_MS = 30000;
 
export function useSindicos() {
    const [data, setData] = useState(null);
 
    const fetchSindicos = useCallback(async () => {
        setData(await listSindicos());
    }, []);
 
    useEffect(() => {
        fetchSindicos();
        const intervalId = setInterval(fetchSindicos, POLL_INTERVAL_MS);
        return () => clearInterval(intervalId);
    }, [fetchSindicos]);
 
    const removeSindicos = useCallback(async (ids, reason) => {
        try {
            await Promise.all(ids.map((id) => softDeleteSindico(id, reason)));
            setData((prev) =>
                prev ? prev.filter((item) => !ids.includes(item.idUsuario)) : prev
            );
        } catch (error) {
            console.error("Erro ao excluir síndicos:", error);
            alert("Erro ao excluir os síndicos. Tente novamente.");
        }
    }, []);
 
    return { data, fetchSindicos, removeSindicos, isLoading: data === null };
}