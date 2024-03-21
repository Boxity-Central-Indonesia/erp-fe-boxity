


export const DeleteCompany = ({
    setModalDelete,
    setOpenModal
}) => {
    const openModalDelete = () => {
        setModalDelete(prevModalDelete => !prevModalDelete)
        setOpenModal(prevOpenModal => !prevOpenModal)
    }

    const closeModalDelete = () => {
        setModalDelete(prevModalDelete => !prevModalDelete)
    };


    const handleDelete = () => {
        
    }


    return {
        openModalDelete,
        closeModalDelete
    }
}