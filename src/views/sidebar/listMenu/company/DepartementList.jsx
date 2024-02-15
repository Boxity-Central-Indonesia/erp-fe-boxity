import { useEffect, useState, useRef} from "react"
import TabelComponent from "../../../layouts/Tabel"
import IconAdd from "../../../layouts/icons/IconAdd"
import { getApiData, postApiData, putApiData, deleteApiData } from "../../../../function/Api"
import { ModalConfirmDelete, ModalContainer } from "../../../layouts/ModalContainer"
import FormInput from "../../../layouts/FormInput"


const Departement = () => {
    const [openModal, setOpenModal] = useState(false);
    const [data, setData] = useState();
    const [dataModal, setDataModal] = useState({});
    const [dataCompanies, setDataCompanies] = useState();
    const [refresh, setRefresh] = useState(false);
    const [dataEdit, setDataEdit] = useState({});
    const [modalDelete, setModalDelete] = useState(false);
    const [idDelete, setIdDelete] = useState()
    const [input, setInput] = useState([])
    const [responseError, setResponseError] = useState();
    const [validationError, setValidationError] = useState();
    const [selectedValue, setSelectedValue] = useState('');


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
                    company_id: item.company_id
                }))
                setData(() => newData)
            } catch (error) {
                console.log(error);
            }
        }

        fetchData()
    }, [refresh])

    useEffect(() => {
        if(!!responseError) {
            setValidationError(
                {
                    name: !!responseError.name ? responseError.name[0] : '',
                    responsibilities: !!responseError.responsibilities ? responseError.responsibilities[0] : '',
                    company_id: !!responseError.company_id ? responseError.company_id[0] : '',
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
    }, [])


    // create departemen

    const handleCreate = () => {
        setDataModal({
          size: 'md',
          labelModal: 'Add Company',
          labelBtnModal: 'Add new company',
          labelBtnSecondaryModal: 'Back',
          handleBtn: () => create()
        })

        setValidationError(
            {
                name: '',
                responsibilities: '',
                company_id: '',
            }
        )
  
        setDataEdit({
            name: '',
            responsibilities: '',
            company_id: '',
            id: '',
        })
        toggleOpenModal()
      }

      const dataHeading = [{
        label: 'Add Departement',
        icon: IconAdd(),
        heading: 'Departement list',
        eventToggleModal: handleCreate,
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
            setResponseError(error.response.data)
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

          setSelectedValue(value); // Perbarui state yang sesuai dengan value elemen select
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

    const handleEdit =  async (param, param2) => {
        setDataModal({
            size: 'md',
            labelModal: 'Edit Departmen',
            labelBtnModal: 'Save',
            labelBtnSecondaryModal: 'Delete',
            handleBtn: edit
        })

        setValidationError(
            {
                name: '',
                responsibilities: '',
                company_id: '',
            }
        )

        try {
            const response = await getApiData('companies/'+ param2 +'/departments/' + param)
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


      const handleDelete = async () => {
        try {
          await deleteApiData('companies/2/departments/' + idDelete)
          setRefresh(!refresh)
            closeModalDelete()
        } catch (error) {
          
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
                name: 'responsibilities',
                ref: refBody.responsibilitiesRef,
                value: dataEdit.responsibilities,
                label: 'Responsibilities',
                htmlFor: 'responsibilities',
                id: 'responsibilities',
                onchange: handleChange,
                placeholder: 'Responsibilities',
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
                <div className="grid gap-4 mb-4 grid-cols-1">
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
                    selectedValue={selectedValue}
                    />
                   ))}
                </div>
            </form>
            </>
        )
    }

    return (
        <>
            < ModalContainer 
                openModal={openModal}
                onToggleModal={handleCreate}
                modalBody={dataModalBody}
                sizeModal={'md'}
                labelModal={dataModal.labelModal}
                labelBtnModal={dataModal.labelBtnModal}
                labelBtnSecondaryModal={dataModal.labelBtnSecondaryModal}
                handleBtnModal={dataModal.handleBtn}
                openModalDelete={openModalDelete}
            />

            < ModalConfirmDelete modalDelete={modalDelete} closeModalDelete={closeModalDelete} handleDelete={handleDelete}/>

            <  TabelComponent data={data} dataHeading={dataHeading} handleEdit={handleEdit}/>
        </>
    )
}


export default Departement