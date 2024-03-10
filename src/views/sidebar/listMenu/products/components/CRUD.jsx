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
  const [inputProducts, setInputProducts] = useState([]);
  const [inputProductCategories, setInputProductCategories] = useState([]);
  const [inputProductPrices, setInputProductPrices] = useState([]);
  const [inputProductMovements, setInputProductMovements] = useState([]);
  const [responseError, setResponseError] = useState();
  const [validationError, setValidationError] = useState();
  const [dataProductsSelect, setDataProducstSelect] = useState([]);
  const [dataWarehouseesSelect, setDataWarehouseesSelect] = useState([]);
  const [dataDepartments, setDataDepartments] = useState();
  const [loading, setLoading] = useState(true);
  const [skeleton, setSkeleton] = useState(false);
  const [dataHeading, setDataHeading] = useState([{}]);
  const [path, setPath] = useState("products");

  const [refBody, setRefBody] = useState({
    idRef: useRef(),
    nameRef: useRef(),
    codeRef: useRef(),
    descriptionRef: useRef(),
    priceRef: useRef(),
    typeRef: useRef(),
    animal_typeRef: useRef(),
    ageRef: useRef(),
    weightRef: useRef(),
    health_statusRef: useRef(),
    stockRef: useRef(),
    category_idRef: useRef(),
    warehouse_idRef: useRef(),
    unit_of_measureRef: useRef(),
    raw_materialRef: useRef(),
    image_productRef: useRef(),

    // product price

    product_idRef: useRef(),
    selling_priceRef: useRef(),
    buying_priceRef: useRef(),
    discount_priceRef: useRef(),

    // product movements

    movement_typeRef: useRef(),
    quantityRef: useRef(),
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
        code: responseError?.code?.[0] || "",
        description: responseError?.description?.[0] || "",
        price: responseError?.price?.[0] || "",
        type: responseError?.type?.[0] || "",
        animal_type: responseError?.animal_type?.[0] || "",
        age: responseError?.age?.[0] || "",
        weight: responseError?.weight?.[0] || "",
        health_status: responseError?.health_status?.[0] || "",
        stock: responseError?.stock?.[0] || "",
        category_id: responseError?.category_id?.[0] || "",
        warehouse_id: responseError?.warehouse_id?.[0] || "",
        unit_of_measure: responseError?.unit_of_measure?.[0] || "",
        raw_material: responseError?.raw_material?.[0] || "",
        image_product: responseError?.image_product?.[0] || "",
        product_id: responseError?.product_id?.[0] || "",
        selling_price: responseError?.selling_price?.[0] || "",
        buying_price: responseError?.buying_price?.[0] || "",
        discount_price: responseError?.discount_price?.[0] || "",
        movement_type: responseError?.movement_type?.[0] || "",
        quantity: responseError?.quantity?.[0] || "",
      });
    }
  }, [responseError]);

  useEffect(() => {
    setInputProducts([
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
        name: "code",
        ref: refBody.codeRef,
        value: dataEdit.code,
        label: "Code",
        htmlFor: "code",
        id: "code",
        onchange: handleChange,
        placeholder: "Code",
      },
      {
        element: "input",
        type: "file",
        name: "image_product",
        ref: refBody.image_productRef,
        value: dataEdit.image_product,
        label: "Product Image",
        htmlFor: "image_product",
        id: "image_product",
        onchange: handleChange,
        placeholder: "Product Image",
      },
      {
        element: "input",
        type: "number",
        name: "price",
        ref: refBody.priceRef,
        value: dataEdit.price,
        label: "Price",
        htmlFor: "price",
        id: "price",
        onchange: handleChange,
        placeholder: "Price",
      },
      {
        element: "input",
        type: "text",
        name: "type",
        ref: refBody.typeRef,
        value: dataEdit.type,
        label: "Type",
        htmlFor: "type",
        id: "type",
        onchange: handleChange,
        placeholder: "Type",
      },
      {
        element: "input",
        type: "text",
        name: "animal_type",
        ref: refBody.animal_typeRef,
        value: dataEdit.animal_type,
        label: "Animal type",
        htmlFor: "animal_type",
        id: "animal_type",
        onchange: handleChange,
        placeholder: "Animal type",
      },
      {
        element: "input",
        type: "number",
        name: "age",
        ref: refBody.ageRef,
        value: dataEdit.age,
        label: "Age",
        htmlFor: "age",
        id: "age",
        onchange: handleChange,
        placeholder: "Age",
      },
      {
        element: "input",
        type: "number",
        name: "weight",
        ref: refBody.weightRef,
        value: dataEdit.weight,
        label: "Weight",
        htmlFor: "weight",
        id: "weight",
        onchange: handleChange,
        placeholder: "Weight",
      },
      {
        element: "input",
        type: "text",
        name: "health_status",
        ref: refBody.health_statusRef,
        value: dataEdit.health_status,
        label: "Health status",
        htmlFor: "health_status",
        id: "health_status",
        onchange: handleChange,
        placeholder: "Health status",
      },
      {
        element: "input",
        type: "number",
        name: "stock",
        ref: refBody.stockRef,
        value: dataEdit.stock,
        label: "Stock",
        htmlFor: "stock",
        id: "stock",
        onchange: handleChange,
        placeholder: "Stock",
      },

      {
        element: "select",
        name: "category_id",
        ref: refBody.category_idRef,
        value: dataEdit.category_id,
        label: "Category",
        htmlFor: "category_id",
        id: "category_id",
        dataSelect: [
          { value: "active", name: "Active" },
          { value: "inactive", name: "Inactive" },
        ],
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
        dataSelect: dataWarehouseesSelect,
        onchange: handleChange,
      },
      {
        element: "input",
        type: "text",
        name: "unit_of_measure",
        ref: refBody.unit_of_measureRef,
        value: dataEdit.unit_of_measure,
        label: "Unit of measure",
        htmlFor: "unit_of_measure",
        id: "unit_of_measure",
        onchange: handleChange,
        placeholder: "Unit of measure",
      },
      {
        element: "input",
        type: "text",
        name: "raw_material",
        ref: refBody.raw_materialRef,
        value: dataEdit.raw_material,
        label: "Raw material",
        htmlFor: "raw_material",
        id: "raw_material",
        onchange: handleChange,
        placeholder: "Raw material",
      },
    ]);

    setInputProductCategories([
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
    ]);

    setInputProductMovements([
      {
        element: "select",
        name: "product_id",
        ref: refBody.product_idRef,
        value: dataEdit.product_id,
        label: "Produk",
        htmlFor: "product_id",
        id: "product_id",
        dataSelect: dataProductsSelect,
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
        dataSelect: dataWarehouseesSelect,
        onchange: handleChange,
      },
      {
        element: "select",
        name: "movement_type",
        ref: refBody.movement_typeRef,
        value: dataEdit.movement_type,
        label: "Movement",
        htmlFor: "movement_type",
        id: "movement_type",
        dataSelect: [
          { value: "purchase", name: "purchase" },
          { value: "sale", name: "sale" },
          { value: "transfer", name: "transfer" },
        ],
        onchange: handleChange,
      },
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
        name: "price",
        ref: refBody.priceRef,
        value: dataEdit.price,
        label: "Price",
        htmlFor: "price",
        id: "price",
        onchange: handleChange,
        placeholder: "Quantity",
      },
    ]);

    setInputProductPrices([
      {
        element: "select",
        name: "product_id",
        ref: refBody.product_idRef,
        value: dataEdit.product_id,
        label: "Product",
        htmlFor: "product_id",
        id: "product_id",
        dataSelect: dataProductsSelect,
        onchange: handleChange,
      },
      {
        element: "input",
        type: "number",
        name: "selling_price",
        ref: refBody.selling_priceRef,
        value: dataEdit.selling_price,
        label: "Selling price",
        htmlFor: "selling_price",
        id: "selling_price",
        onchange: handleChange,
        placeholder: "Selling price",
      },
      {
        element: "input",
        type: "number",
        name: "buying_price",
        ref: refBody.buying_priceRef,
        value: dataEdit.buying_price,
        label: "Buying price",
        htmlFor: "buying_price",
        id: "buying_price",
        onchange: handleChange,
        placeholder: "Buying price",
      },
      {
        element: "input",
        type: "number",
        name: "discount_price",
        ref: refBody.discount_priceRef,
        value: dataEdit.discount_price,
        label: "Discount price",
        htmlFor: "discount_price",
        id: "discount_price",
        onchange: handleChange,
        placeholder: "Discount price",
      },
    ]);
  }, [dataEdit]);

  const dataProducts = (data) => {
    return data.map((item) => ({
      id: item.id,
      "kode barang": item.code,
      image: (
        <img
          src={item.image_product}
          alt={item.name}
          className="h-8 w-8 rounded-full object-cover"
        />
      ),
      name: item.name,
      description: item.description,
      "lokasi gudang": item.warehouse?.name || "--",
      category: item.category?.name || "--",
      type: item.type,
      weight: (item.weight ?? 0.0) + " " + item.unit_of_measure,
      quantity: item.stock + " pcs",
      "harga satuan": item.price,
      "HPP Balance": item.price * item.stock,
    }));
  };

  const dataProductCategories = (data) => {
    return data.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
    }));
  };

  const dataProductPrices = (data) => {
    return data.map((item) => ({
      id: item.id,
      "product name": item.product.name,
      "discount price": item.discount_price,
      "buying price": item.buying_price,
      "selling price": item.selling_price,
    }));
  };

  const dataProductMovements = (data) => {
    return data.map((item) => ({
      id: item.id,
      "product name": item.product.name,
      warhouses: item.warehouse.name,
      "movement type": item.movement_type,
      quantity: item.quantity,
      price: item.price,
    }));
  };

  const READ = () => {
    const [data, setData] = useState();
    useEffect(() => {
      const getData = async () => {
        try {
          const { data } = await getApiData(path);
          if (path === "products") {
            const newData = dataProducts(data);
            setData(newData);
            setDataHeading([
              {
                label: "Add new products",
                icon: IconAdd(),
                heading: "Product list",
                information:
                  "This is additional information about the content of this section. You can provide any relevant details or instructions here.",
                eventToggleModal: handleCreate,
                onclick: handleClickHeading,
                showNavHeading: true,
                dataNavHeading: [
                  { path: "product-categories", label: "Categories" },
                  { path: "products", label: "Products" },
                  { path: "product-prices", label: "Products prices" },
                  { path: "product-movements", label: "Track Movements" },
                ],
                activeButton: "products",
              },
            ]);
          } else if (path === "product-categories") {
            const newData = dataProductCategories(data);
            setData(newData);
            setDataHeading([
              {
                label: "Add new category",
                icon: IconAdd(),
                heading: "Categoires list",
                information:
                  "This is additional information about the content of this section. You can provide any relevant details or instructions here.",
                eventToggleModal: handleCreate,
                onclick: handleClickHeading,
                showNavHeading: true,
                dataNavHeading: [
                  { path: "product-categories", label: "Categories" },
                  { path: "products", label: "Products" },
                  { path: "product-prices", label: "Products prices" },
                  { path: "product-movements", label: "Track Movements" },
                ],
                activeButton: path,
              },
            ]);
          } else if (path === "product-prices") {
            const newData = dataProductPrices(data);
            setData(newData);
            setDataHeading([
              {
                label: "Add new price",
                icon: IconAdd(),
                heading: "Prices list",
                information:
                  "This is additional information about the content of this section. You can provide any relevant details or instructions here.",
                eventToggleModal: handleCreate,
                onclick: handleClickHeading,
                showNavHeading: true,
                dataNavHeading: [
                  { path: "product-categories", label: "Categories" },
                  { path: "products", label: "Products" },
                  { path: "product-prices", label: "Products prices" },
                  { path: "product-movements", label: "Track Movements" },
                ],
                activeButton: path,
              },
            ]);
          } else if (path === "product-movements") {
            const newData = dataProductMovements(data);
            setData(newData);
            setDataHeading([
              {
                label: "Add new movement",
                icon: IconAdd(),
                heading: "Movements list",
                information:
                  "This is additional information about the content of this section. You can provide any relevant details or instructions here.",
                eventToggleModal: handleCreate,
                onclick: handleClickHeading,
                showNavHeading: true,
                dataNavHeading: [
                  { path: "product-categories", label: "Categories" },
                  { path: "products", label: "Products" },
                  { path: "product-prices", label: "Products prices" },
                  { path: "product-movements", label: "Track Movements" },
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
      const getSelectProducts = async () => {
        const { data, status } = await getApiData("products");
        if (status === 200) {
          const newData = data.map((item) => ({
            id: item.id,
            name: item.name,
          }));
          setDataProducstSelect(newData);
        }
      };
      getSelectProducts();

      const getSelectWarehousees = async () => {
        const { data, status } = await getApiData("warehouses");
        if (status === 200) {
          const newData = data.map((item) => ({
            id: item.id,
            name: item.name,
          }));
          setDataWarehouseesSelect(newData);
        }
      };
      getSelectWarehousees();
    }, [path]);

    const handleClickHeading = async (param) => {
      setPath(param);
      setDataHeading([
        {
          label:
            param === "products"
              ? "Add products"
              : param === "product-categories"
              ? "Add categories"
              : param === "product-prices"
              ? "Add product prices"
              : param === "product-movements"
              ? "Add product movement"
              : "",
          icon: IconAdd(),
          heading:
            param === "products"
              ? "Products"
              : param === "product-categories"
              ? "Categories"
              : param === "Product-prices"
              ? "product prices"
              : "Product movement" + " list",
          information:
            "This is additional information about the content of this section. You can provide any relevant details or instructions here.",
          eventToggleModal: handleCreate,
          onclick: handleClickHeading,
          parameter: param,
          showNavHeading: true,
          dataNavHeading: [
            { path: "product-categories", label: "Categories" },
            { path: "products", label: "Products" },
            { path: "product-prices", label: "Product Prices" },
            { path: "product-movements", label: "Track Movements" },
          ],
          activeButton: param,
        },
      ]);
      setData([1]);
      setSkeleton((prevSkeleton) => !prevSkeleton);
      try {
        const { data, status } = await getApiData(param);
        if (status === 200) {
          if (param === "products") {
            const newData = dataProducts(data);
            setSkeleton((prevSkeleton) => !prevSkeleton);
            setData(newData);
          } else if (param === "product-categories") {
            setSkeleton((prevSkeleton) => !prevSkeleton);
            const newData = dataProductCategories(data);
            setData(newData);
          } else if (param === "product-prices") {
            setSkeleton((prevSkeleton) => !prevSkeleton);
            const newData = dataProductPrices(data);
            setData(newData);
          } else if (param === "product-movements") {
            setSkeleton((prevSkeleton) => !prevSkeleton);
            const newData = dataProductMovements(data);
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
    const handleCreate = (param) => {
      if (param === "products") {
        setDataEdit({
          name: "",
          code: "",
          description: "",
          price: "",
          type: "",
          animal_type: "",
          age: "",
          weight: "",
          health_status: "",
          stock: "",
          category_id: "",
          movement_type: "",
          unit_of_measure: "",
          raw_material: "",
          image_product: "",
        });
        setValidationError({
          name: "",
          code: "",
          description: "",
          price: "",
          type: "",
          animal_type: "",
          age: "",
          weight: "",
          health_status: "",
          stock: "",
          category_id: "",
          movement_type: "",
          unit_of_measure: "",
          raw_material: "",
          image_product: "",
        });
        setOpenModal((prevOpenModal) => !prevOpenModal);
        setDataModal({
          size: "6xl",
          labelModal: "Add New products",
          labelBtnModal: "Add new products",
          labelBtnSecondaryModal: "Back",
          handleBtn: create,
        });
      } else if (param === "product-categories") {
        setDataEdit({
          name: "",
          description: "",
          id: "",
        });
        setValidationError({
          name: "",
          description: "",
        });
        setOpenModal((prevOpenModal) => !prevOpenModal);
        setDataModal({
          size: "md",
          labelModal: "Add New category",
          labelBtnModal: "Add new category",
          labelBtnSecondaryModal: "Back",
          handleBtn: create,
        });
      } else if (param === "product-movements") {
        setDataEdit({
          product_id: "",
          warehouse_id: "",
          movement_type: "",
          quantity: "",
          price: "",
        });
        setValidationError({
          product_id: "",
          warehouse_id: "",
          movement_type: "",
          quantity: "",
          price: "",
        });
        setOpenModal((prevOpenModal) => !prevOpenModal);
        setDataModal({
          size: "2xl",
          labelModal: "Add New movements",
          labelBtnModal: "Add new movements",
          labelBtnSecondaryModal: "Back",
          handleBtn: create,
        });
      } else if (param === "product-prices") {
        setDataEdit({
          product_id: "",
          selling_price: "",
          buying_price: "",
          discount_price: "",
        });
        setValidationError({
          product_id: "",
          selling_price: "",
          buying_price: "",
          discount_price: "",
        });
        setOpenModal((prevOpenModal) => !prevOpenModal);
        setDataModal({
          size: "lg",
          labelModal: "Add New prices",
          labelBtnModal: "Add new prices",
          labelBtnSecondaryModal: "Back",
          handleBtn: create,
        });
      } else {
        setDataEdit({
          name: "",
          code: "",
          description: "",
          price: "",
          type: "",
          animal_type: "",
          age: "",
          weight: "",
          health_status: "",
          stock: "",
          category_id: "",
          movement_type: "",
          unit_of_measure: "",
          raw_material: "",
          image_product: "",
        });
        setValidationError({
          name: "",
          code: "",
          description: "",
          price: "",
          type: "",
          animal_type: "",
          age: "",
          weight: "",
          health_status: "",
          stock: "",
          category_id: "",
          movement_type: "",
          unit_of_measure: "",
          raw_material: "",
          image_product: "",
        });
        setOpenModal((prevOpenModal) => !prevOpenModal);
        setDataModal({
          size: "6xl",
          labelModal: "Add New products",
          labelBtnModal: "Add new products",
          labelBtnSecondaryModal: "Back",
          handleBtn: create,
        });
      }
    };

    const create = async (param) => {
      setLoading((prevLoading) => !prevLoading);
      let dataBody = {};
      if (param === "products") {
        dataBody = {
          name: refBody.nameRef.current.value,
          code: refBody.codeRef.current.value,
          description: refBody.descriptionRef.current.value,
          price: refBody.priceRef.current.value,
          type: refBody.typeRef.current.value,
          animal_type: refBody.animal_typeRef.current.value,
          age: refBody.ageRef.current.value,
          weight: refBody.weightRef.current.value,
          health_status: refBody.health_statusRef.current.value,
          stock: refBody.stockRef.current.value,
          category_id: refBody.category_idRef.current.value,
          unit_of_measure: refBody.unit_of_measureRef.current.value,
          raw_material: refBody.raw_materialRef.current.value,
          image_product: refBody.image_productRef.current.value,
        };

        try {
          const store = await postApiData(param, dataBody);
          if (store.status === 201) {
            setPath(() => param);
            setRefresh(!refresh);
            setLoading((prevLoading) => !prevLoading);
            setOpenModal((prevOpenModal) => !prevOpenModal);
          }
        } catch (error) {
          setLoading((prevLoading) => !prevLoading);
          setResponseError(error.response.data.errors);
        }
      } else if (param === "product-categories") {
        dataBody = {
          name: refBody.nameRef.current.value,
          description: refBody.descriptionRef.current.value,
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
      } else if (param === "product-movements") {
        dataBody = {
          product_id: refBody.product_idRef.current.value,
          warehouse_id: refBody.warehouse_idRef.current.value,
          movement_type: refBody.movement_typeRef.current.value,
          quantity: refBody.quantityRef.current.value,
          price: refBody.priceRef.current.value,
        };

        try {
          const store = await postApiData(param, dataBody);
          if (store.status === 201) {
            setPath(() => param);
            setRefresh(!refresh);
            setLoading((prevLoading) => !prevLoading);
            setOpenModal((prevOpenModal) => !prevOpenModal);
          }
        } catch (error) {
          setLoading((prevLoading) => !prevLoading);
          setResponseError(error.response.data.errors);
        }
      } else if (param === "product-prices") {
        dataBody = {
          product_id: refBody.product_idRef.current.value,
          selling_price: refBody.selling_priceRef.current.value,
          buying_price: refBody.buying_priceRef.current.value,
          discount_price: refBody.discount_priceRef.current.value,
        };

        try {
          const store = await postApiData(param, dataBody);
          if (store.status === 201) {
            setPath(() => param);
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
          code: refBody.codeRef.current.value,
          description: refBody.descriptionRef.current.value,
          price: refBody.priceRef.current.value,
          type: refBody.typeRef.current.value,
          animal_type: refBody.animal_typeRef.current.value,
          age: refBody.ageRef.current.value,
          weight: refBody.weightRef.current.value,
          health_status: refBody.health_statusRef.current.value,
          stock: refBody.stockRef.current.value,
          category_id: refBody.category_idRef.current.value,
          unit_of_measure: refBody.unit_of_measureRef.current.value,
          raw_material: refBody.raw_materialRef.current.value,
          image_product: refBody.image_productRef.current.value,
        };
        console.log(dataBody);
        try {
          const store = await postApiData("products", dataBody);
          if (store.status === 201) {
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

  const EDIT = () => {
    const handleEdit = async (param) => {
      const id = param.textContent;
      if (path === "products") {
        setDataModal({
          size: "6xl",
          labelModal: "Update products",
          labelBtnModal: "Save",
          labelBtnSecondaryModal: "Delete",
          handleBtn: edit,
        });
        setValidationError({
          name: "",
          code: "",
          description: "",
          price: "",
          type: "",
          animal_type: "",
          age: "",
          weight: "",
          health_status: "",
          stock: "",
          category_id: "",
          movement_type: "",
          unit_of_measure: "",
          raw_material: "",
          image_product: "",
        });
        setOpenModal((prevOpenModal) => !prevOpenModal);
        try {
          const { data, status } = await getApiData(path + "/" + id);
          if (status === 200) {
            setDataEdit({
              name: data.name,
              code: data.code,
              description: data.description,
              price: data.price,
              type: data.type,
              animal_type: data.animal_type,
              age: data.age,
              weight: data.weight,
              health_status: data.health_status,
              stock: data.stock,
              category_id: data.category_id,
              movement_type: data.movement_type,
              unit_of_measure: data.unit_of_measure,
              raw_material: data.raw_material,
              image_product: data.image_product,
              id: data.id,
            });

            setIdDelete(data.id);
          }
        } catch (error) {
          console.log(error);
        }
      } else if (path === "product-categories") {
        setDataModal({
          size: "lg",
          labelModal: "Update category",
          labelBtnModal: "Save",
          labelBtnSecondaryModal: "Delete",
          handleBtn: edit,
        });
        setValidationError({
          name: "",
          description: "",
          id: "",
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
      } else if (path === "product-prices") {
        setDataModal({
          size: "lg",
          labelModal: "Update price",
          labelBtnModal: "Save",
          labelBtnSecondaryModal: "Delete",
          handleBtn: edit,
        });
        setValidationError({
          product_id: "",
          selling_price: "",
          buying_price: "",
          discount_price: "",
        });
        setOpenModal((prevOpenModal) => !prevOpenModal);
        try {
          const { data, status } = await getApiData(path + "/" + id);
          if (status === 200) {
            setDataEdit({
              product_id: data.product_id,
              selling_price: data.selling_price,
              buying_price: data.buying_price,
              discount_price: data.discount_price,
              id: data.id,
            });

            setIdDelete(data.id);
          }
        } catch (error) {
          console.log(error);
        }
      } else if (path === "product-movements") {
        setDataModal({
          size: "2xl",
          labelModal: "Update movement",
          labelBtnModal: "Save",
          labelBtnSecondaryModal: "Delete",
          handleBtn: edit,
        });
        setValidationError({
          product_id: "",
          warehouse_id: "",
          movement_type: "",
          quantity: "",
          price: "",
        });
        setOpenModal((prevOpenModal) => !prevOpenModal);
        try {
          const { data, status } = await getApiData(path + "/" + id);
          if (status === 200) {
            setDataEdit({
              product_id: data.product_id,
              warehouse_id: data.warehouse_id,
              movement_type: data.movement_type,
              quantity: data.quantity,
              price: data.price,
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

      if (path === "products") {
        dataBody = {
          name: refBody.nameRef.current.value,
          code: refBody.codeRef.current.value,
          description: refBody.descriptionRef.current.value,
          price: refBody.priceRef.current.value,
          type: refBody.typeRef.current.value,
          animal_type: refBody.animal_typeRef.current.value,
          age: refBody.ageRef.current.value,
          weight: refBody.weightRef.current.value,
          health_status: refBody.health_statusRef.current.value,
          stock: refBody.stockRef.current.value,
          category_id: refBody.category_idRef.current.value,
          unit_of_measure: refBody.unit_of_measureRef.current.value,
          raw_material: refBody.raw_materialRef.current.value,
          image_product: refBody.image_productRef.current.value,
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
      } else if (path === "product-categories") {
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
      } else if (path === "product-prices") {
        dataBody = {
          product_id: refBody.product_idRef.current.value,
          selling_price: refBody.selling_priceRef.current.value,
          buying_price: refBody.buying_priceRef.current.value,
          discount_price: refBody.discount_priceRef.current.value,
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
      } else if (path === "product-movements") {
        dataBody = {
          product_id: refBody.product_idRef.current.value,
          warehouse_id: refBody.warehouse_idRef.current.value,
          movement_type: refBody.movement_typeRef.current.value,
          quantity: refBody.quantityRef.current.value,
          price: refBody.priceRef.current.value,
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

  const inputBody = (param, response) => {
    // Variabel response didefinisikan di luar blok kondisional
    let imageProductElement = null;

    if (param === "products") {
      imageProductElement = response?.image_product && (
        <img
          src={response.image_product}
          alt={response.name}
          className="h-8 w-8 rounded-full object-cover"
        />
      );

      return (
        <>
          <div className="grid gap-4 mb-4 grid-cols-1 lg:grid-cols-3">
            {inputProducts.map((item, index) => (
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
              placeholder={"Write description here"}
              value={dataEdit.description}
              onChange={handleChange}
              validationError={validationError}
            />
            {imageProductElement}
          </div>
        </>
      );
    } else if (param === "product-categories") {
      return (
        <>
          <div className="grid gap-4 mb-4 grid-cols-1">
            {inputProductCategories.map((item, index) => (
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
              span={`col-span-1`}
              label={"Description"}
              htmlFor={"description"}
              id={"description"}
              name={"description"}
              referens={refBody.descriptionRef}
              value={dataEdit.description}
              onChange={handleChange}
              placeholder={"Write notes here"}
            />
          </div>
        </>
      );
    } else if (param === "product-prices") {
      return (
        <>
          <div className="grid gap-4 mb-4 grid-cols-1">
            {inputProductPrices.map((item, index) => (
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
            {/* <TextArea
              span={`col-span-1`}
              label={"Description"}
              htmlFor={"description"}
              id={"description"}
              name={"description"}
              referens={refBody.descriptionRef}
              placeholder={"Write notes here"}
            /> */}
          </div>
        </>
      );
    } else if (param === "product-movements") {
      return (
        <>
          <div className="grid gap-4 mb-4 grid-cols-1 lg:grid-cols-2">
            {inputProductMovements.map((item, index) => (
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
            {/* <TextArea
              span={`col-span-2`}
              label={"Description"}
              htmlFor={"description"}
              id={"description"}
              name={"description"}
              referens={refBody.descriptionRef}
              value={dataEdit.description}
              placeholder={"Write notes here"}
            /> */}
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
