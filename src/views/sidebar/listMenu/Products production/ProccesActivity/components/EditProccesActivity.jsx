import { useEffect, useState } from "react"
import { Read } from "../../../../../CRUD/Read"
import { Update } from "../../../../../CRUD/Update"


export const editProccesActivity = ({
    setDefaultEdit,
    refresh,
    setDataDetail,
    dataDetail,
    defaultEdit,
    setOpenModal,
    setDataModal,
    setDataEdit,
    refBody,
    setResponseError,
    setLoading,
    setRefresh,
    setIdDelete,
    dataProcces,
    setDataFindProcces,
    setDataDetailsActivity
}) => {

  const searchDataByActivityType = (searchActivityType) => {
    // Cari objek yang memiliki activity_type yang cocok
    const foundData = dataProcces.find(data => data.activity_type === searchActivityType);

    // Jika objek ditemukan, kembalikan objek tersebut
    if (foundData) {
        return foundData;
    } else {
        // Jika tidak ditemukan, kembalikan null atau pesan kesalahan sesuai kebutuhan
        return null; // atau throw new Error('Data not found');
    }
  };

  const handleEdit = (param) => {
    if(defaultEdit === true) {
      setDefaultEdit(false)
      Read({
          endPoint: 'processing-activities/' + param.textContent, 
          refresh,
          setDataDetail
      })
    }else if(defaultEdit === false){
      setOpenModal(prevOpenModal => !prevOpenModal)
      setDataFindProcces(searchDataByActivityType(dataDetail.activity_type).details);
      setDataDetailsActivity(dataDetail.details);
      setDataModal(
          {
              size: "2xl",
              labelModal: "Edit procces activity",
              labelBtnModal: "Save",
              labelBtnSecondaryModal: "Delete",
              handleBtn: edit
          }
      )
      if(Object.keys(dataDetail).length > 0) {
          setDataEdit({
            order_id: dataDetail.order_id,
            product_id: dataDetail.product_id,
            activity_type: dataDetail.activity_type,
            description: dataDetail.details.description,
            id: dataDetail.id,
          });

          setIdDelete(dataDetail.id)
      }
      
    }
  }

  const edit = () => {
    if(defaultEdit === false){
      const dataBody = {
          order_id: refBody.order_idRef.current.value,
          product_id: refBody.product_idRef.current.value,
          activity_type: refBody.activity_typeRef.current.value,
          details: JSON.parse(localStorage.getItem('dataDetailsActivity'))
        };


        setLoading(prevLoading => !prevLoading)

        Update({
            endPoint: 'processing-activities/' + refBody.idRef.current.value, 
            dataBody,
            setOpenModal,
            setResponseError,
            setLoading,
            setRefresh
        })

        localStorage.removeItem("dataDetailsActivity")

        Read({
            endPoint: 'processing-activities/' + refBody.idRef.current.value, 
            refresh,
            setDataDetail
        })
  }
  }
  
  return {
    handleEdit,
  }
}