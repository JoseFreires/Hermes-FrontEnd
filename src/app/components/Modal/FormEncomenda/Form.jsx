"use client";

import Image from "next/image";
import Form from "react-bootstrap/Form";
import Input from "../../Input/Input";
import Dropdown from "../../Input/Dropdonw/Dropdonw";
import Button from "../../Button/button";
import Styles from "./Form.module.css";
import { useState, useEffect } from "react";

export default function FormEncomenda({
  title,
  encomendaId = null,
  data = [],
  onClose,
  onSubmit,
  modo,
  packageData,
  onSaveChanges,
}) {
  const moradores = data.map((item) => ({
    id: item.id,
    nome: item.nomeMorador,
    apartamento: item.numeroApartamento,
    email: item.emailDestinatario,
  }));

  const [observacao, setObservacao] = useState(packageData?.observacao || "");
  const [nomePacote, setnomePacote] = useState(packageData?.nomePacote || "");
  const [moradorId, setMoradorId] = useState("");
  const [numApartamento, setNumApartamento] = useState(
    packageData?.numeroApartamento || "",
  );
  const [emailDestinatario, setEmailDestinatario] = useState(
    packageData?.emailDestinatario || "",
  );
  const [foto, setFoto] = useState(packageData?.foto || "");

  useEffect(() => {
    setnomePacote(packageData?.nomePacote || "");
    setObservacao(packageData?.observacao || "");
    setNumApartamento(packageData?.numeroApartamento || "");
    setEmailDestinatario(packageData?.emailDestinatario || "");
    setFoto(packageData?.foto || "");
    const found = data.find((d) => d.nomeMorador === packageData?.nomeMorador);
    setMoradorId(found ? found.id : "");
  }, [packageData, data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onSaveChanges && modo === "edit") {
      await onSaveChanges({
        nomePacote,
        idDestinatario,
        emailDestinatario,
        foto,
        observacao
      });
    } else if (onSaveChanges && modo === "add") {
      await onSavePackage({
        nomePacote,
        idDestinatario,
        emailDestinatario,
        foto,
        observacao
      });
    }
  };

  return (
    <div
      className="d-flex flex-column"
      style={{ maxHeight: "90vh", minHeight: "70vh" }}
    >
      {/* HEADER FIXO */}
      <div className="px-4 pt-4 pb-3 flex-shrink-0">
        <div className="d-flex flex-column flex-md-row align-items-md-end gap-2">
          <div>
            <h1 className="h4 text-primary-custom mb-1">{title}</h1>
            <div className="title-divider" />
          </div>
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        {/* CONTEÚDO SCROLLÁVEL */}
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
                onChange={(e) => setnomePacote(e.target.value)}
                disabled ={false}
              />
            </Form.Group>
            <Form.Group>
              <Input
                Label="Observação"
                type="text"
                placeholder="Observação"
                defaultValue={observacao}
                onChange={(e) => setObservacao(e.target.value)}
                disabled ={false}
              />
            </Form.Group>

            <Form.Group>
              <Dropdown
                options={moradores}
                label="Morador"
                placeholder="Selecione um morador"
                value={moradorId}
                onChange={(e) => setMoradorId(e.target.value)}
              />
            </Form.Group>
            <Input
              Label="Email do Destinatário"
              type="email"
              placeholder=""
              variant="Disabled"
              defaultValue={emailDestinatario}
              onChange={(e) => setEmailDestinatario(e.target.value)}
              disabled ={true}
            />
            <Input
              Label="Número do Apartamento"
              type="text"
              variant="Disabled"
              placeholder=""
              defaultValue={numApartamento}
              onChange={(e) => setNumApartamento(e.target.value)}
              disabled ={true}
            />
            
          </div>
        </div>

        {/* FOOTER FIXO */}
        <div className={`px-4 pb-4 pt-2 flex-shrink-0 `}>
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
            <>
              <div className="d-flex flex-column gap-2">
                <Button type="button" variant="secondary" className="w-100">
                  Entregar encomenda
                </Button>

                <Button type="submit" variant="primary" className="w-100"onclick={handleSubmit}>
                  Salvar alterações
                </Button>
              </div>
            </>
          )}

          {modo === "add" && (
            <div className="d-flex flex-column gap-2">
              <Button
                type="submit"
                variant="primary"
                className="w-100"
                onclick={handleSubmit}
              >
                Adicionar encomenda
              </Button>
            </div>
          )}
        </div>
      </Form>
    </div>
  );
}
