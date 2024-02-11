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
    const [inputEmployesCategory, setInputEmployesCategory] = useState([])
    const [responseError, setResponseError] = useState()
    const [validationError, setValidationError] = useState()
    const [dataCompanies, setDataCompanies] = useState();
    const [dataDepartments, setDataDepartments] = useState();
    const [loading, setLoading] = useState(true)
    const [dataCategoryEmployes, setDataCategoryEmployes] = useState()
    const [skeleton, setSkeleton] = useState(false)
    const [dataHeading, setDataHeading] = useState([{}])

    // EmployesList

    const [refBody, setRefBody] = useState( {
        nameRef: useRef(),
        emailRef: useRef(),
        phone_numberRef: useRef(),
        company_idRef: useRef(),
        job_titleRef: useRef(),
        date_of_birthRef: useRef(),
        employment_statusRef: useRef(),
        hire_dateRef: useRef(),
        termination_dateRef: useRef(),
        addressRef: useRef(),
        cityRef: useRef(),
        provinceRef: useRef(),
        postal_codeRef: useRef(),
        countryRef: useRef(),
        emergency_contact_nameRef: useRef(),
        emergency_contact_phone_numberRef: useRef(),
        notesRef: useRef(),
        department_idRef: useRef(),
        category_idRef: useRef(),
        idRef: useRef(),
        notesRef: useRef(),
        descriptionRef: useRef(),
    })
    const [dataEdit, setDataEdit] = useState({
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
        id: ''
    })


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
                    name: responseError?.name?.[0] || '',
                    email: responseError?.email?.[0] || '',
                    phone_number: !!responseError.phone_number ? responseError.phone_number[0] : '',
                    company_id:!!responseError.company_id ? responseError.company_id[0] : '',
                    job_title:!!responseError.job_title ? responseError.job_title[0] : '',
                    date_of_birth:!!responseError.date_of_birth ? responseError.date_of_birth[0] : '',
                    employment_status:!!responseError.employment_status ? responseError.employment_status[0] : '',
                    hire_date:!!responseError.hire_date ? responseError.hire_date[0] : '',
                    termination_date:!!responseError.termination_date ? responseError.termination_date[0] : '',
                    address:!!responseError.address ? responseError.address[0] : '',
                    city:!!responseError.city ? responseError.city[0] : '',
                    province:!!responseError.province ? responseError.province[0] : '',
                    postal_code:!!responseError.postal_code ? responseError.postal_code[0] : '',
                    country:!!responseError.country ? responseError.country[0] : '',
                    emergency_contact_name:!!responseError.emergency_contact_name ? responseError.emergency_contact_name[0] : '',
                    emergency_contact_phone_number:!!responseError.emergency_contact_phone_number ? responseError.emergency_contact_phone_number[0] : '',
                    notes:!!responseError.notes ? responseError.notes[0] : '',
                    department_id:!!responseError.department_id ? responseError.department_id[0] : '',
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
        setInputEmployesCategory( [
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



    const dataWarehouses = (data) => {
        return data.map(item => ({
            id: item.id,
            name: item.name,
            address: item.address,
            capacity: item.capacity
        }))
    }

    const dataWarehousesLocation = (data) => {
        return data.map(item => ({
            'id': item.id,
            'number': item.number,
            'capacity': item.capacity,
            'warehouse': item.warehouse.name
        }))
    }


    const READ = () => {
        const [data, setData] = useState()
        useEffect(() => {
            const getData = async () => {
                try {
                    const { data } = await getApiData('warehouses');
                    const newData = dataWarehouses(data)
                    setData(newData);
                    setDataHeading([
                        {
                            label: 'Add warehouses',
                            icon: IconAdd(),
                            heading: 'Warehouses list',
                            eventToggleModal: handelCreate,
                            onclick: handleClickHeading,
                            showNavHeading: true,
                            dataNavHeading: [
                                {path: 'warehouses', label: 'List'},
                                {path: 'warehouse-locations', label: 'Locations'},
                            ],
                            activeButton: 'warehouses',
                        }
                    ])
                } catch (error) {
                    console.error(error);
                }
            }
            getData()
        }, [refresh])

        const handleClickHeading = async (param) => {
            setDataHeading([
                {
                    label: param === 'warehouses' ? 'Add warehouses' : 'Add warehouse locations',
                    icon: IconAdd(),
                    heading: param === 'warehouses' ? 'Warehouses list' : 'Locations list',
                    eventToggleModal: handelCreate,
                    onclick: handleClickHeading,
                    parameter: param === 'warehouses' ? 'warehouses' : 'warehouse-locations',
                    showNavHeading: true,
                    dataNavHeading: [
                        {path: 'warehouses', label: 'List'},
                        {path: 'warehouse-locations', label: 'Locations'},
                    ],
                    activeButton: param,
                }
            ])
            setData([1])
            setSkeleton(prevSkeleton => !prevSkeleton)
            try {
                const {data,status} = await getApiData(param)
                if(status === 200) {
                    if(param === 'warehouses'){
                        const newData = dataWarehouses(data)
                        setSkeleton(prevSkeleton => !prevSkeleton)
                        setData(newData)
                    }else if(param === 'warehouse-locations') {
                        setSkeleton(prevSkeleton => !prevSkeleton)
                        const newData = dataWarehousesLocation(data)
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

        const handelCreate  = (param) => {
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
                handelBtn: create,
            })
           }else if(param === 'employee-categories'){
            setDataEdit(
                {
                    name: '',
                    description: '',
                    id: '',
                }
            )
            setValidationError(
                {
                    name: '',
                    description: '',
                }
            )
            setOpenModal(prevOpenModal => !prevOpenModal)
            setDataModal({
                size: 'md',
                labelModal: 'Add category',
                labelBtnModal: 'Add new category',
                labelBtnSecondaryModal: 'Back',
                handelBtn: create,
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
                handelBtn: create,
            })
           }
        }

        const create = async (param) => {
            setLoading(prevLoading => !prevLoading)
            let dataBody = {}
            if(param === 'employees'){
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
                    setLoading(prevLoading => !prevLoading)
                    setResponseError(error.response.data.errors)
                }
            }else if(param === 'employee-categories'){
                dataBody = {
                    name: refBody.nameRef.current.value,
                    description: refBody.descriptionRef.current.value
                }
    
                try {
                    const store = await postApiData('employee-categories', dataBody)
                    if(store.status === 201) {
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
            handelCreate,
            create,
        }

    }


    const EDIT = () => {
        const edit = async () => {
            const dataBody = {
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
                department_id: refBody.department_idRef.current.value
            }
    
            try {
                const response = await putApiData('employees/' + refBody.idRef.current.value, dataBody)
                console.log(response);
                if(response.status === 201) {
                    setRefresh(!refresh)
                    setOpenModal((prevOpenModal) => !prevOpenModal)
                }
            } catch (error) {
                setResponseError(error.response.data)
            }
        }

        const handelEdit  = async (param) => {
            setDataModal({
                labelModal: 'Detail & edit employes',
                labelBtnModal: 'Save',
                labelBtnSecondaryModal: 'Delete',
                handelBtn: edit
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
                const response = await getApiData('companies/7/departments')
                const newData = response.data.map(item => ({
                    id: item.id,
                    name: item.name
                }))
     
                setDataDepartments(() => newData)
     
            } catch (error) {
                console.log(error);
            }
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

        }

        return {
            handelEdit,
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
    
    
          const handelDelete = async () => {
            try {
              await deleteApiData('employees/' + idDelete)
              setRefresh(!refresh)
                closeModalDelete()
            } catch (error) {
              console.log(error.response);
            }
          }


        return {
            openModalDelete,
            closeModalDelete,
            handelDelete
        }
    }


    const inputBody = (param) => {
        if(param === 'employees'){
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
        }else if(param === 'employee-categories'){
            return (
                <>
                 <div className="grid gap-4 mb-4 grid-cols-1">
                            {inputEmployesCategory.map( (item, index) => (
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
                            span={`col-span-1`}
                            label={'Description'}
                            htmlFor={'description'}
                            id={'description'}
                            name={'description'}
                            referens={refBody.descriptionRef}
                            placeholder={'Write notes here'}
                            />
                    </div>
                </>
            )
        }
    }

    const {data, handleClickHeading} = READ()
    const {handelCreate} = CREATE()
    const {handelEdit} = EDIT()
    const {openModalDelete, closeModalDelete, handelDelete} = DELETE()


    return {
        data,
        handelCreate,
        openModal,
        dataModal,
        inputEmployes,
        inputEmployesCategory,
        refBody,
        handelEdit,
        dataEdit,
        openModalDelete,
        closeModalDelete,
        handelDelete,
        modalDelete,
        validationError,
        handleClickHeading,
        dataHeading,
        setOpenModal,
        inputBody,
        loading,
        skeleton,
    }

}