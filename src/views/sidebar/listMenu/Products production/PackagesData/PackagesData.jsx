import FormInput from "../../../../layouts/FormInput"
import { ModalConfirmDelete, ModalContainer } from "../../../../layouts/ModalContainer"
import IconAdd from "../../../../layouts/icons/IconAdd"
import { useEffect, useState, useRef } from "react"
import { TextArea } from "../../../../layouts/FormInput"
import {CRUD} from "./components/CRUD"
import TabelComponent from "../../../../layouts/Tabel"
import { Spinner } from "../../../../layouts/Spinner"

export const PackagesData = () => {
    const {
        data,
        handleCreate, 
        openModal, 
        setOpenModal,
        dataModal, 
        inputEmployes,
        inputEmployesCategory, 
        refBody,
        handleEdit,
        dataEdit,
        openModalDelete,
        closeModalDelete,
        handleDelete,
        modalDelete,
        validationError,
        handleClickHeading,
        dataHeading,
        inputBody,
        loading,
        skeleton,
        path
    } = CRUD()
    // const [dataHeading, setDataHeading] = useState([
    //     {
    //         label: 'Add Employes',
    //         icon: IconAdd(),
    //         heading: 'Employes list',
    //         eventToggleModal: handleCreate,
    //         onclick: handleClickHeading
    //     }
    // ])

    const dataModalBody = () => {
        return (
            <>
                <form className="">
                    <input type="hidden" name="id" ref={refBody.idRef} value={dataEdit.id} />
                    {inputBody(path)}
                </form>

            </>
        )
    }

    return(
       <>
        <ModalContainer 
        openModal={openModal}
        onToggleModal={setOpenModal}
        modalBody={dataModalBody}
        sizeModal={dataModal.size}
        labelModal={dataModal.labelModal}
        labelBtnModal={dataModal.labelBtnModal}
        labelBtnSecondaryModal={dataModal.labelBtnSecondaryModal}
        handleBtnModal={dataModal.handleBtn}
        parameter={path}
        openModalDelete={openModalDelete}
        />

        <Spinner loading={loading} />

        < ModalConfirmDelete 
        modalDelete={modalDelete}
        closeModalDelete={closeModalDelete}
        handleDelete={handleDelete}
        />

        < TabelComponent 
        data={data}
        dataHeading={dataHeading}
        skeleton={skeleton}
        setOpenModal={handleCreate}
        handleEdit={handleEdit}
        />
       </>
    )
}
