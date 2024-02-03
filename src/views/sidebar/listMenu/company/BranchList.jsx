import { useEffect, useState, useRef } from "react"
import TabelComponent from "../../../layouts/Tabel"
import IconAdd from "../../../layouts/icons/IconAdd"
import { deleteApiData, getApiData, postApiData, putApiData } from "../../../../function/Api"
import { ModalConfirmDelete, ModalContainer } from "../../../layouts/ModalContainer"
import FormInput from "../../../layouts/FormInput"

const BranchList = () => {
    const [data, setData] = useState()
    const [openModal, setOpenModal] = useState(false)
    const [dataModal, setDataModal] = useState({})
    const [dataCompanies, setDataCompanies] = useState()
    const [dataEdit, setDataEdit] = useState({})
    const [refresh,setRefresh] = useState(false)
    const [idDelete, setIdDelete] = useState()
    const [modalDelete, setModalDelete] = useState();
    const [input, setInput] = useState([])
    const [responseError, setResponseError] = useState()
    const [validationError, setValidationError] = useState()
    


    const toggleOpenModal = () => {
        setOpenModal(!openModal)
    }

    const refBody = {
        nameRef: useRef(),
        addressRef: useRef(),
        phone_numberRef: useRef(),
        emailRef: useRef(),
        company_idRef: useRef(),
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
                    name: item.name
                 }))

                 setDataCompanies(() => newData)
            } catch (error) {
                console.log(error);
            }
        }

        getDataCompanies()
    }, [])

    // get data end

    // handelErro
    useEffect(() => {
        if(!!responseError){
            setValidationError({
                name: !!responseError.name ? responseError.name[0] : '',
                address:!!responseError.address ? responseError.address[0] : '',
                phone_number: !!responseError.phone_number ? responseError.phone_number[0] : '',
                email: !!responseError.email ? responseError.email[0] : '',
                company_id: !!responseError.company_id ? responseError.company_id[0] : '',
            })
        }
    }, [responseError])
    // handelErro end

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
        setDataEdit({
            name: '',
            address: '',
            phone_number: '',
            email: '',
            company_id: '',
            id: ''
        })
        setValidationError({
            name: '',
            address: '',
            phone_number: '',
            email: '',
            company_id: '',
        })
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
            phone_number: refBody.phone_numberRef.current.value,
            email: refBody.emailRef.current.value,
            company_id: refBody.company_idRef.current.value
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
            setResponseError(error.response.data)
        }   
        
       
    }
    // create end


    // edit

    const edit = async () => {
        const dataBody = {
            name: refBody.nameRef.current.value,
            address: refBody.addressRef.current.value,
            phone_number: refBody.phone_numberRef.current.value,
            email: refBody.emailRef.current.value,
            company_id: refBody.company_idRef.current.value
        }

        try {
            const response = await putApiData('companies/2/branches/' + refBody.idRef.current.value, dataBody)
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
        setValidationError({
            name: '',
            address: '',
            phone_number: '',
            email: '',
            company_id: '',
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
                element: 'select',
                ref: refBody.company_idRef,
                name: 'company_id',
                label: 'Companies',
                htmlFor: 'categori companies',
                id: 'categori companies',
                dataSelect: dataCompanies,
                value: dataEdit.company_id,
                onchange: handleChange
            },
        ])
    }, [dataEdit])

    const dataModalBody = () => {
        return (
            <>
            <form className="">
                <input type="hidden" name="id" ref={refBody.idRef} value={dataEdit.id}/>
            <div className="grid gap-4 mb-4 grid-cols-2">
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