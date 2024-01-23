import { useEffect, useState, useRef} from "react"
import TabelComponent from "../layouts/Tabel"
import IconAdd from "../layouts/icons/IconAdd"
import { getApiData, postApiData, putApiData, deleteApiData } from "../../../function/Api"
import { ModalConfirmDelete, ModalContainer } from "../layouts/ModalContainer"


const Departement = () => {
    const [openModal, setOpenModal] = useState(false);
    const [data, setData] = useState();
    const [dataModal, setDataModal] = useState({});
    const [dataCompanies, setDataCompanies] = useState();
    const [refresh, setRefresh] = useState(false);
    const [dataEdit, setDataEdit] = useState({});
    const [modalDelete, setModalDelete] = useState(false);
    const [idDelete, setIdDelete] = useState()


    const toggleOpenModal = () => {
        setOpenModal(!openModal); 
    };

    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await getApiData('companies/2/departments')
                const newData = response.data.map(item => ({
                    id: item.id,
                    name: item.name,
                    responsibilities: item.responsibilities,
                    company: item.company.name,
                }))
                setData(() => newData)
            } catch (error) {
                console.log(error);
            }
        }

        fetchData()
    }, [refresh])

    useEffect(() => {
        const fetchData = async () => {
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

        fetchData()
    }, [])


    // create departemen

    const handelCreate = () => {
        setDataModal({
          size: 'md',
          labelModal: 'Add Company',
          labelBtnModal: 'Add new company',
          labelBtnSecondaryModal: 'Back',
          handelBtn: () => create()
        })
  
        // setDataEdit({
        //   name: '',
        //   email: '',
        //   phone_number: '',
        //   id: '',
        //   website: '',
        //   address: '',
        //   city: '',
        //   province: '',
        //   postal_code: '',
        //   country: '',
        //   industry: '',
        //   description: '',
        // });
        toggleOpenModal()
      }

      const dataHeading = [{
        label: 'Add Departement',
        icon: IconAdd(),
        heading: 'Departement list',
        eventToggleModal: handelCreate,
    }]

    const refBody = {
        nameRef: useRef(),
        responsibilitiesRef: useRef(),
        company_idRef: useRef(),
        idRef: useRef(),
    }
    const create = async() => {

        const dataBody = {
            name: refBody.nameRef.current.value,
            responsibilities: refBody.responsibilitiesRef.current.value,
            company_id: refBody.company_idRef.current.value
        }

        try {
            const response = await postApiData(`companies/${refBody.company_idRef}/departments`, dataBody)
            if(response.status == 201) {
                setOpenModal(!openModal)
                setRefresh(!refresh)
            }
        } catch (error) {
            
        }
    }

    // create departemen end


    // edit

    const handleChange = (event) => {
        // Mendapatkan nama dan nilai input yang berubah
        const { name, value } = event.target;
        
        // Memperbarui state sesuai dengan nilai input yang berubah
        setDataEdit((prevDataEdit) => ({
            ...prevDataEdit,
            [name]: value,
          }));
        };

    const edit = async () => {
        const dataBody = {
            name: refBody.nameRef.current.value,
            responsibilities: refBody.responsibilitiesRef.current.value,
            company_id: refBody.company_idRef.current.value
        }

        try {
            const response = await putApiData('companies/2/departments/' + refBody.idRef.current.value, dataBody)
            
            if(response.status == 201){
                setRefresh(!refresh)
                setOpenModal((prevOpenModal) => !prevOpenModal);
            }
        } catch (error) {
            console.log(error);
        }

    }

    const handelEdit =  async (param) => {
        setDataModal({
            size: 'md',
            labelModal: 'Edit Departmen',
            labelBtnModal: 'Save',
            labelBtnSecondaryModal: 'Delete',
            handelBtn: edit
        })

        try {
            const response = await getApiData('companies/2/departments/' + param)
            if(response.status == 200) {
                setDataEdit({
                    name: response.data.name,
                    responsibilities: response.data.responsibilities,
                    company_id: response.data.company_id,
                    id: response.data.id
                })

                setIdDelete(response.data.id)
                toggleOpenModal()
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
          await deleteApiData('companies/2/departments/' + idDelete)
          setRefresh(!refresh)
            closeModalDelete()
        } catch (error) {
          
        }
      }
  

    // delete end


    const dataModalBody = () => {
        return (
            <>
                <form className="">
                    <input type="hidden" name="id" ref={refBody.idRef} value={dataEdit.id}/>
                <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" name="name" id="name" value={dataEdit.name} onChange={handleChange} ref={refBody.nameRef} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Departmen name" required="" />
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Responsibilities</label>
                        <input type="text" name="responsibilities" id="price" value={dataEdit.responsibilities} onChange={handleChange} ref={refBody.responsibilitiesRef} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Responsibilities" required="" />
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Companies</label>
                        <select defaultValue={dataEdit.company_id} id="category" ref={refBody.company_idRef} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
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

    return (
        <>
            < ModalContainer 
                openModal={openModal}
                onToggleModal={handelCreate}
                modalBody={dataModalBody}
                sizeModal={'md'}
                labelModal={dataModal.labelModal}
                labelBtnModal={dataModal.labelBtnModal}
                labelBtnSecondaryModal={dataModal.labelBtnSecondaryModal}
                handelBtnModal={dataModal.handelBtn}
                openModalDelete={openModalDelete}
            />

            < ModalConfirmDelete modalDelete={modalDelete} closeModalDelete={closeModalDelete} handelDelete={handelDelete}/>

            <  TabelComponent data={data} dataHeading={dataHeading} handelEdit={handelEdit}/>
        </>
    )
}


export default Departement