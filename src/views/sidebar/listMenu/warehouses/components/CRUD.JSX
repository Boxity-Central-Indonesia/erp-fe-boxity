import { useEffect, useRef, useState } from "react";
import { getApiData, postApiData, putApiData, deleteApiData } from "../../../../../function/Api";


export const CRUD = () => {
    const [openModal, setOpenModal] = useState();
    const [dataModal, setDataModal] = useState({})
    const [input, setInput] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [responseError, setResponseError] = useState()
    const [validationError, setValidationError] = useState()
    const [idDelete, setIdDelete] = useState()
    const [modalDelete, setModalDelete] = useState()
    const [refBody, setRefBody] = useState({
        nameRef: useRef(),
        addressRef: useRef(),
        capacityRef: useRef(),
        idRef: useRef()
    })
    const [dataEdit, setDataEdit] = useState({
        name: '',
        address: '',
        capacity: '',
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

    // handel validation error

    useEffect(() => {
        if(!!responseError) {
            setValidationError(
                {
                    name: responseError?.name?.[0] || '',
                    address: responseError?.address?.[0] || '',
                    capacity: responseError?.capacity?.[0] || ''
                }
            )
        }
    }, [responseError])

    // handel validation error end

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
                type: 'number',
                name: 'capacity',
                ref: refBody.capacityRef,
                value: dataEdit.capacity,
                label: 'Capacity',
                htmlFor: 'capacity',
                id: 'capacity',
                onchange: handleChange,
                placeholder: 'Capacity',
            },
        ])
    }, [dataEdit])


    const READ = () => {
        const [data, setData] = useState()

        useEffect(() => {
            const getData = async () => {
                try {
                    const {data} = await getApiData('warehouses')
                    const newData = data.map(item => ({
                        id: item.id,
                        name: item.name,
                        address: item.address,
                        capacity: item.capacity
                    }))
                    setData(newData)
                } catch (error) {
                    console.log(error);
                }
            }

            getData()
        }, [refresh])

        return {data}
    }



    const CREATE = () => {
       
        const handleCreate = () => {
            setDataModal({
                labelModal: 'Add warehouses',
                labelBtnModal: 'Add new warehouses',
                labelBtnSecondaryModal: 'Back',
                handelBtn: () => create()
            })
            setDataEdit(
                {
                    name: '',
                    address: '',
                    capacity: '',
                }
            )
            setValidationError(
                {
                    name: '',
                    address: '',
                    capacity: ''
                }
            )
            setOpenModal(prevOpenModal => !prevOpenModal)

            const create = async () => {
                const dataBody = {
                    name: refBody.nameRef.current.value,
                    address: refBody.addressRef.current.value,
                    capacity: refBody.capacityRef.current.value
                }

                try {
                    const store = await postApiData('warehouses', dataBody)
                    if(store.status === 201){
                        setRefresh(!refresh)
                        setOpenModal(prevOpenModal => !prevOpenModal)
                    }
                } catch (error) {
                    setResponseError(error.response.data)
                }
            }
        }



        return {
            handleCreate,
        }
    }



    const EDIT = () => {
        const handleEdit = async (param) => {
            setDataModal({
                labelModal: 'Detail & edit warehouses',
                labelBtnModal: 'Save',
                labelBtnSecondaryModal: 'Delete',
                handelBtn: edit
            })

            setValidationError(
                {
                    name: '',
                    address: '',
                    capacity: ''
                }
            )

            setOpenModal(prevOpenModal => !prevOpenModal)
            try {
                const response = await getApiData('warehouses/' + param)
                if(response.status === 200){
                    setDataEdit(
                        {
                            name: response.data.name,
                            address: response.data.address,
                            capacity: response.data.capacity,
                            id: response.data.id
                        }
                    )
                    setIdDelete(response.data.id)
                } 
            } catch (error) {
                console.log(error);
            }
        } 

        const edit = async () => {
            const dataBody = {
                name: refBody.nameRef.current.value,
                address: refBody.addressRef.current.value,
                capacity: refBody.capacityRef.current.value
            }
            try {
                const put = await putApiData('warehouses/' + refBody.idRef.current.value, dataBody )
                if(put.status === 201) {
                    setRefresh(!refresh)
                    setOpenModal(prevOpenModal => !prevOpenModal)
                }
            } catch (error) {
                setResponseError(error.response.data)
            }
        }


        return {
            handleEdit
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
    
    
          const handelDelete = async () => {
            try {
              await deleteApiData('warehouses/' + idDelete)
              setRefresh(!refresh)
                closeModalDelete()
            } catch (error) {
              console.log(error.response);
            }
          }


        return {
            openModalDelete,
            closeModalDelete,
            handelDelete
        }
    }


    const {data} = READ()
    const {handleCreate} = CREATE()
    const {handleEdit} = EDIT()
    const {openModalDelete, closeModalDelete, handelDelete} = DELETE()
    
    return{
        data,
        openModal,
        handleCreate,
        dataModal,
        input,
        validationError,
        handleEdit,
        refBody,
        dataEdit,
        idDelete,
        modalDelete,
        openModalDelete,
        closeModalDelete,
        handelDelete,
    }
}