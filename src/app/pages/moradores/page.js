"use client";
 
import styles from './page.module.css';
import Sidebar from '@/app/components/Sidebar/sidebar';
import Header from '@/app/components/Header/header';
import CustomTable from '@/app/components/Table/table';
import CadastroModal from "@/app/components/Modal/FormCad/CadastroModal";
import { useState } from 'react';
import { useAuth } from '@/app/auth.js';
import { useMoradores } from '@/app/hooks/useMorador';
import { useEntityModal } from '@/app/hooks/useEntityModal';
import { createMorador } from '@/app/services/Morador/POST';
import { updateMorador } from '@/app/services/Morador/PUT';
import { moradorFields } from '@/app/components/Modal/FormCad/formConfigs';
import { extractFilterMoradores, filterMoradores } from '@/app/hooks/filterEncomendas';
import { InjectMoradoresTable } from '@/app/hooks/dataInject';
  
  export default function Moradores() {
      const { user } = useAuth();
      const canManage = user?.role.includes("ROLE_ADMIN") || user?.role.includes("ROLE_SINDICO");
      
      const { data, fetchMoradores, removeMoradores, isLoading } = useMoradores();
      
      const modal = useEntityModal({
          onCreate:  createMorador,
          onUpdate:  (id, formData) => updateMorador(id, formData),
          getId:     (item) => item.idMorador,
          onRefresh: fetchMoradores,
        });
        
        const [search, setSearch] = useState("");
        const [debouncedSearch, setDebouncedSearch] = useState("");
        const [filters, setFilters] = useState({ selectedUsers: [], startDate: "", endDate: "" });
        
        const filteredData = filterMoradores(data).filter((item) =>
            !filters.selectedUsers.length || filters.selectedUsers.includes(item.nome)
    );

    
    return (
        <div className={styles.body}>
            <Sidebar />
            <div className={styles.main}>
                <Header
                    titulo="Moradores registrados"
                    search={search}
                    setSearch={setSearch}
                    setDebouncedSearch={setDebouncedSearch}
                    canAdd={canManage}
                    onAddbuttonClick={modal.openAdd}
                    users={extractFilterMoradores(data)}
                    filters={filters}
                    onFiltersChange={setFilters}
                />
 
                <CustomTable
                    headerAs="span"
                    rowsPerPage={10}
                    columns={InjectMoradoresTable()}
                    data={filteredData}
                    searchValue={debouncedSearch}
                    onRowClick={modal.openEdit}
                    onDeleteConfirm={removeMoradores}
                    canRemove={canManage}
                    isLoading={isLoading}
                />
            </div>
 

                <CadastroModal
                    show={modal.open}
                    onHide={modal.close}
                    title={modal.tipo === "edit" ? "Editar Morador" : "Adicionar Morador"}
                    fields={moradorFields}
                    initialData={modal.itemData ?? {}}
                    onSaveChanges={modal.save}
                    showPhoto={false}
                />

        </div>
    );
}
 