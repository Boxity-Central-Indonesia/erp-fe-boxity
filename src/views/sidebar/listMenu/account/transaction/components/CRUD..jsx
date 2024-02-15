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
    const [dataAccount, setDataAccount] = useState()
    const [dataEdit, setDataEdit] = useState({
        type: '',
        date: '',
        account_id: '',
        amount: ''
    })
    const [refBody, setRefBody] = useState({
        typeRef: useRef(),
        dateRef: useRef(),
        account_idRef: useRef(),
        amountRef: useRef(),
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
                name: 'type',
                ref: refBody.typeRef,
                value: dataEdit.type,
                label: 'Type',
                htmlFor: 'type',
                id: 'type',
                dataSelect: [
                    {value: 'debit', name: 'Debit'},
                    {value: 'kredit', name: 'Kredit'},
                ],
                onchange: handleChange
            },
            {
                element: 'select',
                name: 'account_id',
                ref: refBody.account_idRef,
                label: 'Account',
                htmlFor: 'account_id',
                id: 'account_id',
                dataSelect: dataAccount,
                value: dataEdit.account_id,
                onchange: handleChange
            },
            {
                element: 'input',
                type: 'date',
                name: 'date',
                ref: refBody.dateRef,
                value: dataEdit.date,
                label: 'Date',
                htmlFor: 'date',
                id: 'date',
                onchange: handleChange,
                placeholder: 'Date',
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
        ])
    }, [dataEdit])

    useEffect(() => {
        if(!!responseError) {
            setValidationError(
                {
                    type: responseError?.type?.[0] || '',
                    date: responseError?.date?.[0] || '',
                    amount: responseError?.amount?.[0] || '',
                    account_id: responseError?.account_id?.[0] || '',
                }
            )
        }
    }, [responseError])

    const READ = () => {
        const [data, setData] = useState()
        useEffect(() => {
            const getData = async () => {
                try {
                    const {data, status} = await getApiData('accounts-transactions') 
                    if(status === 200) {
                        const newData = data.map(item => ({
                            'account name': item.account.name,
                            'account type': item.account.type,
                            id: item.id,
                            type: item.type,
                            amount: item.amount,
                            'account balance': item.account.balance,

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
            const getDataAccount = async () => {
                try {
                    const {data, status} = await getApiData('accounts')
                    if(status === 200) {
                       const newData =  data.map(item => ({
                            id: item.id,
                            name: item.name
                       }))
                       setDataAccount(() => newData)
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            getDataAccount()
        }, [])
    

        return {
            data
        }
    }

    const CREATE = () => {
        const handleCreate = () => {
            setDataModal({
                labelModal: 'Add transaction',
                labelBtnModal: 'Add new transaction',
                labelBtnSecondaryModal: 'Back',
                handleBtn: () => create()
            })
            setDataEdit({
                type: '',
                date: '',
                account_id: '',
                amount: ''
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
        }

        const create = async () => {
            setLoading(prevLoading => !prevLoading)
            const dataBody = {
                type: refBody.typeRef.current.value,
                date: refBody.dateRef.current.value,
                account_id: refBody.account_idRef.current.value,
                amount: refBody.amountRef.current.value,
            }
            try {
                const {status} = await postApiData('accounts-transactions', dataBody)
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
                handleBtn: edit
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