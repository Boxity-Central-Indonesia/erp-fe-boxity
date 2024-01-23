import { useEffect, useState, useRef } from "react"
import TabelComponent from "../layouts/Tabel"
import IconAdd from "../layouts/icons/IconAdd"
import { getApiData, postApiData, putApiData, deleteApiData } from "../../../function/Api"
import { ModalConfirmDelete, ModalContainer } from "../layouts/ModalContainer"


const Products = () => {
    const [data, setData] = useState()
    const [openModal, setOpenModal] = useState()
    const [dataEdit, setDataEdit] = useState({})
    const [dataModal, setDataModal] = useState({})
    const [refresh, setRefresh] = useState(false)
    const [modalDelete, setModalDelete] = useState()
    const [idDelete, setIdDelete] = useState()

    const toggleOpenModal = () => {
        setOpenModal(!openModal)
    }

    const refBody = {
        nameRef: useRef(),
        codeRef: useRef(),
        priceRef: useRef(),
        typeRef: useRef(),
        companyIdRef: useRef(),
        stockRef: useRef(),
        descriptionRef: useRef(),
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
                    type: item.type,
                    stock: item.stock,
                    price: item.price 
                 }))

                 setData(() => newData)
            } catch (error) {
                
            }
        }

        fetchData()
    },[refresh])
    // fetch data end

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
        toggleOpenModal()
    }

    const create = async () => {
        const dataBody = {
            name: refBody.nameRef.current.value,
            code: refBody.codeRef.current.value,
            price: refBody.priceRef.current.value,
            type: refBody.typeRef.current.value,
            stock: refBody.stockRef.current.value,
            description: refBody.descriptionRef.current.value,
        }

        try {
            const response = await postApiData('products', dataBody)
            toggleOpenModal()
            setRefresh(!refresh)
        } catch (error) {
            console.log(error);
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
                code: refBody.codeRef.current.value,
                price: refBody.priceRef.current.value,
                type: refBody.typeRef.current.value,
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
    

    const modalBody = () => {
        return (
            <>
            <form className="">
                <input type="hidden" name="id" ref={refBody.idRef} value={dataEdit.id}/>
            <div className="grid gap-4 mb-4 grid-cols-4">
                <div className="col-span-2">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input type="text" name="name" id="name" value={dataEdit.name} onChange={handleChange} ref={refBody.nameRef} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Product name" required="" />
                </div>
                <div className="col-span-2">
                    <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Code</label>
                    <input type="text" name="code" id="code" value={dataEdit.code} onChange={handleChange} ref={refBody.codeRef} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Product code" required="" />
                </div>
                <div className="col-span-2">
                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                    <input type="number" name="price" id="price" value={dataEdit.price} onChange={handleChange} ref={refBody.priceRef} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Produk price" required="" />
                </div>
                <div className="col-span-2">
                    <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">type</label>
                    <input type="text" name="type" id="type" value={dataEdit.type} onChange={handleChange} ref={refBody.typeRef} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Produk type" required="" />
                </div>
                <div className="col-span-4">
                    <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock</label>
                    <input type="number" name="stock" id="stock" value={dataEdit.stock} onChange={handleChange} ref={refBody.stockRef} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Products stock" required="" />
                </div>
                <div className="col-span-2 sm:col-span-4">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <textarea id="description" name="description" onChange={handleChange} ref={refBody.descriptionRef} value={dataEdit.description} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Write product description here"></textarea>                    
                    </div>
                {/* <div className="col-span-4">
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Companies</label>
                    <select defaultValue={dataEdit.company_id} id="category" ref={refBody.companyIdRef} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option>Select companies</option>
                        { dataCompanies && dataCompanies.map( item => (
                            <option key={item.id} value={item.id}>{item.company}</option>
                        ))}
                    </select>
                </div> */}
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
            sizeModal={'2xl'}
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