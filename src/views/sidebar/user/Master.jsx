// Master.jsx
import React, { useState, useRef, useEffect, useReducer } from 'react';
import TabelComponent from '../layouts/Tabel';
import ModalContainer from '../layouts/ModalContainer';
import IconAdd from '../layouts/icons/IconAdd';
import axios from 'axios';
import Cookies from 'js-cookie';
import { getApiData, postApiData } from '../../../function/Api';

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



  const toggleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const dataInputModal = {
    emailInputRef: useRef(),
    nameInputRef: useRef(),
    usernameInputRef: useRef(),
    noHandphoneInputRef: useRef(),
    roleInputRef: useRef(),
    genderInputRef: useRef(),
    passwordInputRef: useRef(),
    confirmPasswordRef: useRef(),
  };

  const dataTabelHeading = [
    {
      label: 'Add user',
      icon: IconAdd(),
      heading: 'Master user',
      eventToggleModal: toggleOpenModal
    }
  ]
  
  useEffect(() => {
    console.log('okeeeee');
    const fetchData = async () => {
      try {
        const token = Cookies.get('token');
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(import.meta.env.VITE_API_URL + 'user/master', { 
          withXSRFToken: true,
          headers
         });
        
        // Langsung hapus kolom yang tidak diperlukan saat mendapatkan data
        const newData = response.data.data.map(({ created_at, updated_at, token_expires_at, email_verified_at, token, image, ...rest }) => rest);
        
        // Kumpulkan objek-objek dalam array
        const newDataArray = newData.map(item => ({
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
  }, []);

  const createUserMaster = async () => {
    const formData = {
      email: dataInputModal.emailInputRef.current.value,
      name: dataInputModal.nameInputRef.current.value,
      username: dataInputModal.usernameInputRef.current.value,
      no_handphone: dataInputModal.noHandphoneInputRef.current.value,
      role: dataInputModal.roleInputRef.current.value,
      gender: dataInputModal.genderInputRef.current.value,
      password: dataInputModal.passwordInputRef.current.value,
      password_confirmation: dataInputModal.confirmPasswordRef.current.value,
    };


    const response = await postApiData('user/create', formData)

    setResponse(response)

    if(response.status === 201) {
      setOpenModal(!openModal)
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


  // Dalam component Master
  const dataModalBody = () => {
    return (
    <>
        <form action="#">
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input ref={dataInputModal.nameInputRef} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Name" required=""/>
                        <p className={`${!!nameValidation ? `` : `hidden`} text-red-500 text-sm font-medium mt-2`}>{nameValidation}</p>
                    </div>
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input ref={dataInputModal.usernameInputRef} type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Username" required=""/>
                        <p className={`${!!usernameValidation ? `` : `hidden`} text-red-500 text-sm font-medium mt-2`}>{usernameValidation}</p>
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input ref={dataInputModal.emailInputRef} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Email" required=""/>
                        <p className={`${!!emailValidation ? `` : `hidden`} text-red-500 text-sm font-medium mt-2`}>{emailValidation}</p>
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No Handphone</label>
                        <input ref={dataInputModal.noHandphoneInputRef} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="0841643742" required=""/>
                        <p className={`${!!noHandphoneValidation ? `` : `hidden`} text-red-500 text-sm font-medium mt-2`}>{noHandphoneValidation}</p>
                    </div>
                    <div className=''>
                        <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                        <select ref={dataInputModal.genderInputRef} id="gender" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option>Select gender</option>
                            <option value="pria">Pria</option>
                            <option value="wanita">Wanita</option>
                        </select>
                        <p className={`${!!genderValidation ? `` : `hidden`} text-red-500 text-sm font-medium mt-2`}>{genderValidation}</p>
                    </div>
                    <div className=''>
                        <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                        <select ref={dataInputModal.roleInputRef} id="role" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option>Select Role</option>
                            <option value="TV">TV/Monitors</option>
                            <option value="PC">PC</option>
                            <option value="GA">Gaming/Console</option>
                            <option value="PH">Phones</option>
                        </select>
                        <p className={`${!!roleValidation ? `` : `hidden`} text-red-500 text-sm font-medium mt-2`}>{roleValidation}</p>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input ref={dataInputModal.passwordInputRef} type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Email" required=""/>
                        <p className={`${!!passwordValidation ? `` : `hidden`} text-red-500 text-sm font-medium mt-2`}>{passwordValidation}</p>
                    </div>
                    <div>
                        <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                        <input ref={dataInputModal.confirmPasswordRef} type="password" name="confirm_password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="0841643742" required=""/>
                    </div>
                </div>
        </form>
    </>
    );
  };


  const editUserMaster = async (param) => {
    const response = await getApiData(`user/read?id=${param}`)

    if(response.status === 200) {
      setOpenModal(!openModal)
    }

  }


  return (
    <>

      <ModalContainer
        openModal={openModal} 
        onToggleModal={toggleOpenModal} 
        modalBody={dataModalBody} 
        dataInputModal={dataInputModal}
        sizeModal={'2xl'}
        labelModal={'Add user'}
        labelBtnModal={'Add new user'}
        handelBtnModal={createUserMaster}
      />
     < TabelComponent data={data} toggleOpenModal={toggleOpenModal} dataHeading={dataTabelHeading} handelEdit={editUserMaster}/>
    </>
  );
};

export default Master;
