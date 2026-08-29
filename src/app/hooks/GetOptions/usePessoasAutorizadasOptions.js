import { useState, useEffect } from "react";
import { lisPessoasAutorizadas } from "@/app/services/Morador/GET.js";

/**
 * Retorna o morador dono da encomenda + pessoas autorizadas
 * formatados como { value, label } para o Dropdown de entrega.
 *
 * @param {object} encomenda — objeto completo da encomenda
 */
export function usePessoasAutorizadasOptions(encomenda) {
    const [options,   setOptions]   = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!encomenda?.idDestinatario) return;

        let mounted = true;
        setIsLoading(true);

        // Sempre inclui o morador dono como primeira opção
        const dono = {
            value: encomenda.idDestinatario,
            label: encomenda.nomeMorador ?? "Morador",
        };

        lisPessoasAutorizadas(encomenda.idDestinatario).then((data) => {
            if (!mounted) return;
            const autorizadas = (data ?? []).map((p) => ({
                value: p.idPessoaAutorizada,
                label: p.nome,
            }));
            setOptions([dono, ...autorizadas]);
        }).catch(() => {
            if (mounted) setOptions([dono]);
        }).finally(() => {
            if (mounted) setIsLoading(false);
        });

        return () => { mounted = false; };
    }, [encomenda?.idDestinatario]);

    return { options, isLoading };
}
