import TabelComponent from '../../../layouts/Tabel';
import IconAdd from '../../../layouts/icons/IconAdd';
import {ModalContainer} from '../../../layouts/ModalContainer';
import { useState } from 'react';

function Role() {
  const [openModal, setOpenModal] = useState(false);

  const toggleOpenModal = () => {
    setOpenModal(!openModal);
  };


    const data = [
        {id:1, nama: 'Super Admin'},
        {id: 2, nama: 'Admin'}
    ]

    const dataTabelHeading = [
      {
        label: 'Add role',
        icon: IconAdd(),
        heading: 'Role & Permission',
        eventToggleModal: toggleOpenModal
      }
    ]

    
    const dataModalBody = () => {
      return(
        <div>
          <p>test</p>
        </div>
      )
    }
    
  return (
      <>
        <ModalContainer 
          openModal={openModal}
          onToggleModal={toggleOpenModal}
          modalBody={dataModalBody}
          sizeModal={'2xl'}
          labelModal={'Add role'}
          labelBtnModal={'Add new role'}
        />
        <TabelComponent toggleOpenModal={toggleOpenModal} data={data} dataHeading={dataTabelHeading}/>
      </>
  )
}


export default Role 