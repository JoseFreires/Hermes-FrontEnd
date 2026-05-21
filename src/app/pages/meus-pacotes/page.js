"use client";

import styles from './page.module.css';
import Sidebar from '@/app/components/Sidebar/sidebar';
import Header from '@/app/components/Header/header';
import { useState } from 'react';
import { useAuth } from '@/app/auth.js';

export default function Moradores() {

    const { user } = useAuth();
    const canAdd = user?.permissions?.includes("add_moradores");

    const navItens = [
        { texto: "Todos" },
        { texto: "A retirar" },
        { texto: "Retirados" },
    ]

    const [activeTab, setActiveTab] = useState("Todos");
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

                <h1>em desenvolvimento</h1>
            </div>
        </div>
    );
}