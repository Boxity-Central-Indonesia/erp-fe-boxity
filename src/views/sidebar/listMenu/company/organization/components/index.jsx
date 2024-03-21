import { ReadCompany } from "./ReadCompany"
import { useState, useEffect } from "react"
import { modalCompany } from "./modalCompany"
import { editCompany } from "./EditCompany"
import { DeleteCompany } from "./DeleteCompany"


export const index = () => {
    const [dataHeading, setDataHeading] = useState([])
    const [defaultEdit, setDefaultEdit] = useState(true);
    const [data, setData] = useState('');
    const [dataDetail, setDataDetail] = useState({})
    // const [openModalDelete, setOpenModalDelete] = useState(false)
    const [modalDelete, setModalDelete] = useState();


    // modal company

    const {
        setDataModal,
        dataModal,
        setOpenModal,
        openModal,
        dataModalBody,
        loading,
        refresh,
        setRefresh,
        setDataEdit,
        refBody,
        setResponseError,
        setLoading,
        setParameter
    } = modalCompany({defaultEdit, setDefaultEdit})

    // modal company end
   

    // read company

    ReadCompany({
        refresh, 
        setDataHeading, 
        setOpenModal, 
        openModal,
        data,
        setData,
        setParameter
    })

    // read company end

    const {
        handleEdit
    } = editCompany({
        setDefaultEdit, 
        refresh, 
        setRefresh,
        setDataDetail,
        dataDetail,
        defaultEdit,
        setOpenModal,
        setDataModal,
        setDataEdit,
        refBody,
        setResponseError,
        setLoading
    })

    // delete company

    const {
        openModalDelete,
        closeModalDelete
    } = DeleteCompany({
        setModalDelete,
        setOpenModal
    })

    // delete company end
    
    
    return{
        data,
        dataHeading,
        dataModal,
        openModal,
        setOpenModal,
        dataModalBody,
        loading,
        defaultEdit,
        setDefaultEdit,
        handleEdit,
        dataDetail,
        modalDelete,
        openModalDelete,
        closeModalDelete
    }
}