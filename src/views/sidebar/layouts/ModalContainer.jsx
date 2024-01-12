
import axios from 'axios';
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from 'react';
import { postApiData } from '../../../function/Api';

function ModalContainer({ 
  openModal,
  onToggleModal, 
  modalBody, 
  sizeModal, 
  labelModal, 
  labelBtnModal,
  handelBtnModal
}) {
    const closeModal = () => {
        onToggleModal(); 
      }

      const [response, setResponse] = useState()
      const [emailValidation, setEmailValidation] = useState()
      const [passwordValidation, setPasswordValidation] = useState()


      useEffect(() => {
        if(!!response){
            setEmailValidation(!!response.email ? response.email[0] : '')
            setPasswordValidation(!!response.password ? response.password[0] : '')
        }
    }, [response]) 

      const apiUrl = import.meta.env.VITE_API_URL;
      
      const handelBtnSubmit = () => {
       handelBtnModal()
    }

  return (
    <>
      <Modal show={openModal} size={sizeModal} onClose={closeModal}>
        <Modal.Header>{labelModal}</Modal.Header>
        <Modal.Body>
          {modalBody(response)}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handelBtnSubmit}>{labelBtnModal}</Button>
          <Button color="gray" onClick={closeModal}>
            Back
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default ModalContainer