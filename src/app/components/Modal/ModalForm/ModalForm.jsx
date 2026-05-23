"use client";

import Modal from "react-bootstrap/Modal";

export default function ModalForm({ show, onHide, children }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      dialogClassName="modal-encomenda"
    >
      <Modal.Body className="p-0">
        {children}
      </Modal.Body>
    </Modal>
  );
}