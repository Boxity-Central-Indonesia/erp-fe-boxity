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
import {
  FormatCurrency,
  numberToCurrency,
} from "../../../../config/FormatCurrency";

export const CRUD = () => {
  const [refresh, setRefresh] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalDelete, setModalDelete] = useState();
  const [idDelete, setIdDelete] = useState();
  const [dataModal, setDataModal] = useState({});
  const [responseError, setResponseError] = useState();
  const [validationError, setValidationError] = useState();
  const [loading, setLoading] = useState(true);
  const [dataCategoryEmployes, setDataCategoryEmployes] = useState();
  const [skeleton, setSkeleton] = useState(false);
  const [dataHeading, setDataHeading] = useState([{}]);
  const [path, setPath] = useState("assets");
  const [dataAccounSelect, setDataAccountSelect] = useState([]);
  const [inputAssets, setInputAssets] = useState([{}]);
  const [inputLocations, setInputLocations] = useState();
  const [inputCondition, setInputCondition] = useState();
  const [inputDepresiations, setInputDepresiations] = useState();
  const [dataSelectLocation, setDataSelectLocations] = useState();
  const [dataSelectCondition, setDataSelectCondition] = useState();

  const [refBody, setRefBody] = useState({
    idRef: useRef(),
    nameRef: useRef(),
    typeRef: useRef(),
    descriptionRef: useRef(),
    acquisition_dateRef: useRef(),
    acquisition_costRef: useRef(),
    book_valueRef: useRef(),
    location_idRef: useRef(),
    condition_idRef: useRef(),
    codeRef: useRef(),

    // location
    addressRef: useRef(),

    // condition
    conditionRef: useRef(),
  });
  const [dataEdit, setDataEdit] = useState({});

  const handleChange = (event) => {
    // Mendapatkan nama dan nilai input yang berubah
    const { name, value } = event.target;

    if (name === "acquisition_cost" || name === "book_value") {
      // Memperbarui state sesuai dengan nilai input yang berubah
      setDataEdit((prevDataEdit) => ({
        ...prevDataEdit,
        [name]: FormatCurrency({ value }),
      }));
    } else {
      // Memperbarui state sesuai dengan nilai input yang berubah
      setDataEdit((prevDataEdit) => ({
        ...prevDataEdit,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    if (!!responseError) {
      setValidationError({
        name: responseError?.name?.[0] || "",
        type: responseError?.type?.[0] || "",
        code: responseError?.code?.[0] || "",
        description: responseError?.description?.[0] || "",
        acquisition_date: responseError?.acquisition_date?.[0] || "",
        acquisition_cost: responseError?.acquisition_cost?.[0] || "",
        book_value: responseError?.book_value?.[0] || "",
        location_id: responseError?.location_id?.[0] || "",
        condition_id: responseError?.condition_id?.[0] || "",
        address: responseError?.address?.[0] || "",
        condition: responseError?.condition?.[0] || "",
      });
    }
  }, [responseError]);

  useEffect(() => {
    setInputAssets([
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
          { value: "tangible", name: "tangible" },
          { value: "intangible", name: "intangible" },
        ],
        onchange: handleChange,
      },
      {
        element: "select",
        name: "location_id",
        ref: refBody.location_idRef,
        value: dataEdit.location_id,
        label: "Lokasi",
        htmlFor: "location_id",
        id: "location_id",
        dataSelect: dataSelectLocation,
        onchange: handleChange,
      },
      {
        element: "select",
        name: "condition_id",
        ref: refBody.condition_idRef,
        value: dataEdit.condition_id,
        label: "Condition",
        htmlFor: "condition_id",
        id: "condition_id",
        dataSelect: dataSelectCondition,
        onchange: handleChange,
      },
      {
        element: "input",
        type: "date",
        name: "acquisition_date",
        ref: refBody.acquisition_dateRef,
        value: dataEdit.acquisition_date,
        label: "Acquisition date",
        htmlFor: "acquisition_date",
        id: "acquisition_date",
        onchange: handleChange,
        placeholder: "Acquisition date",
      },
      {
        element: "input",
        type: "text",
        name: "acquisition_cost",
        ref: refBody.acquisition_costRef,
        value: dataEdit.acquisition_cost,
        label: "Acquisition cost",
        htmlFor: "acquisition_cost",
        id: "acquisition_cost",
        onchange: handleChange,
        placeholder: "Acquisition cost",
      },
      {
        element: "input",
        type: "text",
        name: "book_value",
        ref: refBody.book_valueRef,
        value: dataEdit.book_value,
        label: "Book value",
        htmlFor: "book_value",
        id: "book_value",
        onchange: handleChange,
        placeholder: "Book value",
      },
    ]);

    setInputLocations([
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
    ]);

    setInputCondition([
      {
        element: "input",
        type: "text",
        name: "condition",
        ref: refBody.conditionRef,
        value: dataEdit.condition,
        label: "Condition",
        htmlFor: "condition",
        id: "condition",
        onchange: handleChange,
        placeholder: "Condition",
      },
    ]);
  }, [dataEdit]);

  const dataAssets = (data) => {
    return data.map((item) => ({
      id: item.id,
      code: item.code,
      name: item.name,
      type: item.type,
      "acquisition date": item.acquisition_date,
      location: item.location.name ?? "--",
      condition: item.condition.condition,
      description: item.description,
      "acquisition cost": item.book_value,
      "book value": item.book_value,
    }));
  };

  const dataAssetLocations = (data) => {
    return data.map((item) => ({
      id: item.id,
      name: item.name,
      address: item.address,
    }));
  };

  const dataAssetsConditions = (data) => {
    return data.map((item) => ({
      id: item.id,
      condition: item.condition,
    }));
  };

  const dataAssetsDepresiations = (data) => {
    return data.map((item) => ({
      id: item.id,
      // condition: item.condition
    }));
  };

  const READ = () => {
    const [data, setData] = useState();
    useEffect(() => {
      document.title = 'Manajemen assets - DHKJ Manufacturer'
      const getData = async () => {
        try {
          const { data } = await getApiData(path);
          if (path === "assets") {
            const newData = dataAssets(data);
            console.log(data);
            setData(() => newData);
            setLoading(true)
            setDataHeading([
              {
                label: "Tambah asset",
                icon: IconAdd(),
                information:
                  "Ini adalah informasi tambahan tentang isi bagian ini. Anda dapat memberikan detail atau instruksi apa pun yang relevan di sini.",
                heading: "Daftar Asset",
                eventToggleModal: handleCreate,
                onclick: handleClickHeading,
                showNavHeading: true,
                dataNavHeading: [
                  { path: "asset-locations", label: "Location" },
                  { path: "asset-conditions", label: "Condition" },
                  { path: "assets", label: "Assets" },
                  { path: "asset-depreciations", label: "Depresiations" },
                ],
                activeButton: path,
              },
            ]);
          } else if (path === "asset-locations") {
            const newData = dataAssetLocations(data);
            setData(() => newData);
            setLoading(true)
            setDataHeading([
              {
                label: "Tambah category",
                icon: IconAdd(),
                information:
                  "Ini adalah informasi tambahan tentang isi bagian ini. Anda dapat memberikan detail atau instruksi apa pun yang relevan di sini.",
                heading: "Daftar Kategori",
                eventToggleModal: handleCreate,
                onclick: handleClickHeading,
                showNavHeading: true,
                dataNavHeading: [
                  { path: "asset-locations", label: "Location" },
                  { path: "asset-conditions", label: "Condition" },
                  { path: "assets", label: "Assets" },
                  { path: "asset-depreciations", label: "Depresiations" },
                ],
                activeButton: path,
              },
            ]);
          } else if (path === "asset-depreciations") {
            const newData = dataAssetsDepresiations(data);
            setData(() => newData);
            setLoading(true)
            setDataHeading([
              {
                label: "Tambah category",
                icon: IconAdd(),
                information:
                  "Ini adalah informasi tambahan tentang isi bagian ini. Anda dapat memberikan detail atau instruksi apa pun yang relevan di sini.",
                heading: "Daftar Kategori",
                eventToggleModal: handleCreate,
                onclick: handleClickHeading,
                showNavHeading: true,
                dataNavHeading: [
                  { path: "asset-locations", label: "Location" },
                  { path: "asset-conditions", label: "Condition" },
                  { path: "assets", label: "Assets" },
                  { path: "asset-depreciations", label: "Depresiations" },
                ],
                activeButton: path,
              },
            ]);
          } else if (path === "asset-conditions") {
            const newData = dataAssetsConditions(data);
            setData(() => newData);
            setLoading(true)
            setDataHeading([
              {
                label: "Tambah category",
                icon: IconAdd(),
                information:
                  "Ini adalah informasi tambahan tentang isi bagian ini. Anda dapat memberikan detail atau instruksi apa pun yang relevan di sini.",
                heading: "Daftar Kategori",
                eventToggleModal: handleCreate,
                onclick: handleClickHeading,
                showNavHeading: true,
                dataNavHeading: [
                  { path: "asset-locations", label: "Location" },
                  { path: "asset-conditions", label: "Condition" },
                  { path: "assets", label: "Assets" },
                  { path: "asset-depreciations", label: "Depresiations" },
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

      const getDataForSelect = async () => {
        try {
          const { data, status } = await getApiData("asset-locations");
          if (status === 200) {
            const newData = data.map((item) => ({
              id: item.id,
              name: item.name,
            }));
            setDataSelectLocations(newData);
          }
        } catch (error) {
          console.log(error);
        }
        try {
          const { data, status } = await getApiData("asset-conditions");
          if (status === 200) {
            const newData = data.map((item) => ({
              id: item.id,
              name: item.condition,
            }));
            setDataSelectCondition(newData);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getDataForSelect();
    }, [refresh]);

    useEffect(() => {
      const getDataAccount = async () => {
        try {
          const { data, status } = await getApiData("accounts");
          if (status === 200) {
            const newData = data.map((item) => ({
              id: item.id,
              name: item.name,
            }));
            setDataAccountSelect(() => newData);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getDataAccount();
    }, []);

    const handleClickHeading = async (param) => {
      setPath(param);
      setDataHeading([
        {
          label:
            param === "assets"
              ? "Tambah assets"
              : param === "asset-locations"
              ? "Tambah locations"
              : param === "asset-depreciations"
              ? "Tambah depereciations"
              : "Tambah condition",
          icon: IconAdd(),
          heading:
            param === "assets"
              ? "Assets"
              : param === "asset-locations"
              ? "Locations"
              : param === "asset-depreciations"
              ? "Depresiatins"
              : "Conditions" + " list",
          information:
            "Ini adalah informasi tambahan tentang isi bagian ini. Anda dapat memberikan detail atau instruksi apa pun yang relevan di sini.",
          eventToggleModal: handleCreate,
          onclick: handleClickHeading,
          parameter: param,
          showNavHeading: true,
          dataNavHeading: [
            { path: "asset-locations", label: "Location" },
            { path: "asset-conditions", label: "Condition" },
            { path: "assets", label: "Assets" },
            { path: "asset-depreciations", label: "Depresiations" },
          ],
          activeButton: param,
        },
      ]);
      setData([1]);
      setSkeleton((prevSkeleton) => !prevSkeleton);
      try {
        const { data, status } = await getApiData(param);
        if (status === 200) {
          if (param === "assets") {
            const newData = dataAssets(data);
            setSkeleton((prevSkeleton) => !prevSkeleton);
            setData(newData);
          } else if (param === "asset-locations") {
            setSkeleton((prevSkeleton) => !prevSkeleton);
            const newData = dataAssetLocations(data);
            setData(newData);
          } else if (param === "asset-conditions") {
            setSkeleton((prevSkeleton) => !prevSkeleton);
            const newData = dataAssetsConditions(data);
            setData(newData);
          } else if (param === "asset-depreciations") {
            setSkeleton((prevSkeleton) => !prevSkeleton);
            const newData = dataAssetsDepresiations(data);
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
      if (param === "assets") {
        setDataEdit({
          type: "",
          location_id: "",
          condition_id: "",
          description: "",
        });
        setValidationError({});
        setOpenModal((prevOpenModal) => !prevOpenModal);
        setDataModal({
          size: "2xl",
          labelModal: "Tambah asset",
          labelBtnModal: "Tambah asset",
          labelBtnSecondaryModal: "Back",
          handleBtn: create,
        });
      } else if (param === "asset-locations") {
        setDataEdit({});
        setValidationError({});
        setOpenModal((prevOpenModal) => !prevOpenModal);
        setDataModal({
          size: "lg",
          labelModal: "Tambah location",
          labelBtnModal: "Tambah location",
          labelBtnSecondaryModal: "Back",
          handleBtn: create,
        });
      } else if (param === "asset-conditions") {
        setDataEdit({});
        setValidationError({});
        setOpenModal((prevOpenModal) => !prevOpenModal);
        setDataModal({
          size: "lg",
          labelModal: "Tambah condition",
          labelBtnModal: "Tambah condition",
          labelBtnSecondaryModal: "Back",
          handleBtn: create,
        });
      }
    };

    const create = async (param) => {
      setLoading((prevLoading) => !prevLoading);
      let dataBody = {};
      if (param === "assets") {
        dataBody = {
          name: refBody.nameRef.current.value,
          type: refBody.typeRef.current.value,
          location_id: refBody.location_idRef.current.value,
          condition_id: refBody.condition_idRef.current.value,
          description: refBody.descriptionRef.current.value,
          acquisition_date: refBody.acquisition_dateRef.current.value,
          acquisition_cost: refBody.acquisition_costRef.current.value,
          book_value: refBody.book_valueRef.current.value,
          code: refBody.codeRef.current.value,
        };

        try {
          const store = await postApiData(param, dataBody);
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
      } else if (param === "asset-locations") {
        dataBody = {
          name: refBody.nameRef.current.value,
          address: refBody.addressRef.current.value,
        };

        try {
          const store = await postApiData(param, dataBody);
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
      } else if (param === "asset-conditions") {
        dataBody = {
          condition: refBody.conditionRef.current.value,
        };

        try {
          const store = await postApiData(param, dataBody);
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
      } else {
        dataBody = {
          name: refBody.nameRef.current.value,
          type: refBody.typeRef.current.value,
          balance: refBody.balanceRef.current.value,
        };

        try {
          const store = await postApiData("accounts", dataBody);
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
      if (path === "assets") {
        setDataModal({
          size: "2xl",
          labelModal: "Detail & update asset",
          labelBtnModal: "Save",
          labelBtnSecondaryModal: "Delete",
          handleBtn: edit,
        });
        setValidationError({});

        setOpenModal((prevOpenModal) => !prevOpenModal);
        try {
          const { data, status } = await getApiData(path + "/" + id);
          if (status === 200) {
            setDataEdit({
              code: data.code ?? "",
              name: data.name ?? "",
              type: data.type ?? "",
              description: data.description ?? "",
              acquisition_date: data.acquisition_date ?? "",
              acquisition_cost: numberToCurrency(data.acquisition_cost),
              book_value: numberToCurrency(data.book_value),
              location_id: data.location_id ?? "",
              condition_id: data.condition_id ?? "",
              id: data.id ?? "",
            });

            setIdDelete(data.id);
          }
        } catch (error) {
          console.log(error);
        }
      } else if (path === "asset-locations") {
        setDataModal({
          size: "lg",
          labelModal: "Detail & edit location ",
          labelBtnModal: "Save",
          labelBtnSecondaryModal: "Delete",
          handleBtn: edit,
        });
        setValidationError({});

        setOpenModal((prevOpenModal) => !prevOpenModal);
        try {
          const { data, status } = await getApiData(path + "/" + id);
          if (status === 200) {
            setDataEdit({
              name: data.name,
              address: data.address,
              id: data.id,
            });

            setIdDelete(data.id);
          }
        } catch (error) {
          console.log(error);
        }
      } else if (path === "asset-conditions") {
        setDataModal({
          size: "lg",
          labelModal: "Detail & edit condition",
          labelBtnModal: "Save",
          labelBtnSecondaryModal: "Delete",
          handleBtn: edit,
        });
        setValidationError({});

        setOpenModal((prevOpenModal) => !prevOpenModal);
        try {
          const { data, status } = await getApiData(path + "/" + id);
          if (status === 200) {
            setDataEdit({
              condition: data.condition,
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
      if (path === "assets") {
        dataBody = {
          name: refBody.nameRef.current.value,
          type: refBody.typeRef.current.value,
          location_id: refBody.location_idRef.current.value,
          condition_id: refBody.condition_idRef.current.value,
          description: refBody.descriptionRef.current.value,
          acquisition_date: refBody.acquisition_dateRef.current.value,
          acquisition_cost: refBody.acquisition_costRef.current.value,
          book_value: refBody.book_valueRef.current.value,
          code: refBody.codeRef.current.value,
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
      } else if (path === "asset-locations") {
        dataBody = {
          name: refBody.nameRef.current.value,
          address: refBody.addressRef.current.value,
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
      } else if (path === "asset-conditions") {
        dataBody = {
          condition: refBody.conditionRef.current.value,
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
    if (param === "assets") {
      return (
        <>
          <div className="grid gap-4 mb-4 lg:grid-cols-2">
            {inputAssets.map((item, index) => (
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
              label={"Description"}
              htmlFor={"description"}
              id={"description"}
              name={"description"}
              referens={refBody.descriptionRef}
              value={dataEdit.description}
              placeholder={"Write description here"}
            />
          </div>
        </>
      );
    } else if (param === "asset-locations") {
      return (
        <>
          <div className="grid gap-4 mb-4 grid-cols-1">
            {inputLocations.map((item, index) => (
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
    } else if (param === "asset-conditions") {
      return (
        <>
          <div className="grid gap-4 mb-4 grid-cols-1">
            {inputCondition.map((item, index) => (
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
    setLoading,
    setRefresh
  };
};
