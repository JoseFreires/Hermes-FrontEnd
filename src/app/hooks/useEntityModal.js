import { useState, useCallback } from "react";
 
/**
 * Hook genérico de controle de modal para qualquer entidade.
 * Substitui useEncomendaModal, useMoradorModal, etc — um único hook para todos.
 *
 * @param {object} params
 * @param {function} params.onCreate(formData)     — função de serviço POST da entidade
 * @param {function} params.onUpdate(id, formData) — função de serviço PUT da entidade
 * @param {function} params.getId(item)            — extrai o ID do item (ex: item => item.idPorteiro)
 * @param {function} params.onRefresh()            — callback após salvar (ex: fetchPorteiros)
 *
 * @returns {{ open, tipo, itemData, openAdd, openEdit, close, save, setTipo }}
 *
 * --- Uso ---
 *
 * // Encomendas (comportamento original preservado)
 * const modal = useEntityModal({
 *     onCreate:  createEncomenda,
 *     onUpdate:  (id, data) => updateEncomenda(id, { nomePacote: data.nomePacote, ... }),
 *     getId:     (item) => item.idEncomenda,
 *     onRefresh: fetchEncomendas,
 * });
 *
 * // Porteiros
 * const modal = useEntityModal({
 *     onCreate:  createPorteiro,
 *     onUpdate:  (id, data) => updatePorteiro(id, data),
 *     getId:     (item) => item.idPorteiro,
 *     onRefresh: fetchPorteiros,
 * });
 *
 * // Moradores
 * const modal = useEntityModal({
 *     onCreate:  createMorador,
 *     onUpdate:  (id, data) => updateMorador(id, data),
 *     getId:     (item) => item.idMorador,
 *     onRefresh: fetchMoradores,
 * });
 *
 * // Síndicos
 * const modal = useEntityModal({
 *     onCreate:  createSindico,
 *     onUpdate:  (id, data) => updateSindico(id, data),
 *     getId:     (item) => item.idUsuario,
 *     onRefresh: fetchSindicos,
 * });
 */
export function useEntityModal({ onCreate, onUpdate, getId, onRefresh }) {
    const [open,     setOpen]     = useState(false);
    const [tipo,     setTipo]     = useState(null);   // "add" | "edit" | qualquer string customizada
    const [itemData, setItemData] = useState(null);
 
    const close = useCallback(() => {
        setOpen(false);
        setTipo(null);
        setItemData(null);
    }, []);
 
    const openAdd = useCallback(() => {
        setItemData(null);
        setTipo("add");
        setOpen(true);
    }, []);
 
    const openEdit = useCallback((row) => {
        setItemData(row);
        setTipo("edit");
        setOpen(true);
    }, []);
 
    const save = useCallback(
        async (formData) => {
            try {
                if (tipo === "edit" && itemData) {
                    const id = getId(itemData);
                    await onUpdate(id, formData);
                } else {
                    await onCreate(formData);
                }
 
                await onRefresh();
                close();
            } catch (error) {
                console.error("Erro ao salvar alterações:", error);
                alert("Erro ao salvar alterações. Tente novamente.");
            }
        },
        [tipo, itemData, getId, onCreate, onUpdate, onRefresh, close],
    );
 
    return { open, tipo, itemData, openAdd, openEdit, close, save, setTipo };
}