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
import { ReadProccesActivity } from "./ReadProccesActivity";

export const CRUD = () => {
  const [refresh, setRefresh] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalDelete, setModalDelete] = useState();
  const [idDelete, setIdDelete] = useState();
  const [dataModal, setDataModal] = useState({});
  const [responseError, setResponseError] = useState();
  const [validationError, setValidationError] = useState();
  const [loading, setLoading] = useState(true);
  const [skeleton, setSkeleton] = useState(false);
  const [dataHeading, setDataHeading] = useState([{}]);
  const [dataOrder, setDataOrder] = useState();
  const [dataProduct, setDataProduct] = useState();
  const [path, setPath] = useState("processing-activities");
  const [input, setInput] = useState([]);
  const [defaultEdit, setDefaultEdit] = useState(true);
  const [detailProccesActivity, setDetailProccesActivity] = useState()
  const [inputEdit, setInputEdit] = useState([])


  const [refBody, setRefBody] = useState({
    order_idRef: useRef(),
    product_idRef: useRef(),
    estimated_completionRef: useRef(),
    activity_typeRef: useRef(),
    unloading_timeRef: useRef(),
    number_of_rackRef: useRef(),
    number_of_animalsRef: useRef(),
    noteRef: useRef(),
    idRef: useRef(),
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
    const fetchData = async () => {
      try {
        const { data, status } = await getApiData("orders");
        if (status === 200) {
          const newData = data.map((item) => ({
            id: item.id,
            name: item.kode_order,
          }));
          setDataOrder(newData);
        }
      } catch (error) {
        console.log(error);
      }
      try {
        const { data, status } = await getApiData("products");
        if (status === 200) {
          const newData = data.map((item) => ({
            id: item.id,
            name: item.name,
          }));
          setDataProduct(newData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

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
      // {
      //   element: "input",
      //   type: "text",
      //   name: "estimated_completion",
      //   ref: refBody.estimated_completionRef,
      //   value: dataEdit.estimated_completion,
      //   label: "Estimated_completion",
      //   htmlFor: "estimated_completion",
      //   id: "estimated_completion",
      //   onchange: handleChange,
      //   placeholder: "Estimated_completion",
      // },
    ]);

    setInputEdit([
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
        name: "product_id",
        ref: refBody.product_idRef,
        value: dataEdit.product_id,
        label: "Order",
        htmlFor: "product_id",
        id: "product_id",
        dataSelect: dataProduct,
        onchange: handleChange,
      },
      {
        element: "input",
        type: "text",
        name: "activity_type",
        ref: refBody.activity_typeRef,
        value: dataEdit.activity_type,
        label: "Activity type",
        htmlFor: "activity_type",
        id: "activity_type",
        onchange: handleChange,
        placeholder: "Activity type",
      },
      {
        element: "input",
        type: "time",
        name: "unloading_time",
        ref: refBody.unloading_timeRef,
        value: dataEdit.unloading_time,
        label: "Unloading time",
        htmlFor: "unloading_time",
        id: "unloading_time",
        onchange: handleChange,
        placeholder: "Unloading time",
      },
      {
        element: "input",
        type: "number",
        name: "number_of_rack",
        ref: refBody.number_of_rackRef,
        value: dataEdit.number_of_rack,
        label: "Number of rack",
        htmlFor: "number_of_rack",
        id: "number_of_rack",
        onchange: handleChange,
        placeholder: "Number of rack",
      },
      {
        element: "input",
        type: "number",
        name: "number_of_animals",
        ref: refBody.number_of_animalsRef,
        value: dataEdit.number_of_animals,
        label: "Number of animals",
        htmlFor: "number_of_animals",
        id: "number_of_animals",
        onchange: handleChange,
        placeholder: "Number of animals",
      },
    ])
  }, [dataEdit]);

  // const READ = () => {
  //   const [data, setData] = useState();
    
  //   useEffect(() => {
  //     const getData = async () => {
  //       try {
  //         const { data } = await getApiData(path);
  //         if (path === "processing-activities") {
  //           const newData = Object.values(data).flatMap(innerObj =>
  //             Object.values(innerObj).map(item => ({
  //               'activity type': item[item.length - 1].activity_type,
  //               'status activity': item[item.length - 1].status_activities,
  //               'description': item[item.length - 1].details?.description || '--', // Tambahkan penanganan untuk jika details tidak tersedia
  //               id: item[item.length - 1].id,
  //             }))
  //           );
  //           setData(newData);
  //           setDataHeading([
  //             {
  //               label: "Add new procces activity",
  //               icon: IconAdd(),
  //               heading: "Procces activity list",
  //               information:
  //                 "This is additional information about the content of this section. You can provide any relevant details or instructions here.",
  //               eventToggleModal: handleCreate,
  //               onclick: handleClickHeading,
  //               showNavHeading: false,
  //             },
  //           ]);
  //         }
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };
  //     getData();
  //   }, [refresh]);
  
  //   return { data };
  // };
  
  
  

  const CREATE = () => {
    const handleCreate = (param) => {
      setDataEdit({
        order_id: "",
        ptoduct_id: "",
      });
      setValidationError({
        order_id: "",
        ptoduct_id: "",
      });
      setOpenModal((prevOpenModal) => !prevOpenModal);
      setDataModal({
        size: "2xl",
        labelModal: "Add New Procces activity",
        labelBtnModal: "Add new Procces activity",
        labelBtnSecondaryModal: "Back",
        handleBtn: create,
      });
    };

    const create = async (param) => {
      setLoading((prevLoading) => !prevLoading);
      const dataBody = {
        order_id: refBody.order_idRef.current.value,
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
    const handleEdit = async (param, routes) => {
      console.log(param);
      if(routes === 'processing-activities/{{processID}}'){
         setDataEdit({
          order_id: "",
          product_id: "",
        });
        setValidationError({
          order_id: "",
          ptoduct_id: "",
        });
        setOpenModal((prevOpenModal) => !prevOpenModal);
        setDataModal({
          size: "2xl",
          labelModal: "Detail & edit Procces activity",
          labelBtnModal: "Save",
          labelBtnSecondaryModal: "Delete",
          handleBtn: edit,
        });
        try {
          const { data, status } = await getApiData(
            path + "/" + param
          );
          if (status === 200) {
            setDataEdit({
              order_id: data.order_id,
              product_id: data.product_id,
              activity_type: data.activity_type,
              description: data.details.description,
              id: data.id,
            });
            setIdDelete(data.id);
          }
        } catch (error) {
          console.log(error);
        }
      }else {
        setDefaultEdit(false);
        try {
          const { data, status } = await getApiData(
            path + "/" + param.textContent
          );
          if (status === 200) {
          setDetailProccesActivity(data)
           setIdDelete(data.id);
          }
        } catch (error) {
          console.log(error);
        }
      }
     
    };

    const edit = async () => {
      setLoading((prevLoading) => !prevLoading);
      const dataBody = {
        order_id: refBody.order_idRef.current.value,
        product_id: refBody.product_idRef.current.value,
        activity_type: refBody.activity_typeRef.current.value,
        details: {
          unloading_time: refBody.unloading_timeRef.current.value,
          number_of_rack: refBody.number_of_rackRef.current.value,
          number_of_animals: refBody.number_of_animalsRef.current.value,
          note: refBody.noteRef.current.value,
        },
      };

      console.log(dataBody);

      try {
        const store = await putApiData(
          path + "/" + refBody.idRef.current.value,
          dataBody
        );
        if (store.status === 201) {
          setRefresh((prevRefresh) => !prevRefresh);
          // setPath(() => param);
          setLoading((prevLoading) => !prevLoading);
          setOpenModal((prevOpenModal) => !prevOpenModal);
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
      if(defaultEdit){
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
              
  {/* 
              <TextArea
                span={`col-span-2`}
                label={"Note"}
                htmlFor={"note"}
                id={"note"}
                name={"note"}
                value={dataEdit.note}
                referens={refBody.noteRef}
                placeholder={"Write note here"}
                onChange={handleChange}
              /> */}
            </div>
          </>
        );
      }else {
        return (
          <>
            <div className="grid gap-4 mb-4 grid-cols-1 lg:grid-cols-2">
              {inputEdit.map((item, index) => (
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
                label={"Notes"}
                htmlFor={"note"}
                id={"note"}
                name={"note"}
                value={dataEdit.note}
                referens={refBody.noteRef}
                placeholder={"Write note here"}
                onChange={handleChange}
              />
            </div>
          </>
        );
      }
    }
  };

  const { data, handleClickHeading } = ReadProccesActivity({
    refresh,
    path,
    setDataHeading
  });
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
    detailProccesActivity
  };
};
