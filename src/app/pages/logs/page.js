"use client";

import styles from './page.module.css';
import Sidebar from '@/app/components/Sidebar/sidebar';
import Header from '@/app/components/Header/header';
import { useState } from 'react';
import CustomTable from '@/app/components/Table/table';


export default function Logs() {

    const columns = [
        {
            label: "LOGIN",
            key: "login",
            render:
                (value, row) => (
                    <div className={styles.user}>
                        <span>{value}</span>
                        <small>{row.email}</small>
                    </div>
                )
        },
        {
            label: "AÇÃO REALIZADA",
            key: "acao",
        },
        {
            label: "DATA DA ALTERAÇÃO",
            key: "data_alteracao",
        },
        {
            label: "TABELA ALTERADA",
            key: "tabela_alterada",
        },
        {
            label: "OCORREU HÁ",
            key: "data_acao",
            render: (value) => (
                <p className={styles.tableLine}>
                    {value}
                </p>
            )
        },
     ];

    const data = [
        { id: 1, login: "João Silva", email: "joao.silva@example.com", acao: "Registro", data_alteracao: "2023-01-01", tabela_alterada: "Usuários", data_acao: "2 horas atrás" },
        { id: 2, login: "Maria Santos", email: "maria.santos@example.com", acao: "Exclusao", data_alteracao: "2023-01-02", tabela_alterada: "Usuários", data_acao: "5 horas atrás" },
    ];

    const users = Array.from(new Set(data.map((item) => item.login))).sort();
    const [filters, setFilters] = useState({
        selectedUsers: [],
        startDate: "",
        endDate: "",
    });

    const parseData = (dataString) => {
      if (!dataString) return null;
      const [day, month, year] = dataString.split("/");
      if (!day || !month || !year) return null;
      return new Date(`${year}-${month}-${day}`);
    };

    const filteredData = data
      .filter((item) => {
        if (filters.selectedUsers.length && !filters.selectedUsers.includes(item.login)) {
          return false;
        }

        if (!filters.startDate && !filters.endDate) {
          return true;
        }

        const itemDate = parseData(item.data_alteracao);
        if (!itemDate) return false;

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
                    titulo="Logs do Sistema"
                    search={search}
                    setSearch={setSearch}
                    setDebouncedSearch={setDebouncedSearch}
                    users={users}
                    filters={filters}
                    onFiltersChange={setFilters}
                />
                
                <CustomTable 
                    columns={columns}
                    headerAs = "span"
                    rowsPerPage={10}
                    data={filteredData}
                    searchValue={debouncedSearch}
                />
            </div>
        </div>
    );
}