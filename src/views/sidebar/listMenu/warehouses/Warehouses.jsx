import { ModalConfirmDelete, ModalContainer } from "../../../layouts/ModalContainer"
import IconAdd from "../../../layouts/icons/IconAdd"
import { useEffect, useState, useRef } from "react"
import { TextArea } from "../../../layouts/FormInput"
import TabelComponent from "../../../layouts/Tabel"
import { Spinner } from "../../../layouts/Spinner"
import { CRUD } from "./components/CRUD"
import { DetailWarehouses } from "./components/detailWarehouses"

export const Warehouses = () => {
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
        dataDetailWarehouses,
        setDataDetailWarehouses,
        setDataModal,
        setDataEdit,
        setResponseError,
        setValidationError,
        setLoading,
        setPath,
        setDisabledInput
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
                />

                <Spinner loading={loading} />

                < ModalConfirmDelete 
                    modalDelete={modalDelete}
                    closeModalDelete={closeModalDelete}
                    handleDelete={handleDelete}
                />

                 <DetailWarehouses
                    data={dataDetailWarehouses}
                    defaultEdit={setDefaultEdit}
                    setOpenModal={setOpenModal}
                    openModal={openModal}
                    setDataModal={setDataModal}
                    setDataEdit={setDataEdit}
                    refBody={refBody}
                    setResponseError={setResponseError}
                    setValidationError={setValidationError}
                    setLoading={setLoading}
                    setData={setDataDetailWarehouses}
                    setPath={setPath}
                    setDisabledInput={setDisabledInput}
                    // handleEdit={handleEdit}
                    // dataHeading={dataHeadingForProduct}
                    // setPath={setPath}
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
        />
       </>
    )
}
