import { useState, useEffect, useRef } from "react"
import { getApiData, postApiData, putApiData,  deleteApiData } from "../../../../../../function/Api"

export const CRUD = () => {
    const [openModal, setOpenModal] = useState()
    const [dataModal, setDataModal] = useState({})
    const [input, setInput] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [responseError, setResponseError] = useState()
    const [validationError, setValidationError] = useState()
    const [modalDelete, setModalDelete] = useState()
    const [idDelete, setIdDelete] = useState()
    const [loading, setLoading] = useState(true)
    const [dataVendor, setDataVendor] = useState()
    const [dataProductId, setDataProductId] = useState()
    const [dataWarehouse, setDataWarehouse] = useState()
    const [dataEdit, setDataEdit] = useState({
       vendor_id: '',
       product_id: '',
       warehouse_id: '',
       status: '',
       details: '',
       quantity: '',
       price_per_unit: '',
       taxes: '',
       shipping_cost: '',
       total_price: '',
       order_type: '',
       id: ''
    })
    const [refBody, setRefBody] = useState({
        vendor_idRef: useRef(),
        product_idRef: useRef(),
        warehouse_idRef: useRef(),
        statusRef: useRef(),
        detailsRef: useRef(),
        quantityRef: useRef(),
        price_per_unitRef: useRef(),
        taxesRef: useRef(),
        shipping_costRef: useRef(),
        order_typeRef: useRef(),
        total_priceRef: useRef(),
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
                element: 'select',
                name: 'vendor_id',
                ref: refBody.vendor_idRef,
                value: dataEdit.vendor_id,
                label: 'Vendor',
                htmlFor: 'vendor_id',
                id: 'vendor_id',
                dataSelect: dataVendor,
                onchange: handleChange
            },
            {
                element: 'select',
                name: 'product_id',
                ref: refBody.product_idRef,
                value: dataEdit.product_id,
                label: 'Product',
                htmlFor: 'product_id',
                id: 'product_id',
                dataSelect: dataProductId,
                onchange: handleChange
            },
            {
                element: 'select',
                name: 'warehouse_id',
                ref: refBody.warehouse_idRef,
                value: dataEdit.warehouse_id,
                label: 'Warehouse',
                htmlFor: 'warehouse_id',
                id: 'warehouse_id',
                dataSelect: dataWarehouse,
                onchange: handleChange
            },
            {
                element: 'select',
                name: 'status',
                ref: refBody.statusRef,
                value: dataEdit.status,
                label: 'Staatus',
                htmlFor: 'status',
                id: 'status',
                dataSelect: [
                    {value: 'pending', name: 'pending'},
                    {value: 'completed', name: 'completed'},
                    {value: 'cancelled', name: 'cancelled'},
                ],
                onchange: handleChange
            },
            {
                element: 'input',
                type: 'number',
                name: 'quantity',
                ref: refBody.quantityRef,
                value: dataEdit.quantity,
                label: 'Quantity',
                htmlFor: 'quantity',
                id: 'quantity',
                onchange: handleChange,
                placeholder: 'Quantity',
            },
            {
                element: 'input',
                type: 'number',
                name: 'price_per_unit',
                ref: refBody.price_per_unitRef,
                value: dataEdit.price_per_unit,
                label: 'Price per unit',
                htmlFor: 'price_per_unit',
                id: 'price_per_unit',
                onchange: handleChange,
                placeholder: 'Price per unit',
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
                name: 'order_type',
                ref: refBody.order_typeRef,
                value: dataEdit.order_type,
                label: 'Order type',
                htmlFor: 'order_type',
                id: 'order_type',
                onchange: handleChange,
                placeholder: 'Order type',
            },
            
        ])
    }, [dataEdit])

    useEffect(() => {
        if(!!responseError) {
            setValidationError(
                {
                    type: responseError?.type?.[0] || '',
                    vendor_id: responseError?.vendor_id?.[0] || '',
                    product_id: responseError?.product_id?.[0] || '',
                    warehouse_id: responseError?.warehouse_id?.[0] || '',
                    status: responseError?.status?.[0] || '',
                    detials: responseError?.detials?.[0] || '',
                    quantity: responseError?.quantity?.[0] || '',
                    price_per_unit: responseError?.price_per_unit?.[0] || '',
                    total_price: responseError?.total_price?.[0] || '',
                    taxes: responseError?.taxes?.[0] || '',
                    shipping_cost: responseError?.shipping_cost?.[0] || '',
                    order_status: responseError?.order_status?.[0] || '',
                    order_type: responseError?.order_type?.[0] || '',
                }
            )
        }
    }, [responseError])

    const READ = () => {
        const [data, setData] = useState()
        useEffect(() => {
            const getData = async () => {
                try {
                    const {data, status} = await getApiData('orders') 
                    if(status === 200) {
                        const newData = data.map(item => ({
                            'vendor name': item.vendor.name,
                            'product name': item.product.name,
                            'warehouse name' : item.warehouse.name,
                            status : item.status,
                            'order status': item.order_status,
                            'order type': item.order_type,
                            'taxes': item.taxes,
                            details: item.details,
                            quantity: item.quantity,
                            'price per unnit': item.price_per_unit,
                            'shipping_cost': item.shipping_cost,
                            'total price': item.total_price,
                            id: item.id,

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
            const getDataForSelec = async (endpoint, state) => {
                try {
                    const {data, status} = await getApiData(endpoint)
                    if(status === 200){
                        const newData = data.map(item => ({
                            id: item.id,
                            name: item.name
                        }))
                        state(() => newData)
                    } 
                } catch (error) {
                    console.log(error);
                }
            }

            getDataForSelec('vendors', setDataVendor)
            getDataForSelec('products', setDataProductId)
            getDataForSelec('warehouses', setDataWarehouse)
        },[])

        return {
            data
        }
    }

    const CREATE = () => {
        const handleCreate = () => {
            setDataModal({
                labelModal: 'Add order',
                labelBtnModal: 'Add new order',
                labelBtnSecondaryModal: 'Back',
                handelBtn: () => create()
            })
            setDataEdit({
                vendor_id: '',
                product_id: '',
                warehouse_id: '',
                status: '',
                details: '',
                quantity: '',
                price_per_unit: '',
                taxes: '',
                shipping_cost: '',
                total_price: '',
                order_type: '',
                id: ''
            })
            setValidationError(
                {
                    vendor_id: '',
                    product_id: '',
                    warehouse_id: '',
                    status: '',
                    details: '',
                    quantity: '',
                    price_per_unit: '',
                    taxes: '',
                    shipping_cost: '',
                    total_price: '',
                    order_status: '',
                    order_type: '',
                }
            )
            setOpenModal(prevOpenModal => !prevOpenModal)
        }

        const create = async () => {
            setLoading(prevLoading => !prevLoading)
            const dataBody = {
                vendor_id: refBody.vendor_idRef.current.value,
                product_id: refBody.product_idRef.current.value,
                warehouse_id: refBody.product_idRef.current.value,
                status: refBody.statusRef.current.value,
                // details: refBody.detailsRef.current.value,
                quantity: refBody.quantityRef.current.value,
                price_per_unit: refBody.price_per_unitRef.current.value,
                taxes: refBody.taxesRef.current.value,
                shipping_cost: refBody.shipping_costRef.current.value,
                total_price: refBody.total_priceRef.current.value,
                order_type: refBody.order_typeRef.current.value,
            }
            try {
                const {status} = await postApiData('orders', dataBody)
                if(status === 201) {
                    setRefresh(!refresh)
                    setOpenModal(prevOpenModal => !prevOpenModal)
                    setLoading(prevLoading => !prevLoading)
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
                labelModal: 'Detail & edit transaction',
                labelBtnModal: 'Save',
                labelBtnSecondaryModal: 'Delete',
                handelBtn: edit
            })

            setValidationError(
                {
                    type: '',
                    date: '',
                    account_id: '',
                    amount: ''
                }
            )


            setOpenModal(prevOpenModal => !prevOpenModal)
            try {
                const {data, status} = await getApiData('accounts-transactions/' + param)
                if(status === 200) {
                    setDataEdit(
                        {
                            type: data.type,
                            date: data.date,
                            account_id: data.account_id,
                            amount: data.amount,
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
                type: refBody.typeRef.current.value,
                date: refBody.dateRef.current.value,
                account_id: refBody.account_idRef.current.value,
                amount: refBody.amountRef.current.value,
            }
            try {
                const {status} = await putApiData('accounts-transactions/' + refBody.idRef.current.value, dataBody)
                if(status === 201) {
                    setRefresh(!refresh)
                    setOpenModal(prevOpenModal => !prevOpenModal)
                    setLoading(prevLoading => !prevLoading)
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
              await deleteApiData('accounts-transactions/' + idDelete)
              setRefresh(!refresh)
                setLoading(prevLoading => !prevLoading)
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
    const {handleCreate} = CREATE()
    const {handleEdit} = EDIT()
    const {openModalDelete, closeModalDelete, handleDelete} = DELETE()



    return {
        data,
        openModal,
        handleCreate,
        dataModal,
        input,
        validationError,
        handleEdit,
        dataEdit,
        refBody,
        openModalDelete,
        closeModalDelete,
        handleDelete,
        modalDelete,
        loading
    }
}