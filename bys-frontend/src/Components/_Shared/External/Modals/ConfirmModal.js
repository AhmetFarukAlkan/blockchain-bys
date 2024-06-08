import React, { useEffect } from "react";
import {Button, Modal} from 'react-bootstrap';
import useConfirm from "../../../../Hooks/useConfirmHook";

const ConfirmModal = () => {
  const {prompt = '', isOpen = false, proceed, cancel} = useConfirm();

  useEffect(() => {
    const handleKeydown = (e) => {
      if (proceed && isOpen && e.key === "Enter") {
        proceed();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [proceed, isOpen]);

  return (
    <Modal show={isOpen}
           size="lg"
           aria-labelledby="contained-modal-title-vcenter"
           centered
           style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <Modal.Header>
        <Modal.Title>Bu işlemi gerçekleştirmek istediğinizden emin misiniz?</Modal.Title>
      </Modal.Header>
      <Modal.Body>{prompt}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={cancel}>
          İptal et
        </Button>
        <Button variant="primary" onClick={proceed}>
          Devam et
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ConfirmModal;