"use client";

import styles from './page.module.css';
import typography from '@/app/typografi.global.css';
import Sidebar from '@/app/components/Sidebar/sidebar';
import Header from '@/app/components/Header/header';
import CustomTable from '@/app/components/Table/table';
import { useState } from 'react';

export default function Encomendas() {
    const itens = [
        { texto: "Encomendas", href: "#" }
    ];

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
        },
        {   // Esse item é só para testar o comportamento da tabela com descrições muito grandes, se não por overflow hidden a tabela quebra (principalmente o footer)
            id: 3,
            morador: "Zé do prikito",
            email: "ze@email.com",
            descricao: "Pacote extremamente suspeito com um cheiro estranho e formato duvidoso embalado em um papel de presente com desenhos de caveiras e sangue (isso foi sugestão do copilot e n é meme)",
            data: "20/05/2020 - 10:30",
            apartamento: "301",
            status: "Entregue"
        },
        {
            id: 4,
            morador: "Maria Silva",
            email: "maria@email.com",
            descricao: "Encomenda de livros",
            data: "25/05/2020 - 14:15",
            apartamento: "101",
            status: "Pendente"
        },
        {
            id: 5,
            morador: "João Pereira",
            email: "joao@email.com",
            descricao: "Encomenda de roupas",
            data: "30/05/2020 - 16:45",
            apartamento: "201",
            status: "Pendente"
        },
        {
            id: 6,
            morador: "Ana Costa",
            email: "ana@email.com",
            descricao: "Encomenda de brinquedos",
            data: "05/06/2020 - 09:30",
            apartamento: "302",
            status: "Entregue"
        },
        {
            id: 7,
            morador: "Carlos Oliveira",
            email: "carlos@email.com",
            descricao: "Encomenda de eletrônicos",
            data: "10/06/2020 - 11:20",
            apartamento: "401",
            status: "Pendente"
        },
        {
            id: 8,
            morador: "Fernanda Lima",
            email: "fernanda@email.com",
            descricao: "Encomenda de cosméticos",
            data: "15/06/2020 - 13:45",
            apartamento: "102",
            status: "Pendente"
        },
        {
            id: 9,
            morador: "Ricardo Santos",
            email: "ricardo@email.com",
            descricao: "Encomenda de livros",
            data: "20/06/2020 - 15:30",
            apartamento: "202",
            status: "Pendente"
        },
        {
            id: 10,
            morador: "Patrícia Gomes",
            email: "patricia@email.com",
            descricao: "Encomenda de roupas",
            data: "25/06/2020 - 17:00",
            apartamento: "303",
            status: "Pendente"
        },
        {
            id: 11,
            morador: "Eduardo Almeida",
            email: "eduardo@email.com",
            descricao: "Encomenda de eletrônicos",
            data: "30/06/2020 - 09:15",
            apartamento: "402",
            status: "Pendente"
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


    return (
        <div className={styles.body}>
            <Sidebar itens={itens} />

            <div className={styles.main}>
                <Header titulo="Encomendas registradas" navItens={navItens} activeTab={activeTab} setActiveTab={setActiveTab} />

                <CustomTable
                    headerAs="span"
                    rowsPerPage={10}
                    columns={columns}
                    data={filteredData}
                />
            </div>
        </div>
    );
}