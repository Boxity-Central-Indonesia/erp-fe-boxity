import { ReadCompany } from "./ReadCompany"
import { useState, useEffect } from "react"
import { modalCompany } from "./modalCompany"
import { editCompany } from "./EditCompany"


export const index = () => {
    const [dataHeading, setDataHeading] = useState([])
    const [defaultEdit, setDefaultEdit] = useState(true);
    const [data, setData] = useState('');
    const [dataDetail, setDataDetail] = useState({})

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
   

        ReadCompany({
            refresh, 
            setDataHeading, 
            setOpenModal, 
            openModal,
            data,
            setData,
            setParameter
        })


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
        dataDetail
    }
}