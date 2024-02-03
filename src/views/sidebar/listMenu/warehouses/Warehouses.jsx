import TabelComponent from "../../../layouts/Tabel"
import { CRUD } from "./components/CRUD.JSX"
import IconAdd from "../../../layouts/icons/IconAdd"
import { useState } from "react"
import { ModalContainer } from "../../../layouts/ModalContainer"
import FormInput from "../../../layouts/FormInput"
import { ModalConfirmDelete } from "../../../layouts/ModalContainer"


export const Warehouses = () => {
    const {
        data,
        openModal,
        handleCreate ,
        dataModal,
        input,
        validationError,
        handleEdit,
        refBody,
        dataEdit,
        openModalDelete,
        idDelete,
        modalDelete,
        closeModalDelete,
        handelDelete
    } = CRUD()


    const [dataHeading, setDataHeading] = useState( [{
        label: 'Add Warehouses',
        icon: IconAdd(),
        heading: 'Warehouses list',
        eventToggleModal: handleCreate,
    }]);

    const modalBody = () => {
        return (
            <form action="">
                <input type="hidden" name="id" ref={refBody.idRef} value={dataEdit.id}/>
               <div className="grid gap-4 mb-4 grid-cols-1">
               {input.map( (item, index) => (
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
                            onChange={(event) => item.onchange(event)}
                            placeholder={item.placeholder} 
                            dataSelect={item.dataSelect}
                            uniqueId={index}
                            validationError={validationError}
                            />
                        ) )}
               </div>
            </form>
        )
    }


    return (
        <>

        < ModalContainer 
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
        handelDelete={handelDelete}
        />

        < TabelComponent data={data} dataHeading={dataHeading} handelEdit={handleEdit}/>
        </>
    )
}