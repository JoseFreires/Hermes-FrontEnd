"use client";

import Image from "next/image";
import Form from "react-bootstrap/Form";
import Input from "../../Input/Input";
import Dropdown from "../../Input/Dropdown/Dropdown";
import Button from "../../Button/button";
import Styles from "./Form.module.css";
import { useState, useEffect } from "react";
import { listMorador, getMoradorId } from "@/app/services/Morador/GET.js";

export default function FormEncomenda({
  title,
  modo,
  encomendaData,
  onClose,
  onSaveChanges,
}) {
  const [moradores, setMoradores] = useState([]);
  const [nomePacote, setNomePacote] = useState(encomendaData?.nomePacote || "");
  const [observacao, setObservacao] = useState(encomendaData?.observacao || "");
  const [moradorId, setMoradorId] = useState("");
  const [numeroApartamento, setNumeroApartamento] = useState(
    encomendaData?.numeroApartamento || "",
  );
  const [emailDestinatario, setEmailDestinatario] = useState(
    encomendaData?.emailDestinatario || "",
  );

  useEffect(() => {
    listMorador().then((data) => {
      if (Array.isArray(data)) setMoradores(data);
    });
  }, []);

  useEffect(() => {
    if (modo !== "edit" || !encomendaData) return;

    setNomePacote(encomendaData.nomePacote || "");
    setObservacao(encomendaData.observacao || "");

    const found = moradores.find(
      (m) =>
        String(getMoradorId(m)) === String(encomendaData.moradorId) ||
        m.nome === encomendaData.nomeMorador ||
        m.nomeMorador === encomendaData.nomeMorador,
    );

    if (found) {
      setMoradorId(String(getMoradorId(found)));
      setEmailDestinatario(found.email || encomendaData.emailDestinatario || "");
      setNumeroApartamento(found.numeroApartamento || encomendaData.numeroApartamento || "");
    } else {
      setMoradorId("");
      setEmailDestinatario(encomendaData.emailDestinatario || "");
      setNumeroApartamento(encomendaData.numeroApartamento || "");
    }
  }, [encomendaData, moradores, modo]);

  const handleMoradorChange = (e) => {
    const selectedId = e.target.value;
    setMoradorId(selectedId);

    const morador = moradores.find(
      (m) => String(getMoradorId(m)) === String(selectedId),
    );

    if (morador) {
      setEmailDestinatario(morador.email || "");
      setNumeroApartamento(morador.numeroApartamento || "");
    } else {
      setEmailDestinatario("");
      setNumeroApartamento("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!onSaveChanges) return;

    await onSaveChanges({
      nomePacote,
      observacao,
      moradorId,
      numeroApartamento,
      emailDestinatario,
    });
  };

  return (
    <div
      className="d-flex flex-column"
      style={{ maxHeight: "90vh", minHeight: "70vh" }}
    >
      <div className="px-4 pt-4 pb-3 flex-shrink-0">
        <div className="d-flex flex-column flex-md-row align-items-md-end gap-2">
          <div>
            <h1 className="h4 text-primary-custom mb-1">{title}</h1>
            <div className="title-divider" />
          </div>
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <div className="px-4 py-3 flex-grow-1 overflow-auto max-height-635">
          <div
            className="d-flex flex-column gap-4"
            style={{
              maxHeight: "60vh",
              overflowY: "auto",
              scrollbarColor: " #8a8a8a transparent",
              scrollbarwidth: "thin",
            }}
          >
            <Form.Group>
              <p>Foto da encomenda</p>

              <div className={Styles.photo}>
                <Image
                  src="/img/box.svg"
                  alt="Encomenda"
                  width={200}
                  height={200}
                />
              </div>
            </Form.Group>
            <Form.Group>
              <Input
                Label="Nome do pacote"
                type="text"
                placeholder="Nome do pacote"
                defaultValue={nomePacote}
                onChange={(e) => setNomePacote(e.target.value)}
                disabled={false}
              />
            </Form.Group>
            <Form.Group>
              <Input
                Label="Observação"
                type="text"
                placeholder="Observação"
                defaultValue={observacao}
                onChange={(e) => setObservacao(e.target.value)}
                disabled={false}
              />
            </Form.Group>

            <Form.Group>
              <Dropdown
                options={moradores}
                placeholder="Selecione um morador"
                value={moradorId}
                onChange={handleMoradorChange}
              />
            </Form.Group>
            <Input
              Label="Email do Destinatário"
              type="email"
              placeholder=""
              variant="Disabled"
              key={`email-${moradorId}`}
              defaultValue={emailDestinatario}
              disabled={true}
            />
            <Input
              Label="Número do Apartamento"
              type="text"
              variant="Disabled"
              placeholder=""
              key={`apt-${moradorId}`}
              defaultValue={numeroApartamento}
              disabled={true}
            />
          </div>
        </div>

        <div className="px-4 pb-4 pt-2 flex-shrink-0">
          <Form.Check
            type="checkbox"
            label={
              <span style={{ color: "rgba(var(--alertColor), 1)" }}>
                Foram detectadas avarias no pacote?
              </span>
            }
            className={Styles.CheckboxInput}
          />
          <hr className="pb-2" />
          {modo === "edit" && (
            <div className="d-flex flex-column gap-2">
              <Button type="button" variant="secondary" className="w-100">
                Entregar encomenda
              </Button>

              <Button type="submit" variant="primary" className="w-100">
                Salvar alterações
              </Button>
            </div>
          )}

          {modo === "add" && (
            <div className="d-flex flex-column gap-2">
              <Button type="submit" variant="primary" className="w-100">
                Adicionar encomenda
              </Button>
            </div>
          )}
        </div>
      </Form>
    </div>
  );
}
