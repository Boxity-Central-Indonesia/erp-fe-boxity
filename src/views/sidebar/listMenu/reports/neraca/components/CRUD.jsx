import { useState, useEffect, useRef } from "react";
import {
  getApiData,
  postApiData,
  putApiData,
  deleteApiData,
} from "../../../../../../function/Api";

export const CRUD = () => {
  const [openModal, setOpenModal] = useState();
  const [dataModal, setDataModal] = useState({});
  const [input, setInput] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [responseError, setResponseError] = useState();
  const [validationError, setValidationError] = useState();
  const [modalDelete, setModalDelete] = useState();
  const [idDelete, setIdDelete] = useState();
  const [loading, setLoading] = useState(true);
  const [dataEdit, setDataEdit] = useState({
    name: "",
    type: "",
    balance: "",
  });
  const [refBody, setRefBody] = useState({
    nameRef: useRef(),
    typeRef: useRef(),
    balanceRef: useRef(),
    idRef: useRef(),
  });
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
        element: "select",
        name: "type",
        ref: refBody.typeRef,
        value: dataEdit.type,
        label: "Type",
        htmlFor: "type",
        id: "type",
        dataSelect: [
          { value: "Aset", name: "Aset" },
          { value: "Liabilitas", name: "Liabilitas" },
          { value: "Ekuitas", name: "Ekuitas" },
          { value: "Pendapatan", name: "Pendapatan" },
          { value: "Pengeluaran", name: "Pengeluaran" },
          { value: "Biaya", name: "Biaya" },
        ],
        onchange: handleChange,
      },
      {
        element: "input",
        type: "number",
        name: "balance",
        ref: refBody.balanceRef,
        value: dataEdit.balance,
        label: "Balance",
        htmlFor: "balance",
        id: "balance",
        onchange: handleChange,
        placeholder: "Balance",
      },
    ]);
  }, [dataEdit]);

  useEffect(() => {
    if (!!responseError) {
      setValidationError({
        name: responseError?.name?.[0] || "",
        type: responseError?.type?.[0] || "",
        balance: responseError?.balance?.[0] || "",
      });
    }
  }, [responseError]);

  const READ = () => {
    const [data, setData] = useState();
    useEffect(() => {
      const getData = async () => {
        try {
          const { data, status } = await getApiData("balance-sheet-report");
          if (status === 200) {
            const newData = data.map((item) => ({
              assets: item.assets,
              liabilities: item.liabilities,
              equity: item.equity,
            }));
            setData(() => newData);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getData();
    }, [refresh]);

    return {
      data,
    };
  };

  const CREATE = () => {
    const handleCreate = () => {
      setDataModal({
        labelModal: "Add New account",
        labelBtnModal: "Add new account",
        labelBtnSecondaryModal: "Back",
        handleBtn: () => create(),
      });
      setDataEdit({
        name: "",
        type: "",
        balance: "",
      });
      setValidationError({
        name: "",
        type: "",
        balance: "",
      });
      setOpenModal((prevOpenModal) => !prevOpenModal);
    };

    const create = async () => {
      setLoading((prevLoading) => !prevLoading);
      const dataBody = {
        name: refBody.nameRef.current.value,
        type: refBody.typeRef.current.value,
        balance: refBody.balanceRef.current.value,
      };
      try {
        const { status } = await postApiData("accounts", dataBody);
        if (status === 201) {
          setRefresh(!refresh);
          setOpenModal((prevOpenModal) => !prevOpenModal);
          setLoading((prevLoading) => !prevLoading);
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
      setDataModal({
        labelModal: "Update accounts",
        labelBtnModal: "Save",
        labelBtnSecondaryModal: "Delete",
        handleBtn: edit,
      });

      setValidationError({
        name: "",
        type: "",
        balance: "",
      });

      setOpenModal((prevOpenModal) => !prevOpenModal);
      try {
        const { data, status } = await getApiData("accounts/" + param);
        if (status === 200) {
          setDataEdit({
            name: data.name,
            type: data.type,
            balance: data.balance,
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
        name: refBody.nameRef.current.value,
        type: refBody.typeRef.current.value,
        balance: refBody.balanceRef.current.value,
      };
      try {
        const { status } = await putApiData(
          "accounts/" + refBody.idRef.current.value,
          dataBody
        );
        if (status === 201) {
          setRefresh(!refresh);
          setOpenModal((prevOpenModal) => !prevOpenModal);
          setLoading((prevLoading) => !prevLoading);
        }
      } catch (error) {
        setLoading((prevLoading) => !prevLoading);
        setResponseError(error.response.data.errors);
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
      setLoading((prevLoading) => !prevLoading);
      try {
        await deleteApiData("accounts/" + idDelete);
        setRefresh(!refresh);
        setLoading((prevLoading) => !prevLoading);
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

  const { data } = READ();
  const { handleCreate, create } = CREATE();
  const { handleEdit, edit } = EDIT();
  const { openModalDelete, closeModalDelete, handleDelete } = DELETE();

  return {
    data,
    openModal,
    handleCreate,
    dataModal,
    input,
    validationError,
    handleEdit,
    dataEdit,
    refBody,
    openModalDelete,
    closeModalDelete,
    handleDelete,
    modalDelete,
    loading,
  };
};
