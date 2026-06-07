"use client";

import styles from "./page.module.css";
import Sidebar from "@/app/components/Sidebar/sidebar";
import Header from "@/app/components/Header/header";
import CustomTable from "@/app/components/Table/table";
import FormEncomenda from "@/app/components/Modal/FormEncomenda/Form";
import ModalForm from "@/app/components/Modal/ModalForm/ModalForm";
import { useState } from "react";
import { useAuth } from "@/app/auth.js";

export default function Encomendas() {
    const { user } = useAuth();
    const canRemove = user?.roles?.includes("ROLE_ADMIN") || user?.roles?.includes("ROLE_PORTEIRO");
    const canAdd = user?.roles?.includes("ROLE_ADMIN") || user?.roles?.includes("ROLE_PORTEIRO");

  const navItens = [
    { texto: "Todas" },
    { texto: "Pendentes" },
    { texto: "Entregues" },
  ];

    const columns = [
        {
            label: "MORADOR",
            key: "morador",
            render: (value, row) => (
                <div className={styles.user}>
                    <span>{value}</span>
                    <small>{row.email}</small>
                </div>
            ),
        },
        {
            label: "DESCRIÇÃO",
            key: "descricao",
        },
        {
            label: "DATA - HORA",
            key: "data",
            render: (value) => <p className={styles.tableLine}>{value}</p>,
        },
        {
            label: "APARTAMENTO",
            key: "apartamento",
            render: (value) => <p className={styles.tableLine}>{value}</p>,
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
            status: "Pendente",
        },
        {
            id: 2,
            morador: "Cesar Cohen",
            email: "cesar@email.com",
            descricao: "Mercado Preso",
            data: "15/04/2020 - 22:09",
            apartamento: "403",
            status: "Entregue",
        }
    ];

    const [activeTab, setActiveTab] = useState("Todas");

    // definição dos filtros, cada chave é o nome da tab, e o valor é a função de filtro que recebe um item
    // retorna true se ele deve ser mostrado e false se deve ser filtrado
    const filtros = {
        Todas: () => true,
        Pendentes: (item) => item.status === "Pendente",
        Entregues: (item) => item.status === "Entregue",
    };

    // extração dos usuários únicos para popular o filtro de usuários
    const users = Array.from(new Set(data.map((item) => item.morador))).sort();
    const [filters, setFilters] = useState({
        selectedUsers: [],
        startDate: "",
        endDate: "",
    });

    const parseData = (dataString) => {
        const [datePart] = dataString.split(" - ");
        const [day, month, year] = datePart.split("/");
        if (!day || !month || !year) return null;
        return new Date(`${year}-${month}-${day}`);
    };

    const filteredData = data
        .filter(filtros[activeTab])
        .filter((item) => {
            if (filters.selectedUsers.length && !filters.selectedUsers.includes(item.morador)) {
                return false;
            }

            if (!filters.startDate && !filters.endDate) {
                return true;
            }

            const itemDate = parseData(item.data);
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

    //aqui controla a rederização do modal, e o tipo do modal (se é de adicionar ou editar, por exemplo)
    const [modalAberto, setModalAberto] = useState(false);
    const [modalTipo, setModalTipo] = useState(null);

    function handleAddClick(tipo) {
        setModalTipo(tipo);
        setModalAberto(true);
    }

    function fecharModal() {
        setModalAberto(false);
        setModalTipo(null);
    }

    const moradores = data.map(item => item.morador);
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
                    funcionalitie="addEncomenda"
                    onAddbuttonClick={handleAddClick}
                    users={users}
                    filters={filters}
                    onFiltersChange={setFilters}
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

            <ModalForm show={modalAberto} onHide={fecharModal} centered>

                {modalTipo === "addEncomenda" && (
                    <FormEncomenda
                        data={data}
                        title="Registrar Encomenda"
                        encomendaId={''}
                        modo="add"
                    />
                )}
            </ModalForm>
        </div>
    );
}
