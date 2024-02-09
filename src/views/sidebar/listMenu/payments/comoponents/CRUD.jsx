import { useState, useEffect, useRef } from "react"
import { getApiData, postApiData, putApiData,  deleteApiData } from "../../../../../function/Api"

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
    const [dataPayments, setDataPayments] = useState()
    const [dataEdit, setDataEdit] = useState({
      invoice_id: '',
      amount_paid: '',
      payment_method: '',
      payment_date: '',
      id: ''
    })
    const [refBody, setRefBody] = useState({
        invoice_idRef: useRef(),
        amount_paidRef: useRef(),
        payment_methodRef: useRef(),
        payment_dateRef: useRef(),
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
                name: 'invoice_id',
                ref: refBody.invoice_idRef,
                value: dataEdit.invoice_id,
                label: 'Invoice',
                htmlFor: 'invoice_id',
                id: 'invoice_id',
                dataSelect: dataPayments,
                onchange: handleChange
            },
            {
                element: 'input',
                type: 'number',
                name: 'amount_paid',
                ref: refBody.amount_paidRef,
                value: dataEdit.amount_paid,
                label: 'Amount_paid',
                htmlFor: 'amount_paid',
                id: 'amount_paid',
                onchange: handleChange,
                placeholder: 'Amount_paid',
            },
            {
                element: 'select',
                name: 'payment_method',
                ref: refBody.payment_methodRef,
                value: dataEdit.payment_method,
                label: 'Payment methode',
                htmlFor: 'payment_method',
                id: 'payment_method',
                dataSelect: [
                    {value: 'cash', name: 'cash'},
                    {value: 'credit', name: 'credit'},
                    {value: 'online', name: 'online'},
                    {value: 'other', name: 'other'},
                ],
                onchange: handleChange
            },
            {
                element: 'input',
                type: 'date',
                name: 'payment_date',
                ref: refBody.payment_dateRef,
                value: dataEdit.payment_date,
                label: 'Payment date',
                htmlFor: 'payment_date',
                id: 'payment_date',
                onchange: handleChange,
                placeholder: 'Payment date',
            },
            
        ])
    }, [dataEdit])

    useEffect(() => {
        if(!!responseError) {
            setValidationError(
                {
                    invoice_id: responseError?.invoice_id?.[0] || '',
                    payment_method: responseError?.payment_method?.[0] || '',
                    amount_paid: responseError?.amount_paid?.[0] || '',
                    payment_date: responseError?.payment_date?.[0] || '',
                }
            )
        }
    }, [responseError])

    const READ = () => {
        const [data, setData] = useState()
        useEffect(() => {
            const getData = async () => {
                try {
                    const {data, status} = await getApiData('payments') 
                    if(status === 200) {
                        const newData = data.map(item => ({
                            'invoices': item.invoice_id,
                            'payment method': item.payment_method,
                            'payment date': item.payment_date,
                            'amount paid': item.amount_paid,
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

            getDataForSelec('payments', setDataPayments)
        },[])

        return {
            data
        }
    }

    const CREATE = () => {
        const handleCreate = () => {
            setDataModal({
                labelModal: 'Add payments',
                labelBtnModal: 'Add new payments',
                labelBtnSecondaryModal: 'Back',
                handelBtn: () => create()
            })
            setDataEdit({
                invoice_id: '',
                amount_paid: '',
                payment_methode: '',
                payment_date: '',
                id: ''
            })
            setValidationError(
                {
                    invoice_id: '',
                    amount_paid: '',
                    payment_methode: '',
                    payment_date: '',
                    id: '' 
                }
            )
            setOpenModal(prevOpenModal => !prevOpenModal)
        }

        const create = async () => {
            setLoading(prevLoading => !prevLoading)
            const dataBody = {
                invoice_id: refBody.invoice_idRef.current.value,
                amount_paid: refBody.invoice_idRef.current.value,
                payment_methode: refBody.payment_methodRef.current.value,
                payment_date: refBody.payment_dateRef.current.value,
            }
            try {
                const {status} = await postApiData('payments', dataBody)
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