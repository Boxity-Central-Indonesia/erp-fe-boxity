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
        address: responseError?.address?.[0] || "",
        capacity: responseError?.capacity?.[0] || "",
        length: responseError?.length?.[0] || "",
        width: responseError?.width?.[0] || "",
        height: responseError?.height?.[0] || "",
        description: responseError?.description?.[0] || "",
        warehouse_id: responseError?.warehouse_id?.[0] || "",
        number: responseError?.number?.[0] || "",
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
        value: dataEdit.warehouse_id,
        label: "Warehouse",
        htmlFor: "warehouse_id",
        id: "warehouse_id",
        dataSelect: dataWarehouseesSelect,
        onchange: handleChange,
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

  const READ = () => {
    const [data, setData] = useState();
    useEffect(() => {
      const getData = async () => {
        try {
          const { data } = await getApiData(path);
          if (path === "warehouses") {
            const newData = dataWarehouses(data);
            setData(newData);
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
          } else if (param === "warehouse-locations") {
            setSkeleton((prevSkeleton) => !prevSkeleton);
            const newData = dataWarehousesLocation(data);
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
          size: "md",
          labelModal: "Tambah Gudang",
          labelBtnModal: "Tambah Gudang",
          labelBtnSecondaryModal: "Back",
          handleBtn: create,
        });
      } else if (param === "warehouse-locations") {
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
          size: "md",
          labelModal: "Tambah locations",
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
          warehouse_id: refBody.warehouse_idRef.current.value,
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
          }
        } catch (error) {
          setLoading((prevLoading) => !prevLoading);
          setResponseError(error.response.data.errors);
        }
      } else {
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
        setDataModal({
          size: "lg",
          labelModal: "Update warehouses",
          labelBtnModal: "Save",
          labelBtnSecondaryModal: "Delete",
          handleBtn: edit,
        });
        setValidationError({
          name: "",
          address: "",
          capacity: "",
          description: "",
          id: "",
        });

        setOpenModal((prevOpenModal) => !prevOpenModal);
        try {
          const { data, status } = await getApiData(path + "/" + id);
          if (status === 200) {
            setDataEdit({
              name: data.name,
              address: data.address,
              capacity: data.capacity,
              description: data.description,
              id: data.id,
            });

            setIdDelete(data.id);
          }
        } catch (error) {
          console.log(error);
        }
      } else if (path === "warehouse-locations") {
        setDataModal({
          size: "lg",
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

    const edit = async () => {
      setLoading((prevLoading) => !prevLoading);
      let dataBody = {};
      if (path === "warehouses") {
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
      } else if (path === "warehouse-locations") {
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
          <div className="grid gap-4 mb-4 grid-cols-1">
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
  };
};
