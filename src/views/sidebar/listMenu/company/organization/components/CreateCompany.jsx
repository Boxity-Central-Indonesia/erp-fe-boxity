import {Create} from '../../../../../CRUD/Create'

export const createCompany = ({
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
        name: refBody.nameRef.current.value,
        email: refBody.emailRef.current.value,
        phone_number: refBody.phone_numberRef.current.value,
        website: refBody.websiteRef.current.value,
        address: refBody.addressRef.current.value,
        city: refBody.cityRef.current.value,
        province: refBody.provinceRef.current.value,
        postal_code: refBody.postal_codeRef.current.value,
        country: refBody.countryRef.current.value,
        industry: refBody.industryRef.current.value,
        description: refBody.descriptionRef.current.value,
    }


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