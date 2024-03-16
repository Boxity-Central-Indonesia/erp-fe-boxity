import { useEffect, useState, useRef } from "react";
import {
  getApiData,
  postApiData,
  putApiData,
  deleteApiData,
} from "../../../../../function/Api";
import IconAdd from "../../../../layouts/icons/IconAdd";
import { TextArea } from "../../../../layouts/FormInput";
import FormInput from "../../../../layouts/FormInput";

export const CRUD = () => {
  const [refresh, setRefresh] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalDelete, setModalDelete] = useState();
  const [idDelete, setIdDelete] = useState();
  const [dataModal, setDataModal] = useState({});
  const [input, setInput] = useState([]);
  const [inputUpdate, setInputUpdate] = useState([]);
  const [responseError, setResponseError] = useState();
  const [validationError, setValidationError] = useState();
  const [loading, setLoading] = useState(true);
  const [skeleton, setSkeleton] = useState(false);
  const [dataHeading, setDataHeading] = useState([{}]);
  const [path, setPath] = useState("users");
  const [update, setUpdate] = useState(false)

  const [refBody, setRefBody] = useState({
    nameRef: useRef(),
    emailRef: useRef(),
    usernameRef: useRef(),
    no_handphoneRef: useRef(),
    genderRef: useRef(),
    passwordRef: useRef(),
    confirmPasswordRef: useRef(),
    idRef: useRef()
  });
  const [dataEdit, setDataEdit] = useState({});

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
    if (!!responseError) {
      setValidationError({
        name: responseError?.name?.[0] || "",
        email: responseError?.email?.[0] || "",
        username: responseError?.username?.[0] || "",
        password: responseError?.password?.[0] || "",
        gender: responseError?.gender?.[0] || "",
        no_handphone: responseError?.no_handphone?.[0] || "",
      });
    }
  }, [responseError]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getApiData("companies");
        const newData = response.data.map((item) => ({
          id: item.id,
          name: item.name,
        }));

        setDataCompanies(() => newData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    const fetchDataCategory = async () => {
      try {
        const { data, status } = await getApiData("employee-categories");
        if (status === 200) {
          const newData = data.map((item) => ({
            id: item.id,
            name: item.name,
          }));

          setDataCategoryEmployes(() => newData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataCategory();
  }, []);

  useEffect(() => {
    setInput([
      {
        element: "input",
        type: "text",
        name: "name",
        ref: refBody.nameRef,
        value: dataEdit.name,
        label: "Name",
        htmlFor: "name",
        id: "name",
        onchange: handleChange,
        placeholder: "Name",
      },
      {
        element: "input",
        type: "email",
        name: "email",
        ref: refBody.emailRef,
        value: dataEdit.email,
        label: "Email",
        htmlFor: "email",
        id: "email",
        onchange: handleChange,
        placeholder: "Email",
      },
      {
        element: "input",
        type: "text",
        name: "username",
        ref: refBody.usernameRef,
        value: dataEdit.username,
        label: "Username",
        htmlFor: "username",
        id: "username",
        onchange: handleChange,
        placeholder: "Username",
      },
      {
        element: "select",
        name: "gender",
        ref: refBody.genderRef,
        value: dataEdit.gender,
        label: "Gender",
        htmlFor: "gender",
        id: "gender",
        dataSelect: [
          { value: "male", name: "Male" },
          { value: "Female", name: "Female" },
        ],
        onchange: handleChange,
      },
      {
        element: "input",
        type: "text",
        name: "no_handphone",
        ref: refBody.no_handphoneRef,
        value: dataEdit.no_handphone,
        label: "Number phone",
        htmlFor: "no_handphone",
        id: "no_handphone",
        onchange: handleChange,
        placeholder: "Number phone",
      },
      {
        element: "input",
        type: "password",
        name: "password",
        ref: refBody.passwordRef,
        value: dataEdit.password,
        label: "password",
        htmlFor: "password",
        id: "password",
        onchange: handleChange,
        placeholder: "password",
      },
      {
        element: "input",
        type: "password",
        name: "confirmPassword",
        ref: refBody.confirmPasswordRef,
        value: dataEdit.confirmPassword,
        label: "confirmPassword",
        htmlFor: "confirmPassword",
        id: "confirmPassword",
        onchange: handleChange,
        placeholder: "confirmPassword",
      },
    ]);
    setInputUpdate([
      {
        element: "input",
        type: "text",
        name: "name",
        ref: refBody.nameRef,
        value: dataEdit.name,
        label: "Name",
        htmlFor: "name",
        id: "name",
        onchange: handleChange,
        placeholder: "Name",
      },
      {
        element: "input",
        type: "email",
        name: "email",
        ref: refBody.emailRef,
        value: dataEdit.email,
        label: "Email",
        htmlFor: "email",
        id: "email",
        onchange: handleChange,
        placeholder: "Email",
      },
      {
        element: "input",
        type: "text",
        name: "username",
        ref: refBody.usernameRef,
        value: dataEdit.username,
        label: "Username",
        htmlFor: "username",
        id: "username",
        onchange: handleChange,
        placeholder: "Username",
      },
      {
        element: "select",
        name: "gender",
        ref: refBody.genderRef,
        value: dataEdit.gender,
        label: "Gender",
        htmlFor: "gender",
        id: "gender",
        dataSelect: [
          { value: "male", name: "Male" },
          { value: "Female", name: "Female" },
        ],
        onchange: handleChange,
      },
      {
        element: "input",
        type: "text",
        name: "no_handphone",
        ref: refBody.no_handphoneRef,
        value: dataEdit.no_handphone,
        label: "Number phone",
        htmlFor: "no_handphone",
        id: "no_handphone",
        onchange: handleChange,
        placeholder: "Number phone",
      },
    ]);
  }, [dataEdit]);

  const READ = () => {
    const [data, setData] = useState();
    useEffect(() => {
      const getData = async () => {
        try {
          const { data } = await getApiData("users");
          const newData = data.map((item) => ({
            id: item.id,
            name: item.name,
            username: item.username,
            email: item.email,
            "number phone": item.no_handphone ?? "+62 xxx xxxx xxxx",
          }));
          setData(() => newData);
          setDataHeading([
            {
              information:
                "A user list is a way to organize and manage groups of users on a website or platform. It helps you target specific messages, personalize experiences, streamline management tasks, and gain better insights into how different segments of your users behave. In the user list section, you can typically create new lists, view existing ones, add or remove users, and edit list details.",
              label: "Add new User",
              icon: IconAdd(),
              heading: "User list",
              eventToggleModal: handleCreate,
              onclick: handleClickHeading,
              showNavHeading: false,
            },
          ]);
        } catch (error) {
          console.error(error);
        }
      };
      getData();
    }, [refresh]);

    return { data };
  };

  const CREATE = () => {
    const handleCreate = (param) => {
      setUpdate(false)
      setDataEdit({});
      setValidationError({});
      setOpenModal((prevOpenModal) => !prevOpenModal);
      setDataModal({
        size: "2xl",
        labelModal: "Add New users",
        labelBtnModal: "Add new users",
        labelBtnSecondaryModal: "Back",
        handleBtn: create,
      });
    };

    const create = async (param) => {
      setLoading((prevLoading) => !prevLoading);
      let dataBody = {
        name: refBody.nameRef.current.value,
        email: refBody.emailRef.current.value,
        username: refBody.usernameRef.current.value,
        gender: refBody.genderRef.current.value,
        no_handphone: refBody.no_handphoneRef.current.value,
        password: refBody.passwordRef.current.value,
        password_confirmation: refBody.confirmPasswordRef.current.value
      };

      try {
        const store = await postApiData("users", dataBody);
        if (store.status === 201) {
          setRefresh((prevRefresh) => !prevRefresh);
          setPath(() => param);
          setLoading((prevLoading) => !prevLoading);
          setOpenModal((prevOpenModal) => !prevOpenModal);
        }else if(store.status === 400) {
          setResponseError(store.errors);
          setLoading((prevLoading) => !prevLoading);
        }
      } catch (error) {
        console.log(error);
        setLoading((prevLoading) => !prevLoading);
        setResponseError(error.response.data);
      }
    };

    return {
      handleCreate,
      create,
    };
  };

  const EDIT = () => {
    const handleEdit = async (param) => {
      const id = param.textContent;
      setUpdate(true)
      setDataModal({
        size: "2xl",
        labelModal: "Update user",
        labelBtnModal: "Save",
        labelBtnSecondaryModal: "Delete",
        handleBtn: edit,
      });
      setValidationError({});

      setOpenModal((prevOpenModal) => !prevOpenModal);
      try {
        const { data, status } = await getApiData(path + "/" + id);
        if (status === 200) {
          setDataEdit({
            name: data.name,
            username: data.username,
            email: data.email,
            gender: data.gender,
            no_handphone: data.no_handphone,
            id: data.id,
          });

          setIdDelete(data.id);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const edit = async () => {
      setLoading((prevLoading) => !prevLoading);
      let dataBody = {
        name: refBody.nameRef.current.value,
        email: refBody.emailRef.current.value,
        username: refBody.usernameRef.current.value,
        gender: refBody.genderRef.current.value,
        no_handphone: refBody.no_handphoneRef.current.value,
      };

      try {
        const response = await putApiData(
          path + "/" + refBody.idRef.current.value,
          dataBody
        );
        if (response.status === 201) {
          setLoading((prevLoading) => !prevLoading);
          setRefresh(!refresh);
          setOpenModal((prevOpenModal) => !prevOpenModal);
        }
      } catch (error) {
        console.log(error);
        setResponseError(error.response.data);
        setLoading((prevLoading) => !prevLoading);
      }
    };

    return {
      handleEdit,
      edit,
    };
  };

  const DELETE = () => {
    const openModalDelete = () => {
      setModalDelete(!modalDelete);
      setOpenModal((prevOpenModal) => !prevOpenModal);
    };

    const closeModalDelete = () => {
      setModalDelete(!modalDelete);
    };

    const handleDelete = async () => {
      try {
        await deleteApiData(path + "/" + idDelete);
        setRefresh(!refresh);
        closeModalDelete();
      } catch (error) {
        console.log(error.response);
      }
    };

    return {
      openModalDelete,
      closeModalDelete,
      handleDelete,
    };
  };

  const inputBody = (param) => {
    if(!update){
      return (
        <>
          <div className="grid gap-4 mb-4 grid-cols-1 lg:grid-cols-2">
            {input.map((item, index) => (
              <FormInput
                key={item.id}
                element={item.element}
                htmlFor={item.htmlFor}
                label={item.label}
                type={item.type}
                name={item.name}
                referens={item.ref}
                value={item.value}
                id={item.id}
                onChange={(event) => item.onchange(event)}
                placeholder={item.placeholder}
                dataSelect={item.dataSelect}
                uniqueId={index}
                validationError={validationError}
              />
            ))}
          </div>
        </>
      );
    }else {
      return (
        <>
          <div className="grid gap-4 mb-4 grid-cols-1 lg:grid-cols-2">
            {inputUpdate.map((item, index) => (
              <FormInput
                key={item.id}
                element={item.element}
                htmlFor={item.htmlFor}
                label={item.label}
                type={item.type}
                name={item.name}
                referens={item.ref}
                value={item.value}
                id={item.id}
                onChange={(event) => item.onchange(event)}
                placeholder={item.placeholder}
                dataSelect={item.dataSelect}
                uniqueId={index}
                validationError={validationError}
              />
            ))}
          </div>
        </>
      );
    }
  };

  const { data, handleClickHeading } = READ();
  const { handleCreate } = CREATE();
  const { handleEdit } = EDIT();
  const { openModalDelete, closeModalDelete, handleDelete } = DELETE();

  return {
    data,
    handleCreate,
    openModal,
    dataModal,
    refBody,
    handleEdit,
    dataEdit,
    openModalDelete,
    closeModalDelete,
    handleDelete,
    modalDelete,
    validationError,
    handleClickHeading,
    dataHeading,
    setOpenModal,
    inputBody,
    loading,
    skeleton,
    path,
  };
};
