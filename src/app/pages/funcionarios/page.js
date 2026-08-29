"use client";

import styles from "./page.module.css";
import Sidebar from "@/app/components/Sidebar/sidebar";
import Header from "@/app/components/Header/header";
import CustomTable from "@/app/components/Table/table";
import ModalForm from "@/app/components/Modal/ModalForm/ModalForm";
import CadastroModal from "@/app/components/Modal/FormCad/CadastroModal";
import { useState } from "react";
import { useAuth } from "@/app/auth.js";
import { usePorteiros } from "@/app/hooks/usePorteiro";
import { useSindicos } from "@/app/hooks/useSindico";
import { useEntityModal } from "@/app/hooks/useEntityModal";
import { createPorteiro } from "@/app/services/Porteiro/POST";
import { updatePorteiro } from "@/app/services/Porteiro/PUT";
import { createSindico } from "@/app/services/Sindico/POST";
import { updateSindico } from "@/app/services/Sindico/PUT";
import {
  porteiroFields,
  sindicoFields,
} from "@/app/components/Modal/FormCad/formConfigs";
import {
  InjectPorteirosTable,
  InjectSindicosTable,
} from "@/app/hooks/dataInject";
import {
  NAV_ITENS_FUNCIONARIOS,
  extractFilterFuncionarios,
  extractFilterSindicos,
  filterPorteiros,
  filterSindicos,
} from "@/app/hooks/filterEncomendas";

export default function Funcionarios() {
  const { user } = useAuth();
  const canManage =
    user?.role.includes("ROLE_SINDICO") || user?.role.includes("ROLE_ADMIN");

  const {
    data: porteiros,
    fetchPorteiros,
    removePorteiros,
    isLoading: loadingPorteiros,
  } = usePorteiros();
  const {
    data: sindicos,
    fetchSindicos,
    removeSindicos,
    isLoading: loadingSindicos,
  } = useSindicos();
  const [activeTab, setActiveTab] = useState("Porteiros");

  const [filters, setFilters] = useState({
    selectedUsers: [],
    startDate: "",
    endDate: "",
  });

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const tabConfig = {
    Porteiros: {
      data: porteiros,
      columns: InjectPorteirosTable(),
      fields: porteiroFields,
      onCreate: createPorteiro,
      onUpdate: (id, formData) => updatePorteiro(id, formData),
      getId: (item) => item.idPorteiro,
      onRefresh: fetchPorteiros,
      onDelete: removePorteiros,
      isLoading: loadingPorteiros,
      filterUsers: extractFilterFuncionarios(porteiros),
      filterData: (item) =>
        !filters.selectedUsers.length ||
        filters.selectedUsers.includes(item.nomeCompleto),
      titleAdd: "Adicionar Porteiro",
      titleEdit: "Editar Porteiro",
    },
    Sindicos: {
      data: sindicos,
      columns: InjectSindicosTable(),
      fields: sindicoFields,
      onCreate: createSindico,
      onUpdate: (id, formData) => updateSindico(id, formData),
      getId: (item) => item.idUsuario,
      onRefresh: fetchSindicos,
      onDelete: removeSindicos,
      isLoading: loadingSindicos,
      filterUsers: extractFilterSindicos(sindicos),
      filterData: (item) =>
        !filters.selectedUsers.length ||
        filters.selectedUsers.includes(item.nomeCompleto),
      titleAdd: "Adicionar Síndico",
      titleEdit: "Editar Síndico",
    },
  };

  const tab = tabConfig[activeTab] ?? tabConfig.Porteiros;
  const filteredData = (tab.data ?? []).filter(tab.filterData);
  const modal = useEntityModal({
    onCreate: tab.onCreate,
    onUpdate: tab.onUpdate,
    getId: tab.getId,
    onRefresh: tab.onRefresh,
  });

  return (
    <div className={styles.body}>
      <Sidebar />
      <div className={styles.main}>
        <Header
          titulo="Funcionários registrados"
          navItens={NAV_ITENS_FUNCIONARIOS}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          search={search}
          setSearch={setSearch}
          setDebouncedSearch={setDebouncedSearch}
          canAdd={canManage}
          onAddbuttonClick={modal.openAdd}
          users={tab.filterUsers}
          filters={filters}
          onFiltersChange={setFilters}
        />

        <CustomTable
          headerAs="span"
          rowsPerPage={10}
          columns={tab.columns}
          data={filteredData}
          searchValue={debouncedSearch}
          onRowClick={modal.openEdit}
          onDeleteConfirm={tab.onDelete}
          canRemove={canManage}
          isLoading={tab.isLoading}
        />
      </div>

        <CadastroModal
          show={modal.open}
          onHide={modal.close}
          title={modal.tipo === "edit" ? tab.titleEdit : tab.titleAdd}
          fields={tab.fields}
          initialData={modal.itemData ?? {}}
          onSaveChanges={modal.save}
          showPhoto={true}
        />
    </div>
  );
}
