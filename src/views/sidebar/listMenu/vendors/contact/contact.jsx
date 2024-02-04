import FormInput from "../../../../layouts/FormInput";
import TabelComponent from "../../../../layouts/Tabel"
import IconAdd from "../../../../layouts/icons/IconAdd";
import { CRUD } from "./components/CRUD"
import { useState } from "react";
import { ModalConfirmDelete, ModalContainer } from "../../../../layouts/ModalContainer";
import { Spinner } from "../../../../layouts/Spinner";

export const VendorContacts = () => {

    const {
        data,
        openModal,
        handleCreate,
        dataModal,
        input,
        refBody,
        dataEdit,
        validationError,
        handleEdit,
        openModalDelete,
        closeModalDelete,
        handleDelete,
        modalDelete,
        loading
    } = CRUD()
    const [dataHeading, setDataHeading] = useState( [{
        label: 'Add Contacts',
        icon: IconAdd(),
        heading: 'Vendor contacts',
        eventToggleModal: handleCreate
    }]);


    const modalBody = () => {
         return (
            <>
            <form action="">
               <input type="hidden" name="id" ref={refBody.idRef} value={dataEdit.id}/>
               <div className="grid grid-cols-1 gap-4 mb-3">
               {input.map((item, index) => (
                           < FormInput
                           key={item.id}
                           element={item.element}
                           htmlFor={item.htmlFor}
                           label={item.label}
                           type={item.type}
                           name={item.name}
                           referens={item.ref}
                           value={item.value}
                           id={item.id}
                           onChange={item.onchange}
                           placeholder={item.placeholder} 
                           dataSelect={item.dataSelect}
                           uniqueId={index}
                           validationError={validationError}
                           />
                       ))}
               </div>
           </form>
            </>
         )
    }

    return(
        <>

        <ModalContainer 
        openModal={openModal}
        onToggleModal={handleCreate}
        modalBody={modalBody}
        sizeModal={'lg'}
        labelModal={dataModal.labelModal}
        labelBtnModal={dataModal.labelBtnModal}
        labelBtnSecondaryModal={dataModal.labelBtnSecondaryModal}
        handelBtnModal={dataModal.handelBtn}
        openModalDelete={openModalDelete}
        />

        < Spinner loading={loading}/>

        < ModalConfirmDelete 
        modalDelete={modalDelete}
        closeModalDelete={closeModalDelete}
        handelDelete={handleDelete}
        />

        < TabelComponent data={data} dataHeading={dataHeading} handelEdit={handleEdit}/>
        </>
    )
}