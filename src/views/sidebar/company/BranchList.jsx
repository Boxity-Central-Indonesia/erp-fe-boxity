import { useEffect, useState, useRef } from "react"
import TabelComponent from "../layouts/Tabel"
import IconAdd from "../layouts/icons/IconAdd"
import { deleteApiData, getApiData, postApiData, putApiData } from "../../../function/Api"
import { ModalConfirmDelete, ModalContainer } from "../layouts/ModalContainer"

const BranchList = () => {
    const [data, setData] = useState()
    const [openModal, setOpenModal] = useState(false)
    const [dataModal, setDataModal] = useState({})
    const [dataCompanies, setDataCompanies] = useState()
    const [dataEdit, setDataEdit] = useState({})
    const [refresh,setRefresh] = useState(false)
    const [idDelete, setIdDelete] = useState()
    const [modalDelete, setModalDelete] = useState();
    


    const toggleOpenModal = () => {
        setOpenModal(!openModal)
    }

    const refBody = {
        nameRef: useRef(),
        addressRef: useRef(),
        phoneNumberRef: useRef(),
        emailRef: useRef(),
        companyIdRef: useRef(),
        idRef: useRef()
    }


    // get data
    
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await getApiData('companies/3/branches')
                const newData = response.data.map(item => ({
                    id: item.id,
                    name: item.name,
                    email: item.email,
                    address: item.address,
                    'Phone number': item.phone_number,
                    company: item.company.name
                }))
                setData(() => newData)
            } catch (error) {
                console.log(error);
            }
        }
        getData()
    }, [refresh])


    useEffect(() => {
        const getDataCompanies = async () => {
            try {
                const response = await getApiData('companies')
                const newData = response.data.map(item => ({
                    id: item.id,
                    company: item.name
                 }))

                 setDataCompanies(() => newData)
            } catch (error) {
                console.log(error);
            }
        }

        getDataCompanies()
    }, [])

    // get data end

    // create
    
    const handelCreate = () => {
        setDataModal(
            {
                size: '3xl',
                labelModal: 'Add branch',
                labelBtnModal: 'Add new branch',
                labelBtnSecondaryModal: 'Back',
                handelBtn: () => create()
            }
        )
        toggleOpenModal()
    }

    const handleChange = (event) => {
        // Mendapatkan nama dan nilai input yang berubah
        const { name, value } = event.target;
        
        // Memperbarui state sesuai dengan nilai input yang berubah
        setDataEdit((prevDataEdit) => ({
            ...prevDataEdit,
            [name]: value,
          }));
        };

    const create = async () => {
        const dataBody = {
            name: refBody.nameRef.current.value,
            address: refBody.addressRef.current.value,
            phone_number: refBody.phoneNumberRef.current.value,
            email: refBody.emailRef.current.value,
            company_id: refBody.companyIdRef.current.value
        }


        setDataEdit({
            name: '',
            address: '',
            phone_number: '',
            email: '',
            company_id: ''
        })

        try {
            const response = await postApiData('companies/2/branches', dataBody)
            if(response.status == 201) {
                setRefresh(!refresh)
                setOpenModal((prevOpenModal) => !prevOpenModal)
            }
        } catch (error) {
            console.log(error);
        }   
        
       
    }
    // create end


    // edit

    const edit = async () => {
        const dataBody = {
            name: refBody.nameRef.current.value,
            address: refBody.addressRef.current.value,
            phone_number: refBody.phoneNumberRef.current.value,
            email: refBody.emailRef.current.value,
            company_id: refBody.companyIdRef.current.value
        }

        try {
            const response = await putApiData('companies/2/branches/' + refBody.idRef.current.value, dataBody)
            console.log(response);
            if(response.status == 201){
                setRefresh(!refresh)
                setOpenModal((prevOpenModal) => !prevOpenModal)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handelEdit = async (param) => {
        setDataModal({
            size: 'md',
            labelModal: 'Edit branches',
            labelBtnModal: 'Save',
            labelBtnSecondaryModal: 'Delete',
            handelBtn: edit
        })
        try {
            const response = await getApiData('companies/2/branches/' + param)

            if(response.status == 200) {
                setDataEdit({
                    name: response.data.name,
                    address: response.data.address,
                    phone_number: response.data.phone_number,
                    email: response.data.email,
                    company_id: response.data.company_id,
                    id: response.data.id
                })

                setIdDelete(response.data.id)
                setOpenModal((prevOpenModal) => !prevOpenModal)
            }
        } catch (error) {
            console.log(error);
        }
    }

    // edit end


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
            await deleteApiData('companies/3/branches/' + idDelete)
            setRefresh(!refresh)
            closeModalDelete()
        } catch (error) {
            console.log(error);
        }
    }
    // delete end



    const dataModalBody = () => {
        return (
            <>
            <form className="">
                <input type="hidden" name="id" ref={refBody.idRef} value={dataEdit.id}/>
            <div className="grid gap-4 mb-4 grid-cols-4">
                <div className="col-span-2">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input type="text" name="name" id="name" value={dataEdit.name} onChange={handleChange} ref={refBody.nameRef} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Branch name" required="" />
                </div>
                <div className="col-span-2">
                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                    <input type="text" name="address" id="address" value={dataEdit.address} onChange={handleChange} ref={refBody.addressRef} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Branch address" required="" />
                </div>
                <div className="col-span-2">
                    <label htmlFor="phone-number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                    <input type="text" name="phone_number" id="phone-number" value={dataEdit.phone_number} onChange={handleChange} ref={refBody.phoneNumberRef} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Phone number" required="" />
                </div>
                <div className="col-span-2">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="text" name="email" id="email" value={dataEdit.email} onChange={handleChange} ref={refBody.emailRef} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Branch email" required="" />
                </div>
                <div className="col-span-4">
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Companies</label>
                    <select defaultValue={dataEdit.company_id} id="category" ref={refBody.companyIdRef} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option>Select companies</option>
                        { dataCompanies && dataCompanies.map( item => (
                            <option key={item.id} value={item.id}>{item.company}</option>
                        ))}
                    </select>
                </div>
            </div>
        </form>
        </>
        )
    }

    const dataHeading = [{
        label: 'Add branch',
        icon: IconAdd(),
        heading: 'Branch list',
        eventToggleModal: handelCreate,
    }]

    return(
        <>
            <ModalContainer
            openModal={openModal}
            onToggleModal={handelCreate}
            modalBody={dataModalBody}
            sizeModal={'2xl'}
            labelModal={dataModal.labelModal}
            labelBtnModal={dataModal.labelBtnModal}
            labelBtnSecondaryModal={dataModal.labelBtnSecondaryModal}
            handelBtnModal={dataModal.handelBtn}
            openModalDelete={openModalDelete}
            />

            < ModalConfirmDelete modalDelete={modalDelete} closeModalDelete={closeModalDelete} handelDelete={handelDelete}/>

            < TabelComponent data={data} dataHeading={dataHeading} handelEdit={handelEdit}/>
        </>
    )
}


export default BranchList