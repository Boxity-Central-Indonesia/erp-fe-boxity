import { useEffect, useState } from "react";
import { getApiData } from "../../../../../function/Api";


export const CRUD = () => {
    const [input, setInput] = useState([]);
    
   useEffect(() => {
    setInput([
        {
          element: "input",
          type: "text",
          name: "name",
          // ref: refBody.nameRef,
          // value: dataEdit.name,
          label: "Name",
          htmlFor: "name",
          id: "name",
          // onchange: handleChange,
          placeholder: "Name",
        },
        {
          element: "input",
          type: "text",
          name: "username",
          // ref: refBody.nameRef,
          // value: dataEdit.username,
          label: "Username",
          htmlFor: "username",
          id: "username",
          // onchange: handleChange,
          placeholder: "Username",
        },
        {
          element: "input",
          type: "email",
          name: "email",
          // ref: refBody.nameRef,
          // value: dataEdit.email,
          label: "Email",
          htmlFor: "email",
          id: "email",
          // onchange: handleChange,
          placeholder: "Email",
        },
        {
          element: "input",
          type: "text",
          name: "address",
          // ref: refBody.nameRef,
          // value: dataEdit.address,
          label: "Address",
          htmlFor: "address",
          id: "address",
          // onchange: handleChange,
          placeholder: "Address",
        },
        {
          element: "input",
          type: "text",
          name: "number_phone",
          // ref: refBody.nameRef,
          // value: dataEdit.number_phone,
          label: "Number Phone",
          htmlFor: "number_phone",
          id: "number_phone",
          // onchange: handleChange,
          placeholder: "Number Phone",
        },
      ]);
   }, [])

    const READ = () => {
        useEffect(() => {
            const getData = async () => {
                try {
                    const {status, data} = getApiData('profile')
                    if(status === 200){
                        const newData = data.map(item => ({
                            id: data.id,
                            name: data.name,
                            username: data.username,
                            email: data.email,
                            address: data.address,
                            'number phone': data.no_handphone
                        }))
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            getData()
        }, [])
    }


    
    return {
        input
    }
}