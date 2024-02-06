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
    const [dataProducts, setDataProducts] = useState()
    const [refBody, setRefBody] = useState({
        amountRef: useRef(),
        product_idRef: useRef(),
        unit_priceRef: useRef(),
        total_priceRef: useRef(),
        taxesRef: useRef(),
        shipping_costRef: useRef(),
        vendors_idRef: useRef(),
        idRef: useRef()
    })
    const [dataEdit, setDataEdit] = useState({
        amount: '',
        product_id: '',
        unit_price: '',
        total_price: '',
        taxes: '',
        shipping_cost: '',
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

        const getProduct = async () => {
            try {
                const {data, status} =  await getApiData('products')
                if(status === 200) {
                    const newData = data.map(item => ({
                        id: item.id,
                        name: item.name
                    }))

                    setDataProducts(() => newData)
                }
            } catch (error) {
                console.log(error);
            }
        }
        getProduct()
    }, [])
    

    useEffect(() => {
        setInput([
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
            {
                element: 'input',
                type: 'number',
                name: 'amount',
                ref: refBody.amountRef,
                value: dataEdit.amount,
                label: 'Amount',
                htmlFor: 'amount',
                id: 'amount',
                onchange: handleChange,
                placeholder: 'Amount',
            },
            {
                element: 'select',
                ref: refBody.product_idRef,
                name: 'product_id',
                label: 'Product',
                htmlFor: 'product_id',
                id: 'product_id',
                dataSelect: dataProducts,
                value: dataEdit.product_id,
                onchange: handleChange
            },
            {
                element: 'input',
                type: 'number',
                name: 'unit_price',
                ref: refBody.unit_priceRef,
                value: dataEdit.unit_price,
                label: 'Unit price',
                htmlFor: 'unit_price',
                id: 'unit_price',
                onchange: handleChange,
                placeholder: 'Unit price',
            },
            {
                element: 'input',
                type: 'number',
                name: 'total_price',
                ref: refBody.total_priceRef,
                value: dataEdit.total_price,
                label: 'Total price',
                htmlFor: 'total_price',
                id: 'total_price',
                onchange: handleChange,
                placeholder: 'Total price',
            },
            {
                element: 'input',
                type: 'number',
                name: 'taxes',
                ref: refBody.taxesRef,
                value: dataEdit.taxes,
                label: 'Taxes',
                htmlFor: 'taxes',
                id: 'taxes',
                onchange: handleChange,
                placeholder: 'Taxes',
            },
            {
                element: 'input',
                type: 'number',
                name: 'shipping_cost',
                ref: refBody.shipping_costRef,
                value: dataEdit.shipping_cost,
                label: 'Shipping cost',
                htmlFor: 'shipping_cost',
                id: 'shipping_cost',
                onchange: handleChange,
                placeholder: 'Shipping cost',
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

        ])
    }, [dataEdit])


    useEffect(() => {
        if(!!responseError) {
            setValidationError(
                {
                    amount: responseError?.amount?.[0] || '',
                    vendors_id: responseError?.vendors_id?.[0] || '',
                    unit_price: responseError?.unit_price?.[0] || '',
                    total_price: responseError?.total_price?.[0] || '',
                    taxes: responseError?.taxes?.[0] || '',
                    shipping_cost: responseError?.shipping_cost?.[0] || '',
                    product_id: responseError?.product_id?.[0] || '',
                }
            )
        }
    }, [responseError])

    const READ = () => {
        const [data, setData] = useState()

        useEffect(() => {
            const getData = async () => {
                try {
                    const {data, status} = await getApiData('vendor-transactions')
                    if(status === 200){
                        const newData = data.map(item => ({
                            id: item.id,
                            vendor: item.vendor.name,
                            amount: item.amount,
                            product: item.product.name,
                            'unit price': item.unit_price,
                            'total price': item.total_price,
                            'taxes': item.taxes,
                            'shipping cost': item.shipping_cost,
                            'unit of measure': item.product.unit_of_measure ?? '--'
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
                amount: '',
                product_id: '',
                unit_price: '',
                total_price: '',
                taxes: '',
                shipping_cost: '',
                vendors_id: '',
                id: ''
            })
            // setValidationError(
            //     {
            //         name: '',
            //         position: '',
            //         phone_number: '',
            //         address: '',
            //         vendors_id: '',
            //     }
            // )
            setOpenModal(prevOpenModal => !prevOpenModal)
        }

        const create = async () => {
            setLoading(prevLoading => !prevLoading)
            const dataBody = {
               amount: refBody.amountRef.current.value,
               vendors_id: refBody.vendors_idRef.current.value,
               product_id: refBody.product_idRef.current.value,
               unit_price: refBody.unit_priceRef.current.value,
               total_price: refBody.total_priceRef.current.value,
               taxes: refBody.taxesRef.current.value,
               shipping_cost: refBody.shipping_costRef.current.value,
                
            }
            try {
                const {status} = await postApiData('vendor-transactions', dataBody)
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