import { TabelForDetail } from "../../../../layouts/TabelForDetail"
import { useState } from "react"
import IconAdd from "../../../../layouts/icons/IconAdd"
import { FormatCurrency } from "../../../../config/FormatCurrency"

export const Produk = ({
    data,
    handleCreate,
    handleEdit,
    setPath
}) => {

    const handleCreateProduk = () => {
      handleCreate('products')
    }

    const handleEditForProducts = (param) => {
      setPath('products')
      handleEdit(param)
    }

    const [dataHeadingForLocations, setDataHeadingForLocations] = useState([
        {
            label: "Tambah product",
            icon: IconAdd(),
            eventToggleModal: handleCreateProduk,
        }
      ])

      const dataProduct = data && data?.products?.map(item => ({
        id: item.id,
        kode: item.code,
        image: (
          <img
            src={item.image_product}
            alt={item.name}
            className="h-8 w-8 rounded object-cover"
          />
        ),
        name: item.name,
        "lokasi gudang": item.warehouse?.name || "--",
        category: item.category?.name || "--",
        berat: (item.weight ?? 0.0) + " " + item.unit_of_measure,
        jumlah: item.stock + " pcs",
        "harga satuan": item.price,
        "HPP Balance": item.price * item.stock,
      }))

    return (
        <>
            <TabelForDetail
              data={dataProduct}
              dataHeading={dataHeadingForLocations}
              handleEdit={handleEditForProducts}
              routes={"warehouses-locations"}
            />
        </>
    )
}