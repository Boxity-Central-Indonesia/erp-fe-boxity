import { ModalConfirmDelete, ModalContainer } from "../../../../layouts/ModalContainer"
import {CRUD} from "./components/CRUD"
import TabelComponent from "../../../../layouts/Tabel"
import { Spinner } from "../../../../layouts/Spinner"
import { CompanyDetail } from "./components/companyDetail"
import { index } from "./components"

export const Company = () => {
    // const {
    //     data,
    //     openModal, 
    //     setOpenModal,
    //     dataModal, 
    //     refBody,
    //     handleEdit,
    //     dataEdit,
    //     openModalDelete,
    //     closeModalDelete,
    //     handleDelete,
    //     modalDelete,
    //     dataHeading,
    //     inputBody,
    //     loading,
    //     handleCreate,
    //     skeleton,
    //     path,
    //     dataDetailCompany,
    //     defaultEdit,
    //     setDefaultEdit
    // } = CRUD()

    // const dataModalBody = () => {
    //     return (
    //         <>
    //             <form className="">
    //                 <input type="hidden" name="id" ref={refBody.idRef} value={dataEdit.id} />
    //                 {inputBody(path)}
    //             </form>

    //         </>
    //     )
    // }

    // if(!defaultEdit){
    //     return(
    //         <>
    //             <ModalContainer 
    //                 openModal={openModal}
    //                 onToggleModal={setOpenModal}
    //                 modalBody={dataModalBody}
    //                 sizeModal={dataModal.size}
    //                 labelModal={dataModal.labelModal}
    //                 labelBtnModal={dataModal.labelBtnModal}
    //                 labelBtnSecondaryModal={dataModal.labelBtnSecondaryModal}
    //                 handleBtnModal={dataModal.handleBtn}
    //                 parameter={path}
    //                 openModalDelete={openModalDelete}
    //             />

    //             <Spinner loading={loading} />

    //             < ModalConfirmDelete 
    //             modalDelete={modalDelete}
    //             closeModalDelete={closeModalDelete}
    //             handleDelete={handleDelete}
    //             />

    //             <CompanyDetail
    //                 data={dataDetailCompany}
    //                 defaultEdit={setDefaultEdit}
    //                 handleEdit={handleEdit}
    //                 dataHeading={dataHeading}
    //             />
    //         </>
    //     )
    // }

    const {
        data,
        dataHeading,
        dataModal,
        openModal,
        setOpenModal,
        dataModalBody
    } = index()


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
        // parameter={path}
        // openModalDelete={openModalDelete}
        />

        {/* <Spinner loading={loading} />

        < ModalConfirmDelete 
        modalDelete={modalDelete}
        closeModalDelete={closeModalDelete}
        handleDelete={handleDelete}
        /> */}

        < TabelComponent 
        data={data}
        dataHeading={dataHeading}
        // skeleton={skeleton}
        // setOpenModal={handleCreate}
        // handleEdit={handleEdit}
        />
       </>
    )
}
