import { useEffect, useState, useRef} from "react"
import { getApiData } from "../../../../../../function/Api"



export const CRUD = () => {
    const [openModal, setOpenModal] = useState(false)
    const [input, setInput] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [dataModal, setDataModal] = useState({})
    const [responseError, setResponseError] = useState()
    const [validationError, setValidationError] = useState()
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
                name: 'warehouses_id',
                label: 'Warehouses',
                htmlFor: 'categori-warehouses',
                id: 'categori-warehouses',
                // dataSelect: dataWarehouses,
                value: dataEdit.warehouse_id,
                // onchange: handleChangeAndGetDepartment
            },
        ])
    }, [dataEdit])

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

        return {
            data
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
            const dataBody = {
                nnumberme: refBody.nameRef.current.value,
                capacity: refBody.descriptionRef.current.value
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


    const {data} = READ()
    const {handleCreate,create} = CREATE()

    return {
        data,
        input,
        dataModal,
        handleCreate,
        create,
        openModal,
        dataModal
    }
}