import { useState, useRef, useEffect } from "react";
import TabelComponent from "../layouts/Tabel";
import IconAdd from "../layouts/icons/IconAdd";
import {ModalContainer, ModalConfirmDelete} from "../layouts/ModalContainer";
import { Label, TextInput } from "flowbite-react";
import { deleteApiData, getApiData, postApiData, putApiData } from "../../../function/Api";

const CompanyList =() => {
    const [openModal, setOpenModal] = useState(false);
    const [data, setData] = useState();
    const [refresh, setRefresh] = useState(false)
    const [dataModal, setDataModal] = useState({})
    const [dataEdit, setDataEdit] = useState({})
    const [modalDelete, setModalDelete] = useState(false)
    const [idDelete, setIdDelete] = useState();

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


    // create 


    const refBody = {
      nameRef: useRef(),
      emailRef: useRef(),
      adressRef: useRef(),
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
        address: refBody.adressRef.current.value,
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
        console.log(error);
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
        address: refBody.adressRef.current.value,
        website: refBody.websiteRef.current.value,
        city: refBody.cityRef.current.value,
        province: refBody.provinceRef.current.value,
        postal_code: refBody.postal_codeRef.current.value,
        country: refBody.countryRef.current.value,
        industry: refBody.industryRef.current.value,
        description: refBody.descriptionRef.current.value,
        // id: refBody.idRef.current.value
      }
      console.log(dataBody);
      try {
        const response = await putApiData('companies/' + refBody.idRef.current.value, dataBody)
        if(response.status == 201) {
          setRefresh(!refresh)
          setOpenModal((prevOpenModal) => !prevOpenModal);
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
        size: '2xl',
        labelModal: 'Edit Company',
        labelBtnModal: 'Save',
        lebelSecondaryBtn: 'Delete',
        handelBtn: () => edit()
      })
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
        setOpenModal((prevOpenModal) => !prevOpenModal);
      }
    }

    // conatainer modal
    const dataModalBody = () => {
      return (
         
        <form>
          <input type="hidden" name="id" value={dataEdit.id} ref={refBody.idRef} />
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company name</label>
                    <input ref={refBody.nameRef} value={dataEdit.name}     onChange={handleChange} name="name" type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Company name" required />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="email" onChange={handleChange} name="email" ref={refBody.emailRef} value={dataEdit.email} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required />
                </div>
                <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                    <input onChange={handleChange} name="phone_number" type="text" value={dataEdit.phone_number} ref={refBody.phone_numberRef} id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Phone number" required />
                </div>  
                <div>
                    <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Website(opsional)</label>
                    <input type="url" onChange={handleChange} name="website" value={dataEdit.website} ref={refBody.websiteRef} id="website" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="website" required />
                </div>
                <div>
                    <label htmlFor="adress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                    <input type="text"value={dataEdit.address} onChange={handleChange} name="address" ref={refBody.adressRef} id="adress" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Adress" required />
                </div>
                <div>
                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                    <input type="text" onChange={handleChange} name="city" value={dataEdit.city} ref={refBody.cityRef} id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="City" required />
                </div>
                <div className="">
                    <label htmlFor="provience" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Provience</label>
                    <input type="text" onChange={handleChange} name="province" value={dataEdit.province} id="provience" ref={refBody.provinceRef} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Provience" required />
                </div> 
                <div className="">
                    <label htmlFor="postal_Code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Postal code</label>
                    <input value={dataEdit.postal_code} onChange={handleChange} name="postal_code" type="text" id="postal_Code" ref={refBody.postal_codeRef} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Postal code" required />
                </div> 
                <div className="">
                    <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                    <input value={dataEdit.country} onChange={handleChange} name="country" type="text" ref={refBody.countryRef} id="country" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Country" required />
                </div> 
                <div className="">
                    <label htmlFor="industry" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Industry</label>
                    <input type="text" onChange={handleChange} name="industry" value={dataEdit.industry} id="industry" ref={refBody.industryRef} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="industry" required />
                </div> 
                <div className="col-span-2">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <textarea value={dataEdit.description} onChange={handleChange} name="description" ref={refBody.descriptionRef} id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                </div>
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
                sizeModal={dataModal.size}
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