"use client";

import Image from "next/image";
import Form from "react-bootstrap/Form";
import Input from "../../Input/Input";
import Dropdown from "../../Input/Dropdown/Dropdown";
import Button from "../../Button/button";
import Styles from "./Form.module.css";
import { useState, useEffect } from "react";
import { listMorador, getPessoaId } from "@/app/services/Morador/GET.js";
import { useMoradorOptions } from "@/app/hooks/GetOptions/useMoradorOptions";
export default function FormEncomenda({
  title,
  modo,
  encomendaData,
  onSaveChanges,
  onDeliver,
}) {
  const [moradores, setMoradores] = useState([]);
  const [nomePacote, setNomePacote] = useState(encomendaData?.nomePacote || "");
  const [observacao, setObservacao] = useState(encomendaData?.observacao || "");
  const [idencomenda, setIdencomenda] = useState(
    encomendaData?.idEncomenda || "",
  );
  const [foto, setFoto] = useState(encomendaData?.foto || null);
  const [moradorSelectId, setMoradorSelectId] = useState("");
  const [idDestinatario, setIdDestinatario] = useState("");
  const [numeroApartamento, setNumeroApartamento] = useState(
    encomendaData?.numeroApartamento || "",
  );
  const [emailDestinatario, setEmailDestinatario] = useState(
    encomendaData?.emailDestinatario || "",
  );
  const [photoPreview, setPhotoPreview] = useState("/img/box.svg"); // preview padrão
  const { options: moradorOptions, isLoading } = useMoradorOptions();

  useEffect(() => {
    listMorador().then((data) => {
      if (Array.isArray(data)) {
        setMoradores(data);
      } else {
        setMoradores([]);
      }
    });
  }, []);

  useEffect(() => {
    if (modo !== "edit" || !encomendaData) return;

    setNomePacote(encomendaData.nomePacote || "");
    setObservacao(encomendaData.observacao || "");
    setIdencomenda(encomendaData.idEncomenda || "");

    const found = moradores.find(
      (m) =>
        String(getPessoaId(m)) === String(encomendaData.idDestinatario) ||
        String(getPessoaId(m)) === String(encomendaData.idPessoa) ||
        m.nome === encomendaData.nomeMorador ||
        m.nomeMorador === encomendaData.nomeMorador,
    );

    if (found) {
      const pessoaId = getPessoaId(found);

      setMoradorSelectId(pessoaId ? String(pessoaId) : "");
      setIdDestinatario(pessoaId ? String(pessoaId) : "");
      setEmailDestinatario(
        found.email || encomendaData.emailDestinatario || "",
      );
      setNumeroApartamento(
        found.numeroApartamento || encomendaData.numeroApartamento || "",
      );
    } else {
      setMoradorSelectId("");
      setIdDestinatario("");
      setEmailDestinatario(encomendaData.emailDestinatario || "");
      setNumeroApartamento(encomendaData.numeroApartamento || "");
    }
  }, [encomendaData, moradores, modo]);

  const handleMoradorChange = (e) => {
    const selectedPessoaId = e.target.value;

    setMoradorSelectId(selectedPessoaId);
    setIdDestinatario(selectedPessoaId);

    const morador = moradores.find(
      (m) => String(getPessoaId(m)) === String(selectedPessoaId),
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

    const dados = {
      idEncomenda: idencomenda,
      foto,
      nomePacote,
      observacao,
      idDestinatario,
      numeroApartamento,
      emailDestinatario,
    };
    await onSaveChanges(dados);
  };

  let maxHeigthScrollingArea = "";
  let showButton = true;

  if (modo === "add") {
    maxHeigthScrollingArea = "60vh";
    title = "Adicionar Encomenda";
    showButton = true;
  } else if (modo === "edit") {
    encomendaData?.status == "ENTREGUE"
      ? ((maxHeigthScrollingArea = "70vh"),
        (title = "Visualizar Encomenda"),
        (showButton = false))
      : ((maxHeigthScrollingArea = "60vh"),
        (title = "Alterar Encomenda"),
        (showButton = true));
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoPreview(URL.createObjectURL(file));
    setFoto(file);
  };

  return (
    <div
      className="d-flex flex-column"
      style={{ maxHeight: "95vh", minHeight: "90vh" }}
    >
      <div className="px-4 pt-4 pb-3 flex-shrink-0">
        <div>
          <div className="d-flex flex-row flex-md-row align-items-center gap-2">
            <h1 className="h4 text-primary-custom mb-1">{title}</h1>
            {modo === "edit" && (
              <p
                className="h5 text-primary-custom mb-1"
                style={{ color: "#003366" }}
              >
                (ID: #{encomendaData.idEncomenda})
              </p>
            )}
          </div>
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <div className="px-4 py-3 flex-grow-1 overflow-auto max-height-835">
          <div
            className="d-flex flex-column gap-4"
            style={{
              maxHeight: maxHeigthScrollingArea,
              overflowY: "auto",
              scrollbarColor: " #8a8a8a transparent",
              scrollbarwidth: "thin",
            }}
          >
            <Form.Group>
              <p>Foto da encomenda</p>

              <label htmlFor="encomenda-foto" className={Styles.photo}>
                <Image
                  src={photoPreview}
                  alt="Encomenda"
                  width={200}
                  height={200}
                />
              </label>
              <input
                id="encomenda-foto"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                hidden
              />
            </Form.Group>
            <Form.Group>
              <Input
                Label="Nome do pacote"
                type="text"
                placeholder="Nome do pacote"
                variant={
                  modo === "edit" && encomendaData?.status == "ENTREGUE"
                    ? "Disabled"
                    : "Default"
                }
                defaultValue={nomePacote}
                onChange={(e) => setNomePacote(e.target.value)}
                disabled={
                  modo === "edit" && encomendaData?.status == "ENTREGUE"
                    ? true
                    : false
                }
              />
            </Form.Group>
            <Form.Group>
              <Input
                Label="Observação"
                type="text"
                placeholder="Observação"
                variant={
                  modo === "edit" && encomendaData?.status == "ENTREGUE"
                    ? "Disabled"
                    : "Default"
                }
                defaultValue={observacao}
                onChange={(e) => setObservacao(e.target.value)}
                disabled={
                  modo === "edit" && encomendaData?.status == "ENTREGUE"
                    ? true
                    : false
                }
              />
            </Form.Group>

            <Form.Group>
              <Dropdown
                Label="Destinatário"
                options={moradorOptions}
                placeholder="Selecione um morador"
                value={moradorSelectId}
                isLoading={isLoading}
                onChange={handleMoradorChange}
              />
            </Form.Group>
            <Input
              Label="Email do Destinatário"
              type="email"
              placeholder=""
              variant="Disabled"
              key={`email-${moradorSelectId}`}
              defaultValue={emailDestinatario}
              disabled={true}
            />
            <Input
              Label="Número do Apartamento"
              type="text"
              variant="Disabled"
              placeholder=""
              key={`apt-${moradorSelectId}`}
              defaultValue={numeroApartamento}
              disabled={true}
            />
          </div>
        </div>
        {showButton && (
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
                <Button
                  type="button"
                  variant="secondary"
                  className="w-100"
                  onClick={onDeliver}
                >
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
        )}
      </Form>
    </div>
  );
}
