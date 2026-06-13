"use client";

import styles from "./page.module.css";
import Sidebar from "@/app/components/Sidebar/sidebar";
import Header from "@/app/components/Header/header";
import Card from "@/app/components/Card/card";
import { useState } from "react";
import { useAuth } from "@/app/auth.js";

export default function MeusPacotes() {
    const { user } = useAuth();
    const canAdd = user?.permissions?.includes("add_moradores");

    const navItens = [
        { texto: "Todos" },
        { texto: "A retirar" },
        { texto: "Retirados" },
    ];

    const data = [
        {
            id: 1,
            nomePacote: "Caixa Mercado Preso",
            dataHoraRecebido: "2026-02-21T15:20:33",
            numeroApartamento: "99A",
            status: "PENDENTE",
        },
        {
            id: 2,
            nomePacote: "Pedido Amazon",
            dataHoraRecebido: "2026-02-22T09:45:12",
            numeroApartamento: "101B",
            status: "ENTREGUE",
        },
        {
            id: 3,
            nomePacote: "Documentos Correios",
            dataHoraRecebido: "2026-02-22T14:30:05",
            numeroApartamento: "203C",
            status: "PENDENTE",
        },
    ];

    const [activeTab, setActiveTab] = useState("Todos");
    const filtros = {
        Todos: () => true,
        "A retirar": (item) => item.status === "PENDENTE",
        Retirados: (item) => item.status === "ENTREGUE",
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
                            encomendaData={item}
                            searchValue={debouncedSearch}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
