import { useEffect, useReducer, useState, useRef } from "react"
import { getApiData, postApiData, putApiData, deleteApiData } from "../../../../../../function/Api"



export const CRUD = () => {
    const [openModal, setOpenModal] = useState()
    const [refresh, setRefresh] = useState()
    const [responseError, setResponseError] = useState()
    const [validationError, setValidationError] = useState()
    const [input, setInput] = useState([])
    const [dataModal, setDataModal] = useState({})
    const [modalDelete, setModalDelete] = useState()
    const [idDelete, setIdDelete] = useState()
    const [loading, setLoading] = useState(true)
    const [dataVendors, setDataVendors] = useState()
    const [refBody, setRefBody] = useState({
        nameRef: useRef(),
        positionRef: useRef(),
        phone_numberRef: useRef(),
        vendors_idRef: useRef(),
        idRef: useRef()
    })
    const [dataEdit, setDataEdit] = useState({
        name: '',
        position: '',
        phone_number: '',
        vendors_id: '',
        id: ''
    })



    const handleChange = (event) => {
        // Mendapatkan nama dan nilai input yang berubah
        const { name, value } = event.target;
    
        // Memperbarui state sesuai dengan nilai input yang berubah
        setDataEdit((prevDataEdit) => ({
            ...prevDataEdit,
            [name]: value,
        }));
      
      
    };

    const handleChangeAndGetVendors = async (event) => {
        // Mendapatkan nama dan nilai input yang berubah
        const { name, value } = event.target;
        try {
            const {data, status} = await getApiData('vendors')
            if(status === 200){
                const newData = data.map(item => ({
                    id: item.id,
                    name: item.name
                }))

                setDataVendors(() => newData)
            }
        } catch (error) {
         console.log(error);   
        }
        // Memperbarui state sesuai dengan nilai input yang berubah
        setDataEdit((prevDataEdit) => ({
            ...prevDataEdit,
            [name]: value,
        }));
      
      
    };


    useEffect(() => {
        const getVendors = async () => {
            try {
                const {data, status} = await getApiData('vendors')
                if(status === 200){
                    const newData = data.map(item => ({
                        id: item.id,
                        name: `${item.name} ${item.transaction_type === 'inbound' ? `(Supplier)` : `(Customer)`}`
                    }))

                    setDataVendors(() => newData)
                }
            } catch (error) {
             console.log(error);   
            }
        }
        getVendors()
    }, [])
    

    useEffect(() => {
        setInput([
            {
                element: 'input',
                type: 'text',
                name: 'name',
                ref: refBody.nameRef,
                value: dataEdit.name,
                label: 'Name',
                htmlFor: 'name',
                id: 'name',
                onchange: handleChange,
                placeholder: 'Name',
            },
            {
                element: 'input',
                type: 'text',
                name: 'position',
                ref: refBody.positionRef,
                value: dataEdit.position,
                label: 'Position',
                htmlFor: 'position',
                id: 'position',
                onchange: handleChange,
                placeholder: 'Position',
            },
            {
                element: 'input',
                type: 'text',
                name: 'phone_number',
                ref: refBody.phone_numberRef,
                value: dataEdit.phone_number,
                label: 'Phone number',
                htmlFor: 'phone_number',
                id: 'phone_number',
                onchange: handleChange,
                placeholder: 'Phone number',
            },
            // {
            //     element: 'select',
            //     ref: refBody.vendors_typeRef,
            //     name: 'vendors_type',
            //     label: 'Vendors type',
            //     htmlFor: 'vendors_type',
            //     id: 'vendors_type',
            //     dataSelect: [
            //         {id: 'inbound', name: 'Inbound'},
            //         {id: 'outbound', name: 'Outbound'}
            //     ],
            //     value: dataEdit.vendors_type,
            //     onchange: handleChangeAndGetVendors
            // },
            {
                element: 'select',
                ref: refBody.vendors_idRef,
                name: 'vendors_id',
                label: 'Vendors',
                htmlFor: 'vendors_id',
                id: 'vendors_id',
                dataSelect: dataVendors,
                value: dataEdit.vendors_id,
                onchange: handleChange
            },

        ])
    }, [dataEdit])


    useEffect(() => {
        if(!!responseError) {
            setValidationError(
                {
                    name: responseError?.name?.[0] || '',
                    position: responseError?.position?.[0] || '',
                    phone_number: responseError?.phone_number?.[0] || '',
                    address: responseError?.address?.[0] || '',
                    vendors_id: responseError?.vendors_id?.[0] || '',
                }
            )
        }
    }, [responseError])

    const READ = () => {
        const [data, setData] = useState()

        useEffect(() => {
            const getData = async () => {
                try {
                    const {data, status} = await getApiData('vendor-contacts')
                    if(status === 200){
                        const newData = data.map(item => ({
                            id: item.id,
                            name: item.name,
                            position: item.position,
                            'phone number': item.phone_number,
                            vendors: item.vendor.name
                        }))

                        setData(() => newData)
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            getData()
        }, [refresh])

        return {
            data
        }
    }


    const CREATE = () => {
        const handleCreate = () => {
            setDataModal({
                labelModal: 'Add contacts',
                labelBtnModal: 'Add new contacts',
                labelBtnSecondaryModal: 'Back',
                handelBtn: () => create()
            })
            setDataEdit({
                name: '',
                position: '',
                phone_number: '',
                vendors_id: '',
                id: ''
            })
            setValidationError(
                {
                    name: '',
                    position: '',
                    phone_number: '',
                    address: '',
                    vendors_id: '',
                }
            )
            setOpenModal(prevOpenModal => !prevOpenModal)
        }

        const create = async () => {
            setLoading(prevLoading => !prevLoading)
            const dataBody = {
                name: refBody.nameRef.current.value,
                position: refBody.positionRef.current.value,
                phone_number: refBody.phone_numberRef.current.value,
                vendors_id: refBody.vendors_idRef.current.value,
            }
            try {
                const {status} = await postApiData('vendor-contacts', dataBody)
                if(status === 201) {
                    setLoading(prevLoading => !prevLoading)
                    setRefresh(!refresh)
                    setOpenModal(prevOpenModal => !prevOpenModal)
                }
            } catch (error) {
                setLoading(prevLoading => !prevLoading)
                setResponseError(error.response.data.errors)
            }
        }


        return {
            handleCreate,
            create
        }
    }


    const EDIT = () => {
        const handleEdit = async (param) => {
            setDataModal({
                labelModal: 'Detail & edit contacts',
                labelBtnModal: 'Save',
                labelBtnSecondaryModal: 'Delete',
                handelBtn: edit
            })

            setValidationError(
                {
                    name: '',
                    position: '',
                    phone_number: '',
                    address: '',
                    vendors_id: '',
                }
            )
            setOpenModal(prevOpenModal => !prevOpenModal)
            try {
                const {data, status} = await getApiData('vendor-contacts/' + param)
                if(status === 200) {
                    setDataEdit(
                        {
                            name: data.name,
                            position: data.position,
                            phone_number: data.phone_number,
                            vendors_id: data.vendors_id,
                            id: data.id
                        }
                    )
                    setIdDelete(data.id)
                }
            } catch (error) {
                console.log(error);
            }
        }

        const edit = async () => {
            setLoading(prevLoading => !prevLoading)
            const dataBody = {
                name: refBody.nameRef.current.value,
                position: refBody.positionRef.current.value,
                phone_number: refBody.phone_numberRef.current.value,
                vendors_id: refBody.vendors_idRef.current.value,
            }
            try {
                const {status} = await putApiData('vendor-contacts/' + refBody.idRef.current.value, dataBody)
                if(status === 201) {
                    setLoading(prevLoading => !prevLoading)
                    setRefresh(!refresh)
                    setOpenModal(prevOpenModal => !prevOpenModal)
                }
            } catch (error) {
                setLoading(prevLoading => !prevLoading)
                setResponseError(error.response.data.errors)
            }
        }


        return {
            handleEdit,
            edit
        }
    }

    const DELETE = () => {
        const openModalDelete = () => {
            setModalDelete(!modalDelete)
            setOpenModal(prevOpenModal => !prevOpenModal)
        }
    
    
        const closeModalDelete = () => {
            setModalDelete(!modalDelete)
          }
    
    
          const handleDelete = async () => {
            setLoading(prevLoading => !prevLoading)
            try {
              await deleteApiData('vendor-contacts/' + idDelete)
              setRefresh(!refresh)
                closeModalDelete()
                setLoading(prevLoading => !prevLoading)
            } catch (error) {
              console.log(error.response);
            }
          }


        return {
            openModalDelete,
            closeModalDelete,
            handleDelete
        }
    }

    const {data} = READ()
    const {handleCreate, create} = CREATE()
    const {handleEdit, edit} = EDIT()
    const {openModalDelete, closeModalDelete, handleDelete} = DELETE()

    return {
        data,
        handleCreate,
        create,
        openModal,
        dataModal,
        input,
        refBody,
        dataEdit,
        validationError,
        edit,
        handleEdit,
        openModalDelete,
        closeModalDelete,
        handleDelete,
        modalDelete,
        loading
    }
}