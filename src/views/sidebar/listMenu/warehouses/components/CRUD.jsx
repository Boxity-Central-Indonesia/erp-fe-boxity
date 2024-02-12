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
    const [inputWarehousees, setInputWarehousees] = useState([])
    const [inputWarehouseesLocations, setInputWarehoueseesLocations] = useState([])
    const [responseError, setResponseError] = useState()
    const [validationError, setValidationError] = useState()
    const [loading, setLoading] = useState(true)
    const [skeleton, setSkeleton] = useState(false)
    const [dataHeading, setDataHeading] = useState([{}])
    const [path, setPath] = useState('warehouses')
    const [dataWarehouseesSelect, setDataWarehouseesSelect] = useState([])

    // EmployesList

    const [refBody, setRefBody] = useState( {
        nameRef: useRef(),
        addressRef: useRef(),
        capacityRef: useRef(),
        descriptionRef: useRef(),
        idRef: useRef(),
        numberRef: useRef(),
        warehouse_idRef: useRef(),
        capacityRef: useRef()
    })
    const [dataEdit, setDataEdit] = useState({
        name: '',
        address: '',
        capacity: '',
        description: '',
        id: '',
        number: '',
        warehouse_id: '',
        capacity: ''
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
                    address: responseError?.address?.[0] || '',
                    capacity: responseError?.capacity?.[0] || '',
                    description: responseError?.description?.[0] || '',
                    warehouse_id: responseError?.warehouse_id?.[0] || '',
                    number: responseError?.number?.[0] || '',
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
        setInputWarehousees(  [
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
                name: 'capacity',
                ref: refBody.capacityRef,
                value: dataEdit.capacity,
                label: 'Capacity',
                htmlFor: 'capacity',
                id: 'capacity',
                onchange: handleChange,
                placeholder: 'Capacity',
            },
        ])

        setInputWarehoueseesLocations(  [
            {
                element: 'select',
                name: 'warehouse_id',
                ref: refBody.warehouse_idRef,
                value: dataEdit.warehouse_id,
                label: 'Warehousees',
                htmlFor: 'warehouse_id',
                id: 'warehouse_id',
                dataSelect: dataWarehouseesSelect,
                onchange: handleChange
            },
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
                    const { data } = await getApiData(path);
                    if(path === 'warehouses'){
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
                                activeButton: path,
                            }
                        ])
                    }else if(path === 'warehouse-locations'){
                        const newData = dataWarehousesLocation(data)
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
            const getSelectWarehousees = async () => {
                const {data, status} = await getApiData('warehouses')
                if(status === 200) {
                    const newData = data.map(item => ({
                        id: item.id,
                        name: item.name
                    }))
                    setDataWarehouseesSelect(newData)
                }
            }
            getSelectWarehousees()
        }, [])

        const handleClickHeading = async (param) => {
            setPath(param)
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
           if(param === 'warehouses'){
            setDataEdit(
                {
                    name: '',
                    address: '',
                    capacity: '',
                    description: '',
                    id: ''
                }
            )
            setValidationError(
                {
                    name: '',
                    address: '',
                    capacity: '',
                    description: '',
                    id: ''
                }
            )
            setOpenModal(prevOpenModal => !prevOpenModal)
            setDataModal({
                size: 'md',
                labelModal: 'Add warehouees',
                labelBtnModal: 'Add new warehouees',
                labelBtnSecondaryModal: 'Back',
                handelBtn: create,
            })
           }else if(param === 'warehouse-locations'){
            setDataEdit(
                {
                   warehouse_id: '',
                   number: '',
                   capacity: '',
                }
            )
            setValidationError(
                {
                    warehouse_id: '',
                    number: '',
                    capacity: '',
                }
            )
            setOpenModal(prevOpenModal => !prevOpenModal)
            setDataModal({
                size: 'md',
                labelModal: 'Add locations',
                labelBtnModal: 'Add new locations',
                labelBtnSecondaryModal: 'Back',
                handelBtn: create,
            })
           }else {
            setDataEdit(
                {
                    name: '',
                    address: '',
                    capacity: '',
                    description: '',
                    id: ''
                }
            )
            setValidationError(
                {
                    name: '',
                    address: '',
                    capacity: '',
                    description: '',
                    id: ''
                }
            )
            setOpenModal(prevOpenModal => !prevOpenModal)
            setDataModal({
                size: 'md',
                labelModal: 'Add warehouees',
                labelBtnModal: 'Add new warehouees',
                labelBtnSecondaryModal: 'Back',
                handelBtn: create,
            })
           }
        }

        const create = async (param) => {
            setLoading(prevLoading => !prevLoading)
            let dataBody = {}
            if(param === 'warehouses'){
                dataBody = {
                    name: refBody.nameRef.current.value,
                    address: refBody.addressRef.current.value,
                    capacity: refBody.capacityRef.current.value,
                    description: refBody.descriptionRef.current.value
                }
    
                try {
                    const store = await postApiData(param, dataBody)
                    if(store.status === 201) {
                        setRefresh(!refresh)
                        setLoading(prevLoading => !prevLoading)
                        setOpenModal(prevOpenModal => !prevOpenModal)
                        setPath(param)
                    }
                } catch (error) { 
                    setLoading(prevLoading => !prevLoading)
                    setResponseError(error.response.data)
                }
            }else if(param === 'warehouse-locations'){
                dataBody = {
                  warehouse_id: refBody.warehouse_idRef.current.value,
                  number: refBody.numberRef.current.value,
                  capacity: refBody.capacityRef.current.value
                }
    
                try {
                    const store = await postApiData(param , dataBody)
                    if(store.status === 201) {
                        setPath(() => param)
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
                    address: refBody.addressRef.current.value,
                    capacity: refBody.capacityRef.current.value,
                    description: refBody.descriptionRef.current.value
                }
    
                try {
                    const store = await postApiData('warehouses', dataBody)
                    if(store.status === 201) {
                        setRefresh(!refresh)
                        setLoading(prevLoading => !prevLoading)
                        setOpenModal(prevOpenModal => !prevOpenModal)
                        setPath(param)
                    }
                } catch (error) { 
                    setLoading(prevLoading => !prevLoading)
                    setResponseError(error.response.data)
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
        if(param === 'warehouses'){
            return (
                <>
                 <div className="grid gap-4 mb-4 grid-cols-1">
                            {inputWarehousees.map( (item, index) => (
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
                            placeholder={'Write description here'}
                            />
                    </div>
                </>
            )
        }else if(param === 'warehouse-locations'){
            return (
                <>
                 <div className="grid gap-4 mb-4 grid-cols-1">
                            {inputWarehouseesLocations.map( (item, index) => (
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
    const {handelCreate} = CREATE()
    const {handelEdit} = EDIT()
    const {openModalDelete, closeModalDelete, handelDelete} = DELETE()


    return {
        data,
        handelCreate,
        openModal,
        dataModal,
        inputWarehousees,
        inputWarehouseesLocations,
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
        path,
    }

}