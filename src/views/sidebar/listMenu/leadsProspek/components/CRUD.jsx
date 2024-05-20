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
  const [responseError, setResponseError] = useState();
  const [validationError, setValidationError] = useState();
  const [loading, setLoading] = useState(true);
  const [skeleton, setSkeleton] = useState(false);
  const [dataHeading, setDataHeading] = useState([{}]);
  const [path, setPath] = useState("leads");

  const [refBody, setRefBody] = useState({
    nama_prospekRef: useRef(),
    email_prospekRef: useRef(),
    nomor_telepon_prospekRef: useRef(),
    tipe_prospekRef: useRef(),
    idRef: useRef(),
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
        nama_prospek: responseError?.nama_prospek?.[0] || "",
        email_prospek: responseError?.email_prospek?.[0] || "",
        nomor_telepon_prospek: responseError?.nomor_telepon_prospek?.[0] || "",
        tipe_prospek: responseError?.tipe_prospek?.[0] || "",
      });
    }
  }, [responseError]);

  useEffect(() => {
    document.title = "Leads - DHKJ Manufacturer";
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
        name: "nama_prospek",
        ref: refBody.nama_prospekRef,
        value: dataEdit.nama_prospek,
        label: "Prospek name",
        htmlFor: "nama_prospek",
        id: "nama_prospek",
        onchange: handleChange,
        placeholder: "Prospek name",
      },
      {
        element: "input",
        type: "email",
        name: "email_prospek",
        ref: refBody.email_prospekRef,
        value: dataEdit.email_prospek,
        label: "Prospek email",
        htmlFor: "email_prospek",
        id: "email_prospek",
        onchange: handleChange,
        placeholder: "Prospek email",
      },
      {
        element: "input",
        type: "text",
        name: "nomor_telepon_prospek",
        ref: refBody.nomor_telepon_prospekRef,
        value: dataEdit.nomor_telepon_prospek,
        label: "Prospek number phone",
        htmlFor: "nomor_telepon_prospek",
        id: "nomor_telepon_prospek",
        onchange: handleChange,
        placeholder: "Prospek number phone",
      },
      {
        element: "select",
        name: "tipe_prospek",
        ref: refBody.tipe_prospekRef,
        value: dataEdit.tipe_prospek,
        label: "Prospek type",
        htmlFor: "tipe_prospek",
        id: "tipe_prospek",
        dataSelect: [
          { value: "perorangan", name: "perorangan" },
          { value: "bisnis", name: "bisnis" },
          { value: "rekomendasi", name: "rekomendasi" },
        ],
        onchange: handleChange,
      },
    ]);
  }, [dataEdit]);

  const READ = () => {
    const [data, setData] = useState();
    useEffect(() => {
      const getData = async () => {
        try {
          const { data } = await getApiData("leads");
          const newData = data.map((item) => ({
            id: item.id,
            name: item.nama_prospek,
            email: item.email_prospek,
            "number phone": item.nomor_telepon_prospek,
            "prospek type": item.tipe_prospek,
          }));
          setLoading(true)
          setData(() => newData);
          setDataHeading([
            {
              label: "Tambah leads",
              icon: IconAdd(),
              heading: "Daftar list",
              information:
                "Ini adalah informasi tambahan tentang isi bagian ini. Anda dapat memberikan detail atau instruksi apa pun yang relevan di sini.",
              eventToggleModal: handleCreate,
              onclick: handleClickHeading,
              showNavHeading: false,
              // dataNavHeading: [
              //     {path: 'employees', label: 'Employees'},
              //     {path: 'employee-categories', label: 'Employee categories'},
              // ],
              // activeButton: path,
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
      setDataEdit({
        nama_prospek: "",
        email_prospek: "",
        nomor_telepon_prospek: "",
        tipe_prospek: "",
        id: "",
      });
      setValidationError({
        nama_prospek: "",
        email_prospek: "",
        nomor_telepon_prospek: "",
        tipe_prospek: "",
        id: "",
      });
      setOpenModal((prevOpenModal) => !prevOpenModal);
      setDataModal({
        size: "lg",
        labelModal: "Tambah leads",
        labelBtnModal: "Tambah leads",
        labelBtnSecondaryModal: "Back",
        handleBtn: create,
      });
    };

    const create = async (param) => {
      setLoading((prevLoading) => !prevLoading);
      let dataBody = {
        nama_prospek: refBody.nama_prospekRef.current.value,
        email_prospek: refBody.email_prospekRef.current.value,
        nomor_telepon_prospek: refBody.nomor_telepon_prospekRef.current.value,
        tipe_prospek: refBody.tipe_prospekRef.current.value,
        id: refBody.idRef.current.value,
      };

      try {
        const store = await postApiData("leads", dataBody);
        if (store.status === 201) {
          setRefresh((prevRefresh) => !prevRefresh);
          setPath(() => param);
          setLoading((prevLoading) => !prevLoading);
          setOpenModal((prevOpenModal) => !prevOpenModal);
        }
      } catch (error) {
        setLoading((prevLoading) => !prevLoading);
        setResponseError(error.response.data.errors);
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
      setDataModal({
        size: "lg",
        labelModal: "Update leads",
        labelBtnModal: "Save",
        labelBtnSecondaryModal: "Delete",
        handleBtn: edit,
      });
      setValidationError({
        nama_prospek: "",
        email_prospek: "",
        nomor_telepon_prospek: "",
        tipe_prospek: "",
        id: "",
      });

      setOpenModal((prevOpenModal) => !prevOpenModal);
      try {
        const { data, status } = await getApiData(path + "/" + id);
        if (status === 200) {
          setDataEdit({
            nama_prospek: data.nama_prospek,
            email_prospek: data.email_prospek,
            nomor_telepon_prospek: data.nomor_telepon_prospek,
            tipe_prospek: data.tipe_prospek,
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
      const dataBody = {
        nama_prospek: refBody.nama_prospekRef.current.value,
        email_prospek: refBody.email_prospekRef.current.value,
        nomor_telepon_prospek: refBody.nomor_telepon_prospekRef.current.value,
        tipe_prospek: refBody.tipe_prospekRef.current.value,
        id: refBody.idRef.current.value,
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
        setResponseError(error.response.data.errors);
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
    return (
      <>
        <div className="grid gap-4 mb-4 grid-cols-1">
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
    setLoading,
    setRefresh
  };
};
