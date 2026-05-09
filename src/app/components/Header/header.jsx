"use client"
import { Navbar, Container, Nav, Form, InputGroup, Button } from "react-bootstrap";
import { FunnelFill, Search } from "react-bootstrap-icons";
import React from "react";
import { useAuth } from "@/app/auth";

export default function NavbarEncomendas({ titulo, navItems }) {
    const [activeTab, setActiveTab] = React.useState(navItems[0].label);
    
    const { user } = useAuth();
    const permissaoAdicionar = 
    user?.permissions?.includes("add_encomendas"); // Verifica se o usuário tem permissão para adicionar encomendas
    
    return (
        <Navbar>
            <Container fluid className="d-flex align-items-center justify-content-between">

                <div className="d-flex flex-column">
                    <h2 className="fw-bold m-0" style={{ color: "#003366", fontSize: "28px" }}>
                        {titulo}
                    </h2>

                    <Nav className="mt-3 gap-4 align-items-center">
                        {navItems.map((item, i) => (
                            <Nav.Link key={i} onClick={() => setActiveTab(item.label)} className="nav-link"
                                style={{
                                    color:
                                        activeTab == item.label ? "#003366" : "#6c757d",
                                    borderBottom:
                                        activeTab == item.label ? "3px solid #003366" : "none",
                                    fontWeight:
                                        activeTab == item.label ? "600" : "400",
                                }}>
                                {item.label}
                            </Nav.Link>
                        ))}

                        <Button variant="light" className="d-flex align-items-center gap-2 border" style={{ borderRadius: "10px", color: "#003366", fontWeight: 500, backgroundColor: "transparent" }}>
                            <FunnelFill />
                            Filtro
                        </Button>
                    </Nav>
                </div>

                <div className="d-flex align-items-center gap-3">

                    <InputGroup style={{ width: "300px", }}>
                        <InputGroup.Text className="bg-white border-end-0" style={{ borderRadius: "12px 0 0 12px", }}>
                            <Search />
                        </InputGroup.Text>
                        <Form.Control placeholder="Pesquisar..." className="border-start-0" style={{ borderRadius: "0 10px 10px 0", boxShadow: "none", padding: "8px 10px" }} />
                    </InputGroup>

                    {permissaoAdicionar && (
                        <Button style={{ backgroundColor: "#003366", border: "none", borderRadius: "10px", padding: "8px 10px", fontWeight: 600, }} >
                            Adicionar
                        </Button>
                    )}
                </div>
            </Container>
        </Navbar>
    );
}