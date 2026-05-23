"use client";

import Image from "next/image";
import Form from "react-bootstrap/Form";
import Input from "../../Input/Input";
import Dropdown from "../../Input/Dropdonw/Dropdonw";
import Button from "../../Button/button";
import Styles from "./Form.module.css";

export default function FormEncomenda({
  title,
  encomendaId = null,
  data = [],
  onClose,
  onSubmit,
}) {
  const moradores = data.map((item) => ({
    id: item.id,
    nome: item.morador,
    apartamento: item.apartamento,
    email: item.email,
  }));

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

          {encomendaId && (
            <span className="text-secondary-custom fw-medium">
              (id {encomendaId})
            </span>
          )}
        </div>
      </div>
      <Form>
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

              <div className="photo-upload d-flex justify-content-center">
                <Image
                  src="/img/box.svg"
                  alt="Encomenda"
                  width={200}
                  height={200}
                />
              </div>
            </Form.Group>

            <Form.Group>
              <Input Label="Descrição" type="text" placeholder="Descrição" />
            </Form.Group>

            <Form.Group>
              <Dropdown
                options={moradores}
                label="Morador"
                placeholder="Selecione um morador"
              />
            </Form.Group>

            <Input
              Label="Andar"
              type="text"
              variant="disabled"
              placeholder="Andar"
              defaultValue="5º"
              disabled
            />
            <Input
              Label="Apartamento"
              type="text"
              variant="disabled"
              placeholder="Apartamento"
              defaultValue="508"
              disabled
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
          <Button
            type="submit"
            variant="primary"
            className="w-100 mb-4"
            onClick={onSubmit}
          >
            Registrar
          </Button>
        </div>
      </Form>
    </div>
  );
}
