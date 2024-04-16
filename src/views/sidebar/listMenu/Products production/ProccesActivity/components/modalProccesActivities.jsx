import { inputBody } from "./inputBody";
import { useState, useRef, useEffect } from "react";
import { createProccesActivities } from "./createProccesActivities";

export const modalProccesActivities = ({
  defaultEdit,
  dataOrder,
  dataProduct,
  dataProcces,
  dataFindProcces,
  setDataFindProcces,
  setDataDetailsActivity,
  dataDetailsActivity,
}) => {
  const [parameter, setParameter] = useState("processing-activities");
  const [openModal, setOpenModal] = useState(false);
  const [responseError, setResponseError] = useState();
  const [validationError, setValidationError] = useState();
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [dataEdit, setDataEdit] = useState({});

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
    setValidationError({});
    if (defaultEdit === true) {
      setDataEdit({});
    }
  }, [openModal]);

  const [dataModal, setDataModal] = useState({
    size: "2xl",
    labelModal: "Tambah procces activities",
    labelBtnModal: "Tambah procces activities",
    labelBtnSecondaryModal: "Back",
    handleBtn: () =>
      createProccesActivities({
        endPoint: "processing-activities",
        refBody,
        responseError,
        setResponseError,
        setLoading,
        loading,
        refresh,
        setRefresh,
        setOpenModal,
      }),
  });

  const dataModalBody = () => {
    return (
      <>
        <form className="">
          <input
            type="hidden"
            name="id"
            ref={refBody.idRef}
            value={dataEdit.id}
          />
          {inputBody({
            parameter,
            refBody,
            validationError,
            dataEdit,
            setDataEdit,
            dataOrder,
            dataProduct,
            defaultEdit,
            setDataDetailsActivity,
            dataDetailsActivity,
            dataProcces,
            dataFindProcces,
            setDataFindProcces,
          })}
        </form>
      </>
    );
  };

  return {
    dataModal,
    setDataModal,
    openModal,
    setOpenModal,
    dataModalBody,
    loading,
    refresh,
    setRefresh,
    setDataEdit,
    refBody,
    setResponseError,
    setLoading,
    setParameter,
    setDataModal,
    dataDetailsActivity,
    setDataDetailsActivity,
  };
};
