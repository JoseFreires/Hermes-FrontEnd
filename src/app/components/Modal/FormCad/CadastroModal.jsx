"use client";

import { useEffect, useState } from "react";
import { Offcanvas, Form, Button, Image } from "react-bootstrap";
import styles from "./CadastroModal.module.css";

/**
 * Modal lateral reutilizável — puramente de UI.
 * Não sabe nada sobre roles, hooks ou serviços.
 * Quem decide o que fazer com os dados é a página via useEntityModal.
 *
 * Props:
 * - show: boolean
 * - onHide(): fecha o modal
 * - title: string
 * - fields: array de { name, label, placeholder, type, options? } ← formConfigs.js
 * - initialData: objeto preenchido no modo edição, {} no modo criação
 * - showPhoto: boolean (default true)
 * - onSaveChanges(formData): chamado ao submeter — quem trata é useEntityModal.save
 * - submitLabel: string (default "Finalizar")
 */
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

  // Preenche o form ao abrir
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

  // Delega tudo para onSaveChanges — que vem de useEntityModal.save
  const handleSubmit = async () => {
    setErro("");
    setLoading(true);
    try {
      await onSaveChanges?.(formData);
      // onHide é chamado dentro do useEntityModal.save após sucesso
    } catch (err) {
      setErro(err.message || "Erro ao salvar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Offcanvas show={show} onHide={onHide} placement="end" className={styles.offcanvas}>
      <Offcanvas.Header closeButton className={styles.header}>
        <div>
          <Offcanvas.Title className={styles.title}>{title}</Offcanvas.Title>
          <div className={styles.titleUnderline} />
        </div>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <div className={styles.content}>

          {/* Campos dinâmicos — gerados pelo formConfigs.js */}
          <Form className={styles.form}>
            {fields.map((field) => (
              <Form.Group key={field.name} className="mb-3">
                <Form.Label className={styles.label}>{field.label}</Form.Label>

                {field.type === "select" ? (
                  <Form.Select
                    name={field.name}
                    value={formData[field.name] ?? ""}
                    onChange={handleChange}
                    className={styles.input}
                  >
                    <option value="">{field.placeholder}</option>
                    {field.options?.map((opt) =>
                      typeof opt === "string" ? (
                        <option key={opt} value={opt}>{opt}</option>
                      ) : (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      )
                    )}
                  </Form.Select>
                ) : (
                  <Form.Control
                    type={field.type || "text"}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name] ?? ""}
                    onChange={handleChange}
                    className={styles.input}
                  />
                )}
              </Form.Group>
            ))}

            {erro && <p className="text-danger small mt-1">{erro}</p>}
          </Form>

          {/* Área de foto */}
          {showPhoto && (
            <div className={styles.photoSection}>
              <span className={styles.label}>Foto</span>

              <label htmlFor="cadastro-foto" className={styles.photoCircle}>
                {photoPreview ? (
                  <Image src={photoPreview} alt="Foto" roundedCircle className={styles.photoPreview} />
                ) : (
                  <PersonPlaceholderIcon />
                )}
              </label>
              <input id="cadastro-foto" type="file" accept="image/*" onChange={handlePhotoChange} hidden />

              <hr className={styles.divider} />

              <Button variant="outline-danger" className={styles.submitButton} onClick={handleSubmit} disabled={loading}>
                {loading ? "Salvando..." : submitLabel}
              </Button>
            </div>
          )}
        </div>

        {!showPhoto && (
          <Button variant="outline-danger" className={styles.submitButton} onClick={handleSubmit} disabled={loading}>
            {loading ? "Salvando..." : submitLabel}
          </Button>
        )}
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