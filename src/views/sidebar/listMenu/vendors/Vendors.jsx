import { ModalConfirmDelete, ModalContainer } from "../../../layouts/ModalContainer"
import TabelComponent from "../../../layouts/Tabel"
import { Spinner } from "../../../layouts/Spinner"
import { CRUD } from "./components/CRUD"
import { VendorDetail } from "./components/vendorDetail"

export const Vendors = () => {
    const {
        data,
        openModal, 
        setOpenModal,
        dataModal, 
        refBody,
        handleEdit,
        dataEdit,
        openModalDelete,
        closeModalDelete,
        handleDelete,
        modalDelete,
        dataHeading,
        inputBody,
        loading,
        handleCreate,
        skeleton,
        path,
        defaultEdit,
        setDefaultEdit,
        dataDetailVendor,
        dataDetailVendorContact,
        setPath,
        setDataHeading,
        handleClickHeading,
        setLoading,
        setRefresh,
        usePageDetal
    } = CRUD()

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

    if(!defaultEdit){
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
                    hidden={dataModal.hidden}
                />

                <Spinner loading={loading} />

                < ModalConfirmDelete 
                modalDelete={modalDelete}
                closeModalDelete={closeModalDelete}
                handleDelete={handleDelete}
                />

                <VendorDetail
                    data={dataDetailVendor}
                    setDefaultEdit={setDefaultEdit}
                    dataVendorContact={dataDetailVendorContact}
                    handleEdit={handleEdit}
                    dataHeading={dataHeading}
                    setPath={setPath}
                    setDataHeading={setDataHeading}
                    handleCreate={handleCreate}
                    handleClickHeading={handleClickHeading}
                    setLoading={setLoading}
                    setRefresh={setRefresh}
                />
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
        setRefresh={setRefresh}
        setLoading={setLoading}
        usePageDetail={usePageDetal}
        />
       </>
    )
}
