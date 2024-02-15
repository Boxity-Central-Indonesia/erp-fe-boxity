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
    const [inputEmployes, setInputEmployes] = useState([])
    const [inputInvoices, setInputInvoices] = useState([])
    const [inputPayments, setInputPayments] = useState([])
    const [responseError, setResponseError] = useState()
    const [validationError, setValidationError] = useState()
    const [dataCompanies, setDataCompanies] = useState();
    const [dataDepartments, setDataDepartments] = useState();
    const [dataOrdersSelect, setDataOrdersSelect] = useState([]);
    const [dataInvoicesSelect, setDataInvoicesSelect] = useState([]);
    const [loading, setLoading] = useState(true)
    const [dataCategoryEmployes, setDataCategoryEmployes] = useState()
    const [skeleton, setSkeleton] = useState(false)
    const [dataHeading, setDataHeading] = useState([{}])
    const [path, setPath] = useState('orders')

    const [refBody, setRefBody] = useState( {
        vendor_idRef: useRef(),
        warehouse_idRef: useRef(),
        product_idRef: useRef(),
        statusRef: useRef(),
        detailsRef: useRef(),
        price_per_unitRef: useRef(),
        total_priceRef: useRef(),
        quantityRef: useRef(),
        taxesRef: useRef(),
        shipping_costRef: useRef(),
        order_typeRef: useRef(),

        //invoices
        order_idRef: useRef(),
        total_amountRef: useRef(),
        balance_dueRef: useRef(),
        invoice_dateRef: useRef(),
        due_dateRef: useRef(),

        // payments
        invpice_idRef: useRef(),
        amount_paidRef: useRef(),
        payment_methodRef: useRef(),
        payment_dateRef: useRef(),

    })
    const [dataEdit, setDataEdit] = useState({})


    const handleChangeAndGetDepartment = async (event) => {
        // Mendapatkan nama dan nilai input yang berubah
        const { name, value } = event.target;
       
        try {
           const response = await getApiData('companies/7/departments')
           const newData = response.data.map(item => ({
               id: item.id,
               name: item.name
           }))

           setDataDepartments(() => newData)

       } catch (error) {
           console.log(error);
       }

        // Memperbarui state sesuai dengan nilai input yang berubah
        setDataEdit((prevDataEdit) => ({
            ...prevDataEdit,
            [name]: value,
        }));
      
      
       };

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
                    order_id: responseError?.order_id?.[0] || '',
                    total_amount: responseError?.total_amount?.[0] || '',
                    balance_due: responseError?.balance_due?.[0] || '',
                    invoice_date: responseError?.invoice_date?.[0] || '',
                    due_date: responseError?.due_date?.[0] || '',
                    status: responseError?.status?.[0] || '',
                    invoice_id: responseError?.invoice_id?.[0] || '',
                    amount_paid: responseError?.amount_paid?.[0] || '',
                    payment_method: responseError?.payment_method?.[0] || '',
                    payment_date: responseError?.payment_date?.[0] || '',
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
        setInputEmployes(  [
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
                type: 'email',
                name: 'email',
                ref: refBody.emailRef,
                value: dataEdit.email,
                label: 'Email',
                htmlFor: 'email',
                id: 'email',
                onchange: handleChange,
                placeholder: 'Email',
    
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
            {
                element: 'select',
                ref: refBody.company_idRef,
                name: 'company_id',
                label: 'Companies',
                htmlFor: 'categori companies',
                id: 'categori companies',
                dataSelect: dataCompanies,
                value: dataEdit.company_id,
                onchange: handleChangeAndGetDepartment
            },
            {
                element: 'input',
                type: 'text',
                name: 'job_title',
                ref: refBody.job_titleRef,
                value: dataEdit.job_title,
                label: 'Job title',
                htmlFor: 'job_title',
                id: 'job_title',
                onchange: handleChange,
                placeholder: 'Job title',
            },
            {
                element: 'input',
                type: 'date',
                name: 'date_of_birth',
                ref: refBody.date_of_birthRef,
                value: dataEdit.date_of_birth,
                label: 'Date of birth',
                htmlFor: 'date_of_birth',
                id: 'date_of_birth',
                onchange: handleChange,
                placeholder: 'Date of birth',
            },
            {
                element: 'select',
                name: 'employment_status',
                ref: refBody.employment_statusRef,
                value: dataEdit.employment_status,
                label: 'satus',
                htmlFor: 'employment_status',
                id: 'employment_status',
                dataSelect: [
                    {value: 'active', name: 'Active'},
                    {value: 'inactive', name: 'Inactive'},
                ],
                onchange: handleChange
            },
            {
                element: 'input',
                type: 'date',
                name: 'hire_date',
                ref: refBody.hire_dateRef,
                value: dataEdit.hire_date,
                label: 'Hire date',
                htmlFor: 'hire_date',
                id: 'hire_date',
                onchange: handleChange,
                placeholder: 'Hire date',
            },
            {
                element: 'input',
                type: 'date',
                name: 'termination_date',
                ref: refBody.termination_dateRef,
                value: dataEdit.termination_date,
                label: 'Termination date',
                htmlFor: 'termination_date',
                id: 'termination_date',
                onchange: handleChange,
                placeholder: 'Termination date',
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
                type: 'text',
                name: 'city',
                ref: refBody.cityRef,
                value: dataEdit.city,
                label: 'City',
                htmlFor: 'city',
                id: 'city',
                onchange: handleChange,
                placeholder: 'City',
            },
            {
                element: 'input',
                type: 'text',
                name: 'province',
                ref: refBody.provinceRef,
                value: dataEdit.province,
                label: 'Province',
                htmlFor: 'province',
                id: 'province',
                onchange: handleChange,
                placeholder: 'Province',
            },
            {
                element: 'input',
                type: 'number',
                name: 'postal_code',
                ref: refBody.postal_codeRef,
                value: dataEdit.postal_code,
                label: 'Postal Code',
                htmlFor: 'postal_code',
                id: 'postal_code',
                onchange: handleChange,
                placeholder: 'Postal Code',
            },
            {
                element: 'input',
                type: 'text',
                name: 'country',
                ref: refBody.countryRef,
                value: dataEdit.country,
                label: 'Country',
                htmlFor: 'country',
                id: 'country',
                onchange: handleChange,
                placeholder: 'Country',
            },
            {
                element: 'select',
                ref: refBody.department_idRef,
                name: 'department_id',
                label: 'Department',
                htmlFor: 'department',
                id: 'department',
                dataSelect: dataDepartments,
                value: dataEdit.department_id,
                onchange: handleChange
            },
            {
                element: 'select',
                ref: refBody.category_idRef,
                name: 'category_id',
                label: 'Category',
                htmlFor: 'category_id',
                id: 'category_id',
                dataSelect: dataCategoryEmployes,
                value: dataEdit.category_id,
                onchange: handleChange
            },
            {
                element: 'input',
                type: 'text',
                name: 'emergency_contact_name',
                ref: refBody.emergency_contact_nameRef,
                value: dataEdit.emergency_contact_name,
                label: 'Emergency Contact Name',
                htmlFor: 'emergency_contact_name',
                id: 'emergency_contact_name',
                onchange: handleChange,
                placeholder: 'Emergency Contact Name',
            },
            {
                element: 'input',
                type: 'text',
                name: 'emergency_contact_phone_number',
                ref: refBody.emergency_contact_phone_numberRef,
                value: dataEdit.emergency_contact_phone_number,
                label: 'Emergency Contact Phone Number',
                htmlFor: 'emergency_contact_phone_number',
                id: 'emergency_contact_phone_number',
                onchange: handleChange,
                placeholder: 'Emergency Contact Phone Number',
            },
            
        ])

        setInputInvoices([
            {
                element: 'select',
                name: 'order_id',
                ref: refBody.order_idRef,
                value: dataEdit.order_id,
                label: 'Order',
                htmlFor: 'order_id',
                id: 'order_id',
                dataSelect: dataOrdersSelect,
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
                type: 'date',
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
                label: 'Invoice date',
                htmlFor: 'invoice_date',
                id: 'invoice_date',
                onchange: handleChange,
                placeholder: 'Invoice date',
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
            {
                element: 'select',
                name: 'status',
                ref: refBody.statusRef,
                value: dataEdit.status,
                label: 'Status',
                htmlFor: 'status',
                id: 'status',
                dataSelect: [
                    {value: 'unpaid', name: 'unpaid'},
                    {value: 'partial', name: 'partial'},
                    {value: 'paid', name: 'paid'},
                ],
                onchange: handleChange
            },
        ])

        setInputPayments([
            {
                element: 'select',
                name: 'invoice_id',
                ref: refBody.invoice_dateRef,
                value: dataEdit.invoice_id,
                label: 'Invoice',
                htmlFor: 'invoice_id',
                id: 'invoice_id',
                dataSelect: dataInvoicesSelect,
                onchange: handleChange
            },
            {
                element: 'input',
                type: 'number',
                name: 'amount_paid',
                ref: refBody.amount_paidRef,
                value: dataEdit.amount_paid,
                label: 'Amount paid',
                htmlFor: 'amount_paid',
                id: 'amount_paid',
                onchange: handleChange,
                placeholder: 'Amount paid',
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



    const dataOrders = (data) => {
        return data.map(item => ({
            'vendor name': item.vendor.name,
            'product name': item.product.name,
            'warehouse name': item.warehouse.name,
            status: item.status,
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
    }
    
    const dataPayments = (data) => {
        return data.map(item => ({
            'invoices': item.invoice_id,
            'payment method': item.payment_method,
            'payment date': item.payment_date,
            'amount paid': item.amount_paid,
            id: item.id,
        }))
    }

    const dataInvoices = (data) => {
        return data.map(item => ({
            'invoices data': item.invoice_date,
            'due date': item.due_date,
            'status': item.status,
            'balance due': item.balance_due,
            'total amount': item.total_amount,
            id: item.id,
        }))
    }




    const READ = () => {
        const [data, setData] = useState()
        useEffect(() => {
            const getData = async () => {
                try {
                    const { data } = await getApiData(path);
                    if(path === 'orders'){
                        const newData = dataOrders(data)
                        setData(newData);
                        setDataHeading([
                            {
                                label: 'Add orders',
                                icon: IconAdd(),
                                heading: 'Orders list',
                                eventToggleModal: handleCreate,
                                onclick: handleClickHeading,
                                showNavHeading: true,
                                dataNavHeading: [
                                    {path: 'orders', label: 'Orders'},
                                    {path: 'invoices', label: 'Invoices'},
                                    {path: 'payments', label: 'Payments'},
                                ],
                                activeButton: 'orders',
                            }
                        ])
                    }else if(path === 'invoices'){
                        const newData = dataInvoices(data)
                        setData(newData);
                        setDataHeading([
                            {
                                label: 'Add invoice',
                                icon: IconAdd(),
                                heading: 'Invoices list',
                                eventToggleModal: handleCreate,
                                onclick: handleClickHeading,
                                showNavHeading: true,
                                dataNavHeading: [
                                    {path: 'orders', label: 'Orders'},
                                    {path: 'invoices', label: 'Invoices'},
                                    {path: 'payments', label: 'Payments'},
                                ],
                                activeButton: 'orders',
                            }
                        ])
                    }else if(path === 'payments'){
                        const newData = dataInvoices(data)
                        setData(newData);
                        setDataHeading([
                            {
                                label: 'Add payment',
                                icon: IconAdd(),
                                heading: 'Payments list',
                                eventToggleModal: handleCreate,
                                onclick: handleClickHeading,
                                showNavHeading: true,
                                dataNavHeading: [
                                    {path: 'orders', label: 'Orders'},
                                    {path: 'invoices', label: 'Invoices'},
                                    {path: 'payments', label: 'Payments'},
                                ],
                                activeButton: 'orders',
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
            const getDataOrders = async () => {
                try {
                    const {data, status} = await getApiData(path)
                    if(status === 200) {
                        const newData = data.map(item => ({
                            id: item.id,
                            name: item.name,
                        }))
                        setDataOrdersSelect(newData)
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            getDataOrders()

            const getDataInvoice = async () => {
                try {
                    const {data, status} = await getApiData(path)
                    if(status === 200) {
                        const newData = data.map(item => ({
                            id: item.id,
                            name: item.name,
                        }))
                        setDataInvoicesSelect(newData)
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }, [])


        const handleClickHeading = async (param) => {
            setPath(param)
            setDataHeading([
                {
                    label: param === 'orders' ? 'Add orders' : param === 'invoices' ? 'Add invoices' : 'Add payments',
                    icon: IconAdd(),
                    heading: param === 'orders' ? 'Orders list' : param === 'invoices' ? 'Invoices list' : 'Payments list',
                    eventToggleModal: handleCreate,
                    onclick: handleClickHeading,
                    parameter: param,
                    showNavHeading: true,
                    dataNavHeading: [
                        {path: 'orders', label: 'Orders'},
                        {path: 'invoices', label: 'Invoices'},
                        {path: 'payments', label: 'Payments'},
                    ],
                    activeButton: param,
                }
            ])
            setData([1])
            setSkeleton(prevSkeleton => !prevSkeleton)
            try {
                const {data,status} = await getApiData(param)
                if(status === 200) {
                    if(param === 'orders'){
                        const newData = dataOrders(data)
                        setSkeleton(prevSkeleton => !prevSkeleton)
                        setData(newData)
                    }else if(param === 'invoices') {
                        setSkeleton(prevSkeleton => !prevSkeleton)
                        const newData = dataInvoices(data)
                        setData(newData)
                    }else if(param === 'payments') {
                        setSkeleton(prevSkeleton => !prevSkeleton)
                        const newData = dataPayments(data)
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
           if(param === 'employees'){
            setDataEdit(
                {
                    name: '',
                    email: '',
                    phone_number: '',
                    company_id: '',
                    job_title: '',
                    date_of_birth: '',
                    employment_status:'',
                    hire_date: '',
                    termination_date:'',
                    address: '',
                    city: '',
                    province: '',
                    postal_code: '',
                    country: '',
                    emergency_contact_name: '',
                    emergency_contact_phone_number: '',
                    notes: '',
                    department_id: '',
                    category_id: '',
                    id: '',
                }
            )
            setValidationError(
                {
                    name: '',
                    email: '',
                    phone_number: '',
                    company_id: '',
                    job_title: '',
                    date_of_birth: '',
                    employment_status: '',
                    hire_date: '',
                    termination_date: '',
                    address: '',
                    city: '',
                    province: '',
                    postal_code: '',
                    country: '',
                    emergency_contact_name: '',
                    emergency_contact_phone_number: '',
                    notes: '',
                    department_id: '',
                }
            )
            setOpenModal(prevOpenModal => !prevOpenModal)
            setDataModal({
                size: '6xl',
                labelModal: 'Add employes',
                labelBtnModal: 'Add new employes',
                labelBtnSecondaryModal: 'Back',
                handleBtn: create,
            })
           }else if(param === 'invoices'){
            setDataEdit(
                {
                    order_id: '',
                    total_amount: '',
                    balance_due: '',
                    invoice_date: '',
                    due_date: '',
                    status: '',
                }
            )
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
            setDataModal({
                size: '2xl',
                labelModal: 'Add invoices',
                labelBtnModal: 'Add new invoices',
                labelBtnSecondaryModal: 'Back',
                handleBtn: create,
            })
           }else if(param === 'payments'){
            setDataEdit(
                {
                    invoice_id: '',
                    amount_paid: '',
                    payment_method: '',
                    payment_date: ''
                }
            )
            setValidationError(
                {
                    invoice_id: '',
                    amount_paid: '',
                    payment_method: '',
                    payment_date: ''
                }
            )
            setOpenModal(prevOpenModal => !prevOpenModal)
            setDataModal({
                size: '2xl',
                labelModal: 'Add invoices',
                labelBtnModal: 'Add new invoices',
                labelBtnSecondaryModal: 'Back',
                handleBtn: create,
            })
           }else {
            setDataEdit(
                {
                    name: '',
                    email: '',
                    phone_number: '',
                    company_id: '',
                    job_title: '',
                    date_of_birth: '',
                    employment_status:'',
                    hire_date: '',
                    termination_date:'',
                    address: '',
                    city: '',
                    province: '',
                    postal_code: '',
                    country: '',
                    emergency_contact_name: '',
                    emergency_contact_phone_number: '',
                    notes: '',
                    department_id: '',
                    category_id: '',
                    id: '',
                }
            )
            setValidationError(
                {
                    name: '',
                    email: '',
                    phone_number: '',
                    company_id: '',
                    job_title: '',
                    date_of_birth: '',
                    employment_status: '',
                    hire_date: '',
                    termination_date: '',
                    address: '',
                    city: '',
                    province: '',
                    postal_code: '',
                    country: '',
                    emergency_contact_name: '',
                    emergency_contact_phone_number: '',
                    notes: '',
                    department_id: '',
                }
            )
            setOpenModal(prevOpenModal => !prevOpenModal)
            setDataModal({
                size: '6xl',
                labelModal: 'Add employes',
                labelBtnModal: 'Add new employes',
                labelBtnSecondaryModal: 'Back',
                handleBtn: create,
            })
           }
        }

        const create = async (param) => {
            setLoading(prevLoading => !prevLoading)
            let dataBody = {}
            if(param === 'orders'){
                dataBody = {
                    name: refBody.nameRef.current.value,
                    email: refBody.emailRef.current.value,
                    phone_number: refBody.phone_numberRef.current.value,
                    company_id: refBody.company_idRef.current.value,
                    job_title: refBody.job_titleRef.current.value,
                    date_of_birth: refBody.date_of_birthRef.current.value,
                    employment_status: refBody.employment_statusRef.current.value,
                    hire_date: refBody.hire_dateRef.current.value,
                    termination_date: refBody.termination_dateRef.current.value,
                    address: refBody.addressRef.current.value,
                    city: refBody.cityRef.current.value,
                    province: refBody.provinceRef.current.value,
                    postal_code: refBody.postal_codeRef.current.value,
                    country: refBody.countryRef.current.value,
                    emergency_contact_name: refBody.emergency_contact_nameRef.current.value,
                    emergency_contact_phone_number: refBody.emergency_contact_phone_numberRef.current.value,
                    notes: refBody.notesRef.current.value,
                    department_id: refBody.department_idRef.current.value,
                    category_id: refBody.category_idRef.current.value
                }
    
                try {
                    const store = await postApiData(param, dataBody)
                    if(store.status === 201) {
                        setPath(param)
                        setRefresh(!refresh)
                        setLoading(prevLoading => !prevLoading)
                        setOpenModal(prevOpenModal => !prevOpenModal)
                    }
                } catch (error) { 
                    setLoading(prevLoading => !prevLoading)
                    setResponseError(error.response.data.errors)
                }
            }else if(param === 'invoices'){
                dataBody = {
                    order_id: refBody.order_idRef.current.value,
                    total_amount: refBody.total_amountRef.current.value,
                    balance_due: refBody.balance_dueRef.current.value,
                    invoice_date: refBody.invoice_dateRef.current.value,
                    due_date: refBody.due_dateRef.current.value,
                    status: refBody.statusRef.current.value,
                }
    
                try {
                    const store = await postApiData(param, dataBody)
                    if(store.status === 201) {
                        setPath(param)
                        setRefresh(!refresh)
                        setLoading(prevLoading => !prevLoading)
                        setOpenModal(prevOpenModal => !prevOpenModal)
                    }
                } catch (error) { 
                    setLoading(prevLoading => !prevLoading)
                    setResponseError(error.response.data.errors)
                }
            }else if(param === 'payments'){
                dataBody = {
                    invoice_id: refBody.invoice_dateRef.current.value,
                    amount_paid: refBody.amount_paidRef.current.value,
                    payment_method: refBody.payment_methodRef.current.value,
                    payment_date: refBody.payment_dateRef.current.value
                }
    
                try {
                    const store = await postApiData(param, dataBody)
                    if(store.status === 201) {
                        setPath(param)
                        setRefresh(!refresh)
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
                    email: refBody.emailRef.current.value,
                    phone_number: refBody.phone_numberRef.current.value,
                    company_id: refBody.company_idRef.current.value,
                    job_title: refBody.job_titleRef.current.value,
                    date_of_birth: refBody.date_of_birthRef.current.value,
                    employment_status: refBody.employment_statusRef.current.value,
                    hire_date: refBody.hire_dateRef.current.value,
                    termination_date: refBody.termination_dateRef.current.value,
                    address: refBody.addressRef.current.value,
                    city: refBody.cityRef.current.value,
                    province: refBody.provinceRef.current.value,
                    postal_code: refBody.postal_codeRef.current.value,
                    country: refBody.countryRef.current.value,
                    emergency_contact_name: refBody.emergency_contact_nameRef.current.value,
                    emergency_contact_phone_number: refBody.emergency_contact_phone_numberRef.current.value,
                    notes: refBody.notesRef.current.value,
                    department_id: refBody.department_idRef.current.value,
                    category_id: refBody.category_idRef.current.value
                }
    
                try {
                    const store = await postApiData('employees', dataBody)
                    if(store.status === 201) {
                        setRefresh(!refresh)
                        setLoading(prevLoading => !prevLoading)
                        setOpenModal(prevOpenModal => !prevOpenModal)
                    }
                } catch (error) { 
                    setResponseError(error.response.data.errors)
                    setLoading(prevLoading => !prevLoading)
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
            const id = param.querySelector('span.hidden').textContent
            // orders di skip dulu
            if(path === 'orders'){
                setDataModal({
                    labelModal: 'Detail & edit employes',
                    labelBtnModal: 'Save',
                    labelBtnSecondaryModal: 'Delete',
                    handleBtn: edit
                })
                setValidationError(
                    {
                        name: '',
                        email: '',
                        phone_number: '',
                        company_id: '',
                        job_title: '',
                        date_of_birth: '',
                        employment_status: '',
                        hire_date: '',
                        termination_date: '',
                        address: '',
                        city: '',
                        province: '',
                        postal_code: '',
                        country: '',
                        emergency_contact_name: '',
                        emergency_contact_phone_number: '',
                        notes: '',
                        department_id: '',
                    }
                )
                setOpenModal(prevOpenModal => !prevOpenModal)
                try {
                    const response = await getApiData('employees/' + param)
                    if(response.status === 200) {
                        setDataEdit(
                            {
                                name: response.data.name,
                                email: response.data.email,
                                phone_number: response.data.phone_number,
                                company_id: response.data.company_id,
                                job_title: response.data.job_title,
                                date_of_birth: response.data.date_of_birth,
                                employment_status: response.data.employment_status,
                                hire_date: response.data.hire_date,
                                termination_date: response.data.termination_date ?? '',
                                address: response.data.address,
                                city: response.data.city,
                                province: response.data.province,
                                postal_code: response.data.postal_code,
                                country: response.data.country,
                                emergency_contact_name: response.data.emergency_contact_name,
                                emergency_contact_phone_number: response.data.emergency_contact_phone_number,
                                notes: response.data.notes,
                                department_id: response.data.department_id,
                                company_id:response.data.company_id,
                                id: response.data.id
                            }
                        )
        
                        setIdDelete(response.data.id)
                    }
                } catch (error) {
                    console.log(error);
                }
            }else if(path === 'invoices'){
                setDataModal({
                    labelModal: 'Detail & edit invoice',
                    labelBtnModal: 'Save',
                    labelBtnSecondaryModal: 'Delete',
                    handleBtn: edit
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
                try {
                    const {data, status} = await getApiData(path + '/' + param)
                    if(status === 200) {
                        setDataEdit(
                            {
                                id: data.id,
                                order_id: data.order_id,
                                total_amount: data.total_amount,
                                balance_due: data.balance_due,
                                invoice_date: data.invoice_date,
                                due_date: data.due_date,
                                status: data.status,
                            }
                        )
        
                        setIdDelete(data.id)
                    }
                } catch (error) {
                    console.log(error);
                }
            }else if(path === 'payments'){
                setDataModal({
                    labelModal: 'Detail & edit payments',
                    labelBtnModal: 'Save',
                    labelBtnSecondaryModal: 'Delete',
                    handleBtn: edit
                })
                setValidationError(
                    {
                        invoice_id: '',
                        amount_paid: '',
                        payment_method: '',
                        payment_date: ''
                    }
                )
                setOpenModal(prevOpenModal => !prevOpenModal)
                try {
                    const {data, status} = await getApiData(path + '/' + param)
                    if(status === 200) {
                        setDataEdit(
                            {
                                id: data.id,
                                invoice_id: data.invoice_id,
                                amount_paid: data.amount_paid,
                                payment_method: data.payment_method,
                                payment_date: data.payment_date
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
            let dataBody = {}
            setLoading(prevLoading => !prevLoading)
            if(path === 'orders'){
                dataBody = {
                    name: refBody.nameRef.current.value,
                    email: refBody.emailRef.current.value,
                    phone_number: refBody.phone_numberRef.current.value,
                    company_id: refBody.company_idRef.current.value,
                    job_title: refBody.job_titleRef.current.value,
                    date_of_birth: refBody.date_of_birthRef.current.value,
                    employment_status: refBody.employment_statusRef.current.value,
                    hire_date: refBody.hire_dateRef.current.value,
                    termination_date: refBody.termination_dateRef.current.value,
                    address: refBody.addressRef.current.value,
                    city: refBody.cityRef.current.value,
                    province: refBody.provinceRef.current.value,
                    postal_code: refBody.postal_codeRef.current.value,
                    country: refBody.countryRef.current.value,
                    emergency_contact_name: refBody.emergency_contact_nameRef.current.value,
                    emergency_contact_phone_number: refBody.emergency_contact_phone_numberRef.current.value,
                    notes: refBody.notesRef.current.value,
                    department_id: refBody.department_idRef.current.value,
                    category_id: refBody.category_idRef.current.value
                }

                try {
                    const {data, status} = await putApiData(path + '/' + refBody.idRef.current.value, dataBody)
                    if(status === 201) {
                        setLoading(prevLoading => !prevLoading)
                        setRefresh(!refresh)
                        setOpenModal((prevOpenModal) => !prevOpenModal)
                    }
                } catch (error) {
                    setLoading(prevLoading => !prevLoading)
                    setResponseError(error.response.data)
                }
            }else if(path === 'invoices'){
                dataBody = {
                    order_id: refBody.order_idRef.current.value,
                    total_amount: refBody.total_amountRef.current.value,
                    balance_due: refBody.balance_dueRef.current.value,
                    invoice_date: refBody.invoice_dateRef.current.value,
                    due_date: refBody.due_dateRef.current.value,
                    status: refBody.statusRef.current.value,
                }

                try {
                    const {data, status} = await putApiData(path + '/' + refBody.idRef.current.value, dataBody)
                    if(status === 201) {
                        setLoading(prevLoading => !prevLoading)
                        setRefresh(!refresh)
                        setOpenModal((prevOpenModal) => !prevOpenModal)
                    }
                } catch (error) {
                    setLoading(prevLoading => !prevLoading)
                    setResponseError(error.response.data)
                }
            }else if(path === 'payments'){
                dataBody = {
                    invoice_id: refBody.invoice_dateRef.current.value,
                    amount_paid: refBody.amount_paidRef.current.value,
                    payment_method: refBody.payment_methodRef.current.value,
                    payment_date: refBody.payment_dateRef.current.value
                }

                try {
                    const {data, status} = await putApiData(path + '/' + refBody.idRef.current.value, dataBody)
                    if(status === 201) {
                        setLoading(prevLoading => !prevLoading)
                        setRefresh(!refresh)
                        setOpenModal((prevOpenModal) => !prevOpenModal)
                    }
                } catch (error) {
                    setLoading(prevLoading => !prevLoading)
                    setResponseError(error.response.data)
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
        if(param === 'orders'){
            return (
                <>
                 <div className="grid gap-4 mb-4 grid-cols-1 lg:grid-cols-3">
                            {inputEmployes.map( (item, index) => (
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
                            < TextArea 
                            span={`col-span-3`}
                            label={'Notes'}
                            htmlFor={'notes'}
                            id={'notes'}
                            name={'notes'}
                            referens={refBody.notesRef}
                            placeholder={'Write notes here'}
                            />
                    </div>
                </>
            )
        }else if(param === 'invoices'){
            return (
                <>
                 <div className="grid gap-4 mb-4 grid-cols-1 lg:grid-cols-2">
                            {inputInvoices.map( (item, index) => (
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
        }else if(param === 'payments'){
            return (
                <>
                 <div className="grid gap-4 mb-4 grid-cols-1 lg:grid-cols-2">
                            {inputPayments.map( (item, index) => (
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
        inputEmployes,
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