import {deleteApiData} from "../../function/Api"



export const Delete = ({
    endPoint,
    dataBody,
    setOpenModal,
    setResponseError,
    setLoading,
    setRefresh
}) => {
    const destroy = async () => {
        try {
            await deleteApiData(endPoint)
        } catch (error) {
            console.log(error);
        }
    }
    destroy()
}