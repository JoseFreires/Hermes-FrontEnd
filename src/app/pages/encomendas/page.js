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
import { useEncomendaModal } from "@/app/hooks/useEncomendaModal";
import { filterEncomendas, extractFilterUsers, NAV_ITENS } from "@/app/hooks/filterEncomendas";

export default function Encomendas() {
    const { user } = useAuth();
    const canManage = user?.role.includes("ROLE_PORTEIRO") || user?.role.includes("ROLE_ADMIN");

    const { data, fetchEncomendas, removeEncomendas, isLoading } = useEncomendas();
    const modal = useEncomendaModal(fetchEncomendas);

    const [activeTab, setActiveTab] = useState("Todas");
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
                    funcionalitie="addEncomenda"
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
                {modal.tipo === "addEncomenda" && (
                    <FormEncomenda
                        title="Registrar Encomenda"
                        modo="add"
                        onSaveChanges={modal.save}
                    />
                )}

                {modal.tipo === "edit" && modal.encomendaData && (
                    <FormEncomenda
                        title="Alterar Encomenda"
                        modo="edit"
                        encomendaData={modal.encomendaData}
                        onClose={modal.close}
                        onSaveChanges={modal.save}
                        onDeliver={() => modal.setTipo("entregarEncomenda")} // Muda o tipo do modal para a tela de entrega
                    />
                )}

                {modal.tipo === "entregarEncomenda" && modal.encomendaData && (
                    <FormEntrega
                        encomenda={modal.encomendaData} // Os dados da encomenda atual
                        onClose={modal.close} // Fecha o modal após a entrega
                        onSuccess={fetchEncomendas}
                        onVoltar={() => modal.setTipo("edit")} // Volta pra tela anterior
                    />
             )}
            </ModalForm>
        </div>
    );
}
