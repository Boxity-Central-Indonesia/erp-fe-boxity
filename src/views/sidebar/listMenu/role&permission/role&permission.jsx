import { ModalConfirmDelete, ModalContainer } from "../../../layouts/ModalContainer"
import TabelComponent from "../../../layouts/Tabel"
import { Spinner } from "../../../layouts/Spinner"
import { CRUD } from "./component/CURD"

export const RoleAndPermission = () => {
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
        setLoading,
        setRefresh
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
        setLoading={setLoading}
        setRefresh={setRefresh}
        />
       </>
    )
}
