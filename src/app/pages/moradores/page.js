"use client";

import styles from './page.module.css';
import Sidebar from '@/app/components/Sidebar/sidebar';
import Header from '@/app/components/Header/header';
import CustomTable from '@/app/components/Table/table';
import { useState } from 'react';
import { useAuth } from '@/app/auth.js';


export default function Moradores() {

    const { user } = useAuth();
    const canManage = user?.role.includes("ROLE_PORTEIRO") || user?.role.includes("ROLE_ADMIN");

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
            label: "APARTAMENTO",
            key: "apartamento",
            render: (value) => (
                <p className={styles.tableLine}>
                    {value}
                </p>
            )
        },
        {
            label: "BLOCO",
            key: "bloco",
            render: (value) => (
                <p className={styles.tableLine}>
                    {value}
                </p>
            )
        },
    ];

    const data = [
        { id: 1, nome: "João Silva", telefone: "(11) 99999-9999", email: "joao@email.com", apartamento: "101", bloco: "A" },
        { id: 2, nome: "Maria Oliveira", telefone: "(11) 99999-9999", email: "maria@email.com", apartamento: "202", bloco: "B" },
        { id: 3, nome: "Pedro Santos", telefone: "(11) 99999-9999", email: "pedro@email.com", apartamento: "303", bloco: "C" },
    ];

    const users = Array.from(new Set(data.map((item) => item.nome))).sort();
    const [filters, setFilters] = useState({
        selectedUsers: [],
        startDate: "",
        endDate: "",
    });

    const filteredData = data.filter((item) => {
        if (filters.selectedUsers.length && !filters.selectedUsers.includes(item.nome)) {
            return false;
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
                    titulo="Moradores registrados"
                    search={search}
                    setSearch={setSearch}
                    setDebouncedSearch={setDebouncedSearch}
                    canAdd={canManage}
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
                    canRemove={canManage}
                />
            </div>
        </div>
    );
}