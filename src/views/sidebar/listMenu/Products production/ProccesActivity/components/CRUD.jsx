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
    const [dataOrder, setDataOrder] = useState()
    const [dataEdit, setDataEdit] = useState({
      order_id: '',
      total_amount: '',
      balance_due: '',
      invoice_date: '',
      due_date: '',
      status: '',
      id: ''
    })
    const [refBody, setRefBody] = useState({
        order_idRef: useRef(),
        total_amountRef: useRef(),
        balance_dueRef: useRef(),
        invoice_dateRef: useRef(),
        due_dateRef: useRef(),
        statusRef: useRef(),
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
                name: 'order_id',
                ref: refBody.order_idRef,
                value: dataEdit.order_id,
                label: 'Order',
                htmlFor: 'order_id',
                id: 'order_id',
                dataSelect: dataOrder,
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
                    {value: 'unpaid', name: 'unpaid'},
                    {value: 'paid', name: 'paid'},
                    {value: 'partial', name: 'partial'},
                ],
                onchange: handleChange
            },
            {
                element: 'input',
                type: 'number',
                name: 'total_amount',
                ref: refBody.total_amountRef,
                value: dataEdit.total_amount,
                label: 'Total amount',
                htmlFor: 'total_amount',
                id: 'total_amount',
                onchange: handleChange,
                placeholder: 'Total amount',
            },
            {
                element: 'input',
                type: 'number',
                name: 'balance_due',
                ref: refBody.balance_dueRef,
                value: dataEdit.balance_due,
                label: 'Balance due',
                htmlFor: 'balance_due',
                id: 'balance_due',
                onchange: handleChange,
                placeholder: 'Balance due',
            },
            {
                element: 'input',
                type: 'date',
                name: 'invoice_date',
                ref: refBody.invoice_dateRef,
                value: dataEdit.invoice_date,
                label: 'Invocie date',
                htmlFor: 'invoice_date',
                id: 'invoice_date',
                onchange: handleChange,
                placeholder: 'Invocie date',
            },
            {
                element: 'input',
                type: 'date',
                name: 'due_date',
                ref: refBody.due_dateRef,
                value: dataEdit.due_date,
                label: 'Due date',
                htmlFor: 'due_date',
                id: 'due_date',
                onchange: handleChange,
                placeholder: 'Due date',
            },
            
        ])
    }, [dataEdit])

    useEffect(() => {
        if(!!responseError) {
            setValidationError(
                {
                    order_id: responseError?.order_id?.[0] || '',
                    total_amount: responseError?.total_amount?.[0] || '',
                    balance_due: responseError?.balance_due?.[0] || '',
                    invoice_date: responseError?.invoice_date?.[0] || '',
                    due_date: responseError?.due_date?.[0] || '',
                    status: responseError?.status?.[0] || '',
                }
            )
        }
    }, [responseError])

    const READ = () => {
        const [data, setData] = useState()
        useEffect(() => {
            const getData = async () => {
                try {
                    const {data, status} = await getApiData('processing-activities') 
                    if(status === 200) {
                        const newData = data.map(item => ({
                            'prospek name': item.nama_prospek,
                            'prospek email': item.email_prospek,
                            'prospek number phone': item.nomor_telepon_prospek,
                            'prospek_type' : item.tipe_prospek,
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

        // useEffect(() => {
        //     const getDataForSelec = async (endpoint, state) => {
        //         try {
        //             const {data, status} = await getApiData(endpoint)
        //             if(status === 200){
        //                 const newData = data.map(item => ({
        //                     id: item.id,
        //                     name: item.name
        //                 }))
        //                 state(() => newData)
        //             } 
        //         } catch (error) {
        //             console.log(error);
        //         }
        //     }

        //     getDataForSelec('orders', setDataOrder)
        // },[])

        return {
            data
        }
    }

    const CREATE = () => {
        const handleCreate = () => {
            setDataModal({
                labelModal: 'Add invoices',
                labelBtnModal: 'Add new invoices',
                labelBtnSecondaryModal: 'Back',
                handelBtn: () => create()
            })
            setDataEdit({
                order_id: '',
                total_amount: '',
                balance_due: '',
                invoice_date: '',
                due_date: '',
                status: '',
                id: ''
            })
            setValidationError(
                {
                    order_id: '',
                    total_amount: '',
                    balance_due: '',
                    invoice_date: '',
                    due_date: '',
                    status: '',
                }
            )
            setOpenModal(prevOpenModal => !prevOpenModal)
        }

        const create = async () => {
            setLoading(prevLoading => !prevLoading)
            const dataBody = {
                order_id: refBody.order_idRef.current.value,
                total_amount: refBody.total_amountRef.current.value,
                balance_due: refBody.balance_dueRef.current.value,
                invoice_date: refBody.invoice_dateRef.current.value,
                due_date: refBody.due_dateRef.current.value,
                status: refBody.statusRef.current.value,
            }
            try {
                const {status} = await postApiData('invoices', dataBody)
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