import { TabelForDetail } from "../../../../layouts/TabelForDetail"
import { useState } from "react"
import IconAdd from "../../../../layouts/icons/IconAdd"

export const WarehousesLocations = ({
    data,
    setOpenModal,
    openModal,
    setPath,
    setDataModal,
    setDisabledInput
}) => {


    const handleCreate = () => {
        setDataModal({
            size: "2xl",
            labelModal: "Tambah locations",
            labelBtnModal: "Simpan",
            labelBtnSecondaryModal: "Back",
            // handleBtn: edit,
        });
        setPath('warehouse-locations')
        setDisabledInput(prevDisabled => !prevDisabled)
        setOpenModal(prevOpenModal => !prevOpenModal)
    }

    const [dataHeadingForLocations, setDataHeadingForLocations] = useState([
        {
            label: "Tambah lokasi",
            icon: IconAdd(),
            eventToggleModal: handleCreate,
        }
      ])

      const dataLocations = data?.location.map(item => ({
        id: item.id,
        number: item.number,
        kapasitas: item.capacity
      }))

    return (
        <>
            <TabelForDetail
              data={dataLocations}
              dataHeading={dataHeadingForLocations}
            //   handleEdit={handleEdit}
              routes={"warehouses-locations"}
            />
        </>
    )
}