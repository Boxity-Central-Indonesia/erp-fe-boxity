import { useEffect, useState, useRef } from "react"
import TabelComponent from "../../../layouts/Tabel"
import IconAdd from "../../../layouts/icons/IconAdd"
import { getApiData, postApiData, putApiData, deleteApiData } from "../../../../function/Api"
import { ModalConfirmDelete, ModalContainer } from "../../../layouts/ModalContainer"
import FormInput, { TextArea } from "../../../layouts/FormInput"


const Products = () => {
    const [data, setData] = useState()
    const [openModal, setOpenModal] = useState()
    const [dataEdit, setDataEdit] = useState({})
    const [dataModal, setDataModal] = useState({})
    const [refresh, setRefresh] = useState(false)
    const [modalDelete, setModalDelete] = useState()
    const [idDelete, setIdDelete] = useState()
    const [input, setInput] = useState([])
    const [responseError, setResponseError] = useState()
    const [validationError, setValidationError] = useState()
    const [dataWarehouses, setDataWarehouses] = useState()
    const [dataCategory, setDataCategory] = useState()

    const toggleOpenModal = () => {
        setOpenModal(!openModal)
    }

    const refBody = {
        nameRef: useRef(),
        priceRef: useRef(),
        typeRef: useRef(),
        stockRef: useRef(),
        descriptionRef: useRef(),
        typeRef: useRef(),
        subtypeRef: useRef(),
        sizeRef: useRef(),
        colorRef: useRef(),
        brandRef: useRef(),
        modelRef: useRef(),
        skuRef: useRef(),
        imageRef: useRef(),
        vidioRef: useRef(),
        raw_materialRef: useRef(),
        unit_of_measureRef: useRef(),
        warehouse_idRef: useRef(),
        category_idRef: useRef(),
        idRef: useRef()
    }


    // fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getApiData('products')
                const newData = response.data.map(item => ({
                    id: item.id,
                    code: item.code,
                    name: item.name,
                    warehouse_id: item.warehouse_id ?? '--',
                    category: item.category_id ?? '--',
                    type: item.type,
                    stock: item.stock,
                    price: item.price 
                 }))

                 setData(() => newData)
            } catch (error) {
                
            }
        }

        fetchData()
        const getWarehouses = async () => {
            try {
                const response = await getApiData('warehouses')
                const newData = response.data.map(item => ({
                    id: item.id,
                    name: item.name
                }))
    
                setDataWarehouses(() => newData)
            } catch (error) {
                console.log(error);
            }
        }
        const getCategoryProduct = async () => {
            try {
                const {data, status} = await getApiData('product-categories')
                if(status === 200) {
                    const newData = data.map(item => ({
                        id: item.id,
                        name: item.name
                    })) 

                    setDataCategory(() => newData)
                }
            } catch (error) {
                console.log(error);
            }
        }

        
        getWarehouses()
        getCategoryProduct()
    },[])
    // fetch data end

    // validation error

    useEffect(() => {
        if(!!responseError){
            setValidationError(
                {
                    name: !!responseError.name ? responseError.name[0] : '',
                    price: !!responseError.price ? responseError.price[0] : '',
                    type: !!responseError.type ? responseError.type[0] : '',
                    stock: !!responseError.stock ? responseError.stock[0] : '',
                }
            )
        }
    }, [responseError])

    // validation error end

    // create
    const handelCreate = () => {
        setDataModal(
            {
                labelModal: 'Add product',
                labelBtnModal: 'Add new product',
                labelBtnSecondaryModal: 'Back',
                handelBtn: create
            }
        )

        setDataEdit(
            {
                name: '',
                code: '',
                price: '',
                type: '',
                stock: '',
                description: '',
                id: ''
            }
        )
        setValidationError(
            {
                name: '',
                price: '',
                type: '',
                stock: '',
            }
        )
        toggleOpenModal()
    }

    const create = async () => {
        const dataBody = {
            name: refBody.nameRef.current.value,
            price: refBody.priceRef.current.value,
            type: refBody.typeRef.current.value,
            subtype: refBody.subtypeRef.current.value,
            size: refBody.sizeRef.current.value,
            color: refBody.colorRef.current.value,
            brand: refBody.brandRef.current.value,
            model: refBody.modelRef.current.value,
            sku: refBody.skuRef.current.value,
            image: refBody.imageRef.current.value,
            vidio: refBody.vidioRef.current.value,
            raw_material: refBody.raw_materialRef.current.value,
            unit_of_measure: refBody.unit_of_measureRef.current.value,
            warehouse_id: refBody.warehouse_idRef.current.value,
            category_id: refBody.category_idRef.current.value,
            stock: refBody.stockRef.current.value,
            description: refBody.descriptionRef.current.value,
        }

        try {
            const response = await postApiData('products', dataBody)
            toggleOpenModal()
            setRefresh(!refresh)
        } catch (error) {
            setResponseError(error.response.data)
        }
    }
    // create end


    // eidt
    const handleChange = (event) => {
        // Mendapatkan nama dan nilai input yang berubah
        const { name, value } = event.target;
        
        // Memperbarui state sesuai dengan nilai input yang berubah
        setDataEdit((prevDataEdit) => ({
            ...prevDataEdit,
            [name]: value,
          }));
        };

        const edit =  async () => {
            const dataBody = {
                name: refBody.nameRef.current.value,
                price: refBody.priceRef.current.value,
                type: refBody.typeRef.current.value,
                subtype: refBody.subtypeRef.current.value,
                size: refBody.sizeRef.current.value,
                color: refBody.colorRef.current.value,
                brand: refBody.brandRef.current.value,
                model: refBody.modelRef.current.value,
                sku: refBody.skuRef.current.value,
                image: refBody.imageRef.current.value,
                vidio: refBody.vidioRef.current.value,
                raw_material: refBody.raw_materialRef.current.value,
                unit_of_measure: refBody.unit_of_measureRef.current.value,
                warehouse_id: refBody.warehouse_idRef.current.value,
                category_id: refBody.category_idRef.current.value,
                stock: refBody.stockRef.current.value,
                description: refBody.descriptionRef.current.value,
            }
    
            try {
                const response = await putApiData('products/' + refBody.idRef.current.value , dataBody)
                setRefresh(!refresh)
                setOpenModal((prevOpenModal) => !prevOpenModal)
            } catch (error) {
                
            }
        }

    const handelEdit = async  (param) => {
        setDataModal(
            {
                labelModal: 'Edit product',
                labelBtnModal: 'Save',
                labelBtnSecondaryModal: 'Delete',
                handelBtn: () => edit()
            }
        )

        setValidationError(
            {
                name: '',
                price: '',
                type: '',
                stock: '',
            }
        )

        try {
            const response = await getApiData('products/' + param)
            setDataEdit(
                {
                    name: response.data.name,
                    code: response.data.code,
                    price: response.data.price,
                    type: response.data.type,
                    stock: response.data.stock,
                    description: response.data.description,
                    id: response.data.id
                }
            )
            setIdDelete(response.data.id)
            setOpenModal((prevOpenModal) => !prevOpenModal)
        } catch (error) {
            console.log(error);
        }
    }

    // eidt end


    // delete
    const openModalDelete = () => {
        setModalDelete(!modalDelete)
        toggleOpenModal()
    }
    
    const closeModalDelete = () => {
        setModalDelete(!modalDelete)
      }

    
    const handelDelete = async () => {
        try {
            await deleteApiData('products/' + idDelete)
            setRefresh(!refresh)
            closeModalDelete()
        } catch (error) {
            console.log(error);
        }
    }
    // delete end

    const dataHeading = [
        {
            label: 'Add products',
            icon: IconAdd(),
            heading: 'Product list',
            eventToggleModal: handelCreate,
        }
    ]
    
    useEffect(() => {
        setInput([
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
                name: 'price',
                ref: refBody.priceRef,
                value: dataEdit.price,
                label: 'Price',
                htmlFor: 'price',
                id: 'price',
                onchange: handleChange,
                placeholder: 'Price',
            },
            {
                element: 'input',
                type: 'text',
                name: 'type',
                ref: refBody.typeRef,
                value: dataEdit.type,
                label: 'Type',
                htmlFor: 'type',
                id: 'type',
                onchange: handleChange,
                placeholder: 'Type',
            },
            {
                element: 'input',
                type: 'text',
                name: 'subtype',
                ref: refBody.subtypeRef,
                value: dataEdit.subtype,
                label: 'SubType',
                htmlFor: 'subtype',
                id: 'subtype',
                onchange: handleChange,
                placeholder: 'SubType',
            },
            {
                element: 'input',
                type: 'number',
                name: 'size',
                ref: refBody.sizeRef,
                value: dataEdit.size,
                label: 'Size',
                htmlFor: 'size',
                id: 'size',
                onchange: handleChange,
                placeholder: 'Size',
            },
            {
                element: 'input',
                type: 'text',
                name: 'color',
                ref: refBody.colorRef,
                value: dataEdit.color,
                label: 'Colour',
                htmlFor: 'color',
                id: 'color',
                onchange: handleChange,
                placeholder: 'Colour',
            },
            {
                element: 'input',
                type: 'text',
                name: 'brand',
                ref: refBody.brandRef,
                value: dataEdit.brand,
                label: 'Brand',
                htmlFor: 'brand',
                id: 'brand',
                onchange: handleChange,
                placeholder: 'Brand',
            },
            {
                element: 'input',
                type: 'text',
                name: 'model',
                ref: refBody.modelRef,
                value: dataEdit.model,
                label: 'Model',
                htmlFor: 'model',
                id: 'model',
                onchange: handleChange,
                placeholder: 'Model',
            },
            {
                element: 'input',
                type: 'text',
                name: 'sku',
                ref: refBody.skuRef,
                value: dataEdit.sku,
                label: 'SKU',
                htmlFor: 'sku',
                id: 'sku',
                onchange: handleChange,
                placeholder: 'SKU',
            },
            {
                element: 'file',
                type: 'file',
                name: 'image',
                ref: refBody.imageRef,
                value: dataEdit.image,
                label: 'Image',
                htmlFor: 'image',
                id: 'image',
                onchange: handleChange,
                placeholder: 'Image',
            },
            {
                element: 'file',
                type: 'file',
                name: 'vidio',
                ref: refBody.vidioRef,
                value: dataEdit.vidio,
                label: 'Vidio',
                htmlFor: 'vidio',
                id: 'vidio',
                onchange: handleChange,
                placeholder: 'Vidio',
            },
            {
                element: 'input',
                type: 'number',
                name: 'stock',
                ref: refBody.stockRef,
                value: dataEdit.stock,
                label: 'Stock',
                htmlFor: 'stock',
                id: 'stock',
                onchange: handleChange,
                placeholder: 'Stock',
            },
            {
                element: 'input',
                type: 'text',
                name: 'raw_material',
                ref: refBody.raw_materialRef,
                value: dataEdit.raw_material,
                label: 'Raw Material',
                htmlFor: 'raw_material',
                id: 'raw_material',
                onchange: handleChange,
                placeholder: 'Raw Material',
            },
            {
                element: 'input',
                type: 'text',
                name: 'unit_of_measure',
                ref: refBody.unit_of_measureRef,
                value: dataEdit.unit_of_measure,
                label: 'Unit of measure',
                htmlFor: 'unit_of_measure',
                id: 'unit_of_measure',
                onchange: handleChange,
                placeholder: 'Unit of measure',
            },
            {
                element: 'select',
                ref: refBody.warehouse_idRef,
                name: 'warehouses_id',
                label: 'Warehouses',
                htmlFor: 'categori-warehouses',
                id: 'categori-warehouses',
                dataSelect: dataWarehouses,
                value: dataEdit.warehouses_id,
                // onchange: handleChangeAndGetDepartment
            },
            {
                element: 'select',
                ref: refBody.category_idRef,
                name: 'category_id',
                label: 'Categori product',
                htmlFor: 'categori-id',
                id: 'categori-id',
                dataSelect: dataCategory,
                value: dataEdit.category_id,
                // onchange: handleChangeAndGetDepartment
            },
        ])
    }, [dataEdit])

    const modalBody = () => {
        return (
            <>
            <form className="">
                <input type="hidden" name="id" ref={refBody.idRef} value={dataEdit.id}/>
            <div className="grid gap-4 mb-4 grid-cols-3">
                {input.map((item, index) => (
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
                       onChange={item.onchange}
                       placeholder={item.placeholder} 
                       dataSelect={item.dataSelect}
                       uniqueId={index}
                       validationError={validationError}
                       />
                ))}
                < TextArea 
                    span={`col-span-3`}
                    label={'Description'}
                    htmlFor={'description'}
                    id={'description'}
                    name={'description'}
                    referens={refBody.descriptionRef}
                    placeholder={'Write description here'}
                />
            </div>
        </form>
        </>
        )
    }

    return(
        <>
            < ModalContainer 
            openModal={openModal}
            onToggleModal={handelCreate}
            modalBody={modalBody}
            sizeModal={'6xl'}
            labelModal={dataModal.labelModal}
            labelBtnModal={dataModal.labelBtnModal}
            labelBtnSecondaryModal={dataModal.labelBtnSecondaryModal}
            handelBtnModal={dataModal.handelBtn}
            openModalDelete={openModalDelete}
            />

            < ModalConfirmDelete 
            modalDelete={modalDelete}
            closeModalDelete={closeModalDelete}
            handelDelete={handelDelete}
            />

            < TabelComponent data={data} dataHeading={dataHeading} handelEdit={handelEdit}/>        
        </>
    )
}


export default Products