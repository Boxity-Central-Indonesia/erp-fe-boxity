import { useEffect, useState, useRef } from "react"
import { getApiData, postApiData, putApiData, deleteApiData } from "../../../../../function/Api"
import IconAdd from "../../../../layouts/icons/IconAdd"
import { TextArea } from "../../../../layouts/FormInput"
import FormInput from "../../../../layouts/FormInput"

export const CRUD = () => {
    const [refresh, setRefresh] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [modalDelete, setModalDelete] = useState();
    const [idDelete, setIdDelete] = useState()
    const [dataModal, setDataModal] = useState({})
    const [inputAccount, setInputAccount] = useState([])
    const [inpuTransactions, setInputTransactions] = useState([])
    const [responseError, setResponseError] = useState()
    const [validationError, setValidationError] = useState()
    const [dataCompanies, setDataCompanies] = useState();
    const [dataDepartments, setDataDepartments] = useState();
    const [loading, setLoading] = useState(true)
    const [dataCategoryEmployes, setDataCategoryEmployes] = useState()
    const [skeleton, setSkeleton] = useState(false)
    const [dataHeading, setDataHeading] = useState([{}])
    const [path, setPath] = useState('accounts') 
    const [dataAccounSelect, setDataAccountSelect] = useState([])

    const [refBody, setRefBody] = useState( {
        nameRef: useRef(),
        typeRef: useRef(),
        balanceRef: useRef(),
        idRef: useRef(),
        dateRef: useRef(),
        account_idRef: useRef(),
        amountRef: useRef(),
    })
    const [dataEdit, setDataEdit] = useState({})

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
        if(!!responseError){
            setValidationError(
                {
                    name: responseError?.name?.[0] || '',
                    type: responseError?.type?.[0] || '',
                    balance: responseError?.balance?.[0] || '',
                    type: responseError?.type?.[0] || '',
                    date: responseError?.date?.[0] || '',
                    amount: responseError?.amount?.[0] || '',
                    account_id: responseError?.account_id?.[0] || '',
                }
            )
        }
    }, [responseError])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getApiData('companies')
                const newData = response.data.map(item => ({
                    id: item.id,
                    name: item.name
                 }))

                 setDataCompanies(() => newData)
            } catch (error) {
                console.log(error);
            }
        }

        fetchData()

        const fetchDataCategory = async () => {
            try {
                const {data, status} = await getApiData('employee-categories')
                if(status === 200) {
                    const newData = data.map(item => ({
                        id: item.id,
                        name: item.name
                    }))

                    setDataCategoryEmployes(() => newData)
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchDataCategory()
    }, [])

    useEffect(() => {
        setInputAccount([
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
                element: 'select',
                name: 'type',
                ref: refBody.typeRef,
                value: dataEdit.type,
                label: 'Type',
                htmlFor: 'type',
                id: 'type',
                dataSelect: [
                    {value: 'Aset', name: 'Aset'},
                    {value: 'Liabilitas', name: 'Liabilitas'},
                    {value: 'Ekuitas', name: 'Ekuitas'},
                    {value: 'Pendapatan', name: 'Pendapatan'},
                    {value: 'Pengeluaran', name: 'Pengeluaran'},
                    {value: 'Biaya', name: 'Biaya'},
                ],
                onchange: handleChange
            },
            {
                element: 'input',
                type: 'number',
                name: 'balance',
                ref: refBody.balanceRef,
                value: dataEdit.balance,
                label: 'Balance',
                htmlFor: 'balance',
                id: 'balance',
                onchange: handleChange,
                placeholder: 'Balance',
            },
        ])
        setInputTransactions([
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
                dataSelect: dataAccounSelect,
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



    const dataAccounts = (data) => {
        return data.map(item => ({
            id: item.id,
            name: item.name,
            type: item.type,
            balance: item.balance
        }))
    }

    const dataAccountTransactions = (data) => {
        return data.map(item => ({
            'account name': item.account.name,
            'account type': item.account.type,
            id: item.id,
            type: item.type,
            amount: item.amount,
            'account balance': item.account.balance,
        }))
    }

    const READ = () => {
        const [data, setData] = useState()
        useEffect(() => {
            const getData = async () => {
                try {
                    const { data } = await getApiData(path);
                    if(path === 'accounts'){
                        const newData = dataAccounts(data)
                        console.log(data);
                        setData(() => newData);
                        setDataHeading([
                            {
                                label: 'Add account',
                                icon: IconAdd(),
                                heading: 'Accounts list',
                                eventToggleModal: handleCreate,
                                onclick: handleClickHeading,
                                showNavHeading: true,
                                dataNavHeading: [
                                    {path: 'accounts', label: 'Accounts'},
                                    {path: 'accounts-transactions', label: 'Transactions'},
                                ],
                                activeButton: path,
                            }
                        ])
                    }else if(path === 'accounts-transactions'){
                        const newData = dataAccountTransactions(data)
                        setData(() => newData);
                        console.log(data);
                        setDataHeading([
                            {
                                label: 'Add category',
                                icon: IconAdd(),
                                heading: 'Categories list',
                                eventToggleModal: handleCreate,
                                onclick: handleClickHeading,
                                showNavHeading: true,
                                dataNavHeading: [
                                    {path: 'accounts', label: 'Accounts'},
                                    {path: 'accounts-transactions', label: 'Transactions'},
                                ],
                                activeButton: path,
                            }
                        ])
                        }
                    } catch (error) {
                        console.error(error);
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
                       setDataAccountSelect(() => newData)
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            getDataAccount()
        }, [])

        const handleClickHeading = async (param) => {
            setPath(param)
            setDataHeading([
                {
                    label: param === 'accounts' ? 'Add accounts' : 'Add transaction',
                    icon: IconAdd(),
                    heading: param === 'accounts' ? 'Accounts' : 'Transactions' +' list',
                    eventToggleModal: handleCreate,
                    onclick: handleClickHeading,
                    parameter: param,
                    showNavHeading: true,
                    dataNavHeading: [
                        {path: 'accounts', label: 'Accounts'},
                        {path: 'accounts-transactions', label: 'Transactions'},
                    ],
                    activeButton: param,
                }
            ])
            setData([1])
            setSkeleton(prevSkeleton => !prevSkeleton)
            try {
                const {data,status} = await getApiData(param)
                if(status === 200) {
                    if(param === 'accounts'){
                        const newData = dataAccounts(data)
                        setSkeleton(prevSkeleton => !prevSkeleton)
                        setData(newData)
                    }else if(param === 'accounts-transactions') {
                        setSkeleton(prevSkeleton => !prevSkeleton)
                        const newData = dataAccountTransactions(data)
                        console.log(data);
                        setData(newData)
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }

        // getDatEnd

        return {data , handleClickHeading}
    }


    const CREATE = () => {

        const handleCreate  = (param) => {
           if(param === 'accounts'){
            setDataEdit({
                name: '',
                type: '',
                balance: ''
            })
            setValidationError(
                {
                    name: '',
                    type: '',
                    balance: '',
                }
            )
            setOpenModal(prevOpenModal => !prevOpenModal)
            setDataModal({
                size: 'lg',
                labelModal: 'Add account',
                labelBtnModal: 'Add new account',
                labelBtnSecondaryModal: 'Back',
                handleBtn: create,
            })
           }else if(param === 'accounts-transactions'){
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
            setDataModal({
                size: 'lg',
                labelModal: 'Add category',
                labelBtnModal: 'Add new category',
                labelBtnSecondaryModal: 'Back',
                handleBtn: create,
            })
           }
        }

        const create = async (param) => {
            setLoading(prevLoading => !prevLoading)
            let dataBody = {}
            if(param === 'accounts'){
                dataBody = {
                    name: refBody.nameRef.current.value,
                    type: refBody.typeRef.current.value,
                    balance: refBody.balanceRef.current.value,
                }
    
                try {
                    const store = await postApiData(param, dataBody)
                    if(store.status === 201) {
                        setRefresh(prevRefresh => !prevRefresh)
                        setPath(() => param)
                        setLoading(prevLoading => !prevLoading)
                        setOpenModal(prevOpenModal => !prevOpenModal)
                    }
                } catch (error) { 
                    setLoading(prevLoading => !prevLoading)
                    setResponseError(error.response.data.errors)
                }
            }else if(param === 'accounts-transactions'){
                dataBody = {
                    type: refBody.typeRef.current.value,
                    date: refBody.dateRef.current.value,
                    account_id: refBody.account_idRef.current.value,
                    amount: refBody.amountRef.current.value,
                }
    
                try {
                    const store = await postApiData(param, dataBody)
                    if(store.status === 201) {
                        setRefresh(prevRefresh => !prevRefresh)
                        setPath(() => param)
                        setLoading(prevLoading => !prevLoading)
                        setOpenModal(prevOpenModal => !prevOpenModal)
                    }
                } catch (error) { 
                    setLoading(prevLoading => !prevLoading)
                    setResponseError(error.response.data.errors)
                }
            }else{
                dataBody = {
                    name: refBody.nameRef.current.value,
                    type: refBody.typeRef.current.value,
                    balance: refBody.balanceRef.current.value,
                }
    
                try {
                    const store = await postApiData('accounts', dataBody)
                    if(store.status === 201) {
                        setRefresh(prevRefresh => !prevRefresh)
                        setPath(() => param)
                        setLoading(prevLoading => !prevLoading)
                        setOpenModal(prevOpenModal => !prevOpenModal)
                    }
                } catch (error) { 
                    setLoading(prevLoading => !prevLoading)
                    setResponseError(error.response.data.errors)
                }
            }
        }

        return {
            handleCreate,
            create,
        }

    }


    const EDIT = () => {
        const handleEdit  = async (param) => {
            const id = param.textContent
            if(path === 'accounts'){
                setDataModal({
                    size: 'lg',
                    labelModal: 'Detail & edit accounts',
                    labelBtnModal: 'Save',
                    labelBtnSecondaryModal: 'Delete',
                    handleBtn: edit
                })
                setValidationError(
                    {
                        name: '',
                        type: '',
                        balance: '',
                    }
                )

                setOpenModal(prevOpenModal => !prevOpenModal)
                try {
                    const {data, status} = await getApiData(path + '/' + id)
                    if(status === 200) {
                        setDataEdit(
                            {
                                name: data.name,
                                type: data.type,
                                balance: data.balance,
                                id: data.id
                            }
                        )
        
                        setIdDelete(data.id)
                    }
                } catch (error) {
                    console.log(error);
                }
    
            }else if(path === 'accounts-transactions'){
                setDataModal({
                    size: 'lg',
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
                    const {data, status} = await getApiData(path + '/' + id)
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
        }


        const edit = async () => {
            setLoading(prevLoading => !prevLoading)
            let dataBody = {}
           if(path === 'accounts'){
                dataBody = {
                    name: refBody.nameRef.current.value,
                    type: refBody.typeRef.current.value,
                    balance: refBody.balanceRef.current.value,
                }
        
                try {
                    const response = await putApiData(path + '/' + refBody.idRef.current.value, dataBody)
                    if(response.status === 201) {
                        setLoading(prevLoading => !prevLoading)
                        setRefresh(!refresh)
                        setOpenModal((prevOpenModal) => !prevOpenModal)
                    }
                } catch (error) {
                    setResponseError(error.response.data.errors)
                    setLoading(prevLoading => !prevLoading)
                }
           }else if(path === 'accounts-transactions'){
                dataBody = {
                    type: refBody.typeRef.current.value,
                    date: refBody.dateRef.current.value,
                    account_id: refBody.account_idRef.current.value,
                    amount: refBody.amountRef.current.value,
                }
                try {
                    const response = await putApiData(path + '/' + refBody.idRef.current.value, dataBody)
                    if(response.status === 201) {
                        setLoading(prevLoading => !prevLoading)
                        setRefresh(!refresh)
                        setOpenModal((prevOpenModal) => !prevOpenModal)
                    }
                } catch (error) {
                    setResponseError(error.response.data.errors)
                    setLoading(prevLoading => !prevLoading)
                }
           }
        }

        return {
            handleEdit,
            edit,
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
              await deleteApiData(path + '/' + idDelete)
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


    const inputBody = (param) => {
        if(param === 'accounts'){
            return (
                <>
                 <div className="grid gap-4 mb-4">
                            {inputAccount.map( (item, index) => (
                                < FormInput
                                key={item.id}
                                element={item.element}
                                htmlFor={item.htmlFor}
                                label={item.label}
                                type={item.type}
                                name={item.name}
                                referens={item.ref}
                                value={item.value}
                                id={item.id}
                                onChange={(event) => item.onchange(event)}
                                placeholder={item.placeholder} 
                                dataSelect={item.dataSelect}
                                uniqueId={index}
                                validationError={validationError}
                                />
                            ) )}
                    </div>
                </>
            )
        }else if(param === 'accounts-transactions'){
            return (
                <>
                 <div className="grid gap-4 mb-4 grid-cols-1">
                            {inpuTransactions.map( (item, index) => (
                                < FormInput
                                key={item.id}
                                element={item.element}
                                htmlFor={item.htmlFor}
                                label={item.label}
                                type={item.type}
                                name={item.name}
                                referens={item.ref}
                                value={item.value}
                                id={item.id}
                                onChange={(event) => item.onchange(event)}
                                placeholder={item.placeholder} 
                                dataSelect={item.dataSelect}
                                uniqueId={index}
                                validationError={validationError}
                                />
                            ) )}
                    </div>
                </>
            )
        }
    }

    const {data, handleClickHeading} = READ()
    const {handleCreate} = CREATE()
    const {handleEdit} = EDIT()
    const {openModalDelete, closeModalDelete, handleDelete} = DELETE()


    return {
        data,
        handleCreate,
        openModal,
        dataModal,
        refBody,
        handleEdit,
        dataEdit,
        openModalDelete,
        closeModalDelete,
        handleDelete,
        modalDelete,
        validationError,
        handleClickHeading,
        dataHeading,
        setOpenModal,
        inputBody,
        loading,
        skeleton,
        path,
    }

}