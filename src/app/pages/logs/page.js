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
                />
                
                <CustomTable 
                    columns={columns}
                    headerAs = "span"
                    rowsPerPage={10}
                    data={data}
                    searchValue={debouncedSearch}
                />
            </div>
        </div>
    );
}