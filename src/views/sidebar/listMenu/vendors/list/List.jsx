import TabelComponent from "../../../../layouts/Tabel"
import { CRUD } from "./components/CRUD"
import { useState } from "react"
import IconAdd from "../../../../layouts/icons/IconAdd"
import FormInput from "../../../../layouts/FormInput"
import { ModalContainer } from "../../../../layouts/ModalContainer"
import { ModalConfirmDelete } from "../../../../layouts/ModalContainer"
import { Spinner } from "../../../../layouts/Spinner"


export const VendorsList = () => {
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
        label: 'Add vendors',
        icon: IconAdd(),
        heading: 'Vendors',
        eventToggleModal: handleCreate,
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

        < ModalConfirmDelete 
        modalDelete={modalDelete}
        closeModalDelete={closeModalDelete}
        handelDelete={handleDelete}
        />

        < Spinner loading={loading}/>

        < TabelComponent data={data} dataHeading={dataHeading} handelEdit={handleEdit}/>
        </>
    )
}