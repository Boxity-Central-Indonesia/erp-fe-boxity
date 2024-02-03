// Master.jsx
import React, { useState, useRef, useEffect, useReducer } from 'react';
import TabelComponent from '../../../layouts/Tabel';
import {ModalContainer} from '../../../layouts/ModalContainer';
import IconAdd from '../../../layouts/icons/IconAdd';
import axios from 'axios';
import Cookies from 'js-cookie';
import { getApiData, postApiData } from '../../../../function/Api';
import FormInput from '../../../layouts/FormInput';

const Master = () => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);

  const [response, setResponse] = useState()
  const [emailValidation, setEmailValidation] = useState()
  const [passwordValidation, setPasswordValidation] = useState()
  const [usernameValidation, setUsernameValidation] = useState()
  const [noHandphoneValidation, setNoHandphoneValidation] = useState()
  const [genderValidation, setGenderValidation] = useState()
  const [roleValidation, setRoleValidation] = useState()
  const [nameValidation, setNameValidation] = useState()
  const [dataModal, setDataModal] = useState({})
  const [showEdit, setShowEdit] = useState(true)
  const [dataEdit, setDataEdit] = useState({})
  const [handelBtn, setHandelBtn] = useState()
  const [input, setInput] = useState([]);
  // const [id, setId] = useState(null)
  
  
  
  const toggleOpenModal = () => {
    setEmailValidation('')
        setPasswordValidation()
        setUsernameValidation()
        setNoHandphoneValidation()
        setGenderValidation()
        setRoleValidation()
        setNameValidation()
    setOpenModal(!openModal);
  };

  const handelCreateMaster = () => {
    setDataEdit({
      name: '',
      username: '',
      email: '',
      no_handphone: '',
      gender: '',
    });
    setShowEdit(true);
    setHandelBtn(() => createUserMaster)
    setDataModal({
      size: '2xl',
      labelModal: 'Add user',
      labelBtnModal: 'Add new user',
      labelBtnSecondaryModal: 'Back',
    })

    toggleOpenModal();
  };

  const refBody = {
    emailRef: useRef(),
    nameRef: useRef(),
    usernameRef: useRef(),
    no_handphoneRef: useRef(),
    roleRef: useRef(),
    genderRef: useRef(),
    passwordRef: useRef(),
    confirm_passwordRef: useRef(),
    idRef: useRef()
  };

  const dataTabelHeading = [
    {
      label: 'Add user',
      icon: IconAdd(),
      heading: 'Master user',
      eventToggleModal:handelCreateMaster
    }
  ]
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('token');
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(import.meta.env.VITE_API_URL + 'users', { 
          withXSRFToken: true,
          headers
         });
        
        // Kumpulkan objek-objek dalam array
        const newDataArray = response.data.data.map(item => ({
          id: item.id,
          nama: item.name,
          username: item.username || '--',
          email: item.email,
          'No Handphone': item.no_handphone ||  '--',
          role: item.role || '--',
          gender: item.gender || '--',
          bio: item.bio || '--',
        }));
  
        // Set data setelah loop selesai
        setData(newDataArray);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, [response]);

  const createUserMaster = async () => {
    const formData = {
      email: refBody.emailRef.current.value,
      name: refBody.nameRef.current.value,
      username: refBody.usernameRef.current.value,
      no_handphone: refBody.no_handphoneRef.current.value,
      role: refBody.roleRef.current.value,
      gender: refBody.genderRef.current.value,
      password: refBody.passwordRef.current.value,
      password_confirmation: refBody.confirm_passwordRef.current.value,
    };

    const response = await postApiData('user/create', formData)

    
    if(response.status === 201) {
      setResponse(response)
      setOpenModal((prevOpenModal) => !prevOpenModal);
    }

  }

  useEffect(() => {
    if(!!response){
        setEmailValidation(!!response.email ? response.email[0] : '')
        setPasswordValidation(!!response.password ? response.password[0] : '')
        setUsernameValidation(!!response.username ? response.username[0] : '')
        setNoHandphoneValidation(!!response.no_handphone ? response.no_handphone[0] : '')
        setGenderValidation(!!response.gender ? response.gender[0] : '')
        setRoleValidation(!!response.role ? response.role[0] : '')
        setNameValidation(!!response.name ? response.name[0] : '')
    }
}, [response]) 

const editUserMaster = async () => {
  const formData = {
    email: dataInputModal.emailInputRef.current.value,
    name: dataInputModal.nameInputRef.current.value,
    username: dataInputModal.usernameInputRef.current.value,
    no_handphone: dataInputModal.noHandphoneInputRef.current.value,
    role: dataInputModal.roleInputRef.current.value,
    gender: dataInputModal.genderInputRef.current.value,
    id: dataInputModal.idInputRef.current.value
  };


  try {
    const response = await postApiData('user/update', formData)
    console.log(response);
    if(response.status === 201) {
      setResponse(response)
      if (response.status === 201) {
        setResponse(response);
        setOpenModal((prevOpenModal) => !prevOpenModal);
      }
    }

  } catch (error) {
    console.log(error);
  }
}

const showEditUserMaster = async (param) => {
  // console.log(id);
  const response = await getApiData(`users/${param}`);
  setDataModal({
    size: '2xl',
    labelModal: 'Edit user',
    labelBtnModal: 'Save',
    labelBtnSecondaryModal: 'Back'
  });

  if (response.status === 200) {
    
    setDataEdit({
      name: response.data.name,
      username: response.data.username,
      email: response.data.email,
      no_handphone: response.data.no_handphone,
      gender: response.data.gender,
      id: response.data.id
    });

    setShowEdit(false);
    setHandelBtn(() => editUserMaster)
    toggleOpenModal();
  }
};


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
      setInput(
        [
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
            name: 'username',
            ref: refBody.usernameRef,
            value: dataEdit.username,
            label: 'Username',
            htmlFor: 'username',
            id: 'username',
            onchange: handleChange,
            placeholder: 'Username',
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
            name: 'no_handphone',
            ref: refBody.no_handphoneRef,
            value: dataEdit.no_handphone,
            label: 'No Handphone',
            htmlFor: 'no_handphone',
            id: 'no_handphone',
            onchange: handleChange,
            placeholder: 'No Handphone',
          },
          {
            element: 'select',
            // type: 'text',
            name: 'gender',
            ref: refBody.genderRef,
            value: dataEdit.gender,
            label: 'Gender',
            htmlFor: 'gender',
            id: 'gender',
            onchange: handleChange,
            dataSelect: [
              {value: 'Pria', name: 'Pria'},
              {value: 'Wanita', name: 'Wanita'},
            ]
          },
          {
            element: 'select',
            // type: 'text',
            name: 'role',
            ref: refBody.roleRef,
            value: dataEdit.role,
            label: 'Role',
            htmlFor: 'role',
            id: 'role',
            onchange: handleChange,
            // dataSelect: [
            //   {value: 'Pria', name: 'Pria'},
            //   {value: 'Wanita', name: 'Wanita'},
            // ]
          },
          {
            element: 'input',
            type: 'password',
            name: 'password',
            ref: refBody.passwordRef,
            value: dataEdit.password,
            label: 'Password',
            htmlFor: 'password',
            id: 'password',
            onchange: handleChange,
            placeholder: 'Password',
          },
          {
            element: 'input',
            type: 'password',
            name: 'confirm_password',
            ref: refBody.confirm_passwordRef,
            value: dataEdit.confirm_password,
            label: 'Confirm Password',
            htmlFor: 'confirm_password',
            id: 'confirm_password',
            onchange: handleChange,
            placeholder: 'Confirm Password',
          },
        ]
      )
    }, [])

    const dataModalBody = () => {
      return (
        <>
          <form action="">
            <input type="hidden" ref={refBody.idInputRef} value={dataEdit.id ?? ''} />
             <div className='grid gap-4 mb-4 sm:grid-cols-2'>
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
                  // validationError={validationError}
                  />
                ))}
             </div>
          </form>
        </>
      )
    }

    
    return (
      <>

      <ModalContainer
        openModal={openModal} 
        onToggleModal={toggleOpenModal} 
        modalBody={dataModalBody} 
        dataInputModal={refBody}
        sizeModal={dataModal.size}
        labelModal={dataModal.labelModal}
        labelBtnModal={dataModal.labelBtnModal}
        handelBtnModal={handelBtn}
        labelBtnSecondaryModal={dataModal.labelBtnSecondaryModal}
      />
     < TabelComponent data={data} dataHeading={dataTabelHeading} handelEdit={showEditUserMaster}/>
    </>
  );
};

export default Master;
