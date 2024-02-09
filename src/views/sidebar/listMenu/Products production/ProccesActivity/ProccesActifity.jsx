import { useState } from "react"
import TabelComponent from "../../../../layouts/Tabel"
import IconAdd from "../../../../layouts/icons/IconAdd"
import { ModalContainer } from "../../../../layouts/ModalContainer"
import { ModalConfirmDelete } from "../../../../layouts/ModalContainer"
import { Spinner } from "../../../../layouts/Spinner"
import { CRUD } from "./components/CRUD"
import FormInput from "../../../../layouts/FormInput"
// import { TextArea } from "../../../layouts/FormInput"

export const ProccesActifity = () => {
    const {
        data,
        openModal,
        handleCreate,
        dataModal,
        input,
        validationError,
        handleEdit,
        dataEdit,
        refBody,
        openModalDelete,
        handleDelete,
        closeModalDelete,
        modalDelete,
        loading
    } = CRUD()
    const [dataHeading, setDataHeading] = useState( [{
        label: 'Add Proses activity',
        icon: IconAdd(),
        heading: 'Proses activity list',
        eventToggleModal: handleCreate,
    }]);


    const modalBody = () => {
        
        return (
            <>
                <form action="" method="get">
                <input type="hidden" name="id" ref={refBody.idRef} value={dataEdit.id}/>
                    <div className="grid grid-cols-full lg:grid-cols-2 gap-3 mb-4">
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
         < ModalContainer 
            openModal={openModal}
            onToggleModal={handleCreate}
            modalBody={modalBody}
            sizeModal={'2xl'}
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

            < Spinner loading={loading} />

        < TabelComponent data={data}  dataHeading={dataHeading} handelEdit={handleEdit}/>
        </>
    )

}