import { ModalConfirmDelete, ModalContainer } from "../../../layouts/ModalContainer"
import IconAdd from "../../../layouts/icons/IconAdd"
import { useEffect, useState, useRef } from "react"
import { TextArea } from "../../../layouts/FormInput"
import TabelComponent from "../../../layouts/Tabel"
import { Spinner } from "../../../layouts/Spinner"
import { CRUD } from "./components/CRUD"
import { OrderDetail } from "./components/OrderDetail"
import { GoodReceiptDetail } from "./components/GoodReceiptDetail"
import { DeliveryNotesDetail } from "./components/DeliveryNotesDetail"
import { InvoicesDetail } from "./components/InvoicesDetail"

export const Transactions = () => {
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
        dataDetailOrders,
        dataDetailGoodReceipt,
        setPath,
        dataDetailDeliveryNotes,
        dataDetailInvoices
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


    if(defaultEdit === false && path === 'orders' || path === 'products') {
        return (
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

                <OrderDetail
                    data={dataDetailOrders}
                    defaultEdit={setDefaultEdit}
                    handleEdit={handleEdit}
                    dataHeading={dataHeading}
                    setPath={setPath}
                />
        </>
        )
    } else if(defaultEdit === false && path === 'goods-receipt' || path === 'goods-receipt-items') {
        return (
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

                <GoodReceiptDetail
                    data={dataDetailGoodReceipt}
                    defaultEdit={setDefaultEdit}
                    handleEdit={handleEdit}
                    dataHeading={dataHeading}
                    setPath={setPath}
                />
        </>
        )
    } else if(defaultEdit === false && path === 'delivery-notes' || path === 'delivery-notes-item') {
        return (
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

                <DeliveryNotesDetail
                    data={dataDetailDeliveryNotes}
                    defaultEdit={setDefaultEdit}
                    handleEdit={handleEdit}
                    dataHeading={dataHeading}
                    setPath={setPath}
                    refBody={refBody}
                />
        </>
        )
    } else if(defaultEdit === false && path === 'invoices' || path === 'invoices-payments') {
        return (
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

               <InvoicesDetail
                    data={dataDetailInvoices} 
                    defaultEdit={setDefaultEdit}
                    handleEdit={handleEdit}
                    dataHeading={dataHeading}
                    setPath={setPath}
                    refBody={refBody}
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
