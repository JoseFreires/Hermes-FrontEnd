"use client"
import { Navbar, Container, Nav, Form, InputGroup} from "react-bootstrap";
import { FunnelFill, Search } from "react-bootstrap-icons";
import React from "react";
import Button from "../Button/button"
import { useAuth } from "../../auth.js";
import styles from "./header.module.css";

export default function Header({ titulo, navItens }) {
    const [activeTab, setActiveTab] = React.useState("");

    React.useEffect(() => {
        if (navItens?.length > 0) {
            setActiveTab(navItens[0].texto);
        }
    }, [navItens]);
    
    const { user } = useAuth();
    const permissoes = 
    user?.permissions?.includes("add_encomendas"); // Checar nome das permissões que vem no payload do token
    
    return (
       <Navbar className={styles.navbar}>
            <Container fluid className="d-flex align-items-center justify-content-between">

                <div className="d-flex flex-column">

                    <h2 className={styles.titulo}>
                        {titulo}
                    </h2>

                    <Nav className="mt-3 gap-4 align-items-center">

                        {navItens?.map((item, i) => (
                            <Nav.Link
                                key={i}
                                onClick={() => setActiveTab(item.texto)}
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

                        <Button variant="light" className={`d-flex align-items-center gap-2 border ${styles.filtroButton}`} >
                        <FunnelFill />
                            Filtro
                        </Button>
                    </Nav>

                </div>

                <div className="d-flex align-items-center gap-3">

                    <InputGroup className={styles.searchGroup}>

                        <InputGroup.Text className={styles.searchIcon}>
                            <Search />
                        </InputGroup.Text>

                        <Form.Control
                            placeholder="Pesquisar..."
                            className={styles.searchInput}
                        />

                    </InputGroup>

                    {permissoes && (
                        <Button variant="primary">
                            Adicionar
                        </Button>
                    )}

                </div>

            </Container>
        </Navbar>
    );
}