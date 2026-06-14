'use client';
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Input from "../../Input/Input";
import Dropdown from "../../Input/Dropdown/Dropdown";
import Button from "../../Button/button";
import Styles from "./FormEntrega.module.css";
import {deliverEncomenda} from "@/app/services/Encomendas/Entrega/PUT.js";

export default function FormEntrega({ encomenda, porteiroAtual, onSuccess, onVoltar }) {
    // Estados do formulário
    const [tiporetirada, setTiporetirada] = useState(false);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");

// Mota não consegui fazer o dropdown funcionar, to tentando passar o nome do morador como value, depois fala comigo como a logica dele funciona pra pegar o nome do morador da encomenda, achei que era só encomenda?.nomemorador


    // Simulação de pessoas autorizadas (isso deve vir do banco de dados na prop 'encomenda')

    async function handleConfirmarEntrega(e) {
        e.preventDefault();
        setLoading(true);
        setErro("");

        // Validação básica
        if (tiporetirada === "terceiro" && !token) {
            setErro("O token de validação é obrigatório para retirada por terceiros.");
            setLoading(false);
            return;
        }

        if (!receptor) {
            setErro("Por favor, informe quem está retirando a encomenda.");
            setLoading(false);
            return;
        }

        deliverEncomenda(encomenda.id, tiporetirada, receptor)
    }

    return (
        <form onSubmit={handleConfirmarEntrega} className="p-3">
            {/* Cabeçalho */}
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
                <h4 className="text-primary mb-0">Registrar Entrega</h4>
                <span className="badge bg-secondary fs-6">ID: {encomenda?.id}</span>
            </div>

            {/* Checkbox Terceiro */}
            <Form.Check
                type="checkbox"
                label={
                <span style={{ color: "rgba(var(--alertColor), 1)" }}>
                    Retirada feita por terceiro?
                </span>
                }
                className={Styles.CheckboxInput}
                onChange={(e) => setTiporetirada(e.target.checked ? "terceiro" : "morador")}
            />

            {/* Renderização Condicional: Terceiro vs Morador */}
            {tiporetirada === "terceiro" ? (
               <Input
                    Label="Nome do Receptor"
                    type="text"
                    variant="default"
                    placeholder=""
                    onChange={(e) => setReceptor(e.target.value)}
                    disabled={false}
                />
            ) : (
                <Dropdown
                    options={null}
                    placeholder="Selecione o receptor"
                    Value={encomenda?.nomeMorador}
                    defaultValue={encomenda?.nomeMorador}
                    onChange={(e) => setReceptor(e.target.value)}
                />
               
            )}
            {/* Botões */}
            <div className="d-flex justify-content-end gap-2 mt-4">
                <Button 
                   type="button" variant="primary" 
                   className="w-100"
                    onClick={onVoltar}
                    disabled={loading}
                >
                    Voltar
                </Button>
                <Button 
                    type="submit" variant="secondary" className="w-100"
                    disabled={loading}
                >
                    {loading ? "Validando..." : "Finalizar Entrega"}
                </Button>
            </div>
        </form>
    );
}