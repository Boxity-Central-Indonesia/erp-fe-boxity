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
    const [skeleton, setSkeleton] = useState(false)
    const [dataOrder, setDataOrder] = useState()
    const [path, setPath] = useState('packages')
    const [dataProductSelect, setDataProducstSelect] = useState()
    const [dataPackagesSelect, setDataPackagesSelect] = useState()
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
            // eventToggleModal: handleCreate,
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
        idRef: useRef(),
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
                dataSelect: dataProductSelect,
                value: dataEdit.product_id,
                onchange: handleChange
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
                dataSelect: dataProductSelect,
                value: dataEdit.package_id,
                onchange: handleChange
            },
            {
                element: 'select',
                ref: refBody.product_idRef,
                name: 'product_id',
                label: 'Product',
                htmlFor: 'product-id',
                id: 'product-id',
                dataSelect: dataPackagesSelect,
                value: dataEdit.product_id,
                onchange: handleChange
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
                    const {data, status} = await getApiData(path) 
                    if(status === 200) {
                       if(path === 'packages'){
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
                                    activeButton: path,
                                    onclick: handleClickHeading,
                                    eventToggleModal: handleCreate,
                                }
                            ])
                       }else if(path === 'packaging'){
                        const newData = dataPackaging(data)
                        setData(() => newData)
                        setDataHeading([
                            {
                                label: 'Add packaging',
                                icon: IconAdd(),
                                heading: 'Packaging list',
                                showNavHeading: true,
                                dataNavHeading: [
                                    {path: 'packages', label: 'Packages'},
                                    {path: 'packaging', label: 'Packaging'},
                                    {path: 'packages-product', label: 'Packages product'},
                                ],
                                activeButton: path,
                                onclick: handleClickHeading,
                                eventToggleModal: handleCreate,
                            }
                        ])
                       }else if(path === 'packages-product'){
                        const newData = dataPackaging(data)
                        setData(() => newData)
                        setDataHeading([
                            {
                                label: 'Add packages product',
                                icon: IconAdd(),
                                heading: 'Packages product list',
                                showNavHeading: true,
                                dataNavHeading: [
                                    {path: 'packages', label: 'Packages'},
                                    {path: 'packaging', label: 'Packaging'},
                                    {path: 'packages-product', label: 'Packages product'},
                                ],
                                activeButton: path,
                                onclick: handleClickHeading,
                                eventToggleModal: handleCreate,
                            }
                        ])
                       }
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            getData()
        }, [refresh])

        useEffect(() => {
            const getDataForSelec = async () => {
                try {
                    const {data, status} = await getApiData('products')
                    if(status === 200){
                        const newData = data.map(item => ({
                            id: item.id,
                            name: item.name
                        }))
                        setDataProducstSelect(() => newData)
                    } 
                } catch (error) {
                    console.log(error);
                }
                try {
                    const {data, status} = await getApiData('packages')
                    if(status === 200){
                        const newData = data.map(item => ({
                            id: item.id,
                            name: item.name
                        }))
                        setDataPackagesSelect(() => newData)
                    } 
                } catch (error) {
                    
                }
            }

            getDataForSelec()
            
        },[path])


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
            setPath(param)
            setDataHeading([
                {
                    label: param === 'packages' ? 'Add package' : param === 'packaging' ? 'Add packaging' : 'Add package product',
                    icon: IconAdd(),
                    heading:  param === 'packages' ? 'Package list' : param === 'packaging' ? 'Packaging list' : 'Package product list',
                    eventToggleModal: handleCreate,
                    onclick: handleClickHeading,
                    parameter: param,
                    showNavHeading: true,
                    activeButton: param,
                    dataNavHeading: [
                        {path: 'packages', label: 'Packages'},
                        {path: 'packaging', label: 'Packaging'},
                        {path: 'packages-product', label: 'Packages product'},
                    ],
                }
            ])
            setData([1])
            setSkeleton(prevSkeleton => !prevSkeleton)
            try {
                const {data,status} = await getApiData(param)
                if(status === 200) {
                    if(param === 'packages'){
                        setPath(param)
                        const newData = dataPackages(data)
                        setSkeleton(prevSkeleton => !prevSkeleton)
                        setData(newData)
                    }else if(param === 'packaging') {
                        setPath(param)
                        const newData = dataPackaging(data)
                        setSkeleton(prevSkeleton => !prevSkeleton)
                        setData(newData)
                    }else if(param === 'packages-product'){
                        setPath(param)
                        const newData = dataPackagesProduct(data)
                        setSkeleton(prevSkeleton => !prevSkeleton)
                        setData(newData)
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
                    handleBtn: create
                })
                setOpenModal(prevOpenModal => !prevOpenModal)
            }else if(param === 'packaging'){
                setDataModal({
                    size: 'lg',
                    labelModal: 'Add packaging',
                    labelBtnModal: 'Add new packaging',
                    labelBtnSecondaryModal: 'Back',
                    handleBtn: create
                })
                setOpenModal(prevOpenModal => !prevOpenModal)
            }else if(param === 'packages-product'){
                setDataModal({
                    size: 'lg',
                    labelModal: 'Add package product',
                    labelBtnModal: 'Add new package product',
                    labelBtnSecondaryModal: 'Back',
                    handleBtn: create
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
                        setPath(param)
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
                        setPath(param)
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
                        setPath(param)
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
        const handleEdit  = async (param) => {
            const id = param.querySelector('span.hidden').textContent
            if(path === 'packages'){
                setDataModal({
                    size: 'lg',
                    labelModal: 'Detail & edit packages',
                    labelBtnModal: 'Save',
                    labelBtnSecondaryModal: 'Delete',
                    handleBtn: edit
                })
                setValidationError(
                    {
                        package_name: '',
                        package_weight: '',
                    }
                )

                setOpenModal(prevOpenModal => !prevOpenModal)
                try {
                    const {data, status} = await getApiData(path + '/' + id)
                    if(status === 200) {
                        setDataEdit(
                            {
                                package_name: data.package_name,
                                package_weight: data.package_weight,
                                id: data.id
                            }
                        )
        
                        setIdDelete(data.id)
                    }
                } catch (error) {
                    console.log(error);
                }
    
            }else if(path === 'packaging'){
                setDataModal({
                    size: 'lg',
                    labelModal: 'Detail & edit packaging',
                    labelBtnModal: 'Save',
                    labelBtnSecondaryModal: 'Delete',
                    handleBtn: edit
                })
                setValidationError(
                    {
                        product_id: '',
                        weight: '',
                        package_type: ''
                    }
                )

                setOpenModal(prevOpenModal => !prevOpenModal)
                try {
                    const {data, status} = await getApiData(path + '/' + id)
                    if(status === 200) {
                        setDataEdit(
                            {
                                product_id: data.product_id,
                                weight: data.weight,
                                package_type: data.package_type,
                                id: data.id
                            }
                        )
        
                        setIdDelete(data.id)
                    }
                } catch (error) {
                    console.log(error);
                }
            }else if(path === 'packages-product'){
                setDataModal({
                    size: 'lg',
                    labelModal: 'Detail & edit packages product',
                    labelBtnModal: 'Save',
                    labelBtnSecondaryModal: 'Delete',
                    handleBtn: edit
                })
                setValidationError(
                    {
                        product_id: '',
                        package_id: '',
                    }
                )

                setOpenModal(prevOpenModal => !prevOpenModal)
                try {
                    const {data, status} = await getApiData(path + '/' + id)
                    if(status === 200) {
                        setDataEdit(
                            {
                                product_id: data,product_id,
                                package_id: data.package_id,
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
           if(path === 'packages'){
                dataBody = {
                    package_name: refBody.package_nameRef.current.value,
                    package_weight: refBody.package_weightRef.current.value,
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
           }else if(path === 'packaging'){
                dataBody = {
                    product_id: refBody.product_idRef.current.value,
                    weight: refBody.product_idRef.current.value,
                    package_type: refBody.package_typeRef.current.value
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
           }else if(path === 'packages-product'){
            dataBody = {
                product_id: refBody.product_idRef.current.value,
                package_id: refBody.package_idRef.current.value
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
            setLoading(prevLoading => !prevLoading)
            try {
              await deleteApiData(path + '/' + idDelete)
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
        skeleton,
        handleEdit,
        path,
    }
}