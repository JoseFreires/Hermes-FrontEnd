"use client";

import { Modal, Form } from "react-bootstrap";
import Button from "@/app/components/Button/button";
import { useState, useEffect } from "react";
import styles from "./DeleteModal.module.css";

export default function DeleteConfirmationModal({
    show,
    onClose,
    onConfirm,
}) {
    const [reason, setReason] = useState("");
    const [customReason, setCustomReason] = useState("");

    useEffect(() => {
        if (!show) {
            setReason("");
            setCustomReason("");
        }
    }, [show]);

    const handleConfirm = () => {
        const finalReason =
            reason === "other" ? customReason : reason;

        if (onConfirm) {
            onConfirm(finalReason);
        }

        if (onClose) {
            onClose();
        }
    };

    return (
        <Modal
            show={show}
            onHide={onClose}
            centered
            dialogClassName={styles.modalDialog}
        >
            <Modal.Body className={styles.modalBody}>
                <button
                    className={styles.closeButton}
                    onClick={onClose}
                >
                    ×
                </button>

                <div className={styles.header}>
                    <div className={styles.iconContainer}>
                        ⚠
                    </div>

                    <div>
                        <h3 className={styles.title}>
                            Confirmar exclusão?
                        </h3>

                        <p className={styles.description}>
                            Esta alteração é permanente e não poderá ser
                            desfeita.
                            <br />
                            Para prosseguir, é necessário informar o motivo
                            da exclusão no campo abaixo.
                        </p>
                    </div>
                </div>

                <Form>
                    <div className={styles.radioGroup}>
                        <Form.Check
                            type="radio"
                            id="contract"
                            name="deleteReason"
                            label="Encerramento de contrato"
                            value="Encerramento de contrato"
                            checked={reason === "Encerramento de contrato"}
                            onChange={(e) => setReason(e.target.value)}
                        />

                        <Form.Check
                            type="radio"
                            id="duplicate"
                            name="deleteReason"
                            label="Duplicidade de cadastro"
                            value="Duplicidade de cadastro"
                            checked={reason === "Duplicidade de cadastro"}
                            onChange={(e) => setReason(e.target.value)}
                        />

                        <Form.Check
                            type="radio"
                            id="other"
                            name="deleteReason"
                            label="Outro"
                            value="other"
                            checked={reason === "other"}
                            onChange={(e) => setReason(e.target.value)}
                        />
                    </div>

                    <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Descreva o motivo"
                        className={styles.textarea}
                        value={customReason}
                        onChange={(e) => setCustomReason(e.target.value)}
                        disabled={reason !== "other"}
                    />
                </Form>

                <div className={styles.actions}>
                    <Button variant="primary" onClick={onClose} >
                        Cancelar
                    </Button>

                    <Button variant="secondary" onClick={handleConfirm} disabled={!reason || (reason === "other" && !customReason.trim())}>
                        Excluir
                    </Button>

                </div>
            </Modal.Body>
        </Modal>
    );
}