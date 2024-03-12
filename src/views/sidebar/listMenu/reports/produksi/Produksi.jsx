import { useState } from "react";
import TabelComponent from "../../../../layouts/Tabel";
import { CRUD } from "./components/CRUD";
import IconAdd from "../../../../layouts/icons/IconAdd";
import { ModalContainer } from "../../../../layouts/ModalContainer";
import FormInput from "../../../../layouts/FormInput";
import { ModalConfirmDelete } from "../../../../layouts/ModalContainer";
import { Spinner } from "../../../../layouts/Spinner";
import IconDownload from "../../../../layouts/icons/IconDownload";
import { getApiData } from "../../../../../function/Api";

export const Produksi = () => {
  const {
    data,
    openModal,
    handleCreate,
    dataModal,
    input,
    validationError,
    handleEdit,
    dataEdit,
    refBody,
    openModalDelete,
    handleDelete,
    closeModalDelete,
    modalDelete,
    loading,
  } = CRUD();
  const downloadReport = async () => {
    try {
      const { data, status } = await getApiData("download/production-report");
      if (status === 200) {
        const pdfUrl = data;

        // Create a hidden link
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.target = "_blank"; // Open in a new tab/window
        link.download = data; // Set the desired file name

        // Append the link to the document
        document.body.appendChild(link);

        // Simulate a click to trigger the download
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [dataHeading, setDataHeading] = useState([
    {
      label: "Print report",
      icon: IconDownload(),
      heading: "Production Report",
      eventToggleModal: downloadReport,
    },
  ]);

  const modalBody = () => {
    return (
      <>
        <form action="" method="get">
          <input
            type="hidden"
            name="id"
            ref={refBody.idRef}
            value={dataEdit.id}
          />
          <div className="grid grid-cols-1 gap-3 mb-4">
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
                onChange={item.onchange}
                placeholder={item.placeholder}
                dataSelect={item.dataSelect}
                uniqueId={index}
                validationError={validationError}
              />
            ))}
          </div>
        </form>
      </>
    );
  };
  return (
    <>
      <ModalContainer
        openModal={openModal}
        onToggleModal={handleCreate}
        modalBody={modalBody}
        sizeModal={"md"}
        labelModal={dataModal.labelModal}
        labelBtnModal={dataModal.labelBtnModal}
        labelBtnSecondaryModal={dataModal.labelBtnSecondaryModal}
        handleBtnModal={dataModal.handleBtn}
        openModalDelete={openModalDelete}
      />

      <ModalConfirmDelete
        modalDelete={modalDelete}
        closeModalDelete={closeModalDelete}
        handleDelete={handleDelete}
      />

      <Spinner loading={loading} />

      <TabelComponent
        data={data}
        dataHeading={dataHeading}
        handleEdit={handleEdit}
      />
    </>
  );
};
