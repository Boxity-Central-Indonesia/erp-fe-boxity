import { useEffect, useState, useRef} from "react"
import { getApiData, postApiData, putApiData, deleteApiData } from "../../../../../../function/Api"



export const CRUD = () => {
    const [openModal, setOpenModal] = useState(false)
    const [input, setInput] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [dataModal, setDataModal] = useState({})
    const [responseError, setResponseError] = useState()
    const [dataWarehouse, setDataWarehouse] = useState()
    const [validationError, setValidationError] = useState()
    const [loading, setLoading] = useState(true)
    const [idDelete, setIdDelete] = useState()
    const [modalDelete, setModalDelete] = useState()
    const [dataEdit, setDataEdit] = useState({
        number: '',
        capacityRef: '',
        warehouse_id: '',
        id: ''
    })
    const [refBody, setRefBody] = useState({
        numberRef: useRef(),
        capacityRef: useRef(),
        warehouse_idRef: useRef(),
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
                name: 'number',
                ref: refBody.numberRef,
                value: dataEdit.number,
                label: 'Number',
                htmlFor: 'number',
                id: 'number',
                onchange: handleChange,
                placeholder: 'Number',
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
            {
                element: 'select',
                ref: refBody.warehouse_idRef,
                name: 'warehouse_id',
                label: 'Warehouses',
                htmlFor: 'categori-warehouses',
                id: 'categori-warehouses',
                dataSelect: dataWarehouse,
                value: dataEdit.warehouse_id,
                onchange: handleChange
            },
        ])
    }, [dataEdit])


    useEffect(() => {
        if(!!responseError) {
            setValidationError({
                number: responseError?.number?.[0] || '',
                capacity: responseError?.capacity?.[0] || '',
                warehouse_id: responseError?.warehouse_id?.[0] || ''
            })
        }
    }, [responseError])


    const READ = () => {
        const [data, setData] = useState()
        useEffect(() => {
            const getData = async () => {
                try {
                    const {data, status} = await getApiData('warehouse-locations')
                    if(status === 200) {
                        const newData = data.map(item => ({
                            'id': item.id,
                            'number': item.number,
                            'capacity': item.capacity,
                            'warehouse': item.warehouse.name
                        }))
                        setData(() => newData)
                    }
                } catch (error) {
                    console.log(error);
                }
            }
    
            getData()
        }, [refresh])


        useEffect(() => {
            const getWarehouse = async () => {
                try {
                    const {data, status} = await getApiData('warehouses')
                    if(status === 200) {
                        const newData = data.map(item => ({
                            id: item.id,
                            name: item.name
                        }))
                        setDataWarehouse(() => newData)
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            getWarehouse()
        }, [])
        
        return {
            data,
        }
    }


    const CREATE = () => {
        const handleCreate = () => {
            setDataModal({
                labelModal: 'Add location',
                labelBtnModal: 'Add new location',
                labelBtnSecondaryModal: 'Back',
                handelBtn: () => create()
            })
            setDataEdit({
                number: '',
                capacity: '',
                warehouse_id: '',
                id: ''
            })
            setValidationError(
                {
                    number: '',
                    capacity: '',
                    warehouse_id: '',
                }
            )
            setOpenModal(prevOpenModal => !prevOpenModal)
        }

        const create = async () => {
            setLoading(() => !loading); // Mengatur loading menjadi true saat memulai permintaan
            const dataBody = {
                number: refBody.numberRef.current.value,
                capacity: refBody.capacityRef.current.value,
                warehouse_id: refBody.warehouse_idRef.current.value
            }
            try {
                const { status } = await postApiData('warehouse-locations', dataBody);
                if (status === 201) {
                    setRefresh(prevRefresh => !prevRefresh); // Menggunakan callback untuk menjamin nilai yang diperbarui
                    setOpenModal(prevOpenModal => !prevOpenModal);
                    setLoading(prevLoading => !prevLoading); // Mengatur loading menjadi true saat memulai permintaan
                }
            } catch (error) {
                console.log(error);
                setResponseError(error.response.data.errors);
                setLoading(prevLoading => !prevLoading); // Mengatur loading menjadi true saat memulai permintaan
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
                labelModal: 'Detail & edit location',
                labelBtnModal: 'Save',
                labelBtnSecondaryModal: 'Delete',
                handelBtn: edit
            })

            setValidationError({
                number: '',
                capacity: '',
                warehouse_id: ''
            })
            setOpenModal(prevOpenModal => !prevOpenModal)
            try {
                const {data, status} = await getApiData('warehouse-locations/' + param)
                if(status === 200) {
                    setDataEdit(
                        {
                            'id': data.id,
                            'number': data.number,
                            'capacity': data.capacity,
                            'warehouse_id': data.warehouse_id     
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
                number: refBody.numberRef.current.value,
                capacity: refBody.capacityRef.current.value,
                warehouse_id: refBody.warehouse_idRef.current.value
            }
            try {
                const {status} = await putApiData('warehouse-locations/' + refBody.idRef.current.value, dataBody)
                if(status === 201) {
                    setRefresh(!refresh)
                    setOpenModal(prevOpenModal => !prevOpenModal)
                    setLoading(prevLoading => !prevLoading)
                }
            } catch (error) {
                setResponseError(error.response.data.errors)
                setLoading(prevLoading => !prevLoading)
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
              await deleteApiData('warehouse-locations/' + idDelete)
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
    const {handleCreate,create} = CREATE()
    const {handleEdit, edit} = EDIT()
    const {openModalDelete, closeModalDelete, handleDelete} = DELETE()

    return {
        data,
        input,
        dataModal,
        handleCreate,
        create,
        openModal,
        dataModal,
        validationError,
        loading,
        idDelete,
        handleEdit,
        edit,
        refBody,
        dataEdit,
        openModalDelete,
        closeModalDelete,
        handleDelete,
        modalDelete
    }
}