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
import { TabelForProducts } from "./TabelForProducts";

export const CRUD = () => {
  const [refresh, setRefresh] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalDelete, setModalDelete] = useState();
  const [idDelete, setIdDelete] = useState();
  const [dataModal, setDataModal] = useState({});
  const [inputOrder, setInputOrder] = useState([]);
  const [inputInvoices, setInputInvoices] = useState([]);
  const [inputPayments, setInputPayments] = useState([]);
  const [responseError, setResponseError] = useState();
  const [validationError, setValidationError] = useState();
  const [dataDepartments, setDataDepartments] = useState();
  const [dataOrdersSelect, setDataOrdersSelect] = useState([]);
  const [dataInvoicesSelect, setDataInvoicesSelect] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataCategoryEmployes, setDataCategoryEmployes] = useState();
  const [skeleton, setSkeleton] = useState(false);
  const [dataHeading, setDataHeading] = useState([{}]);
  const [path, setPath] = useState("orders");
  const [defaultEdit, setDefaultEdit] = useState(true);
  const [dataDetailOrders, setDataDetailOrders] = useState({});
  const [inputProducts, setInputProducts] = useState();
  const [dataSelectVendor, setDataSelectVendor] = useState();
  const [dataSelectWarehouses, setDataSelectWarehouses] = useState();
  const [dataSelectProducts, setDataSelectProducts] = useState();
  const [dataTabelProducts, setDataTabelProducts] = useState([]);
  const [inputEditOrder, setInputEditOrder] = useState();

  const [refBody, setRefBody] = useState({
    vendor_idRef: useRef(),
    warehouse_idRef: useRef(),
    product_idRef: useRef(),
    statusRef: useRef(),
    detailsRef: useRef(),
    price_per_unitRef: useRef(),
    total_priceRef: useRef(),
    quantityRef: useRef(),
    taxesRef: useRef(),
    shipping_costRef: useRef(),
    order_typeRef: useRef(),
    productsRef: useRef(),

    //invoices
    order_idRef: useRef(),
    total_amountRef: useRef(),
    balance_dueRef: useRef(),
    invoice_dateRef: useRef(),
    due_dateRef: useRef(),

    // payments
    invpice_idRef: useRef(),
    amount_paidRef: useRef(),
    payment_methodRef: useRef(),
    payment_dateRef: useRef(),
  });
  const [dataEdit, setDataEdit] = useState({});

  const handleChangeAndPushProducts = async (event) => {
    // Mendapatkan nama dan nilai input yang berubah
    const { name, value } = event.target;

    try {
      const { data, status } = await getApiData("products/" + value);
      if (status === 200 && value) {
        const newData = {
          id: data.id,
          name: data.name,
          qty: 0,
          price_per_unit: 10,
        };
        setDataTabelProducts([...dataTabelProducts, newData]);
      }
    } catch (error) {
      console.log(error);
    }

    // Memperbarui state sesuai dengan nilai input yang berubah
    setDataEdit((prevDataEdit) => ({
      ...prevDataEdit,
      [name]: value,
    }));
  };

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
        invoice_id: responseError?.invoice_id?.[0] || "",
        amount_paid: responseError?.amount_paid?.[0] || "",
        payment_method: responseError?.payment_method?.[0] || "",
        payment_date: responseError?.payment_date?.[0] || "",
      });
    }
  }, [responseError]);

  useEffect(() => {
    const fetchData = async (param, state) => {
      try {
        const { data, status } = await getApiData(param);
        if (status === 200) {
          const newData = data.map((item) => ({
            id: item.id,
            name: item.name,
          }));
          state(newData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData("warehouses", setDataSelectWarehouses);
    fetchData("vendors", setDataSelectVendor);
    fetchData("products", setDataSelectProducts);

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
    setInputOrder([
      {
        element: "select",
        name: "vendor_id",
        ref: refBody.vendor_idRef,
        value: dataEdit.vendor_id,
        label: "Vendor",
        htmlFor: "vendor_id",
        id: "vendor_id",
        dataSelect: dataSelectVendor,
        onchange: handleChange,
      },
      {
        element: "select",
        name: "warehouse_id",
        ref: refBody.warehouse_idRef,
        value: dataEdit.warehouse_id,
        label: "Warehouses",
        htmlFor: "warehouse_id",
        id: "warehouse_id",
        dataSelect: dataSelectWarehouses,
        onchange: handleChange,
      },
      {
        element: "radio",
        name: "order_type",
        ref: refBody.order_typeRef,
        value: dataEdit.order_type,
        label: "Order type",
        htmlFor: "order_type",
        id: "order_type",
        dataSelect: [
          { id: 1, name: "Direct Order" },
          { id: 2, name: "Production Order" },
        ],
        onchange: handleChange,
      },
    ]);

    setInputEditOrder([
      {
        element: "select",
        name: "vendor_id",
        ref: refBody.vendor_idRef,
        value: dataEdit.vendor_id,
        label: "Vendor",
        htmlFor: "vendor_id",
        id: "vendor_id",
        dataSelect: dataSelectVendor,
        onchange: handleChange,
      },
      {
        element: "select",
        name: "warehouse_id",
        ref: refBody.warehouse_idRef,
        value: dataEdit.warehouse_id,
        label: "Warehouses",
        htmlFor: "warehouse_id",
        id: "warehouse_id",
        dataSelect: dataSelectWarehouses,
        onchange: handleChange,
      },
    ]);

    setInputProducts([
      {
        element: "select",
        name: "product_id",
        ref: refBody.product_idRef,
        value: dataEdit.product_id,
        label: "products",
        htmlFor: "product_id",
        id: "product_id",
        dataSelect: dataSelectProducts,
        onchange: handleChangeAndPushProducts,
      },
      // {
      //     element: 'select',
      //     name: 'products',
      //     ref: refBody.productsRef,
      //     value: dataEdit.products,
      //     label: '',
      //     htmlFor: 'products',
      //     id: 'products',
      //     dataSelect: [],
      //     onchange: handleChange
      // },
    ]);

    setInputInvoices([
      {
        element: "select",
        name: "order_id",
        ref: refBody.order_idRef,
        value: dataEdit.order_id,
        label: "Order",
        htmlFor: "order_id",
        id: "order_id",
        dataSelect: dataOrdersSelect,
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
        type: "date",
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
        label: "Invoice date",
        htmlFor: "invoice_date",
        id: "invoice_date",
        onchange: handleChange,
        placeholder: "Invoice date",
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
      {
        element: "select",
        name: "status",
        ref: refBody.statusRef,
        value: dataEdit.status,
        label: "Status",
        htmlFor: "status",
        id: "status",
        dataSelect: [
          { value: "unpaid", name: "unpaid" },
          { value: "partial", name: "partial" },
          { value: "paid", name: "paid" },
        ],
        onchange: handleChange,
      },
    ]);

    setInputPayments([
      {
        element: "select",
        name: "invoice_id",
        ref: refBody.invoice_dateRef,
        value: dataEdit.invoice_id,
        label: "Invoice",
        htmlFor: "invoice_id",
        id: "invoice_id",
        dataSelect: dataInvoicesSelect,
        onchange: handleChange,
      },
      {
        element: "input",
        type: "number",
        name: "amount_paid",
        ref: refBody.amount_paidRef,
        value: dataEdit.amount_paid,
        label: "Amount paid",
        htmlFor: "amount_paid",
        id: "amount_paid",
        onchange: handleChange,
        placeholder: "Amount paid",
      },
      {
        element: "select",
        name: "payment_method",
        ref: refBody.payment_methodRef,
        value: dataEdit.payment_method,
        label: "Payment methode",
        htmlFor: "payment_method",
        id: "payment_method",
        dataSelect: [
          { value: "cash", name: "cash" },
          { value: "credit", name: "credit" },
          { value: "online", name: "online" },
          { value: "other", name: "other" },
        ],
        onchange: handleChange,
      },
      {
        element: "input",
        type: "date",
        name: "payment_date",
        ref: refBody.payment_dateRef,
        value: dataEdit.payment_date,
        label: "Payment date",
        htmlFor: "payment_date",
        id: "payment_date",
        onchange: handleChange,
        placeholder: "Payment date",
      },
    ]);
  }, [dataEdit]);

  const dataOrders = (data) => {
    return data.map((item) => ({
      "kode transaksi": item.kode_order,
      "vendor name": item.vendor.name,
      // 'product name': item.products.name,
      "warehouse name": item.warehouse.name,
      // status: item.status,
      "order status": item.order_status,
      "order type": item.order_type,
      "biaya pajak": item.taxes ?? "--",
      // quantity: item.quantity,
      "biaya pengiriman": item.shipping_cost ?? "--",
      "total tagihan": item.total_price,
      id: item.id,
    }));
  };

  const dataPayments = (data) => {
    return data.map((item) => ({
      "kode transaksi": item.kode_payment,
      "kode invoice": item.invoice.kode_invoice,
      "tagihan terbayar": item.amount_paid,
      "metode pembayaran": item.payment_method,
      "tanggal pembayaran": item.payment_date,
      id: item.id,
    }));
  };

  const dataInvoices = (data) => {
    return data.map((item) => ({
      "kode transaksi": item.kode_invoice,
      "kode order": item.order.kode_order,
      "tanggal invoice": item.invoice_date,
      "tanggal jatuh tempo": item.due_date,
      status: item.status,
      "tagihan terbayar": item.paid_amount,
      "sisa tagihan": item.balance_due,
      "total tagihan": item.total_amount,
      id: item.id,
    }));
  };

  const READ = () => {
    const [data, setData] = useState();
    useEffect(() => {
      const getData = async () => {
        try {
          const { data } = await getApiData(path);
          if (path === "orders") {
            const newData = dataOrders(data);
            setData(newData);
            setDataHeading([
              {
                label: "Add new orders",
                icon: IconAdd(),
                heading: "Orders list",
                eventToggleModal: handleCreate,
                onclick: handleClickHeading,
                showNavHeading: true,
                dataNavHeading: [
                  { path: "orders", label: "Orders" },
                  { path: "invoices", label: "Invoices" },
                  { path: "payments", label: "Payments" },
                ],
                activeButton: "orders",
              },
            ]);
          } else if (path === "invoices") {
            const newData = dataInvoices(data);
            setData(newData);
            setDataHeading([
              {
                label: "Add new invoice",
                icon: IconAdd(),
                heading: "Invoices list",
                eventToggleModal: handleCreate,
                onclick: handleClickHeading,
                showNavHeading: true,
                dataNavHeading: [
                  { path: "orders", label: "Orders" },
                  { path: "invoices", label: "Invoices" },
                  { path: "payments", label: "Payments" },
                ],
                activeButton: "orders",
              },
            ]);
          } else if (path === "payments") {
            const newData = dataInvoices(data);
            setData(newData);
            setDataHeading([
              {
                label: "Add new payment",
                icon: IconAdd(),
                heading: "Payments list",
                eventToggleModal: handleCreate,
                onclick: handleClickHeading,
                showNavHeading: true,
                dataNavHeading: [
                  { path: "orders", label: "Orders" },
                  { path: "invoices", label: "Invoices" },
                  { path: "payments", label: "Payments" },
                ],
                activeButton: "orders",
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
      const getDataOrders = async () => {
        try {
          const { data, status } = await getApiData(path);
          if (status === 200) {
            const newData = data.map((item) => ({
              id: item.id,
              name: item.name,
            }));
            setDataOrdersSelect(newData);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getDataOrders();

      const getDataInvoice = async () => {
        try {
          const { data, status } = await getApiData(path);
          if (status === 200) {
            const newData = data.map((item) => ({
              id: item.id,
              name: item.name,
            }));
            setDataInvoicesSelect(newData);
          }
        } catch (error) {
          console.log(error);
        }
      };
    }, []);

    const handleClickHeading = async (param) => {
      setPath(param);
      setDataHeading([
        {
          label:
            param === "orders"
              ? "Add orders"
              : param === "invoices"
              ? "Add invoices"
              : "Add payments",
          icon: IconAdd(),
          heading:
            param === "orders"
              ? "Orders list"
              : param === "invoices"
              ? "Invoices list"
              : "Payments list",
          eventToggleModal: handleCreate,
          onclick: handleClickHeading,
          parameter: param,
          showNavHeading: true,
          dataNavHeading: [
            { path: "orders", label: "Orders" },
            { path: "invoices", label: "Invoices" },
            { path: "payments", label: "Payments" },
          ],
          activeButton: param,
        },
      ]);
      setData([1]);
      setSkeleton((prevSkeleton) => !prevSkeleton);
      try {
        const { data, status } = await getApiData(param);
        if (status === 200) {
          if (param === "orders") {
            const newData = dataOrders(data);
            setSkeleton((prevSkeleton) => !prevSkeleton);
            setData(newData);
          } else if (param === "invoices") {
            setSkeleton((prevSkeleton) => !prevSkeleton);
            const newData = dataInvoices(data);
            setData(newData);
          } else if (param === "payments") {
            setSkeleton((prevSkeleton) => !prevSkeleton);
            const newData = dataPayments(data);
            setData(newData);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    return { data, handleClickHeading };
  };

  const CREATE = () => {
    const handleCreate = async (param) => {
      if (param === "orders") {
        setDataEdit({
          customer_id: "",
          warehouse_id: "",
          status: "",
          details: "",
          order_type: "",
          products: "",
        });
        setValidationError({
          customer_id: "",
          warehouse_id: "",
          status: "",
          details: "",
          order_type: "",
          products: "",
        });
        setDataModal({
          size: "2xl",
          labelModal: "Add New orders",
          labelBtnModal: "Add new orders",
          labelBtnSecondaryModal: "Back",
          handleBtn: create,
        });
        setOpenModal((prevOpenModal) => !prevOpenModal);
      } else if (param === "invoices") {
        setDataEdit({
          order_id: "",
          total_amount: "",
          balance_due: "",
          invoice_date: "",
          due_date: "",
          status: "",
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
      } else if (param === "payments") {
        setDataEdit({
          invoice_id: "",
          amount_paid: "",
          payment_method: "",
          payment_date: "",
        });
        setValidationError({
          invoice_id: "",
          amount_paid: "",
          payment_method: "",
          payment_date: "",
        });
        setOpenModal((prevOpenModal) => !prevOpenModal);
        setDataModal({
          size: "2xl",
          labelModal: "Add New invoices",
          labelBtnModal: "Add new invoices",
          labelBtnSecondaryModal: "Back",
          handleBtn: create,
        });
      } else {
        setDataEdit({
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
        });
        setOpenModal((prevOpenModal) => !prevOpenModal);
        setDataModal({
          size: "6xl",
          labelModal: "Add New employes",
          labelBtnModal: "Add new employes",
          labelBtnSecondaryModal: "Back",
          handleBtn: create,
        });
      }
    };

    const create = async (param) => {
      setLoading((prevLoading) => !prevLoading);
      let dataBody = {};
      if (param === "orders") {
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
      } else if (param === "invoices") {
        dataBody = {
          order_id: refBody.order_idRef.current.value,
          total_amount: refBody.total_amountRef.current.value,
          balance_due: refBody.balance_dueRef.current.value,
          invoice_date: refBody.invoice_dateRef.current.value,
          due_date: refBody.due_dateRef.current.value,
          status: refBody.statusRef.current.value,
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
      } else if (param === "payments") {
        dataBody = {
          invoice_id: refBody.invoice_dateRef.current.value,
          amount_paid: refBody.amount_paidRef.current.value,
          payment_method: refBody.payment_methodRef.current.value,
          payment_date: refBody.payment_dateRef.current.value,
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
      } else {
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
          const store = await postApiData("employees", dataBody);
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

  const EDIT = () => {
    const handleEdit = async (param) => {
      console.log(path);
      // const id = param.textContent
      if (path === "orders" && defaultEdit === true) {
        setDefaultEdit(false);
        setDataModal({
          labelModal: "Update employes",
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
        });
        // setOpenModal(prevOpenModal => !prevOpenModal)
        try {
          const { data, status } = await getApiData("orders/4");
          if (status === 200) {
            setDataEdit({
              // vendor: data.vendor.name,
              // warehouse: data.warehouse.name,
              // 'order type': data.order_type,
              // 'taxes': data.taxes ?? '--',
              // 'shipping_cost': data.shipping_cost ?? '--'
            });
            setDataDetailOrders(() => data);
            setIdDelete(data.id);
          }
        } catch (error) {
          console.log(error);
        }
      } else if (path === "orders" && defaultEdit === false) {
        setDataModal({
          labelModal: "Edit orders",
          labelBtnModal: "Save",
          labelBtnSecondaryModal: "Delete",
          handleBtn: edit,
        });

        try {
          const { data, status } = await getApiData("orders/4");
          if (status === 200) {
            setDataEdit({
              id: data.id,
              vendor_id: data.vendor.id,
              warehouse_id: data.warehouse.id,
              order_type: data.order_type,
              invoice: data.invoice,
            });
          }
        } catch (error) {}

        setOpenModal((prevOpenModal) => !prevOpenModal);
      } else if (path === "invoices") {
        setDataModal({
          labelModal: "Update invoice",
          labelBtnModal: "Save",
          labelBtnSecondaryModal: "Delete",
          handleBtn: edit,
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
        try {
          const { data, status } = await getApiData(path + "/" + param);
          if (status === 200) {
            setDataEdit({
              id: data.id,
              order_id: data.order_id,
              total_amount: data.total_amount,
              balance_due: data.balance_due,
              invoice_date: data.invoice_date,
              due_date: data.due_date,
              status: data.status,
            });

            setIdDelete(data.id);
          }
        } catch (error) {
          console.log(error);
        }
      } else if (path === "payments") {
        setDataModal({
          labelModal: "Update payments",
          labelBtnModal: "Save",
          labelBtnSecondaryModal: "Delete",
          handleBtn: edit,
        });
        setValidationError({
          invoice_id: "",
          amount_paid: "",
          payment_method: "",
          payment_date: "",
        });
        setOpenModal((prevOpenModal) => !prevOpenModal);
        try {
          const { data, status } = await getApiData(path + "/" + param);
          if (status === 200) {
            setDataEdit({
              id: data.id,
              invoice_id: data.invoice_id,
              amount_paid: data.amount_paid,
              payment_method: data.payment_method,
              payment_date: data.payment_date,
            });

            setIdDelete(data.id);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    const edit = async () => {
      let dataBody = {};
      setLoading((prevLoading) => !prevLoading);
      if (path === "orders") {
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
          const { data, status } = await putApiData(
            path + "/" + refBody.idRef.current.value,
            dataBody
          );
          if (status === 201) {
            setLoading((prevLoading) => !prevLoading);
            setRefresh(!refresh);
            setOpenModal((prevOpenModal) => !prevOpenModal);
          }
        } catch (error) {
          setLoading((prevLoading) => !prevLoading);
          setResponseError(error.response.data);
        }
      } else if (path === "invoices") {
        dataBody = {
          order_id: refBody.order_idRef.current.value,
          total_amount: refBody.total_amountRef.current.value,
          balance_due: refBody.balance_dueRef.current.value,
          invoice_date: refBody.invoice_dateRef.current.value,
          due_date: refBody.due_dateRef.current.value,
          status: refBody.statusRef.current.value,
        };

        try {
          const { data, status } = await putApiData(
            path + "/" + refBody.idRef.current.value,
            dataBody
          );
          if (status === 201) {
            setLoading((prevLoading) => !prevLoading);
            setRefresh(!refresh);
            setOpenModal((prevOpenModal) => !prevOpenModal);
          }
        } catch (error) {
          setLoading((prevLoading) => !prevLoading);
          setResponseError(error.response.data);
        }
      } else if (path === "payments") {
        dataBody = {
          invoice_id: refBody.invoice_dateRef.current.value,
          amount_paid: refBody.amount_paidRef.current.value,
          payment_method: refBody.payment_methodRef.current.value,
          payment_date: refBody.payment_dateRef.current.value,
        };

        try {
          const { data, status } = await putApiData(
            path + "/" + refBody.idRef.current.value,
            dataBody
          );
          if (status === 201) {
            setLoading((prevLoading) => !prevLoading);
            setRefresh(!refresh);
            setOpenModal((prevOpenModal) => !prevOpenModal);
          }
        } catch (error) {
          setLoading((prevLoading) => !prevLoading);
          setResponseError(error.response.data);
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
    if (param === "orders") {
      return (
        <>
          <div className="grid gap-4 mb-4 grid-cols-1 lg:grid-cols-2">
            {inputOrder.map((item, index) => (
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
              span={`col-span-2`}
              label={"Detail"}
              htmlFor={"detail"}
              id={"detail"}
              name={"detail"}
              referens={refBody.detailsRef}
              placeholder={"Write detail here"}
            />

            {inputProducts &&
              inputProducts.map((item, index) => (
                <div className="col-span-2">
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
                </div>
              ))}

            <div className="col-span-2">
              <TabelForProducts data={dataTabelProducts} />
            </div>
          </div>
        </>
      );
    } else if (param === "invoices") {
      return (
        <>
          <div className="grid gap-4 mb-4 grid-cols-1 lg:grid-cols-2">
            {inputInvoices.map((item, index) => (
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
    } else if (param === "payments") {
      return (
        <>
          <div className="grid gap-4 mb-4 grid-cols-1 lg:grid-cols-2">
            {inputPayments.map((item, index) => (
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
    dataDetailOrders,
  };
};
