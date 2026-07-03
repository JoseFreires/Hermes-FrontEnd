import { useState, useEffect } from "react";
import { listMorador } from "@/app/services/Morador/GET.js";

/**
 * Retorna moradores formatados como { value, label } para o Dropdown.
 * value = idPessoa (usado como receptor em entregas)
 * label = nome do morador
 */
export function useMoradorOptions() {
    const [options,   setOptions]   = useState([]);
    const [isoptionLoading, setIsoptionLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        setIsoptionLoading(true);

        listMorador().then((data) => {
            if (!mounted) return;
            setOptions(
                (data ?? []).map((m) => ({
                    value: m.idPessoa,
                    label: m.nome ?? m.nomeMorador ?? String(m.idPessoa),
                }))
            );
        }).catch(() => {
            if (mounted) setOptions([]);
        }).finally(() => {
            if (mounted) setIsoptionLoading(false);
        });

        return () => { mounted = false; };
    }, []);

    return { options, isoptionLoading };
}
