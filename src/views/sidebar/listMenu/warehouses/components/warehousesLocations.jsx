import { TabelForDetail } from "../../../../layouts/TabelForDetail"
import { useState } from "react"
import IconAdd from "../../../../layouts/icons/IconAdd"
import { postApiData } from "../../../../../function/Api"

export const WarehousesLocations = ({
    data,
    setOpenModal,
    openModal,
    setPath,
    setDataModal,
    refBody
}) => {



    const handleCreate = () => {
        setDataModal({
            size: "2xl",
            labelModal: "Tambah locations",
            labelBtnModal: "Simpan",
            labelBtnSecondaryModal: "Back",
            handleBtn: create,
        });
        setPath('warehouse-locations')
        setOpenModal(prevOpenModal => !prevOpenModal)
    }

    const create = async () => {
      const dataBody = {
        warehouse_id: refBody.warehouse_idRef.current.value,
        number: refBody.numberRef.current.value,
        capacity: refBody.capacityRef.current.value,
        length: refBody.lengthRef.current.value,
        width: refBody.widthRef.current.value,
        height: refBody.heightRef.current.value,
      };
      try {
        const {status, data} = await postApiData('warehouse-locations', dataBody)
      } catch (error) {
        
      }
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