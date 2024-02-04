import { data } from "autoprefixer"
import TabelComponent from "../../../../layouts/Tabel"
import { CRUD } from "../locations/components/CRUD"
import { useState } from "react"
import IconAdd from "../../../../layouts/icons/IconAdd"
import FormInput from "../../../../layouts/FormInput"
import { TextArea } from "../../../../layouts/FormInput"
import { ModalConfirmDelete, ModalContainer } from "../../../../layouts/ModalContainer"
import { Spinner } from "../../../../layouts/Spinner"


export const WarehousesLocation = () => {
    const {
        data,
        openModal,
        handleCreate,
        input,
        create,
        dataModal,
        validationError,
        loading,
        handleEdit,
        edit,
        dataEdit,
        refBody,
        openModalDelete,
        modalDelete,
        closeModalDelete,
        handleDelete
    } = CRUD()
    const [dataHeading, setDataHeading] = useState( [{
        label: 'Add locations',
        icon: IconAdd(),
        heading: 'Warehouses locations',
        eventToggleModal: handleCreate,
    }]);



    const modalBody = () => {
        return(
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

    return (
        <>

        < Spinner
        loading={loading} 
        />

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

        < TabelComponent data={data} dataHeading={dataHeading} handelEdit={handleEdit}/>
        </>
    )
}