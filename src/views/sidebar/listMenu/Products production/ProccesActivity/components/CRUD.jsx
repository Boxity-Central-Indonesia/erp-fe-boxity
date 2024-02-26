import { useEffect, useState, useRef, useDebugValue } from "react";
import {
  getApiData,
  postApiData,
  putApiData,
  deleteApiData,
} from "../../../../../../function/Api";
import IconAdd from "../../../../../layouts/icons/IconAdd";
import { TextArea } from "../../../../../layouts/FormInput";
import FormInput from "../../../../../layouts/FormInput";

export const CRUD = () => {
  const [refresh, setRefresh] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalDelete, setModalDelete] = useState();
  const [idDelete, setIdDelete] = useState();
  const [dataModal, setDataModal] = useState({});
  const [responseError, setResponseError] = useState();
  const [validationError, setValidationError] = useState();
  const [dataCompanies, setDataCompanies] = useState();
  const [dataDepartments, setDataDepartments] = useState();
  const [loading, setLoading] = useState(true);
  const [dataCategoryEmployes, setDataCategoryEmployes] = useState();
  const [skeleton, setSkeleton] = useState(false);
  const [dataHeading, setDataHeading] = useState([{}]);
  const [dataOrder, setDataOrder] = useState();
  const [path, setPath] = useState("processing-activities");
  const [input, setInput] = useState([]);

  const [refBody, setRefBody] = useState({
    order_idRef: useRef(),
    total_amountRef: useRef(),
    balance_dueRef: useRef(),
    invoice_dateRef: useRef(),
    due_dateRef: useRef(),
    statusRef: useRef(),
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
        order_id: responseError?.order_id?.[0] || "",
        total_amount: responseError?.total_amount?.[0] || "",
        balance_due: responseError?.balance_due?.[0] || "",
        invoice_date: responseError?.invoice_date?.[0] || "",
        due_date: responseError?.due_date?.[0] || "",
        status: responseError?.status?.[0] || "",
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
        element: "select",
        name: "order_id",
        ref: refBody.order_idRef,
        value: dataEdit.order_id,
        label: "Order",
        htmlFor: "order_id",
        id: "order_id",
        dataSelect: dataOrder,
        onchange: handleChange,
      },
      {
        element: "select",
        name: "status",
        ref: refBody.statusRef,
        value: dataEdit.status,
        label: "Staatus",
        htmlFor: "status",
        id: "status",
        dataSelect: [
          { value: "unpaid", name: "unpaid" },
          { value: "paid", name: "paid" },
          { value: "partial", name: "partial" },
        ],
        onchange: handleChange,
      },
      {
        element: "input",
        type: "number",
        name: "total_amount",
        ref: refBody.total_amountRef,
        value: dataEdit.total_amount,
        label: "Total amount",
        htmlFor: "total_amount",
        id: "total_amount",
        onchange: handleChange,
        placeholder: "Total amount",
      },
      {
        element: "input",
        type: "number",
        name: "balance_due",
        ref: refBody.balance_dueRef,
        value: dataEdit.balance_due,
        label: "Balance due",
        htmlFor: "balance_due",
        id: "balance_due",
        onchange: handleChange,
        placeholder: "Balance due",
      },
      {
        element: "input",
        type: "date",
        name: "invoice_date",
        ref: refBody.invoice_dateRef,
        value: dataEdit.invoice_date,
        label: "Invocie date",
        htmlFor: "invoice_date",
        id: "invoice_date",
        onchange: handleChange,
        placeholder: "Invocie date",
      },
      {
        element: "input",
        type: "date",
        name: "due_date",
        ref: refBody.due_dateRef,
        value: dataEdit.due_date,
        label: "Due date",
        htmlFor: "due_date",
        id: "due_date",
        onchange: handleChange,
        placeholder: "Due date",
      },
    ]);
  }, [dataEdit]);

  const dataEmployes = (data) => {
    return data.map((item) => ({
      id: item.id,
      name: item.name,
      email: item.email,
      phone_number: item.phone_number,
      company: item.company.name,
      "Job title": item.job_title,
      "Employment Status": item.employment_status,
      address: item.address,
    }));
  };

  const dataEmployesCategories = (data) => {
    return data.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
    }));
  };

  const READ = () => {
    const [data, setData] = useState();
    useEffect(() => {
      const getData = async () => {
        try {
          const { data } = await getApiData(path);
          if (path === "processing-activities") {
            const newData = data.map((item) => ({
              "prospek name": item.nama_prospek,
              "prospek email": item.email_prospek,
              "prospek number phone": item.nomor_telepon_prospek,
              prospek_type: item.tipe_prospek,
              id: item.id,
            }));
            setData(() => newData);
            setDataHeading([
              {
                label: "Add new procces activity",
                icon: IconAdd(),
                heading: "Procces activity list",
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
          }
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
        order_id: "",
        total_amount: "",
        balance_due: "",
        invoice_date: "",
        due_date: "",
        status: "",
        id: "",
      });
      setValidationError({
        order_id: "",
        total_amount: "",
        balance_due: "",
        invoice_date: "",
        due_date: "",
        status: "",
      });
      setOpenModal((prevOpenModal) => !prevOpenModal);
      setDataModal({
        size: "2xl",
        labelModal: "Add New invoices",
        labelBtnModal: "Add new invoices",
        labelBtnSecondaryModal: "Back",
        handleBtn: create,
      });
    };

    const create = async (param) => {
      setLoading((prevLoading) => !prevLoading);
      const dataBody = {
        order_id: refBody.order_idRef.current.value,
        total_amount: refBody.total_amountRef.current.value,
        balance_due: refBody.balance_dueRef.current.value,
        invoice_date: refBody.invoice_dateRef.current.value,
        due_date: refBody.due_dateRef.current.value,
        status: refBody.statusRef.current.value,
      };

      try {
        const store = await postApiData(path, dataBody);
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
      if (path === "employees") {
        setDataModal({
          size: "6xl",
          labelModal: "Update employees",
          labelBtnModal: "Save",
          labelBtnSecondaryModal: "Delete",
          handleBtn: edit,
        });
        setValidationError({
          name: "",
          email: "",
          phone_number: "",
          company_id: "",
          job_title: "",
          date_of_birth: "",
          employment_status: "",
          hire_date: "",
          termination_date: "",
          address: "",
          city: "",
          province: "",
          postal_code: "",
          country: "",
          emergency_contact_name: "",
          emergency_contact_phone_number: "",
          notes: "",
          department_id: "",
          category_id: "",
          id: "",
        });

        setOpenModal((prevOpenModal) => !prevOpenModal);
        try {
          const response = await getApiData("companies/7/departments");
          const newData = response.data.map((item) => ({
            id: item.id,
            name: item.name,
          }));

          setDataDepartments(() => newData);
        } catch (error) {
          console.log(error);
        }
        try {
          const { data, status } = await getApiData(path + "/" + id);
          if (status === 200) {
            setDataEdit({
              name: data.name,
              email: data.email,
              phone_number: data.phone_number,
              company_id: data.company_id,
              job_title: data.job_title,
              date_of_birth: data.date_of_birth,
              employment_status: data.employment_status,
              hire_date: data.hire_date,
              termination_date: data.termination_date,
              address: data.address,
              city: data.city,
              province: data.province,
              postal_code: data.postal_code,
              country: data.country,
              emergency_contact_name: data.emergency_contact_name,
              emergency_contact_phone_number:
                data.emergency_contact_phone_number,
              notes: data.notes,
              department_id: data.department_id,
              category_id: data.category_id,
              id: data.id,
            });

            setIdDelete(data.id);
          }
        } catch (error) {
          console.log(error);
        }
      } else if (path === "employee-categories") {
        setDataModal({
          size: "lg",
          labelModal: "Update employee category",
          labelBtnModal: "Save",
          labelBtnSecondaryModal: "Delete",
          handleBtn: edit,
        });
        setValidationError({
          name: "",
          description: "",
        });

        setOpenModal((prevOpenModal) => !prevOpenModal);
        try {
          const { data, status } = await getApiData(path + "/" + id);
          if (status === 200) {
            setDataEdit({
              name: data.name,
              description: data.description,
              id: data.id,
            });

            setIdDelete(data.id);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    const edit = async () => {
      setLoading((prevLoading) => !prevLoading);
      let dataBody = {};
      if (path === "employees") {
        dataBody = {
          name: refBody.nameRef.current.value,
          email: refBody.emailRef.current.value,
          phone_number: refBody.phone_numberRef.current.value,
          company_id: refBody.company_idRef.current.value,
          job_title: refBody.job_titleRef.current.value,
          date_of_birth: refBody.date_of_birthRef.current.value,
          employment_status: refBody.employment_statusRef.current.value,
          hire_date: refBody.hire_dateRef.current.value,
          termination_date: refBody.termination_dateRef.current.value,
          address: refBody.addressRef.current.value,
          city: refBody.cityRef.current.value,
          province: refBody.provinceRef.current.value,
          postal_code: refBody.postal_codeRef.current.value,
          country: refBody.countryRef.current.value,
          emergency_contact_name:
            refBody.emergency_contact_nameRef.current.value,
          emergency_contact_phone_number:
            refBody.emergency_contact_phone_numberRef.current.value,
          notes: refBody.notesRef.current.value,
          department_id: refBody.department_idRef.current.value,
          category_id: refBody.category_idRef.current.value,
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
      } else if (path === "employee-categories") {
        dataBody = {
          name: refBody.nameRef.current.value,
          description: refBody.descriptionRef.current.value,
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
    if (param === "processing-activities") {
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
