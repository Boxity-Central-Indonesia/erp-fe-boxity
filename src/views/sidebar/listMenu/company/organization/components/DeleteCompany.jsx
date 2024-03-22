import { Delete } from "../../../../../CRUD/Delete"


export const DeleteCompany = ({
    setModalDelete,
    setOpenModal,
    idDelete,
    setDefaultEdit,
    setRefresh
}) => {
    const openModalDelete = () => {
        setModalDelete(prevModalDelete => !prevModalDelete)
        setOpenModal(prevOpenModal => !prevOpenModal)
    }

    const closeModalDelete = () => {
        setModalDelete(prevModalDelete => !prevModalDelete)
    };


    const handleDelete = async() => {
        Delete({
            endPoint: 'companies/' + idDelete
        })

        setDefaultEdit(prevDefaultEdit => !prevDefaultEdit)
        setRefresh(prevRefresh => !prevRefresh)
    }


    return {
        openModalDelete,
        closeModalDelete,
        handleDelete,
    }
}