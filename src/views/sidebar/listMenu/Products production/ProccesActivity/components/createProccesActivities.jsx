import { Create } from "../../../../../CRUD/Create"


export const createProccesActivities = ({
    endPoint,
    refBody, 
    responseError, 
    setResponseError, 
    setLoading,
    loading,
    refresh,
    setRefresh,
    setOpenModal
}) => {
    const dataBody = {
        order_id: refBody.order_idRef.current.value,
    };

    setLoading(!loading)

    Create({
        endPoint, 
        dataBody, 
        setResponseError,
        setLoading,
        loading,
        refresh,
        setRefresh,
        setOpenModal
    })
}