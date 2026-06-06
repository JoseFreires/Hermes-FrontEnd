"use client";

import { Navbar, Container, Nav, Form, InputGroup } from "react-bootstrap";
import { FunnelFill, Search } from "react-bootstrap-icons";
import React from "react";
import Button from "../Button/button"
import Filtro from "./Filtro/filtro";
import styles from "./header.module.css";
import Image from "next/image";
import useDebounce from "../../debounce.js";
import { useAuth } from "@/app/auth.js";

export default function Header({
    titulo,
    navItens = [],
    activeTab,
    setActiveTab,
    search,
    setSearch,
    setDebouncedSearch,
    canAdd = false,
    funcionalitie,
    onAddButtonClick,
    users = [],
    filters = {},
    onFiltersChange,
}) {

    // pesquisa com debounce (delay) para reduzir numero de requisições
    const debounceSearch = useDebounce(search, 500)

    React.useEffect(() => {
        setDebouncedSearch(debounceSearch);
    }, [debounceSearch]);

    const { user } = useAuth();

    const roleLabels = {
        ROLE_ADMIN: "Admin",
        ROLE_PORTEIRO: "Porteiro",
        ROLE_MORADOR: "Morador",
        ROLE_SINDICO: "Síndico"
    };

    const role = user?.roles?.[0];

    return (
        <div className={styles.componentWrapper}>

            <header className={styles.header}>

                <h1>
                    <span style={{ color: "#757575" }}>Olá,</span> {roleLabels[role] || "Usuário"}!
                </h1>

                <div className={styles.user}>
                    <h3>{user?.nome}</h3>
                    <Image
                        src={user?.imagem || "/img/defaultAvatar.svg"}
                        alt="avatar"
                        width={44}
                        height={44}
                        className={styles.avatar}
                    />
                </div>
            </header>

            <Navbar className={styles.navbar}>
                <Container fluid className={styles.navContainer}>

                    <div className={styles.navGroup}>

                        <h2 className={styles.titulo}>
                            {titulo}
                        </h2>

                        <Nav className="mt-3 gap-4 align-items-center">
                            {navItens?.map((item, i) => (
                                <Nav.Link
                                    key={i}
                                    onClick={() => {
                                        setActiveTab?.(item.texto);
                                    }}
                                    className={styles.navLink}
                                    style={{
                                        color: activeTab === item.texto ? "#003366" : "#6c757d",
                                        borderBottom: activeTab === item.texto ? "3px solid #003366" : "none",
                                        fontWeight: activeTab === item.texto ? "600" : "400",
                                    }}
                                >
                                    {item.texto}
                                </Nav.Link>
                            ))}
                            <Filtro 
                            users={users}
                            filters={filters}
                            onFiltersChange={onFiltersChange}
                            />
                        </Nav>
                    </div>

                    <div className={styles.searchGroup}>

                        <InputGroup >

                            <InputGroup.Text className={styles.searchIcon}>
                                <Search />
                            </InputGroup.Text>

                            <Form.Control
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Pesquisar..."
                                className={styles.searchInput}
                            />

                        </InputGroup>

                        {canAdd && (
                            <Button variant="primary" onClick={() => onAddButtonClick(funcionalitie)}>
                                Adicionar
                            </Button>
                        )}
                    </div>

                </Container>
            </Navbar>
        </div>
    );
}