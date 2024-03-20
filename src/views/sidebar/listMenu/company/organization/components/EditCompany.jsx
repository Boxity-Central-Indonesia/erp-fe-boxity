import { Read } from "../../../../../CRUD/Read"
import { Update } from "../../../../../CRUD/Update"


export const editCompany = ({
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
    setRefresh
}) => {

    const handleEdit = (param) => {
      if(defaultEdit === true) {
        setDefaultEdit(false)
        Read({
            endPoint: 'companies/' + param.textContent, 
            refresh,
            setDataDetail
        })
      }else if(defaultEdit === false){
        setOpenModal(prevOpenModal => !prevOpenModal)
        setDataModal(
            {
                size: "6xl",
                labelModal: "Edit companies",
                labelBtnModal: "Save",
                labelBtnSecondaryModal: "Delete",
                handleBtn: edit
            }
        )
        if(Object.keys(dataDetail).length > 0) {
            setDataEdit({
                name: dataDetail.name,
                email: dataDetail.email,
                phone_number: dataDetail.phone_number,
                website: dataDetail.website ?? "--",
                address: dataDetail.address,
                city: dataDetail.city,
                province: dataDetail.province,
                postal_code: dataDetail.postal_code,
                country: dataDetail.country,
                industry: dataDetail.industry,
                description: dataDetail.description ?? '--',
                id: dataDetail.id,
                company_id: dataDetail.id,
            });
        }
        
      }
    }


    const edit = () => {
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

        setLoading(prevLoading => !prevLoading)

        Update({
            endPoint: 'companies/' + refBody.idRef.current.value, 
            dataBody,
            setOpenModal,
            setResponseError,
            setLoading,
            setRefresh
        })

        Read({
            endPoint: 'companies/' + refBody.idRef.current.value, 
            refresh,
            setDataDetail
        })
    }


    return {
        handleEdit
    }
}
