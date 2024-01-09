
'';

import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { useRef, useState } from 'react';

function ModalContainer({ openModal, onToggleModal, modalBody, sizeModal, labelModal, labelBtnModal}) {
    const closeModal = () => {
        onToggleModal(); // Panggil fungsi onToggleModal untuk mengubah state di komponen Master
      };

  return (
    <>
      <Modal show={openModal} size={sizeModal} onClose={closeModal}>
        <Modal.Header>{labelModal}</Modal.Header>
        <Modal.Body>
          {modalBody()}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>{labelBtnModal}</Button>
          <Button color="gray" onClick={closeModal}>
            Back
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default ModalContainer