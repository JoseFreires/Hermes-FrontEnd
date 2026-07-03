"use client";

import { useEffect, useState } from "react";
import { Offcanvas, Form, Image } from "react-bootstrap";
import styles from "./CadastroModal.module.css";
import Button from "@/app/components/Button/button";
import Input from "@/app/components/Input/Input";
import Dropdown from "@/app/components/Input/Dropdown/Dropdown";
export default function CadastroModal({
  show,
  onHide,
  title,
  fields = [],
  initialData = {},
  showPhoto = true,
  onSaveChanges,
  submitLabel = "Finalizar",
}) {
  const [formData,     setFormData]     = useState({});
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading,      setLoading]      = useState(false);
  const [erro,         setErro]         = useState("");

  useEffect(() => {
    if (show) {
      setFormData(initialData || {});
      setPhotoPreview(initialData?.foto || null);
      setErro("");
    }
  }, [show, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoPreview(URL.createObjectURL(file));
    setFormData((prev) => ({ ...prev, fotoFile: file }));
  };

  const handleSubmit = async () => {
    setErro("");
    setLoading(true);
    try {
      await onSaveChanges?.(formData);
    } catch (err) {
      setErro(err.message || "Erro ao salvar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      placement="end"
      scroll={false}
      backdrop={false}        /* remove o overlay escuro */
      className={styles.offcanvas}
    >
      <Offcanvas.Header closeButton className={styles.header}>
        <div style={{ width: "100%" }}>
          <Offcanvas.Title className={styles.title}>{title}</Offcanvas.Title>
          <div className={styles.titleUnderline} />
        </div>
      </Offcanvas.Header>

      <Offcanvas.Body className={styles.body}>
        <div className={styles.content}>

          {/* ── Coluna esquerda: inputs ── */}
          <Form className={styles.form}>
            {fields.map((field) => (
              <Form.Group key={field.name} className="mb-3">
               

                {field.type === "select" ? ( 
                  <>
                  {/* <Form.Label className={styles.label}>{field.label}</Form.Label> */}
                  <Dropdown
                    name={field.name}
                    value={formData[field.name] ?? ""}
                    onChange={handleChange}
                    className={styles.input}
                    options={field.options || []}
                    Label={field.label}
                  >
                    
                  </Dropdown>
                  </>
                ) : (
                  <Input
                    type={field.type || "text"}
                    name={field.name}
                    Label={field.label}
                    placeholder={field.placeholder}
                    value={formData[field.name] ?? ""}
                    defaultValue={initialData[field.name] ?? ""}
                    onChange={handleChange}
                    className={styles.input}
                  />
                )}
              </Form.Group>
            ))}

            {erro && <p className="text-danger small mt-1">{erro}</p>}

            {/* Botão no rodapé dos inputs quando não tem foto */}
            {!showPhoto && (
              <Button
                variant="outline-danger"
                className={styles.submitButton}
                style={{ width: "100%", marginTop: "16px" }}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Salvando..." : submitLabel}
              </Button>
            )}
          </Form>

          {/* ── Divisor vertical ── */}
          {showPhoto && <div className={styles.dividerVertical} />}

          {/* ── Coluna direita: foto + botão ── */}
          {showPhoto && (
            <div className={styles.photoSection}>
              <span className={styles.label}>Foto</span>

              <label htmlFor="cadastro-foto" className={styles.photoCircle}>
                {photoPreview ? (
                  <Image
                    src={photoPreview}
                    alt="Foto"
                    roundedCircle
                    className={styles.photoPreview}
                  />
                ) : (
                  <PersonPlaceholderIcon />
                )}
              </label>
              <input
                id="cadastro-foto"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                hidden
              />

              <hr className={styles.divider} />

              <Button
                variant="critical"
                className={styles.submitButton}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Salvando..." : submitLabel}
              </Button>
            </div>
          )}
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

function PersonPlaceholderIcon() {
  return (
    <svg viewBox="0 0 100 100" className={styles.personIcon}>
      <circle cx="50" cy="35" r="14" />
      <path d="M20 85 C20 60 80 60 80 85 Z" />
    </svg>
  );
}