
'use client';

import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { useRef, useState } from 'react';

function ModalCreateMaster({ openModal, onToggleModal }) {
    const closeModal = () => {
        onToggleModal(); // Panggil fungsi onToggleModal untuk mengubah state di komponen Master
      };
    
      const emailInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Modal show={openModal} size={'md'} onClose={closeModal}>
        <Modal.Header>Tambah user</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email kamu" />
              </div>
              <TextInput id="email" useRef={emailInputRef} placeholder="name@company.com" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Username kamu" />
              </div>
              <TextInput id="email" useRef={emailInputRef} placeholder="name@company.com" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Password kamu" />
              </div>
              <TextInput id="password" type="password" required  placeholder='*******'/>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Konfirmasi password" />
              </div>
              <TextInput id="password" type="password" required  placeholder='*******'/>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>Tambah user baru</Button>
          <Button color="gray" onClick={closeModal}>
            Kembali
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default ModalCreateMaster