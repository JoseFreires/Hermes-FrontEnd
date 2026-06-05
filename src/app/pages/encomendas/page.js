"use client";

import styles from './page.module.css';
import Sidebar from '@/app/components/Sidebar/sidebar';
import Header from '@/app/components/Header/header';
import CustomTable from '@/app/components/Table/table';
import { useState } from 'react';
import { useAuth } from '@/app/auth.js';


export default function Encomendas() {

    const {user} = useAuth();
    const canRemove = user?.roles?.includes("ROLE_PORTEIRO") || user?.roles?.includes("ROLE_ADMIN");
    const canAdd = user?.roles?.includes("ROLE_PORTEIRO") || user?.roles?.includes("ROLE_ADMIN");

    const navItens = [
        { texto: "Todas" },
        { texto: "Pendentes" },
        { texto: "Entregues" },
    ];

    const columns = [
        {
            label: "MORADOR",
            key: "morador",
            render:
                (value, row) => (
                    <div className={styles.user}>
                        <span>{value}</span>
                        <small>{row.email}</small>
                    </div>
                )
        },
        {
            label: "DESCRIÇÃO",
            key: "descricao",
        },
        {
            label: "DATA - HORA",
            key: "data",
            render: (value) => (
                <p className={styles.tableLine}>
                    {value}
                </p>
            )
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
    ];

    // Simulação de dados de encomendas
    const data = [
        {
            id: 1,
            morador: "Thiago Fritz",
            email: "fritz@email.com",
            descricao: "Caixa grande de papelão",
            data: "11/02/2020 - 12:09",
            apartamento: "202",
            status: "Pendente"
        },
        {
            id: 2,
            morador: "Cesar Cohen",
            email: "cesar@email.com",
            descricao: "Mercado Preso",
            data: "15/04/2020 - 22:09",
            apartamento: "403",
            status: "Entregue"
        }
    ];
    const [activeTab, setActiveTab] = useState("Todas");


    // definição dos filtros, cada chave é o nome da tab, e o valor é a função de filtro que recebe um item
    // retorna true se ele deve ser mostrado e false se deve ser filtrado
    const filtros = {
        Todas: () => true,
        Pendentes: (item) => item.status === "Pendente",
        Entregues: (item) => item.status === "Entregue"
    };

    const filteredData = data.filter(filtros[activeTab]);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");


    return (
        <div className={styles.body}>
            <Sidebar />

            <div className={styles.main}>
                <Header 
                titulo="Encomendas registradas" 
                navItens={navItens} 
                activeTab={activeTab} 
                setActiveTab={setActiveTab}
                search={search}
                setSearch={setSearch}
                setDebouncedSearch={setDebouncedSearch}
                canAdd={canAdd}
                />

                <CustomTable
                    canRemove={canRemove}
                    headerAs="span"
                    rowsPerPage={10}
                    columns={columns}
                    data={filteredData} // SEMPRE passar filteredData pro componente da tabela, para garantir que os filtros e a busca funcionem corretamente
                    searchValue={debouncedSearch}
                />
            </div>
        </div>
    );
}