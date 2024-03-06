import { useEffect, useState, useRef } from "react";
import {
  getApiData,
  postApiData,
  putApiData,
  deleteApiData,
} from "../../../../../function/Api";
import IconAdd from "../../../../layouts/icons/IconAdd";
import { TextArea, RadioButtons } from "../../../../layouts/FormInput";
import FormInput from "../../../../layouts/FormInput";
import { TabelForProducts } from "./TabelForProducts";
import { TabelForDeliveryNoteItem } from "./TabelForDeliveryNotesItem";

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
  const [dataGoodReceiptsSelect, setDataGoodReceiptsSelect] = useState([]);
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
  const [render, setRender] = useState(false);
  const [inputGoodReceipt, setInputGoodReceipt] = useState();
  const [dataDetailGoodReceipt, setDataDetailGoodReceipt] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const [inputEditGoodReceiptItem, setInputEditGoodReceiptItem] = useState([]);
  const [inputEditProducts, setInputEditProducts] = useState();
  const [editProduct, setEditProduct] = useState(false);
  const [orderId, setOrderId] = useState();
  const [inputDeliveryNotes, setInputDeliveryNotes] = useState();
  const [dataTabelDeliveryNotes, setDataTabelDeliveryNotes] = useState([]);

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
    idRef: useRef(),
    directOrderRef: useRef(),
    ProductionOrderRef: useRef(),

    //invoices
    total_amountRef: useRef(),
    balance_dueRef: useRef(),
    invoice_dateRef: useRef(),
    due_dateRef: useRef(),

    // payments
    invoice_idRef: useRef(),
    amount_paidRef: useRef(),
    payment_methodRef: useRef(),
    payment_dateRef: useRef(),
    order_idRef: useRef(),

    // good receipt
    detailRef: useRef(),

    // good receipt item
    quantity_orderedRef: useRef(),
    quantity_receivedRef: useRef(),
    quantity_dueRef: useRef(),

    // deliveryNotes
    numberRef: useRef(),
    dateRef: useRef(),
    // detailsRef: useRef()
  });
  const [dataEdit, setDataEdit] = useState({});

  // Fungsi untuk menyimpan dataTabelProducts dalam Local Storage
  const saveDataToLocalStorage = (data) => {
    localStorage.setItem("dataTabelProducts", JSON.stringify(data));
  };

  // Fungsi untuk mengambil dataTabelProducts dari Local Storage saat komponen dimuat
  useEffect(() => {
    const storedData = localStorage.getItem("dataTabelProducts");
    if (storedData) {
      setDataTabelProducts(JSON.parse(storedData));
    }
  }, [render]);

  const handleChangeAndPushProducts = async (event) => {
    // Mendapatkan nama dan nilai input yang berubah
    const { name, value } = event.target;

    try {
      const { data, status } = await getApiData("products/" + value);
      if (status === 200 && value) {
        // Cari data sebelumnya berdasarkan id
        const previousData = dataTabelProducts.find(
          (item) => item.id === data.id
        );
        const newData = {
          product_id: data.id,
          name: data.name,
          quantity: previousData ? previousData.quantity : 0, // Gunakan nilai qty dari data sebelumnya jika ditemukan
          price_per_unit: data.price_per_unit || 0, // Gunakan harga dari API, jika tidak ada, gunakan nilai kosong
        };

        // Tambahkan data baru ke dataTabelProducts
        setDataTabelProducts((prevData) => [...prevData, newData]);

        // Simpan data baru ke Local Storage setelah pembaruan state
        saveDataToLocalStorage([...dataTabelProducts, newData]);
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

  const handleSaveClick = () => {
    console.log("Edited dataTabelProducts:", dataTabelProducts);

    // Simpan ke Local Storage sebelum pembaruan state
    saveDataToLocalStorage(dataTabelProducts);

    // Perbarui state dan re-render jika diperlukan
    setDataTabelProducts([...dataTabelProducts]);
    setRender(!render); // Hanya jika re-render diperlukan
    // setEditingItemId(null);
  };

  // var dataOrderType = undefined

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "order_type") {
      localStorage.setItem("order_type", value);
    }

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
        warehouse_id: responseError?.warehouse_id?.[0] || "",
        details: responseError?.details?.[0] || "",
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
      // {
      //   element: "radio",
      //   name: "order_type",
      //   // ref: refBody.order_typeRef,
      //   value: dataEdit.order_type,
      //   label: "Order type",
      //   htmlFor: "order_type",
      //   id: "order_type",
      //   dataSelect: [
      //     { id: 1, name: "Direct Order", ref: refBody.directOrderRef },
      //     { id: 2, name: "Production Order", ref: refBody.ProductionOrderRef },
      //   ],
      //   onchange: handleChange,
      // },
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

    setInputGoodReceipt([
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

    setInputEditGoodReceiptItem([
      {
        element: "select",
        name: "product_id",
        ref: refBody.product_idRef,
        value: dataEdit.product_id,
        label: "Products",
        htmlFor: "product_id",
        id: "product_id",
        dataSelect: [],
        onchange: handleChange,
      },
      {
        element: "input",
        type: "number",
        name: "quantity_ordered",
        ref: refBody.quantity_orderedRef,
        value: dataEdit.quantity_ordered,
        label: "Quantity ordered",
        htmlFor: "quantity_ordered",
        id: "quantity_ordered",
        onchange: handleChange,
        placeholder: "Quantity ordered",
      },
      {
        element: "input",
        type: "number",
        name: "quantity_received",
        ref: refBody.quantity_receivedRef,
        value: dataEdit.quantity_received,
        label: "Quantity received",
        htmlFor: "quantity_received",
        id: "quantity_received",
        onchange: handleChange,
        placeholder: "Quantity received",
      },
      {
        element: "input",
        type: "number",
        name: "quantity_due",
        ref: refBody.quantity_dueRef,
        value: dataEdit.quantity_due,
        label: "Quantity due",
        htmlFor: "quantity_due",
        id: "quantity_due",
        onchange: handleChange,
        placeholder: "Quantity due",
      },
    ]);

    setInputEditProducts([
      {
        element: "input",
        type: "number",
        name: "quantity",
        ref: refBody.quantityRef,
        value: dataEdit.quantity,
        label: "Quantity",
        htmlFor: "quantity",
        id: "quantity",
        onchange: handleChange,
        placeholder: "Quantity",
      },
      {
        element: "input",
        type: "number",
        name: "price_per_unit",
        ref: refBody.price_per_unitRef,
        value: dataEdit.price_per_unit,
        label: "Price per unit",
        htmlFor: "price_per_unit",
        id: "price_per_unit",
        onchange: handleChange,
        placeholder: "Price per unit",
      },
    ]);

    setInputDeliveryNotes([
      {
        element: "input",
        type: "text",
        name: "number",
        ref: refBody.numberRef,
        value: dataEdit.number,
        label: "Number",
        htmlFor: "number",
        id: "number",
        onchange: handleChange,
        placeholder: "Number",
      },
      {
        element: "input",
        type: "date",
        name: "date",
        ref: refBody.dateRef,
        value: dataEdit.date,
        label: "Date",
        htmlFor: "date",
        id: "date",
        onchange: handleChange,
        placeholder: "Date",
      },
    ]);
  }, [dataEdit]);

  const dataOrders = (data) => {
    return data.map((item) => ({
      "kode transaksi": item.kode_order,
      "vendor name": item.vendor.name,
      // 'product name': item.products.name,
      "tujuan/asal gudang": item.warehouse.name,
      // status: item.status,
      "order status": item.order_status,
      "order type": item.order_type,
      taxes: item.taxes ?? "--",
      // quantity: item.quantity,
      // 'price per unnit': item.price_per_unit,
      "shipping cost": item.shipping_cost ?? "--",
      "total price": item.total_price,
      id: item.id,
    }));
  };

  const dataPayments = (data) => {
    return data.map((item) => ({
      "kode invoice": item.invoice.kode_invoice,
      "kode payment": item.kode_payment,
      "Metode pembayaran": item.payment_method,
      "Tanggal terbayar": item.payment_date,
      "Tagihan terbayar": item.amount_paid,
      id: item.id,
    }));
  };

  const dataInvoices = (data) => {
    return data.map((item) => ({
      "kode order": item.order.kode_order,
      "kode invoices": item.kode_invoice,
      "tanggal invoice": item.invoice_date,
      "tanggal jatuh tempo": item.due_date,
      status: item.status,
      "sisa tagihan": item.balance_due,
      "total amount": item.total_amount,
      id: item.id,
    }));
  };

  const dataGoodReceipts = (data) => {
    return data.map((item) => ({
      id: item.id,
      "receipt code": item.kodeGoodsReceipt,
      "Order code": item.order.kode_order,
      "receipt date": item.created_at,
      "purchase date": item.order.created_at,
      status: item.status,
      Warehouses: item.warehouse.name,
      description: item.details ?? item.order.details,
    }));
  };

  const dataDeliveryNotes = (data) => {
    return data.map((item) => ({
      id: item.id,
      number: item.number,
      warehouse: item.warehouse.name,
      vendor: item.vendor.name,
      date: item.date,
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
                information:
                  "This is additional information about the content of this section. You can provide any relevant details or instructions here.",
                eventToggleModal: handleCreate,
                onclick: handleClickHeading,
                showNavHeading: true,
                dataNavHeading: [
                  { path: "orders", label: "Orders" },
                  { path: "invoices", label: "Invoices" },
                  { path: "payments", label: "Payments" },
                  { path: "goods-receipt", label: "Good Receipts" },
                  { path: "delivery-notes", label: "Delivery notes" },
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
                information:
                  "This is additional information about the content of this section. You can provide any relevant details or instructions here.",
                eventToggleModal: handleCreate,
                onclick: handleClickHeading,
                showNavHeading: true,
                dataNavHeading: [
                  { path: "orders", label: "Orders" },
                  { path: "invoices", label: "Invoices" },
                  { path: "payments", label: "Payments" },
                  { path: "goods-receipt", label: "Good Receipts" },
                  { path: "delivery-notes", label: "Delivery notes" },
                ],
                activeButton: "invoices",
              },
            ]);
          } else if (path === "payments") {
            const newData = dataPayments(data);
            setData(newData);
            setDataHeading([
              {
                label: "Add new payment",
                icon: IconAdd(),
                heading: "Payments list",
                information:
                  "This is additional information about the content of this section. You can provide any relevant details or instructions here.",
                eventToggleModal: handleCreate,
                onclick: handleClickHeading,
                showNavHeading: true,
                dataNavHeading: [
                  { path: "orders", label: "Orders" },
                  { path: "invoices", label: "Invoices" },
                  { path: "payments", label: "Payments" },
                  { path: "goods-receipt", label: "Good Receipts" },
                  { path: "delivery-notes", label: "Delivery notes" },
                ],
                activeButton: "payments",
              },
            ]);
          } else if (path === "goods-receipt") {
            const newData = dataGoodReceipts(data);
            setData(newData);
            setDataHeading([
              {
                label: "Add new good receipts",
                icon: IconAdd(),
                heading: "Good Receipts list",
                information:
                  "This is additional information about the content of this section. You can provide any relevant details or instructions here.",
                eventToggleModal: handleCreate,
                onclick: handleClickHeading,
                showNavHeading: true,
                dataNavHeading: [
                  { path: "orders", label: "Orders" },
                  { path: "invoices", label: "Invoices" },
                  { path: "payments", label: "Payments" },
                  { path: "goods-receipt", label: "Good Receipts" },
                  { path: "delivery-notes", label: "Delivery notes" },
                ],
                activeButton: "goods-receipt",
              },
            ]);
          } else if (path === "delivery-notes") {
            const newData = dataDeliveryNotes(data);
            setData(newData);
            setDataHeading([
              {
                label: "Add new good receipts",
                icon: IconAdd(),
                heading: "Good Receipts list",
                information:
                  "This is additional information about the content of this section. You can provide any relevant details or instructions here.",
                eventToggleModal: handleCreate,
                onclick: handleClickHeading,
                showNavHeading: true,
                dataNavHeading: [
                  { path: "orders", label: "Orders" },
                  { path: "invoices", label: "Invoices" },
                  { path: "payments", label: "Payments" },
                  { path: "goods-receipt", label: "Good Receipts" },
                  { path: "delivery-notes", label: "Delivery notes" },
                ],
                activeButton: "goods-receipt",
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
          const { data, status } = await getApiData("orders");
          if (status === 200) {
            const newData = data.map((item) => ({
              id: item.id,
              name: item.kode_order,
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
          const { data, status } = await getApiData("invoices");
          if (status === 200) {
            const newData = data.map((item) => ({
              id: item.id,
              name: item.kode_invoice,
            }));
            setDataInvoicesSelect(newData);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getDataInvoice();
      const getDataGoodReceipts = async () => {
        try {
          const { data, status } = await getApiData("goods-receipt");
          if (status === 200) {
            const newData = data.map((item) => ({
              "kode order": item.order.kode_order,
              status: item.status,
              "gudang tujuan/asal": item.warehouse.name,
              deskripsi: item.details,
            }));
            setDataGoodReceiptsSelect(newData);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getDataGoodReceipts();
    }, [refresh]);

    const handleClickHeading = async (param) => {
      setPath(param);
      setDataHeading([
        {
          label:
            param === "orders"
              ? "Add orders"
              : param === "invoices"
              ? "Add invoices"
              : param === "goods-receipt"
              ? "Add Goods Receipt"
              : param === "delivery-notes"
              ? "Add delivery note"
              : "Add payments",

          icon: IconAdd(),
          heading:
            param === "orders"
              ? "Orders list"
              : param === "invoices"
              ? "Invoices list"
              : param === "goods-receipt"
              ? "Goods Receipt list"
              : param === "delivery-notes"
              ? "Delivery notes list"
              : "Payments list",
          information:
            "This is additional information about the content of this section. You can provide any relevant details or instructions here.",
          eventToggleModal: handleCreate,
          onclick: handleClickHeading,
          parameter: param,
          showNavHeading: true,
          dataNavHeading: [
            { path: "orders", label: "Orders" },
            { path: "invoices", label: "Invoices" },
            { path: "payments", label: "Payments" },
            { path: "goods-receipt", label: "Good Receipts" },
            { path: "delivery-notes", label: "Delivery notes" },
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
          } else if (param === "goods-receipt") {
            setSkeleton((prevSkeleton) => !prevSkeleton);
            const newData = dataGoodReceipts(data);
            setData(newData);
          } else if (param === "delivery-notes") {
            setSkeleton((prevSkeleton) => !prevSkeleton);
            const newData = dataDeliveryNotes(data);
            setData(newData);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    return { data, handleClickHeading };
  };

  const EDIT = () => {
    const handleEdit = async (param, routes) => {
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
          const { data, status } = await getApiData(
            "orders/" + param.textContent
          );
          if (status === 200) {
            setDataDetailOrders(() => data);
            // setDataEdit
            setIdDelete(data.id);
            setOrderId(data.id);
          }
        } catch (error) {
          console.log(error);
        }
      } else if (
        path === "orders" &&
        defaultEdit === false &&
        routes !== "products"
      ) {
        setDataModal({
          labelModal: "Edit orders",
          labelBtnModal: "Save",
          labelBtnSecondaryModal: "Delete",
          handleBtn: edit,
        });

        try {
          const { data, status } = await getApiData("orders/" + param);
          if (status === 200) {
            setSelectedOption(data.order_type);
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
        setValidationError({});
        setOpenModal((prevOpenModal) => !prevOpenModal);
        try {
          const { data, status } = await getApiData(
            path + "/" + param.textContent
          );
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
          const { data, status } = await getApiData(
            path + "/" + param.textContent
          );
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
      } else if (
        path === "goods-receipt" &&
        defaultEdit === true &&
        routes !== "goods-receipt-items"
      ) {
        setDefaultEdit(false);
        // setDataModal({
        //   labelModal: "Update employes",
        //   labelBtnModal: "Save",
        //   labelBtnSecondaryModal: "Delete",
        //   handleBtn: edit,
        // });
        // setValidationError({
        //   name: "",
        //   email: "",
        //   phone_number: "",
        //   company_id: "",
        //   job_title: "",
        //   date_of_birth: "",
        //   employment_status: "",
        //   hire_date: "",
        //   termination_date: "",
        //   address: "",
        //   city: "",
        //   province: "",
        //   postal_code: "",
        //   country: "",
        //   emergency_contact_name: "",
        //   emergency_contact_phone_number: "",
        //   notes: "",
        //   department_id: "",
        // });
        // setOpenModal(prevOpenModal => !prevOpenModal)
        try {
          const { data, status } = await getApiData(
            "goods-receipt/" + param.textContent
          );
          if (status === 200) {
            setDataEdit({});
            setDataDetailGoodReceipt(() => data);
            setIdDelete(data.id);
          }
        } catch (error) {
          console.log(error);
        }
      } else if (
        path === "goods-receipt" &&
        defaultEdit === false &&
        routes !== "goods-receipt-items"
      ) {
        setOpenModal((prevOpenModal) => !prevOpenModal);
        setDataModal({
          size: "2xl",
          labelModal: "Edit good receipt",
          labelBtnModal: "Save",
          labelBtnSecondaryModal: "Delete",
          handleBtn: edit,
        });
        try {
          const { data, status } = await getApiData("goods-receipt/" + param);
          if (status === 200) {
            setDataEdit({
              id: data.id,
              order_id: data.order_id,
              warehouse_id: data.warehouse_id,
              details: data.details,
            });
          }
        } catch (error) {}
      } else if (routes === "goods-receipt-items") {
        setDefaultEdit(() => false);
        setPath(routes);
        setOpenModal((prevOpenModal) => !prevOpenModal);
        setDataModal({
          size: "2xl",
          labelModal: "Edit good receipt item",
          labelBtnModal: "Save",
          labelBtnSecondaryModal: "Delete",
          handleBtn: edit,
        });
        try {
          const { data, status } = await getApiData(
            "goods-receipts/" + idDelete + "/items/" + param
          );
          if (status === 200) {
            setDataEdit({
              quantity_ordered: data.quantity_ordered,
              quantity_received: data.quantity_received,
              quantity_due: data.quantity_due,
            });
          }
        } catch (error) {
          console.log(error);
        }
      } else if (routes === "products") {
        setPath(() => routes);
        setEditProduct(true);
        setDefaultEdit(() => false);
        setOpenModal((prevOpenModal) => !prevOpenModal);
        setDataModal({
          size: "lg",
          labelModal: "Edit products",
          labelBtnModal: "Save",
          labelBtnSecondaryModal: "Delete",
          handleBtn: edit,
        });
        setIdDelete(param);
        setDataEdit({
          id: param,
        });
        // try {
        //   const { data, status } = await getApiData(
        //     "goods-receipts/" + idDelete + "/items/" + param
        //   );
        //   if (status === 200) {
        //     setDataEdit({
        //       quantity_ordered: data.quantity_ordered,
        //       quantity_received: data.quantity_received,
        //       quantity_due: data.quantity_due,
        //     });
        //   }
        // } catch (error) {
        //   console.log(error);
        // }
      }
    };

    const edit = async () => {
      let dataBody = {};
      console.log(path);
      setLoading((prevLoading) => !prevLoading);
      if (path === "orders") {
        dataBody = {
          vendor_id: refBody.vendor_idRef.current.value,
          warehouse_id: refBody.warehouse_idRef.current.value,
          details: refBody.detailsRef.current.value,
          status: "pending",
          order_type: localStorage.getItem("order_type"),
          // products: JSON.parse(localStorage.getItem("dataTabelProducts")),
        };

        // gunakan componen terpisah
        try {
          const { data, status } = await putApiData(
            path + "/" + refBody.idRef.current.value,
            dataBody
          );
          if (status === 201) {
            setLoading((prevLoading) => !prevLoading);
            setRefresh(!refresh);
            setOpenModal((prevOpenModal) => !prevOpenModal);
            try {
              const { data, status } = await getApiData("orders/" + idDelete);
              if (status === 200) {
                setDataDetailOrders(() => data);
                setIdDelete(data.id);
              }
            } catch (error) {
              console.log(error);
            }
          }
        } catch (error) {
          setLoading((prevLoading) => !prevLoading);
          setResponseError(error.response.data);
        }
        // gunakan componen terpisah
      } else if (path === "invoices") {
        dataBody = {
          order_id: refBody.order_idRef.current.value,
          total_amount: refBody.total_amountRef.current.value,
          balance_due: refBody.balance_dueRef.current.value,
          invoice_date: refBody.invoice_dateRef.current.value,
          due_date: refBody.due_dateRef.current.value,
          status: refBody.statusRef.current.value,
        };

        console.log(dataBody);

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
          console.log(error);
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
      } else if (path === "goods-receipt") {
        dataBody = {
          order_id: refBody.order_idRef.current.value,
          warehouse_id: refBody.warehouse_idRef.current.value,
          details: refBody.detailsRef.current.value,
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
            try {
              const { data, status } = await getApiData(
                "goods-receipt/" + idDelete
              );
              if (status === 200) {
                setDataEdit({});
                setDataDetailGoodReceipt(() => data);
                setIdDelete(data.id);
              }
            } catch (error) {
              console.log(error);
            }
          }
        } catch (error) {
          setLoading((prevLoading) => !prevLoading);
          setResponseError(error.response.data);
        }
      } else if (path === "products") {
        dataBody = {
          quantity: refBody.quantityRef.current.value,
          price_per_unit: refBody.price_per_unitRef.current.value,
        };

        try {
          const { data, status } = await putApiData(
            "orders/" + orderId + "/products/" + refBody.idRef.current.value,
            dataBody
          );
          if (status === 201) {
            setLoading((prevLoading) => !prevLoading);
            setRefresh(!refresh);
            setOpenModal((prevOpenModal) => !prevOpenModal);
            // try {
            //   const { data, status } = await getApiData(
            //     "goods-receipt/" + idDelete
            //   );
            //   if (status === 200) {
            //     setDataEdit({});
            //     setDataDetailGoodReceipt(() => data);
            //     setIdDelete(data.id);
            //   }
            // } catch (error) {
            //   console.log(error);
            // }
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
      if (path === "products") {
        try {
          await deleteApiData(
            "orders/" + orderId + "/remove-product/" + idDelete
          );
          setRefresh(!refresh);
          setDefaultEdit(true);
          try {
            const { data, status } = await getApiData("orders/" + orderId);
            if (status === 200) {
              setDataDetailOrders(() => data);
              setIdDelete(data.id);
            }
          } catch (error) {
            console.log(error);
          }
          closeModalDelete();
        } catch (error) {
          console.log(error.response);
        }
      } else {
        try {
          await deleteApiData(path + "/" + idDelete);
          setRefresh(!refresh);
          setDefaultEdit(true);
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
          labelModal: "Add new orders",
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
          labelModal: "Add New payments",
          labelBtnModal: "Add new payments",
          labelBtnSecondaryModal: "Back",
          handleBtn: create,
        });
      } else if (param === "products") {
        setEditProduct(false);
        setPath(param);
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
          labelModal: "Add new products",
          labelBtnModal: "Add new products",
          labelBtnSecondaryModal: "Back",
          handleBtn: create,
        });
      } else if (param === "goods-receipt") {
        setDataEdit({
          order_id: "",
          warehouse_id: "",
        });
        setValidationError({});
        setOpenModal((prevOpenModal) => !prevOpenModal);
        setDataModal({
          size: "2xl",
          labelModal: "Add New good receipt",
          labelBtnModal: "Add new good receipt",
          labelBtnSecondaryModal: "Back",
          handleBtn: create,
        });
      } else if (param === "delivery-notes") {
        setDataEdit({
          order_id: "",
          warehouse_id: "",
          vendor_id: "",
        });
        setValidationError({});
        setOpenModal((prevOpenModal) => !prevOpenModal);
        setDataModal({
          size: "2xl",
          labelModal: "Add New delivery notes",
          labelBtnModal: "Add new delivery notes",
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
          vendor_id: refBody.vendor_idRef.current.value,
          warehouse_id: refBody.warehouse_idRef.current.value,
          details: refBody.detailsRef.current.value,
          status: "pending",
          order_type: localStorage.getItem("order_type"),
          products: JSON.parse(localStorage.getItem("dataTabelProducts")),
        };

        try {
          const store = await postApiData(param, dataBody);
          if (store.status === 201) {
            setPath(param);
            setRefresh(!refresh);
            setLoading((prevLoading) => !prevLoading);
            setOpenModal((prevOpenModal) => !prevOpenModal);
            localStorage.removeItem("dataTabelProducts");
            setDataTabelProducts([]);
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
          console.log(error);
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
      } else if (param === "goods-receipt") {
        dataBody = {
          order_id: refBody.order_idRef.current.value,
          warehouse_id: refBody.warehouse_idRef.current.value,
          details: refBody.detailsRef.current.value,
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
      } else if (param === "products") {
        const product = JSON.parse(localStorage.getItem("dataTabelProducts"));

        const dataBody = Object.fromEntries(
          product.map((obj) => ["product", obj])
        );

        try {
          const store = await postApiData(
            "orders/" + refBody.order_idRef.current.value + "/add-product",
            dataBody
          );
          if (store.status === 201) {
            setPath(param);
            setRefresh(!refresh);
            setLoading((prevLoading) => !prevLoading);
            setOpenModal((prevOpenModal) => !prevOpenModal);
            try {
              const { data, status } = await getApiData(
                "orders/" + refBody.order_idRef.current.value
              );
              if (status === 200) {
                setDataDetailOrders(() => data);
                setIdDelete(data.id);
              }
            } catch (error) {
              console.log(error);
            }
          }
        } catch (error) {
          setLoading((prevLoading) => !prevLoading);
          setResponseError(error.response.data.errors);
        }
      } else {
        dataBody = {
          vendor_id: refBody.vendor_idRef.current.value,
          warehouse_id: refBody.warehouse_idRef.current.value,
          details: refBody.detailsRef.current.value,
          status: "pending",
          order_type: localStorage.getItem("order_type"),
          products: JSON.parse(localStorage.getItem("dataTabelProducts")),
        };

        console.log(dataBody);

        try {
          const store = await postApiData("orders/", dataBody);
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
      }
    };

    return {
      handleCreate,
      create,
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

            <RadioButtons
              onChange={handleChange}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              referens={refBody.order_typeRef}
              name={"order_type"}
            />

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
                <div
                  className={`${
                    defaultEdit === false ? `hidden ` : `col-span-2`
                  }`}
                >
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

            <div
              className={`${defaultEdit === false ? `hidden ` : `col-span-2`}`}
            >
              <TabelForProducts
                dataTabelProducts={dataTabelProducts}
                setDataTabelProducts={setDataTabelProducts}
                refBody={refBody}
                onChange={handleChange}
                handleSaveClick={handleSaveClick}
                saveDataToLocalStorage={saveDataToLocalStorage}
              />
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
    } else if (param === "goods-receipt") {
      return (
        <>
          <div className="grid gap-4 mb-4 grid-cols-1 lg:grid-cols-2">
            {inputGoodReceipt.map((item, index) => (
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
              htmlFor={"details"}
              id={"details"}
              name={"details"}
              referens={refBody.detailsRef}
              placeholder={"Write details here"}
              value={dataEdit.details}
              onChange={handleChange}
              validationError={validationError}
            />
          </div>
        </>
      );
    } else if (param === "products") {
      return (
        <>
          <div className="grid gap-4 mb-4 grid-cols-1 lg:grid-cols-2">
            <input
              type="hidden"
              name="order_id"
              value={idDelete}
              ref={refBody.order_idRef}
            />
            {inputProducts &&
              inputProducts.map((item, index) => (
                <div
                  className={`col-span-2 ${
                    editProduct === false ? `` : `hidden`
                  }`}
                >
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

            <div
              className={`col-span-2 ${editProduct === false ? `` : `hidden`}`}
            >
              <TabelForProducts
                dataTabelProducts={dataTabelProducts}
                setDataTabelProducts={setDataTabelProducts}
                refBody={refBody}
                onChange={handleChange}
                handleSaveClick={handleSaveClick}
                saveDataToLocalStorage={saveDataToLocalStorage}
              />
            </div>

            {inputEditProducts &&
              inputEditProducts.map((item, index) => (
                <div
                  className={`col-span-2 ${
                    editProduct === false ? `hidden` : ``
                  }`}
                >
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
          </div>
        </>
      );
    } else if (param === "goods-receipt-items") {
      return (
        <>
          <div className="grid gap-4 mb-4 grid-cols-1 lg:grid-cols-2">
            {inputEditGoodReceiptItem &&
              inputEditGoodReceiptItem.map((item, index) => (
                <div className={`col-span-1`}>
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
          </div>
        </>
      );
    } else if (param === "delivery-notes") {
      return (
        <>
          <div className="grid gap-4 mb-4 grid-cols-1 lg:grid-cols-2">
            {inputDeliveryNotes &&
              inputDeliveryNotes.map((item, index) => (
                <div className={`col-span-1`}>
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

            <TextArea
              span={`col-span-2`}
              label={"Details"}
              htmlFor={"details"}
              id={"details"}
              name={"details"}
              referens={refBody.detailsRef}
              placeholder={"Write details here"}
            />

            <div className="col-span-2">
              <TabelForDeliveryNoteItem
                dataTabelDeliveryNotes={dataTabelDeliveryNotes}
                setDataTabelDeliveryNotes={setDataTabelDeliveryNotes}
              />
            </div>
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
    dataDetailGoodReceipt,
    setPath,
  };
};
