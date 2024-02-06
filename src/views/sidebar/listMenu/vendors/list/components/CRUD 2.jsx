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
    const [refBody, setRefBody] = useState({
        nameRef: useRef(),
        addressRef: useRef(),
        emailRef: useRef(),
        phone_numberRef: useRef(),
        transaction_typeRef: useRef(),
        idRef: useRef()
    })
    const [dataEdit, setDataEdit] = useState({
        name: '',
        address: '',
        email: '',
        phone_number: '',
        transaction_type: '',
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
                name: 'address',
                ref: refBody.addressRef,
                value: dataEdit.address,
                label: 'Address',
                htmlFor: 'address',
                id: 'address',
                onchange: handleChange,
                placeholder: 'Address',
            },
            {
                element: 'input',
                type: 'email',
                name: 'email',
                ref: refBody.emailRef,
                value: dataEdit.email,
                label: 'Email',
                htmlFor: 'email',
                id: 'email',
                onchange: handleChange,
                placeholder: 'Email',
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
            {
                element: 'select',
                ref: refBody.transaction_typeRef,
                name: 'transaction_type',
                label: 'Transaction type',
                htmlFor: 'transaction-type',
                id: 'transaction-type',
                dataSelect: [
                    {id: 'outbound', name: 'Outbound'},
                    {id: 'inbound', name: 'Inbound'},
                ],
                value: dataEdit.transaction_type,
                onchange: handleChange
            },

        ])
    }, [dataEdit])


    useEffect(() => {
        if(!!responseError) {
            setValidationError(
                {
                    name: responseError?.name?.[0] || '',
                    address: responseError?.address?.[0] || '',
                    email: responseError?.email?.[0] || '',
                    phone_number: responseError?.phone_number?.[0] || '',
                    transaction_type: responseError?.transaction_type?.[0] || '',
                }
            )
        }
    }, [responseError])

    const READ = () => {
        const [data, setData] = useState()

        useEffect(() => {
            const getData = async () => {
                try {
                    const {data, status} = await getApiData('vendors')
                    if(status === 200){
                        const newData = data.map(item => ({
                            id: item.id,
                            name: item.name,
                            address: item.address,
                            email: item.email,
                            'phone number': item.phone_number,
                            'transaction type': item.transaction_type,
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
                labelModal: 'Add vendors',
                labelBtnModal: 'Add new vendors',
                labelBtnSecondaryModal: 'Back',
                handelBtn: () => create()
            })
            setDataEdit({
                name: '',
                address: '',
                email: '',
                phone_number: '',
                transaction_type: '',
                id: ''
            })
            setValidationError(
                {
                    name: '',
                    address: '',
                    email: '',
                    phone_number: '',
                    transaction_type: '',
                }
            )
            setOpenModal(prevOpenModal => !prevOpenModal)
        }

        const create = async () => {
            setLoading(prevLoading => !prevLoading)
            const dataBody = {
                name: refBody.nameRef.current.value,
                address: refBody.addressRef.current.value,
                email: refBody.emailRef.current.value,
                phone_number: refBody.phone_numberRef.current.value,
                transaction_type: refBody.transaction_typeRef.current.value,
            }
            try {
                const {status} = await postApiData('vendors', dataBody)
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
                labelModal: 'Detail & edit vendors',
                labelBtnModal: 'Save',
                labelBtnSecondaryModal: 'Delete',
                handelBtn: edit
            })

            setValidationError(
                {
                    name: '',
                    address: '',
                    email: '',
                    phone_number: '',
                    transaction_type: '',
                }
            )
            setOpenModal(prevOpenModal => !prevOpenModal)
            try {
                const {data, status} = await getApiData('vendors/' + param)
                if(status === 200) {
                    setDataEdit(
                        {
                            name: data.name,
                            address: data.address,
                            email: data.email,
                            phone_number: data.phone_number,
                            transaction_type: data.transaction_type,
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
                address: refBody.addressRef.current.value,
                email: refBody.emailRef.current.value,
                phone_number: refBody.phone_numberRef.current.value,
                transaction_type: refBody.transaction_typeRef.current.value,
            }
            try {
                const {status} = await putApiData('vendors/' + refBody.idRef.current.value, dataBody)
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
              await deleteApiData('vendors/' + idDelete)
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