"use client";

import styles from './page.module.css';
import Sidebar from '@/app/components/Sidebar/sidebar';
import Header from '@/app/components/Header/header';
import CustomTable from '@/app/components/Table/table';
import { useState } from 'react';
import { useAuth } from '@/app/auth.js';

export default function Funcionarios() {

    const {user} = useAuth();
    const canRemove = user?.permissions?.includes("del_funcionarios");
    const canAdd = user?.permissions?.includes("add_funcionarios");

    const navItens = [
        { texto: "Sindicos"},
        { texto: "Porteiros"},
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

    const filteredData = data.filter(filtros[activeTab]);
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
                />

                <CustomTable 
                headerAs = "span"
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