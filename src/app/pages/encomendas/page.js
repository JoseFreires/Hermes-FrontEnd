"use client";

import styles from "./page.module.css";
import Sidebar from "@/app/components/Sidebar/sidebar";
import Header from "@/app/components/Header/header";
import CustomTable from "@/app/components/Table/table";
import FormEncomenda from "@/app/components/Modal/FormEncomenda/Form";
import ModalForm from "@/app/components/Modal/ModalForm/ModalForm";
import FormEntrega from "@/app/components/Modal/FormEntrega/FormEntrega";
import { useState } from "react";
import { useAuth } from "@/app/auth.js";
import { InjectEncomendasTable } from "@/app/hooks/dataInject";
import { useEncomendas } from "@/app/hooks/useEncomendas";
import { useEntityModal } from "@/app/hooks/useEntityModal";
import { filterEncomendas, extractFilterUsers, NAV_ITENS } from "@/app/hooks/filterEncomendas";
import { createEncomenda } from "@/app/services/Encomendas/POST";
import { updateEncomenda } from "@/app/services/Encomendas/PUT";


export default function Encomendas() {
    const { user } = useAuth();
    const canManage = user?.role.includes("ROLE_PORTEIRO") || user?.role.includes("ROLE_ADMIN")|| user?.role.includes("ROLE_SINDICO");

    const { data, fetchEncomendas, removeEncomendas, isLoading } = useEncomendas();
    const modal = useEntityModal({
        onCreate:  createEncomenda,
        onUpdate:  (id, data) => updateEncomenda(id, { nomePacote: data.nomePacote, observacao: data.observacao, idDestinatario: data.idDestinatario, emailDestinatario:data.emailDestinatario}),
        getId:     (item) => item.idEncomenda,
        onRefresh: fetchEncomendas,
    });
    

    const [activeTab, setActiveTab] = useState("Recebidas");
    const [filters, setFilters] = useState({ selectedUsers: [], startDate: "", endDate: "" });
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    return (
        <div className={styles.body}>
            <Sidebar />

            <div className={styles.main}>
                <Header
                    titulo="Encomendas registradas"
                    navItens={NAV_ITENS}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    search={search}
                    setSearch={setSearch}
                    setDebouncedSearch={setDebouncedSearch}
                    canAdd={canManage}
                    onAddbuttonClick={modal.openAdd}
                    users={extractFilterUsers(data)}
                    filters={filters}
                    onFiltersChange={setFilters}
                />

                <CustomTable
                    canRemove={canManage}
                    headerAs="span"
                    rowsPerPage={10}
                    columns={InjectEncomendasTable()}
                    data={filterEncomendas(data, activeTab, filters)}
                    searchValue={debouncedSearch}
                    onRowClick={modal.openEdit}
                    onDeleteConfirm={removeEncomendas}
                    isLoading={isLoading}
                />
            </div>

            <ModalForm show={modal.open} onHide={modal.close} centered>
                {modal.tipo === "add" && (
                    <FormEncomenda
                        title="Registrar Encomenda"
                        modo="add"
                        onSaveChanges={modal.save}
                    />
                )}

                {modal.tipo === "edit" && modal.itemData && (
                    <FormEncomenda
                        title="Alterar Encomenda"
                        modo="edit"
                        encomendaData={modal.itemData}
                        onClose={modal.close}
                        onSaveChanges={modal.save}
                        onDeliver={() => modal.setTipo("entregarEncomenda")} // Muda o tipo do modal para a tela de entrega
                    />
                )}

                {modal.tipo === "entregarEncomenda" && modal.itemData && (
                    <FormEntrega
                        encomenda={modal.itemData} // Os dados da encomenda atual
                        onClose={modal.close} // Fecha o modal após a entrega
                        onSuccess={fetchEncomendas}
                        onVoltar={() => modal.setTipo("edit")} // Volta pra tela anterior
                    />
             )}
            </ModalForm>
        </div>
    );
}
