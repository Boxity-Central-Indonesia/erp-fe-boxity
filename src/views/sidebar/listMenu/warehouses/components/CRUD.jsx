import { useEffect, useState, useRef } from "react";
import {
  getApiData,
  postApiData,
  putApiData,
  deleteApiData,
  postApiDataAndFile
} from "../../../../../function/Api";
import IconAdd from "../../../../layouts/icons/IconAdd";
import { TextArea } from "../../../../layouts/FormInput";
import FormInput from "../../../../layouts/FormInput";
import { currencyToNumber, numberToCurrency } from "../../../../config/FormatCurrency";

export const CRUD = () => {
  const [refresh, setRefresh] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalDelete, setModalDelete] = useState();
  const [idDelete, setIdDelete] = useState();
  const [dataModal, setDataModal] = useState({});
  const [inputWarehousees, setInputWarehousees] = useState([]);
  const [inputWarehouseesLocations, setInputWarehoueseesLocations] = useState(
    []
  );
  const [responseError, setResponseError] = useState();
  const [validationError, setValidationError] = useState();
  const [loading, setLoading] = useState(true);
  const [skeleton, setSkeleton] = useState(false);
  const [dataHeading, setDataHeading] = useState([{}]);
  const [path, setPath] = useState("warehouses");
  const [dataWarehouseesSelect, setDataWarehouseesSelect] = useState([]);
  const [defaultEdit, setDefaultEdit] = useState(true)
  const [dataDetailWarehouses, setDataDetailWarehouses] = useState()
  const [disabledInput, setDisabledInput] = useState(false)  
  const [refreshForDetial, setRefreshForDetail] = useState(false)
  const [inputProducts, setInputProducts] = useState([]);
  const [imageUrl, setImageUrl] = useState(
    "https://res.cloudinary.com/du0tz73ma/image/upload/v1700279273/building_z7thy7.png"
  );
  const [dataCategorySelect, setDataCategorySelect] = useState();
  const [messages, setMessages] = useState([]);
  const [usePageDetail, setUsePageDetail] = useState(false)

  // EmployesList

  const [refBody, setRefBody] = useState({
    nameRef: useRef(),
    addressRef: useRef(),
    descriptionRef: useRef(),
    idRef: useRef(),
    numberRef: useRef(),
    warehouse_idRef: useRef(),
    capacityRef: useRef(),
    lengthRef: useRef(),
    widthRef: useRef(),
    heightRef: useRef(),

    // produk
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
  });
  const [dataEdit, setDataEdit] = useState({
    name: "",
    address: "",
    description: "",
    id: "",
    number: "",
    warehouse_id: "",
    capacity: "",
    length: "",
    width: "",
    height: "",
  });

  const handleChange = (event) => {
    // Mendapatkan nama dan nilai input yang berubah
    const { name, value } = event.target;

    if (name === "image_product") {
      const newImageUrl = URL.createObjectURL(refBody.image_productRef.current.files[0]);
      setImageUrl(newImageUrl);
      setDataEdit(prevData => ({
        ...prevData,
        image_product: newImageUrl,
      }));
    }

    // Memperbarui state sesuai dengan nilai input yang berubah
    setDataEdit((prevDataEdit) => ({
      ...prevDataEdit,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Membuka koneksi WebSocket saat komponen dimuat
    const socket = new WebSocket('ws://localhost:6001'); // Ganti dengan URL WebSocket server Anda
    
    // Menangani pesan yang diterima dari server
    socket.onmessage = event => {
      const messageFromServer = event.data;
      setMessages(prevMessages => [...prevMessages, messageFromServer]);
    };
    
    // Menutup koneksi WebSocket saat komponen dibongkar
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (!!responseError) {
      setValidationError({
        name: responseError?.name?.[0] || "",
        address: responseError?.address?.[0] || "",
        capacity: responseError?.capacity?.[0] || "",
        length: responseError?.length?.[0] || "",
        width: responseError?.width?.[0] || "",
        height: responseError?.height?.[0] || "",
        description: responseError?.description?.[0] || "",
        warehouse_id: responseError?.warehouse_id?.[0] || "",
        number: responseError?.number?.[0] || "",
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
    document.title = "Warehouses - DHKJ Manufacturer";
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
    setInputWarehousees([
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
        type: "number",
        name: "capacity",
        ref: refBody.capacityRef,
        value: dataEdit.capacity,
        label: "Capacity",
        htmlFor: "capacity",
        id: "capacity",
        onchange: handleChange,
        placeholder: "Capacity",
      },
    ]);

    setInputWarehoueseesLocations([
      {
        element: "select",
        name: "warehouse_id",
        ref: refBody.warehouse_idRef,
        value: !defaultEdit ? localStorage.getItem('idWarehouse') : dataEdit.warehouse_id,
        label: "Warehouse",
        htmlFor: "warehouse_id",
        id: "warehouse_id",
        dataSelect: dataWarehouseesSelect,
        onchange: handleChange,
        disabled: disabledInput
      },
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
        type: "number",
        name: "capacity",
        ref: refBody.capacityRef,
        value: dataEdit.capacity,
        label: "Capacity",
        htmlFor: "capacity",
        id: "capacity",
        onchange: handleChange,
        placeholder: "Capacity",
      },
      {
        element: "input",
        type: "number",
        name: "length",
        ref: refBody.lengthRef,
        value: dataEdit.length,
        label: "Length",
        htmlFor: "length",
        id: "length",
        onchange: handleChange,
        placeholder: "Length",
      },
      {
        element: "input",
        type: "number",
        name: "width",
        ref: refBody.widthRef,
        value: dataEdit.width,
        label: "Width",
        htmlFor: "width",
        id: "width",
        onchange: handleChange,
        placeholder: "Width",
      },
      {
        element: "input",
        type: "number",
        name: "height",
        ref: refBody.heightRef,
        value: dataEdit.height,
        label: "Height",
        htmlFor: "height",
        id: "height",
        onchange: handleChange,
        placeholder: "Height",
      },
    ]);

    setInputProducts([
      {
        element: "file",
        type: "file",
        name: "image_product",
        ref: refBody.image_productRef,
        value: dataEdit.Files,
        label: "Product Image",
        htmlFor: "image_product",
        id: "image_product",
        onchange: handleChange,
        placeholder: "Product Image",
      },
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
        element: "select",
        name: "health_status",
        ref: refBody.health_statusRef,
        value: dataEdit.health_status,
        label: "Kesehatan Barang",
        htmlFor: "health_status",
        id: "health_status",
        dataSelect: [
          { id: "1", name: "Healthy" },
          { id: "0", name: "Half Healthy" },
        ],
        onchange: handleChange,
      },
      {
        element: "input",
        type: "number",
        name: "stock",
        ref: refBody.stockRef,
        value: dataEdit.stock,
        label: "Stock Quantity",
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
        label: "Kategori Barang",
        htmlFor: "category_id",
        id: "category_id",
        dataSelect: dataCategorySelect,
        onchange: handleChange,
      },
      {
        element: "select",
        name: "warehouse_id",
        ref: refBody.warehouse_idRef,
        value: localStorage.getItem('idWarehouse'),
        label: "Penempatan Gudang",
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
        element: "select",
        name: "raw_material",
        ref: refBody.raw_materialRef,
        value: dataEdit.raw_material,
        label: "Bahan Baku atau Tidak",
        htmlFor: "raw_material",
        id: "raw_material",
        dataSelect: [
          { id: "1", name: "True" },
          { id: "0", name: "False" },
        ],
        onchange: handleChange,
      },
    ]);
  }, [dataEdit]);

  const dataWarehouses = (data) => {
    return data.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      alamat: item.address,
      kapasitas: item.capacity,
    }));
  };

  const dataWarehousesLocation = (data) => {
    return data.map((item) => ({
      id: item.id,
      "Rak / Lokasi": item.number,
      warehouse: item.warehouse.name,
      kapasitas: item.capacity,
    }));
  };

  const getWarehouseById = async (id) => {
    try {
      const {data, status} = await getApiData('warehouses/' + id)
      if(status === 200){
        setDataDetailWarehouses(data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const deletePreviewImage = () => {
    setImageUrl(
      "https://res.cloudinary.com/du0tz73ma/image/upload/v1700279273/building_z7thy7.png"
    );
    setDataEdit(prevData => ({
      ...prevData,
      image_product: "",
    }));
    refBody.image_productRef.current.value = "";
  };
  const READ = () => {
    const [data, setData] = useState();
    useEffect(() => {
      if(!defaultEdit){
        getWarehouseById(localStorage.getItem('idWarehouse'))
        setLoading(true)
      }
      const getData = async () => {
        try {
          const { data } = await getApiData(path);
          if (path === "warehouses") {
            const newData = dataWarehouses(data);
            setData(newData);
            setLoading(true)
            setUsePageDetail(true)
            setDataHeading([
              {
                label: "Tambah warehouses",
                icon: IconAdd(),
                heading: "Warehouses list",
                information:
                  "This is additional information about the content of this section. You can provide any relevant details or instructions here.",
                eventToggleModal: handleCreate,
                onclick: handleClickHeading,
                showNavHeading: true,
                dataNavHeading: [
                  { path: "warehouses", label: "Daftar Gudang" },
                  { path: "warehouse-locations", label: "Lokasi" },
                ],
                activeButton: path,
              },
            ]);
          } else if (path === "warehouse-locations") {
            const newData = dataWarehousesLocation(data);
            setData(newData);
            setLoading(true)
            setUsePageDetail(false)
            setDataHeading([
              {
                label: "Tambah warehouses",
                icon: IconAdd(),
                heading: "Warehouses list",
                information:
                  "This is additional information about the content of this section. You can provide any relevant details or instructions here.",
                eventToggleModal: handleCreate,
                onclick: handleClickHeading,
                showNavHeading: true,
                dataNavHeading: [
                  { path: "warehouses", label: "Daftar Gudang" },
                  { path: "warehouse-locations", label: "Lokasi" },
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
    }, []);

    const handleClickHeading = async (param) => {
      setPath(param);
      setDataHeading([
        {
          label:
            param === "warehouses"
              ? "Tambah warehouses"
              : "Tambah warehouse locations",
          icon: IconAdd(),
          heading:
            param === "warehouses"
              ? "Warehouses list"
              : "Warehouse Locations list",
          information:
            "This is additional information about the content of this section. You can provide any relevant details or instructions here.",
          eventToggleModal: handleCreate,
          onclick: handleClickHeading,
          parameter: param,
          showNavHeading: true,
          dataNavHeading: [
            { path: "warehouses", label: "Daftar Gudang" },
            { path: "warehouse-locations", label: "Lokasi" },
          ],
          activeButton: param,
        },
      ]);
      setData([1]);
      setSkeleton((prevSkeleton) => !prevSkeleton);
      try {
        const { data, status } = await getApiData(param);
        if (status === 200) {
          if (param === "warehouses") {
            const newData = dataWarehouses(data);
            setSkeleton((prevSkeleton) => !prevSkeleton);
            setData(newData);
            setUsePageDetail(true)
          } else if (param === "warehouse-locations") {
            setSkeleton((prevSkeleton) => !prevSkeleton);
            const newData = dataWarehousesLocation(data);
            setData(newData);
            setUsePageDetail(false)
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    // getDatEnd

    return { data, handleClickHeading };
  };

  const CREATE = () => {
    const handleCreate = (param) => {
      if (param === "warehouses") {
        setDataEdit({
          name: "",
          address: "",
          capacity: "",
          id: "",
        });
        setValidationError({
          name: "",
          address: "",
          capacity: "",
          description: "",
          id: "",
        });
        setOpenModal((prevOpenModal) => !prevOpenModal);
        setDataModal({
          size: "lg",
          labelModal: "Tambah Gudang",
          labelBtnModal: "Tambah Gudang",
          labelBtnSecondaryModal: "Back",
          handleBtn: create,
        });
      } else if (param === "warehouse-locations" && defaultEdit) {
        setDataEdit({
          warehouse_id: "",
          number: "",
          capacity: "",
          length: "",
          width: "",
          height: "",
        });
        setValidationError({
          warehouse_id: "",
          number: "",
          capacity: "",
          length: "",
          width: "",
          height: "",
        });
        setOpenModal((prevOpenModal) => !prevOpenModal);
        setDataModal({
          size: "2xl",
          labelModal: "Tambah locations",
          labelBtnModal: "Tambah locations",
          labelBtnSecondaryModal: "Back",
          handleBtn: create,
        });
      } else if (param === "warehouse-locations" && !defaultEdit) {
        setPath('warehouse-locations')
        setOpenModal((prevOpenModal) => !prevOpenModal);
        setDataEdit({
          warehouse_id: "",
          number: "",
          capacity: "",
          length: "",
          width: "",
          height: "",
        });
        setValidationError({
          warehouse_id: "",
          number: "",
          capacity: "",
          length: "",
          width: "",
          height: "",
        });
        setDataModal({
          size: "2xl",
          labelModal: "Tambah locations",
          labelBtnModal: "Tambah locations",
          labelBtnSecondaryModal: "Back",
          handleBtn: create,
        });
      } else if (param === "products" && !defaultEdit) {
        setPath('products')
        setOpenModal((prevOpenModal) => !prevOpenModal);
        setDataEdit({
          warehouse_id: "",
          number: "",
          capacity: "",
          length: "",
          width: "",
          height: "",
        });
        setValidationError({
          warehouse_id: "",
          number: "",
          capacity: "",
          length: "",
          width: "",
          height: "",
        });
        setDataModal({
          size: "6xl",
          labelModal: "Tambah produk",
          labelBtnModal: "Tambah locations",
          labelBtnSecondaryModal: "Back",
          handleBtn: create,
        });
        } else {
        setDataEdit({
          name: "",
          address: "",
          capacity: "",
          description: "",
          id: "",
        });
        setValidationError({
          name: "",
          address: "",
          capacity: "",
          description: "",
          id: "",
        });
        setOpenModal((prevOpenModal) => !prevOpenModal);
        setDataModal({
          size: "md",
          labelModal: "Tambah Gudang",
          labelBtnModal: "Tambah Gudang",
          labelBtnSecondaryModal: "Back",
          handleBtn: create,
        });
      }
    };


    const create = async (param) => {
      setLoading((prevLoading) => !prevLoading);
      let dataBody = {};
      if (param === "warehouses") {
        dataBody = {
          name: refBody.nameRef.current.value,
          address: refBody.addressRef.current.value,
          capacity: refBody.capacityRef.current.value,
          description: refBody.descriptionRef.current.value,
        };

        try {
          const store = await postApiData(param, dataBody);
          if (store.status === 201) {
            setRefresh(!refresh);
            setLoading((prevLoading) => !prevLoading);
            setOpenModal((prevOpenModal) => !prevOpenModal);
            setPath(param);
          }
        } catch (error) {
          setLoading((prevLoading) => !prevLoading);
          setResponseError(error.response.data);
        }
      } else if (param === "warehouse-locations") {
        dataBody = {
          warehouse_id: !defaultEdit ? localStorage.getItem('idWarehouse') : refBody.warehouse_idRef.current.value,
          number: refBody.numberRef.current.value,
          capacity: refBody.capacityRef.current.value,
          length: refBody.lengthRef.current.value,
          width: refBody.widthRef.current.value,
          height: refBody.heightRef.current.value,
        };

        try {
          const store = await postApiData(param, dataBody);
          if (store.status === 201) {
            setPath(() => param);
            setRefresh(!refresh);
            setLoading((prevLoading) => !prevLoading);
            setOpenModal((prevOpenModal) => !prevOpenModal);
            getWarehouseById(dataBody.warehouse_id)
          }
        } catch (error) {
          setLoading((prevLoading) => !prevLoading);
          setResponseError(error.response.data.errors);
        }
      } else if (param === "products") {
        let dataBody = {
          name: refBody.nameRef.current.value,
          description: refBody.descriptionRef.current.value,
          price: currencyToNumber(refBody.priceRef.current.value),
          type: refBody.typeRef.current.value,
          animal_type: refBody.animal_typeRef.current.value,
          age: refBody.ageRef.current.value,
          warehouse_id: refBody.warehouse_idRef.current.value,
          weight: refBody.weightRef.current.value,
          health_status: refBody.health_statusRef.current.value,
          stock: refBody.stockRef.current.value,
          category_id: refBody.category_idRef.current.value,
          unit_of_measure: refBody.unit_of_measureRef.current.value,
          raw_material: refBody.raw_materialRef.current.value,
          image_product: refBody.image_productRef.current.files[0],
        };

        try {
          const store = await postApiDataAndFile('products', dataBody);
          if (store.status === 201) {
            setPath(() => param);
            setRefresh(!refresh);
            setLoading((prevLoading) => !prevLoading);
            setOpenModal((prevOpenModal) => !prevOpenModal);
            getWarehouseById(localStorage.getItem('idWarehouse'))
          }
        } catch (error) {
          setLoading((prevLoading) => !prevLoading);
          setResponseError(error.response.data.errors);
        }
      }else {
        dataBody = {
          name: refBody.nameRef.current.value,
          address: refBody.addressRef.current.value,
          capacity: refBody.capacityRef.current.value,
          description: refBody.descriptionRef.current.value,
        };

        try {
          const store = await postApiData("warehouses", dataBody);
          if (store.status === 201) {
            setRefresh(!refresh);
            setLoading((prevLoading) => !prevLoading);
            setOpenModal((prevOpenModal) => !prevOpenModal);
            setPath(param);
          }
        } catch (error) {
          setLoading((prevLoading) => !prevLoading);
          setResponseError(error.response.data);
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
      if (path === "warehouses") {
        const getSelectKategory = async () => {
          const { data, status } = await getApiData("product-categories");
          if (status === 200) {
            const newData = data.map((item) => ({
              id: item.id,
              name: item.name,
            }));
            setDataCategorySelect(newData);
          }
        };
        getSelectKategory();
        setDefaultEdit(false)
        try {
          const { data, status } = await getApiData(path + "/" + id.trim());
          if (status === 200) {
            setDataDetailWarehouses(() => data)

            localStorage.setItem('idWarehouse', data.warehouse.id)

            setIdDelete(data.warehouse.id);
          }
        } catch (error) {
          console.log(error);
        }
      } else if (path === "warehouse-locations") {
        setDataModal({
          size: "2xl",
          labelModal: "Update warehouse-locations",
          labelBtnModal: "Save",
          labelBtnSecondaryModal: "Delete",
          handleBtn: edit,
        });
        setValidationError({
          warehouse_id: "",
          number: "",
          capacity: "",
          length: "",
          width: "",
          height: "",
        });

        setOpenModal((prevOpenModal) => !prevOpenModal);
        try {
          const { data, status } = await getApiData(path + "/" + id);
          if (status === 200) {
            setDataEdit({
              warehouse_id: data.warehouse_id,
              number: data.number,
              capacity: data.capacity,
              length: data.length,
              width: data.width,
              height: data.height,
              id: data.id,
            });

            setIdDelete(data.id);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };


    const handleEditDetailWarehouseLocations = async (param) => {
      setPath('warehouse-locations')
      localStorage.setItem('path', 'warehouse-locations')
      setDataModal({
        size: "2xl",
        labelModal: "Update warehouse-locations",
        labelBtnModal: "Save",
        labelBtnSecondaryModal: "Delete",
        handleBtn: edit,
      });
      setValidationError({
        warehouse_id: "",
        number: "",
        capacity: "",
        length: "",
        width: "",
        height: "",
      });
      setOpenModal((prevOpenModal) => !prevOpenModal);
      try {
        const { data, status } = await getApiData('warehouse-locations' + "/" + param);
        if (status === 200) {
          setDataEdit({
            warehouse_id: data.warehouse_id,
            number: data.number,
            capacity: data.capacity,
            length: data.length,
            width: data.width,
            height: data.height,
            id: data.id,
          });

          setIdDelete(data.id);
        }
      } catch (error) {
        console.log(error);
      }
    }


    const handleEditDetailForProduct = async (param) => {
      setPath('products')
      localStorage.setItem('path', 'products')
      setDataModal({
        size: "6xl",
        labelModal: "Edit products",
        labelBtnModal: "Save",
        labelBtnSecondaryModal: "Delete",
        handleBtn: edit,
      });
      setValidationError({
        name: "",
        description: "",
        price: "",
        type: "",
        animal_type: "",
        age: "",
        weight: "",
        health_status: "",
        stock: "",
        category_id: "",
        warehouse_id: "",
        movement_type: "",
        unit_of_measure: "",
        raw_material: "",
        image_product: "",
      });
      setOpenModal((prevOpenModal) => !prevOpenModal);
      try {
        const { data, status } = await getApiData("products/" + param);
        if (status === 200) {
          setDataEdit({
            name: data.name,
            description: data.description,
            price: numberToCurrency(data.price),
            type: data.type,
            animal_type: data.animal_type,
            age: data.age,
            weight: data.weight,
            health_status: data.health_status,
            stock: data.stock,
            category_id: data.category_id,
            warehouse_id: data.warehouse_id,
            movement_type: data.movement_type,
            unit_of_measure: data.unit_of_measure,
            raw_material: data.raw_material,
            image_product: data.image_product,
            id: data.id,
          });

          setImageUrl(data.image_product);

          setIdDelete(data.id);
        }
      } catch (error) {
        console.log(error);
      }
    }

    const edit = async () => {
      setLoading((prevLoading) => !prevLoading);
      let dataBody = {};
      if (path === "warehouses" && defaultEdit) {
        dataBody = {
          name: refBody.nameRef.current.value,
          address: refBody.addressRef.current.value,
          capacity: refBody.capacityRef.current.value,
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
          setResponseError(error.response.data);
          setLoading((prevLoading) => !prevLoading);
        }
      } else if (path === "warehouse-locations" && defaultEdit) {
        dataBody = {
          warehouse_id: refBody.warehouse_idRef.current.value,
          number: refBody.numberRef.current.value,
          capacity: refBody.capacityRef.current.value,
          length: refBody.lengthRef.current.value,
          width: refBody.widthRef.current.value,
          height: refBody.heightRef.current.value,
        };

        try {
          const response = await putApiData(
            "warehouse-locations/" + refBody.idRef.current.value,
            dataBody
          );
          if (response.status === 201) {
            setLoading((prevLoading) => !prevLoading);
            setRefresh(!refresh);
            setOpenModal((prevOpenModal) => !prevOpenModal);
            getWarehouseById(dataBody.warehouse_id)
          }
        } catch (error) {
          setResponseError(error.response.data.errors);
          setLoading((prevLoading) => !prevLoading);
        }
      } else if (!defaultEdit && localStorage.getItem('path') === 'warehouse-locations') {
        dataBody = {
          warehouse_id: refBody.warehouse_idRef.current.value,
          number: refBody.numberRef.current.value,
          capacity: refBody.capacityRef.current.value,
          length: refBody.lengthRef.current.value,
          width: refBody.widthRef.current.value,
          height: refBody.heightRef.current.value,
        };

        try {
          const response = await putApiData(
            "warehouse-locations/" + refBody.idRef.current.value,
            dataBody
          );
          if (response.status === 201) {
            setLoading((prevLoading) => !prevLoading);
            setRefresh(!refresh);
            setOpenModal((prevOpenModal) => !prevOpenModal);
            getWarehouseById(dataBody.warehouse_id)
          }
        } catch (error) {
          setResponseError(error.response.data.errors);
          setLoading((prevLoading) => !prevLoading);
        }
      } else if(!defaultEdit && localStorage.getItem('path') === 'products'){
        let dataBody = {
          name: refBody.nameRef.current.value,
          description: refBody.descriptionRef.current.value,
          price: currencyToNumber(refBody.priceRef.current.value),
          type: refBody.typeRef.current.value,
          animal_type: refBody.animal_typeRef.current.value,
          age: refBody.ageRef.current.value,
          weight: refBody.weightRef.current.value,
          health_status: refBody.health_statusRef.current.value,
          stock: refBody.stockRef.current.value,
          category_id: refBody.category_idRef.current.value,
          warehouse_id: refBody.warehouse_idRef.current.value,
          unit_of_measure: refBody.unit_of_measureRef.current.value,
          raw_material: refBody.raw_materialRef.current.value,
          image_product: refBody.image_productRef.current.value,
        };
        try {
          const response = await putApiData(
            "products/" + refBody.idRef.current.value,
            dataBody
          );
          if (response.status === 201) {
            setLoading((prevLoading) => !prevLoading);
            setRefresh(!refresh);
            setOpenModal((prevOpenModal) => !prevOpenModal);
            getWarehouseById(localStorage.getItem('idWarehouse'))
          }
        } catch (error) {
          setResponseError(error.response.data.errors);
          setLoading((prevLoading) => !prevLoading);
        }
      }
    };

    return {
      handleEdit,
      handleEditDetailWarehouseLocations,
      handleEditDetailForProduct,
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
        if(defaultEdit){
          await deleteApiData(path + "/" + idDelete);
          setRefresh(!refresh);
          setDefaultEdit(true)
          closeModalDelete();
        }else {
          await deleteApiData(path + "/" + idDelete);
          setRefresh(!refresh);
          getWarehouseById(localStorage.getItem('idWarehouse'))
          closeModalDelete();
        }
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
    if (param === "warehouses") {
      return (
        <>
          <div className="grid gap-4 mb-4 grid-cols-1">
            {inputWarehousees.map((item, index) => (
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
              placeholder={"Write description here"}
            />
          </div>
        </>
      );
    } else if (param === "warehouse-locations") {
      return (
        <>
          <div className="grid gap-4 mb-4 grid-cols-2">
            {inputWarehouseesLocations.map((item, index) => (
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
                disabled={item.name === 'warehouse_id' && !defaultEdit ? true : false}
              />
            ))}
          </div>
        </>
      );
    } else if(param === "products") {
      return (
        <>
          <div className="grid gap-4 mb-4 grid-cols-1 lg:grid-cols-3">
            <div className="col-span-1">
              <div className="w-fit relative">
                <svg
                  className={`w-6 h-6 text-gray-800 dark:text-white absolute right-[-10px] top-[-10px] cursor-pointer ${
                    imageUrl ===
                    "https://res.cloudinary.com/du0tz73ma/image/upload/v1700279273/building_z7thy7.png"
                      ? `hidden`
                      : ``
                  }`}
                  onClick={deletePreviewImage}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 30 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <img
                  id="preview-image"
                  className="w-72 h-72 mb-3 rounded-sm"
                  src={imageUrl}
                  alt=""
                />
              </div>
              {inputProducts
                .filter((item) => item.name === "image_product") // Filter item dengan name bukan 'name'
                .map((item, index) => (
                  <>
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
                      disabled={item.name === 'warehouse_id' && !defaultEdit ? true : false}
                    />
                    <div className="mt-3">
                      <TextArea
                        rows={8}
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
                    </div>
                  </>
                ))}
            </div>
            <div className="col-span-2">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {inputProducts
                  .filter((item) => item.name !== "image_product") // Filter item dengan name bukan 'name'
                  .map((item, index) => (
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
                      disabled={item.name === 'warehouse_id' && !defaultEdit ? true : false}
                    />
                  ))}
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  const { data, handleClickHeading } = READ();
  const { handleCreate } = CREATE();
  const { handleEdit, handleEditDetailWarehouseLocations, handleEditDetailForProduct } = EDIT();
  const { openModalDelete, closeModalDelete, handleDelete } = DELETE();

  return {
    data,
    handleCreate,
    openModal,
    dataModal,
    inputWarehousees,
    inputWarehouseesLocations,
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
    dataDetailWarehouses,
    setDataDetailWarehouses,
    setDataModal,
    setDataEdit,
    setResponseError,
    setValidationError,
    setLoading,
    setPath,
    setDisabledInput,
    setRefreshForDetail,
    handleEditDetailWarehouseLocations,
    getWarehouseById,
    handleEditDetailForProduct,
    refresh,
    setRefresh,
    setLoading,
    usePageDetail
  };
};
