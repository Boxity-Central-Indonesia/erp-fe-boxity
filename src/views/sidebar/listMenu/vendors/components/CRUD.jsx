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
  const [inputVendors, setInputVendors] = useState([]);
  const [inputVendorContact, setInputVendorContact] = useState([]);
  const [inputVendorTransaction, setInputVendorTransaction] = useState([]);
  const [responseError, setResponseError] = useState();
  const [dataVendorsSelect, setDataVendorsSelect] = useState([]);
  const [dataProductsSelect, setDataProductsSelect] = useState([]);
  const [validationError, setValidationError] = useState();
  const [dataCompanies, setDataCompanies] = useState();
  const [dataDepartments, setDataDepartments] = useState();
  const [loading, setLoading] = useState(true);
  const [dataCategoryEmployes, setDataCategoryEmployes] = useState();
  const [skeleton, setSkeleton] = useState(false);
  const [dataHeading, setDataHeading] = useState([{}]);
  const [path, setPath] = useState("vendors");
  const [defaultEdit, setDefaultEdit] = useState(true);
  const [dataDetailVendor, setDataDetailVendor] = useState({});
  const [dataDetailVendorContact, setDataDetailVendorContact] = useState([]);

  // EmployesList

  const [refBody, setRefBody] = useState({
    idRef: useRef(),
    nameRef: useRef(),
    addressRef: useRef(),
    phone_numberRef: useRef(),
    emailRef: useRef(),
    transaction_typeRef: useRef(),

    // contact
    vendors_idRef: useRef(),
    positionRef: useRef(),

    // transactions
    amountRef: useRef(),
    product_idRef: useRef(),
    unit_priceRef: useRef(),
    total_priceRef: useRef(),
    taxesRef: useRef(),
    shipping_costRef: useRef(),
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
        address: !!responseError.address ? responseError.address[0] : "",
        transaction_type: responseError?.transaction_type?.[0] || "",
        vendors_id: responseError?.vendors_id?.[0] || "",
        position: responseError?.position?.[0] || "",
        amount: responseError?.amount?.[0] || "",
        product_id: responseError?.product_id?.[0] || "",
        unit_price: responseError?.unit_price?.[0] || "",
        total_price: responseError?.total_price?.[0] || "",
        taxes: responseError?.taxes?.[0] || "",
        shipping_cost: responseError?.shipping_cost?.[0] || "",
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
    setInputVendors([
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
        element: "select",
        ref: refBody.transaction_typeRef,
        name: "transaction_type",
        label: "Transaction type",
        htmlFor: "Transaction type",
        id: "Transaction type",
        dataSelect: [
          { id: "inbound", name: "inbound" },
          { id: "outbound", name: "outbound" },
        ],
        value: dataEdit.transaction_type,
        onchange: handleChange,
      },
    ]);

    setInputVendorContact([
      // {
      //   element: "select",
      //   ref: refBody.vendors_idRef,
      //   name: "vendors_id",
      //   label: "Vendors",
      //   htmlFor: "vendors-id",
      //   id: "vendors-id",
      //   dataSelect: dataVendorsSelect,
      //   value: dataEdit.vendors_id,
      //   onchange: handleChange,
      // },
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
        name: "position",
        ref: refBody.positionRef,
        value: dataEdit.position,
        label: "Position",
        htmlFor: "position",
        id: "position",
        onchange: handleChange,
        placeholder: "Position",
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
    ]);

    setInputVendorTransaction([
      {
        element: "select",
        ref: refBody.vendors_idRef,
        name: "vendors_id",
        label: "Vendors",
        htmlFor: "vendors-id",
        id: "vendors-id",
        dataSelect: dataVendorsSelect,
        value: dataEdit.vendors_id,
        onchange: handleChange,
      },
      {
        element: "select",
        ref: refBody.product_idRef,
        name: "product_id",
        label: "Products",
        htmlFor: "product-id",
        id: "product-id",
        dataSelect: dataProductsSelect,
        value: dataEdit.product_id,
        onchange: handleChange,
      },
      {
        element: "input",
        type: "number",
        name: "amount",
        ref: refBody.amountRef,
        value: dataEdit.amount,
        label: "Amount",
        htmlFor: "amount",
        id: "amount",
        onchange: handleChange,
        placeholder: "Amount",
      },
      {
        element: "input",
        type: "number",
        name: "unit_price",
        ref: refBody.unit_priceRef,
        value: dataEdit.unit_price,
        label: "Unit price",
        htmlFor: "unit_price",
        id: "unit_price",
        onchange: handleChange,
        placeholder: "Unit price",
      },

      {
        element: "input",
        type: "number",
        name: "total_price",
        ref: refBody.total_priceRef,
        value: dataEdit.total_price,
        label: "w",
        htmlFor: "total_price",
        id: "total_price",
        onchange: handleChange,
        placeholder: "Total price",
      },
      {
        element: "input",
        type: "number",
        name: "taxes",
        ref: refBody.taxesRef,
        value: dataEdit.taxes,
        label: "Taxes",
        htmlFor: "taxes",
        id: "taxes",
        onchange: handleChange,
        placeholder: "Taxes",
      },
      {
        element: "input",
        type: "number",
        name: "shipping_cost",
        ref: refBody.shipping_costRef,
        value: dataEdit.shipping_cost,
        label: "Shipping cost",
        htmlFor: "shipping_cost",
        id: "shipping_cost",
        onchange: handleChange,
        placeholder: "Shipping cost",
      },
    ]);
  }, [dataEdit]);

  const dataVendors = (data) => {
    return data.map((item) => ({
      id: item.id,
      name: item.name,
      address: item.address,
      email: item.email,
      "phone number": item.phone_number,
      "transaction type": item.transaction_type,
    }));
  };

  const dataVendorsTransactions = (data) => {
    return data.map((item) => ({
      id: item.id,
      vendor: item.vendor?.name,
      "nama product": item.product?.name,
      "harga satuan": item.unit_price,
      "total harga": item.total_price,
    }));
  };

  const READ = () => {
    const [data, setData] = useState();
    useEffect(() => {
      const getData = async () => {
        try {
          if (path === "vendors") {
            const { data } = await getApiData("vendors");
            const newData = dataVendors(data);
            setData(() => newData);
            setDataHeading([
              {
                label: "Add new vendors",
                icon: IconAdd(),
                heading: "Vendors list",
                information:
                  "This is additional information about the content of this section. You can provide any relevant details or instructions here.",
                eventToggleModal: handleCreate,
                onclick: handleClickHeading,
                showNavHeading: true,
                dataNavHeading: [
                  { path: "vendors", label: "Vendors" },
                  { path: "vendor-transactions", label: "Vendor Transactions" },
                ],
                activeButton: path,
              },
            ]);
          } else if (path === "vendor-transactions") {
            const { data } = await getApiData("vendor-transactions");
            const newData = dataVendorsTransactions(data);
            setData(() => newData);
            setDataHeading([
              {
                label: "Add new vendors",
                icon: IconAdd(),
                heading: "Vendors list",
                information:
                  "This is additional information about the content of this section. You can provide any relevant details or instructions here.",
                eventToggleModal: handleCreate,
                onclick: handleClickHeading,
                showNavHeading: true,
                dataNavHeading: [
                  { path: "vendors", label: "Vendors" },
                  { path: "vendor-contacts", label: "Contacts" },
                  { path: "vendor-transactions", label: "Vendor Transactions" },
                ],
                activeButton: path,
              },
            ]);
          } else {
            const { data } = await getApiData("vendors");
            const newData = dataVendors(data);
            setData(() => newData);
            setDataHeading([
              {
                label: "Add new vendors",
                icon: IconAdd(),
                heading: "Vendors list",
                information:
                  "This is additional information about the content of this section. You can provide any relevant details or instructions here.",
                eventToggleModal: handleCreate,
                onclick: handleClickHeading,
                showNavHeading: true,
                dataNavHeading: [
                  { path: "vendors", label: "Vendors" },
                  { path: "vendor-transactions", label: "Vendor Transactions" },
                ],
                activeButton: path,
              },
            ]);
          }
        } catch (error) {
          console.error(error);
        }
      };
      getData();
    }, [refresh]);

    useEffect(() => {
      const getDataVendor = async () => {
        const { data, status } = await getApiData("vendors");
        if (status === 200) {
          const newData = data.map((item) => ({
            id: item.id,
            name: item.name,
          }));
          setDataVendorsSelect(newData);
        }
      };
      getDataVendor();

      const getDataProducts = async () => {
        const { data, status } = await getApiData("products");
        if (status === 200) {
          const newData = data.map((item) => ({
            id: item.id,
            name: item.name,
          }));
          setDataProductsSelect(newData);
        }
      };
      getDataProducts();
    }, []);

    const handleClickHeading = async (param) => {
      setPath(param);
      setDataHeading([
        {
          label:
            param === "vendors"
              ? "Add vendors"
              : param === "vendor-transactions"
              ? "Add transactions"
              : "Add contacts",
          icon: IconAdd(),
          heading:
            param === "vendors"
              ? "Vendors list"
              : param === "vendor-transactions"
              ? "Transaction list"
              : "Contacts list",
          information:
            "This is additional information about the content of this section. You can provide any relevant details or instructions here.",
          eventToggleModal: handleCreate,
          onclick: handleClickHeading,
          parameter: param,
          showNavHeading: true,
          dataNavHeading: [
            { path: "vendors", label: "Vendors" },
            { path: "vendor-transactions", label: "Vendor Transactions" },
          ],
          activeButton: param,
        },
      ]);
      setData([1]);
      setSkeleton((prevSkeleton) => !prevSkeleton);
      try {
        const { data, status } = await getApiData(param);
        if (status === 200) {
          if (param === "vendors") {
            const newData = dataVendors(data);
            setSkeleton((prevSkeleton) => !prevSkeleton);
            setData(newData);
          } else if (param === "vendor-transactions") {
            setSkeleton((prevSkeleton) => !prevSkeleton);
            const newData = dataVendorsTransactions(data);
            setData(newData);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    // getDatEnd

    return { data, handleClickHeading };
  };

  const EDIT = () => {
    const handleEdit = async (param, routes, param2) => {
      const id = param.textContent;
      if (
        path === "vendors" &&
        routes !== "vendors-edit" &&
        routes !== "vendor-contacts"
      ) {
        setDefaultEdit(false);
        localStorage.setItem("path", "vendors");
        setDataHeading([
          {
            label: "Add",
            icon: IconAdd(),
            eventToggleModal: handleCreate,
            onclick: handleClickHeading,
            showNavHeading: false,
          },
        ]);
        try {
          const { status, data } = await getApiData("vendors/" + id);
          if (status === 200) {
            setDataDetailVendor(data);
            setDataEdit({
              name: data.name,
              address: data.address,
              phone_number: data.phone_number,
              transaction_type: data.transaction_type,
              email: data.email,
              id: data.id,
            });
            setIdDelete(data.id);
            localStorage.setItem("dataIdVendor", data.id);
            try {
              const { status, data } = await getApiData(
                "vendors/" + id + "/contacts"
              );
              if (status === 200) {
                setDataDetailVendorContact(data);
              }
            } catch (error) {
              console.log(error);
            }
          }
        } catch (error) {
          console.log(error);
        }
      } else if (path === "vendor-transactions") {
        setDataModal({
          labelModal: "Update transaction",
          labelBtnModal: "Save",
          labelBtnSecondaryModal: "Delete",
          handleBtn: edit,
        });
        setValidationError({
          vendors_id: "",
          amount: "",
          product_id: "",
          unit_price: "",
          total_price: "",
          taxes: "",
          shipping_cost: "",
        });
        setOpenModal((prevOpenModal) => !prevOpenModal);
        try {
          const { data, status } = await getApiData(path + "/" + id);
          if (status === 200) {
            setDataEdit({
              vendors_id: data.vendors_id,
              amount: data.amount,
              product_id: data.product_id,
              unit_price: data.unit_price,
              total_price: data.total_price,
              taxes: data.taxes,
              shipping_cost: data.shipping_cost,
              id: data.id,
            });

            setIdDelete(data.id);
          }
        } catch (error) {
          console.log(error);
        }
      } else if (routes === "vendors-edit") {
        localStorage.setItem("path", "vendors");
        setPath("vendors");
        setDataModal({
          size: "2xl",
          labelModal: "Edit vendor",
          labelBtnModal: "Save",
          hidden: true,
          handleBtn: edit,
        });
        setValidationError({});
        setOpenModal((prevOpenModal) => !prevOpenModal);
        try {
          const { status, data } = await getApiData("vendors/" + param);
          if (status === 200) {
            setDataEdit({
              name: data.name,
              address: data.address,
              phone_number: data.phone_number,
              transaction_type: data.transaction_type,
              email: data.email,
              id: data.id,
            });
            setIdDelete(data.id);
            localStorage.setItem("dataIdVendor", data.id);
          }
        } catch (error) {
          console.log(error);
        }
      } else if (routes === "vendor-contacts") {
        setPath("vendor-contacts");
        localStorage.setItem("path", "vendor-contacts");
        setValidationError({});
        setOpenModal((prevOpenModal) => !prevOpenModal);
        setDataModal({
          size: "xl",
          labelModal: "Edit Kontak",
          labelBtnModal: "Save",
          labelBtnSecondaryModal: "Delete",
          hidden: false,
          handleBtn: edit,
        });
        try {
          const { data, status } = await getApiData(
            "vendor-contacts/" + param2
          );
          if (status === 200) {
            setDataEdit({
              // vendors_id: data.vendors_id,
              name: data.name,
              position: data.position,
              phone_number: data.phone_number,
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
      if (localStorage.getItem("path") === "vendors") {
        dataBody = {
          name: refBody.nameRef.current.value,
          address: refBody.addressRef.current.value,
          phone_number: refBody.phone_numberRef.current.value,
          transaction_type: refBody.transaction_typeRef.current.value,
          email: refBody.emailRef.current.value,
        };
        try {
          const response = await putApiData(
            "vendors/" + refBody.idRef.current.value,
            dataBody
          );
          if (response.status === 201) {
            setLoading((prevLoading) => !prevLoading);
            setRefresh(!refresh);
            setOpenModal((prevOpenModal) => !prevOpenModal);
            try {
              const { status, data } = await getApiData(
                "vendors/" + refBody.idRef.current.value
              );
              if (status === 200) {
                setDataDetailVendor(data);
                setDataEdit({
                  name: data.name,
                  address: data.address,
                  phone_number: data.phone_number,
                  transaction_type: data.transaction_type,
                  email: data.email,
                  id: data.id,
                });

                setIdDelete(data.id);
                try {
                  const { status, data } = await getApiData(
                    "vendors/" + refBody.idRef.current.value + "/contacts"
                  );
                  if (status === 200) {
                    setDataDetailVendorContact(data);
                  }
                } catch (error) {
                  console.log(error);
                }
              }
            } catch (error) {
              console.log(error);
            }
          }
        } catch (error) {
          setLoading((prevLoading) => !prevLoading);
          setResponseError(error.response.data.errors);
        }
      } else if (localStorage.getItem("path") === "vendor-contacts") {
        dataBody = {
          vendors_id: localStorage.getItem("dataIdVendor"),
          name: refBody.nameRef.current.value,
          position: refBody.positionRef.current.value,
          phone_number: refBody.phone_numberRef.current.value,
        };
        try {
          const response = await putApiData(
            "vendor-contacts/" + refBody.idRef.current.value,
            dataBody
          );
          if (response.status === 201) {
            setLoading((prevLoading) => !prevLoading);
            setRefresh(!refresh);
            setOpenModal((prevOpenModal) => !prevOpenModal);

            // ini seharusnya bisa di refactore lagi
            try {
              const { status, data } = await getApiData(
                "vendors/" + localStorage.getItem("dataIdVendor") + "/contacts"
              );
              if (status === 200) {
                setDataDetailVendorContact(data);
                localStorage.removeItem("path");
              }
            } catch (error) {
              console.log(error);
            }
            // ini seharusnya bisa di refactore lagi end
          }
        } catch (error) {
          setLoading((prevLoading) => !prevLoading);
          setResponseError(error.response.data.errors);
        }
      } else if (path === "vendor-transactions") {
        dataBody = {
          vendors_id: refBody.vendors_idRef.current.value,
          amount: refBody.amountRef.current.value,
          product_id: refBody.product_idRef.current.value,
          unit_price: refBody.unit_priceRef.current.value,
          total_price: refBody.total_priceRef.current.value,
          taxes: refBody.taxesRef.current.value,
          shipping_cost: refBody.shipping_costRef.current.value,
        };
        try {
          const response = await putApiData(
            path + "/" + refBody.idRef.current.value,
            dataBody
          );
          console.log(response);
          if (response.status === 201) {
            setLoading((prevLoading) => !prevLoading);
            setRefresh(!refresh);
            setOpenModal((prevOpenModal) => !prevOpenModal);
          }
        } catch (error) {
          setLoading((prevLoading) => !prevLoading);
          setResponseError(error.response.data.errors);
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
      if (param === "vendors") {
        setDataEdit({
          name: "",
          address: "",
          phone_number: "",
          transaction_type: "",
          email: "",
        });
        setValidationError({
          name: "",
          address: "",
          phone_number: "",
          transaction_type: "",
          email: "",
        });
        setOpenModal((prevOpenModal) => !prevOpenModal);
        setDataModal({
          size: "2xl",
          labelModal: "Add New vendor",
          labelBtnModal: "Add new vendor",
          labelBtnSecondaryModal: "Back",
          handleBtn: create,
        });
      } else if (param === "vendor-transactions") {
        setDataEdit({
          vendors_id: "",
          amount: "",
          product_id: "",
          unit_price: "",
          total_price: "",
          taxes: "",
          shipping_cost: "",
        });
        setValidationError({
          vendors_id: "",
          amount: "",
          product_id: "",
          unit_price: "",
          total_price: "",
          taxes: "",
          shipping_cost: "",
        });
        setOpenModal((prevOpenModal) => !prevOpenModal);
        setDataModal({
          size: "2xl",
          labelModal: "Add New transactions",
          labelBtnModal: "Add new transactions",
          labelBtnSecondaryModal: "Back",
          handleBtn: create,
        });
      } else if (param === "vendor-contacts") {
        setPath(param);
        setDataEdit({
          vendors_id: "",
          name: "",
          position: "",
          phone_number: "",
        });
        setValidationError({
          vendors_id: "",
          name: "",
          position: "",
          phone_number: "",
        });
        setOpenModal((prevOpenModal) => !prevOpenModal);
        setDataModal({
          size: "lg",
          labelModal: "Add New contact",
          labelBtnModal: "Add new contact",
          labelBtnSecondaryModal: "Back",
          handleBtn: create,
        });
      } else {
        setDataEdit({
          name: "",
          address: "",
          phone_number: "",
          transaction_type: "",
          email: "",
        });
        setValidationError({
          name: "",
          address: "",
          phone_number: "",
          transaction_type: "",
          email: "",
        });
        setOpenModal((prevOpenModal) => !prevOpenModal);
        setDataModal({
          size: "2xl",
          labelModal: "Add New vendor",
          labelBtnModal: "Add new vendor",
          labelBtnSecondaryModal: "Back",
          handleBtn: create,
        });
      }
    };

    const create = async (param) => {
      setLoading((prevLoading) => !prevLoading);
      let dataBody = {};
      if (param === "vendors") {
        dataBody = {
          name: refBody.nameRef.current.value,
          address: refBody.addressRef.current.value,
          phone_number: refBody.phone_numberRef.current.value,
          transaction_type: refBody.transaction_typeRef.current.value,
          email: refBody.emailRef.current.value,
        };

        try {
          const store = await postApiData(param, dataBody);
          if (store.status === 201) {
            setPath(param);
            setRefresh(!refresh);
            setLoading((prevLoading) => !prevLoading);
            setOpenModal((prevOpenModal) => !prevOpenModal);
          }
        } catch (error) {
          setLoading((prevLoading) => !prevLoading);
          setResponseError(error.response.data.errors);
        }
      } else if (param === "vendor-transactions") {
        dataBody = {
          vendors_id: refBody.vendors_idRef.current.value,
          amount: refBody.amountRef.current.value,
          product_id: refBody.product_idRef.current.value,
          unit_price: refBody.unit_priceRef.current.value,
          total_price: refBody.total_priceRef.current.value,
          taxes: refBody.taxesRef.current.value,
          shipping_cost: refBody.shipping_costRef.current.value,
        };

        try {
          const store = await postApiData(param, dataBody);
          if (store.status === 201) {
            setPath(() => param);
            setRefresh((prevRevresh) => !prevRevresh);
            setLoading((prevLoading) => !prevLoading);
            setOpenModal((prevOpenModal) => !prevOpenModal);
          }
        } catch (error) {
          setLoading((prevLoading) => !prevLoading);
          setResponseError(error.response.data.errors);
        }
      } else if (param === "vendor-contacts") {
        dataBody = {
          vendors_id: localStorage.getItem("dataIdVendor"),
          name: refBody.nameRef.current.value,
          position: refBody.positionRef.current.value,
          phone_number: refBody.phone_numberRef.current.value,
        };

        try {
          const { data, status } = await postApiData(param, dataBody);
          if (status === 201) {
            setPath(() => param);
            setRefresh((prevRevresh) => !prevRevresh);
            setLoading((prevLoading) => !prevLoading);
            setOpenModal((prevOpenModal) => !prevOpenModal);

            // ini seharusnya bisa di refactore lagi
            try {
              const { status, data } = await getApiData(
                "vendors/" + localStorage.getItem("dataIdVendor") + "/contacts"
              );
              if (status === 200) {
                setDataDetailVendorContact(data);
              }
            } catch (error) {
              console.log(error);
            }
            // ini seharusnya bisa di refactore lagi end
          }
        } catch (error) {
          setLoading((prevLoading) => !prevLoading);
          setResponseError(error.response.data.errors);
        }
      } else {
        dataBody = {
          name: refBody.nameRef.current.value,
          address: refBody.addressRef.current.value,
          phone_number: refBody.phone_numberRef.current.value,
          transaction_type: refBody.transaction_typeRef.current.value,
          email: refBody.emailRef.current.value,
        };

        try {
          const store = await postApiData("vendors", dataBody);
          if (store.status === 201) {
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
      try {
        await deleteApiData(path + "/" + idDelete);
        if (path === "vendor-contacts") {
          // ini seharusnya bisa di refactore lagi
          try {
            const { status, data } = await getApiData(
              "vendors/" + localStorage.getItem("dataIdVendor") + "/contacts"
            );
            if (status === 200) {
              setDataDetailVendorContact(data);
            }
          } catch (error) {
            console.log(error);
          }
          // ini seharusnya bisa di refactore lagi end
        }
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
    if (param === "vendors") {
      return (
        <>
          <div className="grid gap-4 mb-4 grid-cols-1 lg:grid-cols-2">
            {inputVendors.map((item, index) => (
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
    } else if (param === "vendor-contacts") {
      return (
        <>
          <div className="grid gap-4 mb-4 grid-cols-1">
            {inputVendorContact.map((item, index) => (
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
    } else if (param === "vendor-transactions") {
      return (
        <>
          <div className="grid gap-4 mb-4 grid-cols-1 xl:grid-cols-2">
            {inputVendorTransaction.map((item, index) => (
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
    defaultEdit,
    setDefaultEdit,
    dataDetailVendor,
    dataDetailVendorContact,
    setPath,
    setDataHeading,
    handleClickHeading,
  };
};
