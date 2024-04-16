import { useEffect, useState, useRef } from "react";
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
  const [inputCompanies, setInputCompanies] = useState([]);
  const [responseError, setResponseError] = useState();
  const [validationError, setValidationError] = useState();
  const [loading, setLoading] = useState(true);
  const [inputBranch, setInputBranch] = useState();
  const [inputDepartments, setInputDepartments] = useState();
  const [skeleton, setSkeleton] = useState(false);
  const [dataHeading, setDataHeading] = useState([{}]);
  const [defaultEdit, setDefaultEdit] = useState(true);
  const [dataDetailCompany, setDataDetailCompany] = useState({});
  const [idCompany, setIdCompany] = useState(null);
  const [path, setPath] = useState("companies");

  const [refBody, setRefBody] = useState({
    nameRef: useRef(),
    emailRef: useRef(),
    phone_numberRef: useRef(),
    websiteRef: useRef(),
    addressRef: useRef(),
    cityRef: useRef(),
    provinceRef: useRef(),
    postal_codeRef: useRef(),
    countryRef: useRef(),
    idRef: useRef(),
    industryRef: useRef(),
    descriptionRef: useRef(),
    company_idRef: useRef(),
    responsibilitiesRef: useRef(),
    idBranchRef: useRef(),
    idDepartmentsRef: useRef(),
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
        phone_number: !!responseError.phone_number
          ? responseError.phone_number[0]
          : "",
        company_id: !!responseError.company_id
          ? responseError.company_id[0]
          : "",
        job_title: !!responseError.job_title ? responseError.job_title[0] : "",
        date_of_birth: !!responseError.date_of_birth
          ? responseError.date_of_birth[0]
          : "",
        employment_status: !!responseError.employment_status
          ? responseError.employment_status[0]
          : "",
        hire_date: !!responseError.hire_date ? responseError.hire_date[0] : "",
        termination_date: !!responseError.termination_date
          ? responseError.termination_date[0]
          : "",
        address: !!responseError.address ? responseError.address[0] : "",
        city: !!responseError.city ? responseError.city[0] : "",
        province: !!responseError.province ? responseError.province[0] : "",
        postal_code: !!responseError.postal_code
          ? responseError.postal_code[0]
          : "",
        country: !!responseError.country ? responseError.country[0] : "",
        emergency_contact_name: !!responseError.emergency_contact_name
          ? responseError.emergency_contact_name[0]
          : "",
        emergency_contact_phone_number:
          !!responseError.emergency_contact_phone_number
            ? responseError.emergency_contact_phone_number[0]
            : "",
        notes: !!responseError.notes ? responseError.notes[0] : "",
        department_id: !!responseError.department_id
          ? responseError.department_id[0]
          : "",
      });
    }
  }, [responseError]);

  useEffect(() => {
    setInputCompanies([
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
        name: "phone_number",
        ref: refBody.phone_numberRef,
        value: dataEdit.phone_number,
        label: "Phone number",
        htmlFor: "phone_number",
        id: "phone_number",
        onchange: handleChange,
        placeholder: "Phone number",
      },
      // {
      //     element: 'select',
      //     ref: refBody.company_idRef,
      //     name: 'company_id',
      //     label: 'Companies',
      //     htmlFor: 'categori companies',
      //     id: 'categori companies',
      //     dataSelect: dataCompanies,
      //     value: dataEdit.company_id,
      //     onchange: handleChangeAndGetDepartment
      // },
      {
        element: "input",
        type: "text",
        name: "website",
        ref: refBody.websiteRef,
        value: dataEdit.website,
        label: "Website",
        htmlFor: "website",
        id: "website",
        onchange: handleChange,
        placeholder: "Website",
      },
      {
        element: "input",
        type: "text",
        name: "address",
        ref: refBody.addressRef,
        value: dataEdit.address,
        label: "Address",
        htmlFor: "address",
        id: "address",
        onchange: handleChange,
        placeholder: "Address",
      },
      {
        element: "input",
        type: "text",
        name: "city",
        ref: refBody.cityRef,
        value: dataEdit.city,
        label: "City",
        htmlFor: "city",
        id: "city",
        onchange: handleChange,
        placeholder: "City",
      },
      {
        element: "input",
        type: "text",
        name: "province",
        ref: refBody.provinceRef,
        value: dataEdit.province,
        label: "Province",
        htmlFor: "province",
        id: "province",
        onchange: handleChange,
        placeholder: "Province",
      },
      {
        element: "input",
        type: "number",
        name: "postal_code",
        ref: refBody.postal_codeRef,
        value: dataEdit.postal_code,
        label: "Postal Code",
        htmlFor: "postal_code",
        id: "postal_code",
        onchange: handleChange,
        placeholder: "Postal Code",
      },
      {
        element: "input",
        type: "text",
        name: "country",
        ref: refBody.countryRef,
        value: dataEdit.country,
        label: "Country",
        htmlFor: "country",
        id: "country",
        onchange: handleChange,
        placeholder: "Country",
      },
      {
        element: "input",
        type: "text",
        name: "industry",
        ref: refBody.industryRef,
        value: dataEdit.industry,
        label: "Industry",
        htmlFor: "industry",
        id: "industry",
        onchange: handleChange,
        placeholder: "Industry",
      },
    ]);

    setInputBranch([
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
        type: "text",
        name: "address",
        ref: refBody.addressRef,
        value: dataEdit.address,
        label: "Address",
        htmlFor: "address",
        id: "address",
        onchange: handleChange,
        placeholder: "Address",
      },
      {
        element: "input",
        type: "text",
        name: "phone_number",
        ref: refBody.phone_numberRef,
        value: dataEdit.phone_number,
        label: "Phone number",
        htmlFor: "phone_number",
        id: "phone_number",
        onchange: handleChange,
        placeholder: "Phone number",
      },
      {
        element: "input",
        type: "text",
        name: "email",
        ref: refBody.emailRef,
        value: dataEdit.email,
        label: "Email",
        htmlFor: "email",
        id: "email",
        onchange: handleChange,
        placeholder: "Email",
      },
      // {
      //     element: 'input',
      //     type: 'hidden',
      //     name: 'company_id',
      //     ref: refBody.company_idRef,
      //     value: dataEdit.company_id,
      //     label: 'Company',
      //     htmlFor: 'company_id',
      //     id: 'company_id',
      //     onchange: handleChange,
      //     // placeholder: 'Company',
      // },
      // {
      //     element: 'select',
      //     ref: refBody.company_idRef,
      //     name: 'company_id',
      //     label: 'Companies',
      //     htmlFor: 'categori companies',
      //     id: 'categori companies',
      //     // dataSelect: dataCompanies,
      //     value: dataEdit.company_id,
      //     onchange: handleChange
      // },
    ]);

    setInputDepartments([
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
        type: "text",
        name: "responsibilities",
        ref: refBody.responsibilitiesRef,
        value: dataEdit.responsibilities,
        label: "Responsibilities",
        htmlFor: "responsibilities",
        id: "responsibilities",
        onchange: handleChange,
        placeholder: "Responsibilities",
      },
    ]);
  }, [dataEdit]);

  useEffect(() => {
    const getData = async () => {
      try {
        if (idCompany !== null) {
          const { data, status } = await getApiData("companies/" + idCompany);
          if (status === 200) {
            setDataEdit({
              name: data.name,
              email: data.email,
              phone_number: data.phone_number,
              website: data.website ?? "--",
              address: data.address,
              city: data.city,
              province: data.province,
              postal_code: data.postal_code,
              country: data.country,
              industry: data.industry,
              description: data.description,
              id: data.id,
            });
            setDataDetailCompany(() => data);
          }
        }
      } catch (error) {}
    };
    getData();
  }, [refresh]);

  const dataCompany = (data) => {
    return data.map((item) => ({
      id: item.id,
      name: item.name,
      email: item.email,
      address: item.address,
      "phone number": item.phone_number,
    }));
  };

  const READ = () => {
    const [data, setData] = useState();
    useEffect(() => {
      const getData = async () => {
        try {
          if (path === "companies") {
            const { data } = await getApiData(path);
            const newData = dataCompany(data);
            setData(() => newData);
            setDataHeading([
              {
                label: defaultEdit === true ? "Tambah company" : "Add",
                icon: IconAdd(),
                heading: "Company list",
                information:
                  "A company list is a directory or database of companies, often organized by industry, location, size, or other relevant criteria.  It's valuable for finding potential partners, suppliers, customers, or competitors. Company lists can also help  with market research, job searches, and investment opportunities.  Depending on the platform, you may be able to filter company lists, view company profiles with contact information, and get insights into their financial performance.",
                eventToggleModal: handleCreate,
                onclick: handleClickHeading,
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

  const EDIT = () => {
    let endPoint = "";
    const handleEdit = async (param, routes) => {
      console.log(param);
      setDataEdit([{}]);
      routes = routes || "companies";
      endPoint = routes;
      setPath(() => routes);
      setOpenModal((prevOpenModal) =>
        defaultEdit === false ? !prevOpenModal : prevOpenModal
      );
      if (endPoint === "companies") {
        setDefaultEdit(false);
        setDataDetailCompany(null);
        setDataModal({
          size: "6xl",
          labelModal: "Update companies",
          labelBtnModal: "Save",
          labelBtnSecondaryModal: "Delete",
          handleBtn: edit,
        });
        setDataHeading([
          {
            label: "Add",
            icon: IconAdd(),
            heading: "Company list",
            information:
              "A company list is a directory or database of companies, often organized by industry, location, size, or other relevant criteria.  It's valuable for finding potential partners, suppliers, customers, or competitors. Company lists can also help  with market research, job searches, and investment opportunities.  Depending on the platform, you may be able to filter company lists, view company profiles with contact information, and get insights into their financial performance.",
            eventToggleModal: handleCreate,
            onclick: handleClickHeading,
            showNavHeading: false,
          },
        ]);
        try {
          const { data, status } = await getApiData(
            param.textContent
              ? "companies/" + param.textContent
              : "companies/" + idCompany
          );
          if (status === 200) {
            setDataEdit({
              name: data.name,
              email: data.email,
              phone_number: data.phone_number,
              website: data.website ?? "--",
              address: data.address,
              city: data.city,
              province: data.province,
              postal_code: data.postal_code,
              country: data.country,
              industry: data.industry,
              description: data.description,
              id: data.id,
              company_id: data.id,
            });
            setIdDelete(data.id);
            setDataDetailCompany(() => data);
            setIdCompany(data.id);
          }
        } catch (error) {}
      } else if (endPoint === "companies/{companyId}/departments") {
        setDataModal({
          size: "lg",
          labelModal: "Update departments",
          labelBtnModal: "Save",
          labelBtnSecondaryModal: "Delete",
          handleBtn: edit,
        });

        try {
          const { data, status } = await getApiData(
            "companies/" + idCompany + "/departments/" + param
          );
          if (status === 200) {
            setDataEdit({
              id: data.id,
              name: data.name,
              responsibilities: data.responsibilities,
              idDepartments: data.id,
            });
          }
        } catch (error) {
          console.log(error);
        }
      } else if (endPoint === "companies/{companyId}/branches") {
        setDataModal({
          size: "2xl",
          labelModal: "Update branch",
          labelBtnModal: "Save",
          labelBtnSecondaryModal: "Delete",
          handleBtn: edit,
        });

        try {
          const { data, status } = await getApiData(
            "companies/" + idCompany + "/branches/" + param
          );
          if (status === 200) {
            setDataEdit({
              name: data.name,
              address: data.address,
              email: data.email,
              phone_number: data.phone_number,
              idBranch: data.id,
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    const edit = async () => {
      setLoading((prevLoading) => !prevLoading);
      let dataBody = {};
      if (endPoint === "companies") {
        dataBody = {
          name: refBody.nameRef.current.value,
          email: refBody.emailRef.current.value,
          phone_number: refBody.phone_numberRef.current.value,
          website: refBody.websiteRef.current.value,
          address: refBody.addressRef.current.value,
          city: refBody.cityRef.current.value,
          province: refBody.provinceRef.current.value,
          postal_code: refBody.postal_codeRef.current.value,
          country: refBody.countryRef.current.value,
          industry: refBody.industryRef.current.value,
          description: refBody.descriptionRef.current.value,
          id: refBody.idRef.current.value,
        };

        setIdCompany(refBody.idRef.current.value);

        console.log(dataBody);

        try {
          const response = await putApiData(
            endPoint + "/" + idCompany,
            dataBody
          );
          if (response.status === 201) {
            setLoading((prevLoading) => !prevLoading);
            setRefresh(!refresh);
            setPath("companies");
            setIdCompany(refBody.idRef.current.value);
            setOpenModal((prevOpenModal) => !prevOpenModal);
          }
        } catch (error) {
          setResponseError(error.response.data.errors);
          setLoading((prevLoading) => !prevLoading);
        }
      } else if (endPoint === "companies/{companyId}/branches") {
        dataBody = {
          name: refBody.nameRef.current.value,
          email: refBody.emailRef.current.value,
          address: refBody.addressRef.current.value,
          phone_number: refBody.phone_numberRef.current.value,
        };
        try {
          const response = await putApiData(
            "companies/" +
              refBody.idBranchRef.current.value +
              "/branches/" +
              refBody.idBranchRef.current.value,
            dataBody
          );
          if (response.status === 201) {
            setLoading((prevLoading) => !prevLoading);
            setRefresh(!refresh);
            setOpenModal((prevOpenModal) => !prevOpenModal);

            try {
              const { data, status } = await getApiData(
                "companies/" + refBody.company_idRef.current.value
              );
              if (status === 200) {
                setDataEdit({
                  name: data.name,
                  email: data.email,
                  phone_number: data.phone_number,
                  website: data.website ?? "--",
                  address: data.address,
                  city: data.city,
                  province: data.province,
                  postal_code: data.postal_code,
                  country: data.country,
                  industry: data.industry,
                  description: data.description,
                  id: data.id,
                });
                // setDefaultEdit(false)
                setDataDetailCompany(() => data);
              }
            } catch (error) {}
          }
        } catch (error) {
          setResponseError(error.response.data.errors);
          setLoading((prevLoading) => !prevLoading);
        }
      } else if (endPoint === "companies/{companyId}/departments") {
        dataBody = {
          name: refBody.nameRef.current.value,
          responsibilities: refBody.responsibilitiesRef.current.value,
        };
        try {
          const response = await putApiData(
            "companies/" +
              refBody.idDepartmentsRef.current.value +
              "/departments/" +
              refBody.idDepartmentsRef.current.value,
            dataBody
          );
          if (response.status === 201) {
            setLoading((prevLoading) => !prevLoading);
            setRefresh(!refresh);
            setOpenModal((prevOpenModal) => !prevOpenModal);

            try {
              const { data, status } = await getApiData(
                "companies/" + refBody.company_idRef.current.value
              );
              if (status === 200) {
                setDataEdit({
                  name: data.name,
                  email: data.email,
                  phone_number: data.phone_number,
                  website: data.website ?? "--",
                  address: data.address,
                  city: data.city,
                  province: data.province,
                  postal_code: data.postal_code,
                  country: data.country,
                  industry: data.industry,
                  description: data.description,
                  id: data.id,
                });
                // setDefaultEdit(false)
                setDataDetailCompany(() => data);
              }
            } catch (error) {}
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

  const CREATE = () => {
    const handleCreate = (param) => {
      if (param === "companies/{companyId}/branches") {
        setPath(param);
        setDataEdit({
          // name: '',
          // address: '',
          // email: '',
          // phone_number: '',
          // // company_id: '',
          // id: '',
        });
        setValidationError({
          // name: '',
          // address: '',
          // email: '',
          // phone_number: '',
          // // company_id: '',
          // id: '',
        });
        setOpenModal((prevOpenModal) => !prevOpenModal);
        setDataModal({
          size: "2xl",
          labelModal: "Tambah branch",
          labelBtnModal: "Tambah branch",
          labelBtnSecondaryModal: "Back",
          handleBtn: create,
        });
      } else if (param === "companies/{companyId}/departments") {
        setPath(param);
        setDataEdit({
          name: "",
          responsibilities: "",
          company_id: "",
          id: "",
        });
        setValidationError({
          name: "",
          responsibilities: "",
          company_id: "",
          id: "",
        });
        setOpenModal((prevOpenModal) => !prevOpenModal);
        setDataModal({
          size: "lg",
          labelModal: "Tambah departments",
          labelBtnModal: "Tambah departments",
          labelBtnSecondaryModal: "Back",
          handleBtn: create,
        });
      } else {
        setDefaultEdit(true);
        setDataEdit({
          name: "",
          email: "",
          phone_number: "",
          website: "",
          address: "",
          city: "",
          province: "",
          postal_code: "",
          country: "",
          industry: "",
          description: "",
          id: "",
        });
        setValidationError({
          name: "",
          email: "",
          phone_number: "",
          website: "",
          address: "",
          city: "",
          province: "",
          postal_code: "",
          country: "",
          industry: "",
          description: "",
          id: "",
        });
        setOpenModal((prevOpenModal) => !prevOpenModal);
        setDataModal({
          size: "6xl",
          labelModal: "Tambah companies",
          labelBtnModal: "Tambah companies",
          labelBtnSecondaryModal: "Back",
          handleBtn: create,
        });
      }
    };

    const create = async (param) => {
      setLoading((prevLoading) => !prevLoading);
      let dataBody = {};
      if (param === "companies") {
        dataBody = {
          name: refBody.nameRef.current.value,
          email: refBody.emailRef.current.value,
          phone_number: refBody.phone_numberRef.current.value,
          website: refBody.websiteRef.current.value,
          address: refBody.addressRef.current.value,
          city: refBody.cityRef.current.value,
          province: refBody.provinceRef.current.value,
          postal_code: refBody.postal_codeRef.current.value,
          country: refBody.countryRef.current.value,
          industry: refBody.industryRef.current.value,
          description: refBody.descriptionRef.current.value,
          id: refBody.idRef.current.value,
        };

        console.log(dataBody);

        try {
          const store = await postApiData("companies", dataBody);
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
      } else if (param === "companies/{companyId}/branches") {
        dataBody = {
          name: refBody.nameRef.current.value,
          email: refBody.emailRef.current.value,
          phone_number: refBody.phone_numberRef.current.value,
          address: refBody.addressRef.current.value,
          company_id: refBody.company_idRef.current.value,
        };
        try {
          const store = await postApiData(
            "companies/" + refBody.company_idRef.current.value + "/branches",
            dataBody
          );
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
      } else if (param === "companies/{companyId}/departments") {
        dataBody = {
          name: refBody.nameRef.current.value,
          responsibilities: refBody.responsibilitiesRef.current.value,
          company_id: refBody.company_idRef.current.value,
        };
        try {
          const store = await postApiData(
            "companies/" + refBody.company_idRef.current.value + "/departments",
            dataBody
          );
          if (store.status === 201) {
            setRefresh((prevRefresh) => !prevRefresh);
            setPath(() => param);
            setLoading((prevLoading) => !prevLoading);
            setOpenModal((prevOpenModal) => !prevOpenModal);

            try {
              const { data, status } = await getApiData(
                "companies/" + refBody.company_idRef.current.value
              );
              if (status === 200) {
                setDataEdit({
                  name: data.name,
                  email: data.email,
                  phone_number: data.phone_number,
                  website: data.website ?? "--",
                  address: data.address,
                  city: data.city,
                  province: data.province,
                  postal_code: data.postal_code,
                  country: data.country,
                  industry: data.industry,
                  description: data.description,
                  id: data.id,
                });
                // setDefaultEdit(false)
                setDataDetailCompany(() => data);
              }
            } catch (error) {}
          }
        } catch (error) {
          setLoading((prevLoading) => !prevLoading);
          setResponseError(error.response.data.errors);
        }
      } else {
        dataBody = {
          name: refBody.nameRef.current.value,
          email: refBody.emailRef.current.value,
          phone_number: refBody.phone_numberRef.current.value,
          company_id: refBody.company_idRef.current.value,
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
          const store = await postApiData(
            "companies/" + idCompany + "/branches",
            dataBody
          );
          if (store.status === 201) {
            setPath(() => "companies/{companyId}/branches");
            setRefresh(!refresh);
            setLoading((prevLoading) => !prevLoading);
            setOpenModal((prevOpenModal) => !prevOpenModal);
          }
        } catch (error) {
          setResponseError(error.response.data.errors);
          setLoading((prevLoading) => !prevLoading);
        }
      }
    };

    return {
      handleCreate,
      create,
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
      if (path === "companies") {
        try {
          await deleteApiData(path + "/" + idDelete);
          setRefresh(!refresh);
          setDefaultEdit(true);

          // pada bagian ini harap di refactor kemabali nanti yaa, Ennnddd
          closeModalDelete();
        } catch (error) {
          console.log(error.response);
        }
      } else if (path === "companies/{companyId}/branches") {
        try {
          await deleteApiData(
            "companies/" + dataEdit.idBranch + "/branches/" + dataEdit.idBranch
          );
          setIdCompany(dataDetailCompany.id);
          setRefresh((prevRefresh) => !prevRefresh);
          setDefaultEdit(false);
          closeModalDelete();
        } catch (error) {
          console.log(error.response);
        }
      } else if (path === "companies/{companyId}/departments") {
        try {
          await deleteApiData(
            "companies/" +
              dataEdit.idDepartments +
              "/departments/" +
              dataEdit.idDepartments
          );
          setIdCompany(dataDetailCompany.id);
          setRefresh((prevRefresh) => !prevRefresh);
          setDefaultEdit(false);
          closeModalDelete();
        } catch (error) {
          console.log(error.response);
        }
      }
    };

    return {
      openModalDelete,
      closeModalDelete,
      handleDelete,
    };
  };

  const inputBody = (param) => {
    if (param === "companies") {
      return (
        <>
          <div className="grid gap-4 mb-4 grid-cols-1 lg:grid-cols-3">
            {inputCompanies.map((item, index) => (
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
            <TextArea
              span={`col-span-3`}
              label={"Description"}
              htmlFor={"description"}
              id={"description"}
              name={"description"}
              referens={refBody.descriptionRef}
              value={dataEdit.description}
              onChange={handleChange}
              placeholder={"Write description here"}
            />
          </div>
        </>
      );
    } else if (
      defaultEdit == false &&
      param === "companies/{companyId}/branches"
    ) {
      return (
        <>
          <input
            type="hidden"
            name="company_id"
            value={idDelete}
            ref={refBody.company_idRef}
          />
          <input
            type="hidden"
            name="id"
            value={dataEdit.idBranch}
            ref={refBody.idBranchRef}
          />
          <div className="grid gap-4 mb-4 grid-cols-1 lg:grid-cols-2">
            {inputBranch.map((item, index) => (
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
    } else if (
      defaultEdit == false &&
      param === "companies/{companyId}/departments"
    ) {
      return (
        <>
          <input
            type="hidden"
            name="company_id"
            value={idDelete}
            ref={refBody.company_idRef}
          />
          <input
            type="hidden"
            name="id"
            value={dataEdit.idDepartments}
            ref={refBody.idDepartmentsRef}
          />
          <div className="grid gap-4 mb-4 grid-cols-1">
            {inputDepartments.map((item, index) => (
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
    dataDetailCompany,
    defaultEdit,
    setDefaultEdit,
  };
};
