import { putApiData } from "../../function/Api";
import { useState } from "react";

export const Update = ({
    endPoint,
    dataBody,
    setOpenModal,
    setResponseError,
    setLoading,
    setRefresh,
    setDataUpdate
}) => {
    const update = async () => {
        try {
            const {data, status} = await putApiData(endPoint, dataBody)
            if(status === 201){
                setRefresh(prevRefresh => !prevRefresh)
                setOpenModal(prevOpenModal => !prevOpenModal)
                setLoading(prevloading => !prevloading)
                setDataUpdate(data.id)
            }
        } catch (error) {
            setResponseError(error.response.data.errors);
            setLoading(prevloading => !prevloading)
        }
    }

    update()
}