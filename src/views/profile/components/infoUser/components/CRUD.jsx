// CRUD.jsx
import { useEffect, useState } from "react";
import { getApiData } from "../../../../../function/Api";

export const CRUD = ({setProfilePicture}) => {
  const [input, setInput] = useState([]);
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    // Mendapatkan data untuk input
    const fetchData = async () => {
      try {
        const { status, data } = await getApiData("profile");
        if (status === 200) {
          const inputFields = [
            {
              element: "input",
              type: "text",
              name: "name",
              label: "Name",
              htmlFor: "name",
              id: "name",
              placeholder: "Name",
              value: data[0]?.user?.name, // Menggunakan nilai dari API
            },
            {
              element: "input",
              type: "text",
              name: "username",
              label: "Username",
              htmlFor: "username",
              id: "username",
              placeholder: "Username",
              value: data[0]?.user?.username, // Menggunakan nilai dari API
            },
            {
              element: "input",
              type: "email",
              name: "email",
              label: "Email",
              htmlFor: "email",
              id: "email",
              placeholder: "Email",
              value: data[0]?.user?.email, // Menggunakan nilai dari API
            },
            {
              element: "input",
              type: "text",
              name: "address",
              label: "Address",
              htmlFor: "address",
              id: "address",
              placeholder: "Address",
              value: data[0].full_address, // Menggunakan nilai dari API
            },
            {
              element: "input",
              type: "text",
              name: "number_phone",
              label: "Phone Number",
              htmlFor: "number_phone",
              id: "number_phone",
              placeholder: "Phone Number",
              value: data[0].phone_number, // Menggunakan nilai dari API
            },
          ];
          setInput(inputFields);
          setProfileData(data);
          setProfilePicture(data[0]?.photo_profile)
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return {
    input,
    profileData,
  };
};
