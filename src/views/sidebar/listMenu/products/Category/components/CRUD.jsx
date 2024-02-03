import { useState, useRef, useEffect } from "react";
import { getApiData, postApiData, putApiData, deleteApiData } from "../../../../../../function/Api";


export const CRUD = () => {
    const [openModal, setOpenModal] = useState()
    const [dataModal, setDataModal] = useState({})
    const [input, setInput] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [responseError, setResponseError] = useState()
    const [validationError, setValidationError] = useState()
    const [modalDelete, setModalDelete] = useState()
    const [idDelete, setIdDelete] = useState()
    const [dataEdit, setDataEdit] = useState({
        name: '',
        description: '',
        id: ''
    })
    const [refBody, setRefBody] = useState({
        nameRef: useRef(),
        descriptionRef: useRef(),
        idRef: useRef()
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
        ])
    }, [dataEdit])


    useEffect(() => {
        if(!!responseError) {
            setValidationError(
                {
                    name: responseError?.name?.[0] || '',
                    description: responseError?.description?.[0] || '',
                }
            )
        }
    }, [responseError])


    const READ = () => {
        const [data, setData] = useState()
        useEffect(() => {
            const getData = async () => {
                try {
                    const {data, status} = await getApiData('product-categories') 
                    if(status === 200) {
                        const newData = data.map(item => ({
                            id: item.id,
                            name: item.name,
                            description: item.description
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
                labelModal: 'Add category',
                labelBtnModal: 'Add new category',
                labelBtnSecondaryModal: 'Back',
                handelBtn: () => create()
            })
            setDataEdit({
                name: '',
                description: '',
                id: ''
            })
            setValidationError(
                {
                    name: '',
                    description: ''
                }
            )
            setOpenModal(prevOpenModal => !prevOpenModal)
        }

        const create = async () => {
            const dataBody = {
                name: refBody.nameRef.current.value,
                description: refBody.descriptionRef.current.value
            }
            try {
                const {status} = await postApiData('product-categories', dataBody)
                if(status === 201) {
                    setRefresh(!refresh)
                    setOpenModal(prevOpenModal => !prevOpenModal)
                }
            } catch (error) {
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
                labelModal: 'Detail & edit category',
                labelBtnModal: 'Save',
                labelBtnSecondaryModal: 'Delete',
                handelBtn: edit
            })

            setValidationError(
                {
                    name: '',
                    description: ''
                }
            )
            setOpenModal(prevOpenModal => !prevOpenModal)
            try {
                const {data, status} = await getApiData('product-categories/' + param)
                if(status === 200) {
                    setDataEdit(
                        {
                            name: data.name,
                            description: data.description,
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
            const dataBody = {
                name: refBody.nameRef.current.value,
                description: refBody.descriptionRef.current.value
            }
            try {
                const {status} = await putApiData('product-categories/' + refBody.idRef.current.value, dataBody)
                if(status === 201) {
                    setRefresh(!refresh)
                    setOpenModal(prevOpenModal => !prevOpenModal)
                }
            } catch (error) {
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
            try {
              await deleteApiData('product-categories/' + idDelete)
              setRefresh(!refresh)
                closeModalDelete()
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

    return{
        data,
        handleCreate,
        create,
        openModal,
        dataModal,
        input,
        refBody,
        validationError,
        handleEdit,
        edit,
        dataEdit,
        handleChange,
        openModalDelete,
        closeModalDelete,
        handleDelete,
        modalDelete,
        idDelete,
    }
}