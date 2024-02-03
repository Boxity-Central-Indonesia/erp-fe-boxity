import { useState, useRef, useEffect } from "react";
import TabelComponent from "../../../layouts/Tabel";
import IconAdd from "../../../layouts/icons/IconAdd";
import {ModalContainer, ModalConfirmDelete} from "../../../layouts/ModalContainer";
import { Label, TextInput } from "flowbite-react";
import { deleteApiData, getApiData, postApiData, putApiData } from "../../../../function/Api";
import FormInput, { TextArea } from "../../../layouts/FormInput";

const CompanyList =() => {
    const [openModal, setOpenModal] = useState(false);
    const [data, setData] = useState();
    const [refresh, setRefresh] = useState(false)
    const [dataModal, setDataModal] = useState({})
    const [dataEdit, setDataEdit] = useState({})
    const [modalDelete, setModalDelete] = useState(false)
    const [idDelete, setIdDelete] = useState();
    const [input, setInput] = useState([]);
    const [validationError, setValidationError] = useState()
    const [responseError, setResponseError] = useState()

    const toggleOpenModal = () => {
        setOpenModal(!openModal); 
    };

    // get data

    useEffect(() => {
      const fetchDataAsync = async () => {
        try {
          const response = await getApiData('companies');
          const newData = response.data.map(item => ({
            id: item.id,
            company: item.name,
            email: item.email,
            address: item.address,
            'phone_number': item.phone_number,
          }));

          setData(() => newData)
        } catch (error) {
          console.error(error);
        } finally {
        }
      };
    
      fetchDataAsync();
    }, [refresh]);

    // get data end


    // response error
    useEffect(() => {
      if(!!responseError){
          setValidationError(
              {
                  name: !!responseError.name ? responseError.name[0] : '',
                  email: !!responseError.email ? responseError.email[0] : '',
                  phone_number: !!responseError.phone_number ? responseError.phone_number[0] : '',
                  address:!!responseError.address ? responseError.address[0] : '',
                  city:!!responseError.city ? responseError.city[0] : '',
                  province:!!responseError.province ? responseError.province[0] : '',
                  postal_code:!!responseError.postal_code ? responseError.postal_code[0] : '',
                  country:!!responseError.country ? responseError.country[0] : '',
                  description:!!responseError.description ? responseError.description[0] : '',
                  industry:!!responseError.industry ? responseError.industry[0] : '',
                  website:!!responseError.website ? responseError.website[0] : '',
              }
          )
      }
    }, [responseError])
    // responnse error


    // create 


    const refBody = {
      nameRef: useRef(),
      emailRef: useRef(),
      addressRef: useRef(),
      phone_numberRef: useRef(),
      websiteRef: useRef(),
      cityRef: useRef(),
      provinceRef: useRef(),
      postal_codeRef: useRef(),
      countryRef: useRef(),
      industryRef: useRef(),
      descriptionRef: useRef(),
      idRef: useRef(),
    }
    

    const createCompany = async () => {
      const dataBody = {
        name: refBody.nameRef.current.value,
        email: refBody.emailRef.current.value,
        phone_number: refBody.phone_numberRef.current.value,
        address: refBody.addressRef.current.value,
        website: refBody.websiteRef.current.value,
        city: refBody.cityRef.current.value,
        province: refBody.provinceRef.current.value,
        postal_code: refBody.postal_codeRef.current.value,
        country: refBody.countryRef.current.value,
        industry: refBody.industryRef.current.value,
        description: refBody.descriptionRef.current.value,
        // id: refBody.idRef.current.value
      }


      try {
        const response = await postApiData('companies', dataBody)
        setRefresh(!refresh)
        setOpenModal((prevOpenModal) => !prevOpenModal);
      } catch (error) {
        setResponseError(error.response.data)
      }
    }


    const handelCreate = () => {
      setDataModal({
        size: '3xl',
        labelModal: 'Add Company',
        labelBtnModal: 'Add new company',
        lebelSecondaryBtn: 'Back',
        handelBtn: () => createCompany()
      })

      setValidationError(
        {
            name: '',
            email: '',
            phone_number: '',
            address: '',
            city: '',
            province: '',
            postal_code: '',
            country: '',
            description: '',
            industry: '',
            website: '',
        }
    )

      setDataEdit({
        name: '',
        email: '',
        phone_number: '',
        id: '',
        website: '',
        address: '',
        city: '',
        province: '',
        postal_code: '',
        country: '',
        industry: '',
        description: '',
      });
      toggleOpenModal()
    }


    // create end


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

    // const getCompanyById = (param) =>{
    //   console.log(param);
    // }

    const edit = async () => {
      const dataBody = {
        name: refBody.nameRef.current.value,
        email: refBody.emailRef.current.value,
        phone_number: refBody.phone_numberRef.current.value,
        address: refBody.addressRef.current.value,
        website: refBody.websiteRef.current.value,
        city: refBody.cityRef.current.value,
        province: refBody.provinceRef.current.value,
        postal_code: refBody.postal_codeRef.current.value,
        country: refBody.countryRef.current.value,
        industry: refBody.industryRef.current.value,
        description: refBody.descriptionRef.current.value,
        // id: refBody.idRef.current.value
      }
      try {
        const response = await putApiData('companies/' + refBody.idRef.current.value, dataBody)
        if(response.status == 201) {
          setRefresh(!refresh)
          setOpenModal((prevOpenModal) => !prevOpenModal);
        } 
      } catch (error) {
        setResponseError(error.response.data)
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
        await deleteApiData('companies/' + idDelete)
        setRefresh(!refresh)
        closeModalDelete()
      } catch (error) {
        
      }
    }


    
    // delete end

    const dataTabelHeading = [
      {
        label: 'Add company',
        icon: IconAdd(),
        heading: 'Company list',
        eventToggleModal: handelCreate
      }
    ]

    const handelEdit = async (param) => {
      setDataModal({
        size: '5xl',
        labelModal: 'Edit Company',
        labelBtnModal: 'Save',
        lebelSecondaryBtn: 'Delete',
        handelBtn: edit
      })
      setValidationError(
        {
            name: '',
            email: '',
            phone_number: '',
            address: '',
            city: '',
            province: '',
            postal_code: '',
            country: '',
            description: '',
            industry: '',
            website: '',
        }
    )
      setOpenModal((prevOpenModal) => !prevOpenModal);
      try {
        const response = await getApiData('companies/' + param)
        if(response.status === 200){
          setDataEdit({
            name: response.data.name,
            email: response.data.email,
            phone_number: response.data.phone_number,
            id: response.data.id,
            website: response.data.website,
            address: response.data.address,
            city: response.data.city,
            province: response.data.province,
            postal_code: response.data.postal_code,
            country: response.data.country,
            industry: response.data.industry,
            description: response.data.description,
          });
          
          setIdDelete(response.data.id)
        }
      } catch (error) {
        console.log(error);
      }
    }

    // conatainer modal

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
          type: 'url',
          name: 'website',
          ref: refBody.websiteRef,
          value: dataEdit.website,
          label: 'Website',
          htmlFor: 'website',
          id: 'website',
          onchange: handleChange,
          placeholder: 'Website',
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
          element: 'input',
          type: 'text',
          name: 'industry',
          ref: refBody.industryRef,
          value: dataEdit.industry,
          label: 'Industry',
          htmlFor: 'industry',
          id: 'industry',
          onchange: handleChange,
          placeholder: 'Industry',
        },
      ])
    }, [dataEdit])

    const dataModalBody = () => {
      return (
         
        <form>
          <input type="hidden" name="id" value={dataEdit.id} ref={refBody.idRef} />
            <div className="grid gap-6 mb-6 md:grid-cols-3">
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
                htmlFor={'descripttion'}
                id={'descripttion'}
                name={'descripttion'}
                referens={refBody.descriptionRef}
                placeholder={'Write description here'}
                />
            </div>
        </form>

        )
  }
  // conatainer modal end

    return (
        <>
            < ModalContainer 
                openModal={openModal}
                onToggleModal={handelCreate}
                modalBody={dataModalBody}
                sizeModal={'6xl'}
                labelModal={dataModal.labelModal}
                labelBtnModal={dataModal.labelBtnModal}
                labelBtnSecondaryModal={dataModal.lebelSecondaryBtn}
                handelBtnModal={dataModal.handelBtn}
                openModalDelete={openModalDelete}
            />

            < ModalConfirmDelete modalDelete={modalDelete} closeModalDelete={closeModalDelete} handelDelete={handelDelete}/>
            < TabelComponent data={data} dataHeading={dataTabelHeading} handelEdit={handelEdit}/>
        </>
    )

}


export default CompanyList