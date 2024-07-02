// CRUD.jsx
import { useEffect, useState } from "react";
import { getApiData, putApiData } from "../../../../../function/Api";

export const CRUD = ({setProfilePicture}) => {
  const [input, setInput] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [valueFormApi, setValueFormApi] = useState({})
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    // Mendapatkan data untuk input
    const fetchData = async () => {
      try {
        const { status, data } = await getApiData("profile");
        if (status === 200) {
          setValueFormApi({
            name: data[0]?.nama_lengkap,
            username: data[0]?.user?.username,
            email: data[0]?.user?.email,
            address: data[0].full_address,
            number_phone: data[0]?.phone_number,
            id: data[0]?.id,
          })
          setProfileData(data);
          setProfilePicture(data[0]?.photo_profile)
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (param) => {
    const {value, name} = param.target
    setValueFormApi((prevDataEdit) => ({
      ...prevDataEdit,
      [name]: value
    }))
    setDisabled(false)
  }

  useEffect(() => {
    setInput([
      {
        element: "input",
        type: "text",
        name: "name",
        label: "Name",
        htmlFor: "name",
        id: "name",
        placeholder: "Name",
        value: valueFormApi?.name,
        onChange: handleChange
      },
      {
        element: "input",
        type: "text",
        name: "username",
        label: "Username",
        htmlFor: "username",
        id: "username",
        placeholder: "Username",
        value: valueFormApi?.username,
        onChange: handleChange,
        disabled: true,
      },
      {
        element: "input",
        type: "email",
        name: "email",
        label: "Email",
        htmlFor: "email",
        id: "email",
        placeholder: "Email",
        value: valueFormApi?.email,
        onChange: handleChange,
        disabled: true,
      },
      {
        element: "input",
        type: "text",
        name: "address",
        label: "Address",
        htmlFor: "address",
        id: "address",
        placeholder: "Address",
        value: valueFormApi?.address,
        onChange: handleChange
      },
      {
        element: "input",
        type: "text",
        name: "number_phone",
        label: "Phone Number",
        htmlFor: "number_phone",
        id: "number_phone",
        placeholder: "Phone Number",
        value: valueFormApi?.number_phone,
        onChange: handleChange
      },
    ])
  }, [valueFormApi])


  const handleEdit = async () => {
    let dataBody = {
      nama_lengkap: valueFormApi?.name,
      full_address: valueFormApi?.address,
      phone_number: valueFormApi?.phone_number,
      user_id: valueFormApi?.id,
    }
    try {
      const {data, status} = await putApiData('profiles/' + valueFormApi?.id, dataBody)
      if(status === 201) {
        setDisabled(true)
      }
    } catch (error) {
      console.log(error);
    }
  }


  return {
    input,
    profileData,
    handleEdit,
    disabled
  };
};
