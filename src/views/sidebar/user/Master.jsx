// Master.jsx
import React, { useState, useRef } from 'react';
import TabelComponent from '../layouts/Tabel';
import ModalContainer from '../layouts/ModalContainer';
import IconAdd from '../layouts/icons/IconAdd';
import { Table } from 'flowbite-react';
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';


const Master = () => {
  const [openModal, setOpenModal] = useState(false);

  const toggleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const emailInputRef = useRef(null);
  const userNameInputRef = useRef(null);
  
  
  const dataTabelHeading = [
    {
      label: 'Add user',
      icon: IconAdd(),
      heading: 'Master user',
      eventToggleModal: toggleOpenModal
    }
  ]
  // Gantilah data ini dengan data sesungguhnya dari API atau state
  const dataTabel = [
    { id: 1, nama: 'Bahari', email: 'baharihari49@gmail.com', role: 'Super Admin' },
    { id: 2, nama: 'Bintang', email: 'bintangjtobing@gmail.com', role: 'Super Admin' },
    { id: 3, nama: 'Weni', email: 'weniweni34@gmail.com', role: 'Admin' },
    // Tambahkan data lainnya sesuai kebutuhan
  ];
  

  const dataModalBody = () => {
    return (
      <div className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email kamu" />
              </div>
              <TextInput id="email" useref={emailInputRef} placeholder="name@company.com" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Username kamu" />
              </div>
              <TextInput id="username" useref={userNameInputRef} placeholder="name@company.com" required />
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
              <TextInput id="confirm-password" type="password" required  placeholder='*******'/>
            </div>
          </div>
    )
  }


  return (
    <>

      <ModalContainer
        openModal={openModal} 
        onToggleModal={toggleOpenModal} 
        modalBody={dataModalBody} 
        sizeModal={'md'}
        labelModal={'Add user'}
        labelBtnModal={'Add new user'}
      />
     < TabelComponent data={dataTabel} toggleOpenModal={toggleOpenModal} dataHeading={dataTabelHeading}/>
    </>
  );
};

export default Master;
