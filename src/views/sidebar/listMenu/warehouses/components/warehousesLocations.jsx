import { TabelForDetail } from "../../../../layouts/TabelForDetail"
import { useState } from "react"
import IconAdd from "../../../../layouts/icons/IconAdd"

export const WarehousesLocations = ({
    data,
    handleCreate,
    handleEdit
}) => {

    const handleCreateLocations = () => {
      handleCreate('warehouse-locations')
    }

    const [dataHeadingForLocations, setDataHeadingForLocations] = useState([
        {
            label: "Tambah lokasi",
            icon: IconAdd(),
            eventToggleModal: handleCreateLocations,
        }
      ])

      const dataLocations = data && data?.location?.map(item => ({
        id: item.id,
        number: item.number,
        kapasitas: item.capacity
      }))

    return (
        <>
            <TabelForDetail
              data={dataLocations}
              dataHeading={dataHeadingForLocations}
              handleEdit={handleEdit}
              routes={"warehouses-locations"}
            />
        </>
    )
}