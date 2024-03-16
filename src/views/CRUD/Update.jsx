import { putApiData } from "../../function/Api";

export const Update = ({
    endPoint,
    dataBody,
    setOpenModal,
    setResponseError,
    setLoading,
    setRefresh
}) => {
    const update = async () => {
        try {
            const {data, status} = await putApiData(endPoint, dataBody)
            if(status === 201){
                setRefresh(prevRefresh => !prevRefresh)
                setOpenModal(prevOpenModal => !prevOpenModal)
                setLoading(prevloading => !prevloading)
            }
        } catch (error) {
            setResponseError(error.response.data.errors);
            setLoading(prevloading => !prevloading)
        }
    }

    update()
}