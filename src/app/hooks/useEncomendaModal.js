import { useState, useCallback } from "react";
import { updateEncomenda } from "@/app/services/Encomendas/PUT.js";
import { createEncomenda } from "@/app/services/Encomendas/POST.js";

export function useEncomendaModal(onRefresh) {
    const [open, setOpen] = useState(false);
    const [tipo, setTipo] = useState(null);
    const [encomendaData, setEncomendaData] = useState(null);

    const close = useCallback(() => {
        setOpen(false);
        setTipo(null);
        setEncomendaData(null);
    }, []);

    const openAdd = useCallback((modalTipo) => {
        setTipo(modalTipo);
        setOpen(true);
    }, []);

    const openEdit = useCallback((row) => {
        setEncomendaData(row);
        setTipo("edit");
        setOpen(true);
    }, []);

    const save = useCallback(
        async (formData) => {
            try {
                if (tipo === "edit" && encomendaData) {
                    await updateEncomenda(encomendaData.id, {
                        ...encomendaData,
                        ...formData,
                    });
                } else {
                    await createEncomenda(formData);
                }

                await onRefresh();
                close();
            } catch (error) {
                console.error("Erro ao salvar alterações:", error);
                alert("Erro ao salvar alterações. Tente novamente.");
            }
        },
        [tipo, encomendaData, onRefresh, close],
    );

    return { open, tipo, encomendaData, openAdd, openEdit, close, save };
}
