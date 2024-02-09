import FormInput from "../../../../layouts/FormInput"
import { ModalConfirmDelete, ModalContainer } from "../../../../layouts/ModalContainer"
import TabelComponent from "../../../../layouts/Tabel"
import IconAdd from "../../../../layouts/icons/IconAdd"
import { useEffect, useState, useRef } from "react"
import { TextArea } from "../../../../layouts/FormInput"
import {CRUD} from "./components/CRUD"
import TabelComponentTest from "../../../../layouts/TabelTest"
import { Spinner } from "../../../../layouts/Spinner"

export const EmployesList = () => {
    const {
        data,
        handelCreate, 
        openModal, 
        setOpenModal,
        dataModal, 
        inputEmployes,
        inputEmployesCategory, 
        refBody,
        handelEdit,
        dataEdit,
        openModalDelete,
        closeModalDelete,
        handelDelete,
        modalDelete,
        validationError,
        handleClickHeading,
        dataHeading,
        inputBody,
        loading,
    } = CRUD()
    // const [dataHeading, setDataHeading] = useState([
    //     {
    //         label: 'Add Employes',
    //         icon: IconAdd(),
    //         heading: 'Employes list',
    //         eventToggleModal: handelCreate,
    //         onclick: handleClickHeading
    //     }
    // ])

    const dataModalBody = () => {
        return (
            <>
                <form className="">
                    <input type="hidden" name="id" ref={refBody.idRef} value={dataEdit.id} />
                    {dataHeading[0].parameter === 'employees' ? inputBody('employees') : dataHeading[0].parameter === 'employee-categories' ? inputBody('employee-categories') : inputBody('employees')}
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
        handelBtnModal={dataModal.handelBtn}
        parameter={dataHeading[0].parameter}
        openModalDelete={openModalDelete}
        />

        <Spinner loading={loading} />

        < ModalConfirmDelete 
        modalDelete={modalDelete}
        closeModalDelete={closeModalDelete}
        handelDelete={handelDelete}
        />

        < TabelComponentTest 
        data={data}
        dataHeading={dataHeading}
        />
       </>
    )
}
