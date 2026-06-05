"use client";

import styles from './page.module.css';
import Sidebar from '@/app/components/Sidebar/sidebar';
import Header from '@/app/components/Header/header';
import Card from '@/app/components/Card/card';
import { useEffect, useState } from 'react';
import { useAuth } from '@/app/auth.js';

export default function Moradores() {

    const { user } = useAuth();
    const canAdd = user?.permissions?.includes("add_moradores");

    const navItens = [
        { texto: "Todos" },
        { texto: "A retirar" },
        { texto: "Retirados" },
    ]

    const [packages, setPackages] = useState([]);

    useEffect(() => {
        // inserir fetch
    }, []);

    const data = [
        {
            id: 1,
            titulo: "Caixa Mercado Preso",
            dataRecebimento: "21/02 - 15:20:33",
            apartamento: "99A",
            status: "A retirar",
        },
        {
            id: 2,
            titulo: "Pedido Amazon",
            dataRecebimento: "22/02 - 09:45:12",
            apartamento: "101B",
            status: "Retirado",
        },
        {
            id: 3,
            titulo: "Documentos Correios",
            dataRecebimento: "22/02 - 14:30:05",
            apartamento: "203C",
            status: "A retirar",
        }
    ];

    const [activeTab, setActiveTab] = useState("Todos");
    const filtros = {
        Todos: () => true,
        "A retirar": (item) => item.status === "A retirar",
        "Retirados": (item) => item.status === "Retirado"
    };

    const filteredData = data.filter(filtros[activeTab]);

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    return (
        <div className={styles.body}>
            <Sidebar />
            <div className={styles.main}>

                <Header
                    titulo="Meus Pacotes"
                    navItens={navItens}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    search={search}
                    setSearch={setSearch}
                    setDebouncedSearch={setDebouncedSearch}
                    canAdd={canAdd}
                />

                <div className={styles.cardWrapper}>
                    {filteredData.map((item) => (
                        <Card
                            key={item.id}
                            packageData={item}
                            data={filteredData} // SEMPRE passar filteredData pro componente da tabela, para garantir que os filtros e a busca funcionem corretamente
                            searchValue={debouncedSearch}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}