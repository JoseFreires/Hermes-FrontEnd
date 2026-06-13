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
    nome: item.morador,
    apartamento: item.apartamento,
    email: item.email,
  }));

  const [descricao, setDescricao] = useState(packageData?.descricao || "");
  const [moradorId, setMoradorId] = useState("");
  const [andar, setAndar] = useState(packageData?.andar || "");
  const [apartamento, setApartamento] = useState(packageData?.apartamento || "");

  useEffect(() => {
    setDescricao(packageData?.descricao || "");
    setApartamento(packageData?.apartamento || "");
    setAndar(packageData?.andar || "");
    const found = data.find((d) => d.morador === packageData?.morador);
    setMoradorId(found ? found.id : "");
  }, [packageData, data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onSaveChanges && modo === "edit") {
      await onSaveChanges({
        descricao,
        moradorId,
        andar,
        apartamento,
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
            className="d-flex flex-column gap-1"
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
                Label="Descrição"
                type="text"
                placeholder="Descrição"
                defaultValue={descricao}
                onChange={(e) => setDescricao(e.target.value)}
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
              Label="Andar"
              type="text"
              placeholder="Andar"
              defaultValue={andar}
              onChange={(e) => setAndar(e.target.value)}
            />
            <Input
              Label="Apartamento"
              type="text"
              placeholder="Apartamento"
              defaultValue={apartamento}
              onChange={(e) => setApartamento(e.target.value)}
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
          <div className="d-flex flex-column gap-2">
            <Button type="button" variant="secondary" className="w-100">
              Entregar encomenda
            </Button>

            <Button type="submit" variant="primary" className="w-100">
              Salvar alterações
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
