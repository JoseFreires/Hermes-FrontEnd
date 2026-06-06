"use client";

import styles from './page.module.css';
import Sidebar from '@/app/components/Sidebar/sidebar';
import Header from '@/app/components/Header/header';
import CustomTable from '@/app/components/Table/table';
import { useState } from 'react';
import { useAuth } from '@/app/auth.js';

export default function Funcionarios() {

    const { user } = useAuth();
    const canRemove = user?.roles?.includes("ROLE_SINDICO") || user?.roles?.includes("ROLE_ADMIN");
    const canAdd = user?.roles?.includes("ROLE_SINDICO") || user?.roles?.includes("ROLE_ADMIN");

    const navItens = [
        { texto: "Sindicos" },
        { texto: "Porteiros" },
    ];

    const [activeTab, setActiveTab] = useState("Sindicos");

    const columns = [
        {
            label: "NOME",
            key: "nome",
            render:
                (value, row) => (
                    <div className={styles.user}>
                        <span>{value}</span>
                        <small>{row.email}</small>
                    </div>
                )
        },
        {
            label: "TELEFONE",
            key: "telefone",
        },
        {
            label: "TURNO",
            key: "turno",
            render: (value) => (
                <p className={styles.tableLine}>
                    {value}
                </p>
            )
        },
        {
            label: "CONDOMINIO",
            key: "condominio",
            render: (value) => (
                <p className={styles.tableLine}>
                    {value}
                </p>
            )
        },
    ];

    const data = [
        {
            id: 1,
            nome: "Walcyr",
            telefone: "(11) 99999-9999",
            turno: "matutino",
            condominio: "EDIFICIO NOVO AMANHECER",
            papel: "Sindico"
        },
        {
            id: 2,
            nome: "Denise",
            telefone: "(11) 99999-9999",
            turno: "vespertino",
            condominio: "EDIFICIO NOVO AMANHECER",
            papel: "Porteiro"
        },
        {
            id: 3,
            nome: "Carlos",
            telefone: "(11) 99999-9999",
            turno: "noturno",
            condominio: "EDIFICIO NOVO AMANHECER",
            papel: ["Sindico", "Porteiro"],
        },
    ];

    const filtros = {
        "Sindicos": (item) => item.papel.includes("Sindico"),
        "Porteiros": (item) => item.papel.includes("Porteiro"),
    }

    const users = Array.from(new Set(data.map((item) => item.nome))).sort();
    const [filters, setFilters] = useState({
        selectedUsers: [],
        startDate: "",
        endDate: "",
    });

    const parseData = (dataString) => {
        if (!dataString) return null;
        const [datePart] = dataString.split(" - ");
        const [day, month, year] = datePart.split("/");
        if (!day || !month || !year) return null;
        return new Date(`${year}-${month}-${day}`);
    };

    const filteredData = data
        .filter(filtros[activeTab])
        .filter((item) => {
            if (filters.selectedUsers.length && !filters.selectedUsers.includes(item.nome)) {
                return false;
            }

            if (!filters.startDate && !filters.endDate) {
                return true;
            }

            const itemDate = parseData(item.data);
            if (!itemDate) return true;

            if (filters.startDate) {
                const start = new Date(filters.startDate);
                if (itemDate < start) return false;
            }

            if (filters.endDate) {
                const end = new Date(filters.endDate);
                end.setHours(23, 59, 59, 999);
                if (itemDate > end) return false;
            }

            return true;
        });

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    return (
        <div className={styles.body}>
            <Sidebar />
            <div className={styles.main}>

                <Header
                    titulo="Funcionários registrados"
                    navItens={navItens}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    search={search}
                    setSearch={setSearch}
                    setDebouncedSearch={setDebouncedSearch}
                    canAdd={canAdd}
                    users={users}
                    filters={filters}
                    onFiltersChange={setFilters}
                />

                <CustomTable
                    headerAs="span"
                    rowsPerPage={10}
                    columns={columns}
                    data={filteredData}
                    searchValue={debouncedSearch}
                    canRemove={canRemove}
                />
            </div>
        </div>
    );
}