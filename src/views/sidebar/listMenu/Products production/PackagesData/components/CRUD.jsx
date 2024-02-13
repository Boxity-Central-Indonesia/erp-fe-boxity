import { useState, useEffect, useRef } from "react"
import { getApiData, postApiData, putApiData, deleteApiData } from "../../../../../../function/Api"
import IconAdd from "../../../../../layouts/icons/IconAdd"
import FormInput from "../../../../../layouts/FormInput"

export const CRUD = () => {
    const [openModal, setOpenModal] = useState()
    const [dataModal, setDataModal] = useState({})
    const [inputPackages, setInputPackages] = useState([])
    const [inputPackaging, setInputPackaging] = useState([])
    const [inputPackageProduct, setInputPackageProduct] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [responseError, setResponseError] = useState()
    const [validationError, setValidationError] = useState()
    const [modalDelete, setModalDelete] = useState()
    const [idDelete, setIdDelete] = useState()
    const [loading, setLoading] = useState(true)
    const [dataOrder, setDataOrder] = useState()
    const [dataHeading, setDataHeading] = useState([
        {
            label: 'Add Packagest',
            icon: IconAdd(),
            heading: 'Packages list',
            showNavHeading: true,
            dataNavHeading: [
                {path: 'packages', label: 'Packages'},
                {path: 'packaging', label: 'Packaging'},
                {path: 'packages-product', label: 'Packages product'},
            ],
            activeButton: 'packages'
            // onclick: handleClickHeading,
            // eventToggleModal: handelCreate,
        }
    ])
    const [dataEdit, setDataEdit] = useState({
        package_name: '',
        package_weight: '',
        product_id: '',
        weight: '',
        package_type: '',
        package_id: '',
    })

    const [refBody, setRefBody] = useState({
        package_nameRef: useRef(),
        package_weightRef: useRef(),
        product_idRef: useRef(),
        weightRef: useRef(),
        package_typeRef: useRef(),
        package_idRef: useRef(),
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
        setInputPackages([
            {
                element: 'input',
                type: 'text',
                name: 'package_name',
                ref: refBody.package_nameRef,
                value: dataEdit.package_name,
                label: 'Package name',
                htmlFor: 'package_name',
                id: 'package_name',
                onchange: handleChange,
                placeholder: 'Package name',
            },
            {
                element: 'input',
                type: 'text',
                name: 'package_weight',
                ref: refBody.package_weightRef,
                value: dataEdit.package_weight,
                label: 'Package weight',
                htmlFor: 'package_weight',
                id: 'package_weight',
                onchange: handleChange,
                placeholder: 'Package weight',
            },
        ])
        setInputPackaging([
            {
                element: 'select',
                ref: refBody.product_idRef,
                name: 'product_id',
                label: 'Product',
                htmlFor: 'product-id',
                id: 'product-id',
                // dataSelect: dataCompanies,
                value: dataEdit.product_id,
                // onchange: handleChangeAndGetDepartment
            },
            {
                element: 'input',
                type: 'number',
                name: 'weight',
                ref: refBody.weightRef,
                value: dataEdit.weight,
                label: 'Weight',
                htmlFor: 'weight',
                id: 'weight',
                onchange: handleChange,
                placeholder: 'Weight',
            },
            {
                element: 'input',
                type: 'text',
                name: 'package_type',
                ref: refBody.package_typeRef,
                value: dataEdit.package_type,
                label: 'Package type',
                htmlFor: 'package_type',
                id: 'package_type',
                onchange: handleChange,
                placeholder: 'Package type',
            },
        ])
        setInputPackageProduct([
            {
                element: 'select',
                ref: refBody.package_idRef,
                name: 'package_id',
                label: 'Package',
                htmlFor: 'package-id',
                id: 'package-id',
                // dataSelect: dataCompanies,
                value: dataEdit.package_id,
                // onchange: handleChangeAndGetDepartment
            },
            {
                element: 'select',
                ref: refBody.product_idRef,
                name: 'product_id',
                label: 'Product',
                htmlFor: 'product-id',
                id: 'product-id',
                // dataSelect: dataCompanies,
                value: dataEdit.product_id,
                // onchange: handleChangeAndGetDepartment
            },
        ])
    }, [dataEdit])

    useEffect(() => {
        if(!!responseError) {
            setValidationError(
                {
                    package_name: responseError?.package_name?.[0] || '',
                    package_weight: responseError?.package_weight?.[0] || '',
                    product_id: responseError?.product_id?.[0] || '',
                    weight: responseError?.weight?.[0] || '',
                    package_type: responseError?.package_type?.[0] || '',
                    package_id: responseError?.package_id?.[0] || '',
                }
            )
        }
    }, [responseError])

    const READ = () => {
        const [data, setData] = useState()
        useEffect(() => {
            const getData = async () => {
                try {
                    const {data, status} = await getApiData('packages') 
                    if(status === 200) {
                        const newData = dataPackages(data)
                        setData(() => newData)
                        setDataHeading([
                            {
                                label: 'Add Packagest',
                                icon: IconAdd(),
                                heading: 'Packages list',
                                showNavHeading: true,
                                dataNavHeading: [
                                    {path: 'packages', label: 'Packages'},
                                    {path: 'packaging', label: 'Packaging'},
                                    {path: 'packages-product', label: 'Packages product'},
                                ],
                                activeButton: 'packages',
                                onclick: handleClickHeading,
                                eventToggleModal: handleCreate,
                            }
                        ])
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

            getDataForSelec('orders', setDataOrder)
        },[])


        const dataPackages = (data) => {
            return data.map(item => ({
                id: item.id,
                'package name': item.package_name,
                'package weight': item.package_weight,
            }))
        }

        const dataPackaging = (data) => {
            return data.map(item => ({
                id: item.id,
                'product_name': item.product_id,
                weight: item.weight,
                'package type': item.package_type
            }))
        }

        const dataPackagesProduct = (data) => {
            return data.map(item => ({
                id: item.id,
                "package": item.package_id,
                'product': item.product
            }))
        }


        const handleClickHeading = async (param) => {
            try {
                const {data,status} = await getApiData(param)
                if(status === 200) {
                    if(param === 'packages'){
                        const newData = dataPackages(data)
                        setData(newData)
                        setDataHeading([
                            {
                                label: 'Add packagest',
                                icon: IconAdd(),
                                heading: 'Packaging list',
                                eventToggleModal: handleCreate,
                                onclick: handleClickHeading,
                                parameter: 'packages',
                                showNavHeading: true,
                                activeButton: param,
                                dataNavHeading: [
                                    {path: 'packages', label: 'Packages'},
                                    {path: 'packaging', label: 'Packaging'},
                                    {path: 'packages-product', label: 'Packages product'},
                                ],
                            }
                        ])
                    }else if(param === 'packaging') {
                        const newData = dataPackaging(data)
                        setData(newData)
                        setDataHeading([
                            {
                                label: 'Add packaging',
                                icon: IconAdd(),
                                heading: 'Packaging list',
                                eventToggleModal: handleCreate,
                                onclick: handleClickHeading,
                                parameter: 'packaging',
                                showNavHeading: true,
                                activeButton: param,
                                dataNavHeading: [
                                    {path: 'packages', label: 'Packages'},
                                    {path: 'packaging', label: 'Packaging'},
                                    {path: 'packages-product', label: 'Packages product'},
                                ],
                            }
                        ])
                    }else if(param === 'packages-product'){
                        const newData = dataPackagesProduct(data)
                        setData(newData)
                        setDataHeading([
                            {
                                label: 'Add packages product',
                                icon: IconAdd(),
                                heading: 'Packages product list',
                                eventToggleModal: handleCreate,
                                onclick: handleClickHeading,
                                parameter: 'packages-product',
                                showNavHeading: true,
                                activeButton: param,
                                dataNavHeading: [
                                    {path: 'packages', label: 'Packages'},
                                    {path: 'packaging', label: 'Packaging'},
                                    {path: 'packages-product', label: 'Packages product'},
                                ],
                            }
                        ])

                    }
                }
            } catch (error) {
                console.log(error);
            }
        }

        return {
            data,
            handleClickHeading
        }
    }

    const CREATE = () => {
        const handleCreate = (param) => {
            setDataEdit({
                package_name: '',
                package_weight: '',
                product_id: '',
                weight: '',
                package_type: '',
            })
            setValidationError(
                {
                    package_name: '',
                    package_weight: '',
                    product_id: '',
                    weight: '',
                    package_type: '',
                }
            )
            if(param === 'packages'){
                setDataModal({
                    size: 'lg',
                    labelModal: 'Add packages',
                    labelBtnModal: 'Add new packages',
                    labelBtnSecondaryModal: 'Back',
                    handelBtn: create
                })
                setOpenModal(prevOpenModal => !prevOpenModal)
            }else if(param === 'packaging'){
                setDataModal({
                    size: 'lg',
                    labelModal: 'Add packaging',
                    labelBtnModal: 'Add new packaging',
                    labelBtnSecondaryModal: 'Back',
                    handelBtn: create
                })
                setOpenModal(prevOpenModal => !prevOpenModal)
            }else if(param === 'packages-product'){
                setDataModal({
                    size: 'lg',
                    labelModal: 'Add package product',
                    labelBtnModal: 'Add new package product',
                    labelBtnSecondaryModal: 'Back',
                    handelBtn: create
                })
                setOpenModal(prevOpenModal => !prevOpenModal)
            }
        }

        const create = async (param) => {
            setLoading(prevLoading => !prevLoading)
            let dataBody = {}
            if(param === 'packages'){
                dataBody = {
                    package_name: refBody.package_nameRef.current.value,
                    package_weight: refBody.package_weightRef.current.value,
                }
                try {
                    const {status} = await postApiData(param, dataBody)
                    if(status === 201) {
                        setRefresh(!refresh)
                        setOpenModal(prevOpenModal => !prevOpenModal)
                        setLoading(prevLoading => !prevLoading)
                    }
                } catch (error) {
                    setLoading(prevLoading => !prevLoading)
                    setResponseError(error.response.data.errors)
                }
            }else if(param === 'packaging'){
                dataBody = {
                    product_id: refBody.product_idRef.current.value,
                    weight: refBody.product_idRef.current.value,
                    package_type: refBody.package_typeRef.current.value
                }
                try {
                    const {status} = await postApiData(param, dataBody)
                    if(status === 201) {
                        setRefresh(!refresh)
                        setOpenModal(prevOpenModal => !prevOpenModal)
                        setLoading(prevLoading => !prevLoading)
                    }
                } catch (error) {
                    setLoading(prevLoading => !prevLoading)
                    setResponseError(error.response.data.errors)
                }
            } else if(param === 'packages-product'){
                dataBody = {
                    product_id: refBody.product_idRef.current.value,
                    package_id: refBody.package_idRef.current.value
                }
                try {
                    const {status} = await postApiData(param, dataBody)
                    if(status === 201) {
                        setRefresh(!refresh)
                        setOpenModal(prevOpenModal => !prevOpenModal)
                        setLoading(prevLoading => !prevLoading)
                    }
                } catch (error) {
                    setLoading(prevLoading => !prevLoading)
                    setResponseError(error.response.data.errors)
                }
            } else {
                dataBody = {
                    package_name: refBody.package_nameRef.current.value,
                    package_weight: refBody.package_weightRef.current.value,
                }
                try {
                    const {status} = await postApiData('packages', dataBody)
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


    const inputBody = (param) => {
        if(param === 'packages'){
            return (
                <>
                 <div className="grid gap-4 mb-4 grid-cols-1">
                            {inputPackages.map( (item, index) => (
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
        }else if(param === 'packaging'){
            return (
                <>
                 <div className="grid gap-4 mb-4 grid-cols-1">
                            {inputPackaging.map( (item, index) => (
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
        }else if(param === 'packages-product'){
            return (
                <>
                 <div className="grid gap-4 mb-4 grid-cols-1">
                            {inputPackageProduct.map( (item, index) => (
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
        openModal,
        handleCreate,
        dataModal,
        inputPackages,
        validationError,
        handleEdit,
        dataEdit,
        refBody,
        openModalDelete,
        closeModalDelete,
        handleDelete,
        modalDelete,
        loading,
        handleClickHeading,
        dataHeading,
        setOpenModal,
        inputBody,
    }
}