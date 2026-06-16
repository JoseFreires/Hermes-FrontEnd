'use client';
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Input from "../../Input/Input";
import Dropdown from "../../Input/Dropdown/Dropdown";
import Button from "../../Button/button";
import Styles from "./FormEntrega.module.css";
import {deliverEncomenda} from "@/app/services/Encomendas/Entrega/PUT.js";
import TokenInline from "../tokenRetirada/TokenInline";

export default function FormEntrega({ encomenda, onClose, onSuccess, onVoltar }) {
    // Estados do formulário
    const [tiporetirada, setTiporetirada] = useState("MORADOR"); // "morador" | "terceiro"
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const [tokenDigitado, setTokenDigitado] = useState("");

    const opcoesReceptor = encomenda
        ? [
              {
                  idPessoa: encomenda.idDestinatario,
                  nomeMorador: encomenda.nomeMorador,
              },
              // TODO: adicionar pessoasConfiaveis aqui quando a feature for criada
              // ...(encomenda.pessoasConfiaveis ?? [])
          ]
        : [];

        async function handleConfirmarEntrega(e) {
        e.preventDefault();
        setErro("");

        if (tiporetirada === "TERCEIRO") {
            if (tokenDigitado.length < 4) {
                setErro("Preencha todos os 4 dígitos do token.");
                return;
            }
 
            // Compara o que o usuário digitou com o token recebido do banco
            if (tokenDigitado !== String(encomenda?.tokenEncomenda)) {
                setErro("Token inválido. Verifique o código e tente novamente.");
                return;
            }
        }

        setLoading(true);

            try {
            await deliverEncomenda(
                encomenda.idEncomenda,
                tiporetirada,
            );
            await onSuccess?.(); // busca as encomendas novamente
            onClose?.();  
            
            } catch (err) {
                setErro(err.message || "Erro ao registrar entrega. Tente novamente.");
            } finally {
                setLoading(false);
                onClose();
            }
        
    }   
    return (

        <form onSubmit={handleConfirmarEntrega} className="p-3">
            {/* Cabeçalho */}
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
                <h4 className="text-primary mb-0">Registrar Entrega</h4>
                <span className="badge bg-secondary fs-6">ID: {encomenda?.idEncomenda}</span>
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
                onChange={(e)=> {
                        setTiporetirada(e.target.checked ? "TERCEIRO" : "MORADOR");
                        setErro("");
                    }}
            />

            {/* Renderização Condicional: Terceiro vs Morador */}
            {tiporetirada === "TERCEIRO" ? (
                    <TokenInline
                        value={tokenDigitado}
                        onChange={setTokenDigitado}
                        onReenviar={() => {
                            // TODO: endpoint de reenvio de token
                            console.log("Reenviar para:", encomenda?.emailDestinatario);
                        }}
                    />
            ) : (
                <Dropdown
                    options={opcoesReceptor}
                    placeholder="Selecione o receptor"
                    value={encomenda?.idDestinatario}
                    defaultValue={encomenda?.idDestinatario}
                    onChange={() => setTiporetirada("MORADOR")}
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