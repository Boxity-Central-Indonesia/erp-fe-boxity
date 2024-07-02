import { Delete } from "../../../../../CRUD/Delete"


export const deleteProccesActivities = ({
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
            endPoint: 'processing-activities/' + idDelete
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