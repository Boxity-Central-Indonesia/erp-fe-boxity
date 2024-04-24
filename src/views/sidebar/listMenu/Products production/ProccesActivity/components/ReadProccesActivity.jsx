import { Read } from "../../../../../CRUD/Read";
import IconAdd from "../../../../../layouts/icons/IconAdd";
import { useState, useEffect } from "react";

export const ReadProccesActivity = ({
  refresh,
  setDataHeading,
  setOpenModal,
  openModal,
  data,
  setData,
  setParameter,
}) => {
  const dataTabel = (data) => {
    return Object.values(data).flatMap((innerObj) =>
      Object.values(innerObj).map((item) => ({
        "transaction code": item[item.length - 1].order?.kode_order,
        "nama produk": item[item.length - 1].product.name,
        "status activity": item[item.length - 1].status_activities,
        "last activity": item[item.length - 1].activity_type.replace(/_/g, " "),
        "activity date": item[item.length - 1].activity_date,
        // 'description': item[item.length - 1].details?.description || '--', // Tambahkan penanganan untuk jika details tidak tersedia
        id: item[item.length - 1].id,
      }))
    );
  };

  const handleOpenModal = (param) => {
    setOpenModal(!openModal);
    if (param == undefined) {
      setParameter("processing-activities");
    } else {
      setParameter(param);
    }
  };

  useEffect(() => {
    setDataHeading([
      {
        label: "Tambah process activity",
        icon: IconAdd(),
        heading: "Process Activity List",
        information:
          "This is additional information about the content of this section. You can provide any relevant details or instructions here.",
        eventToggleModal: handleOpenModal,
        // onclick: handleClickHeading,
      },
    ]);
  }, []);

  useEffect(() => {
    Read({
      dataTabel,
      endPoint: "processing-activities",
      refresh,
      data,
      setData,
    });
  }, [refresh]);
};
