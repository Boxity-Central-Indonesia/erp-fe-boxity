import { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useColor } from "../../../../config/GlobalColour";
import { Drawer } from "../../../../layouts/Drawer";
import { NewOrder } from "./components/newOrder";

export const QuickAcces = () => {
  const { globalColor, changeColor } = useColor();
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [dataDrawer, setDataDrawer] = useState({
    titleDrawer: "Create new order",
    bodyDrawer: NewOrder,
  });

  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const [data, setData] = useState([
    {
      label: "Transaksi",
      icon: "https://res.cloudinary.com/boxity-id/image/upload/v1711653128/svg/o3dvkjrlrlk43ceiyg9b.svg",
      information:
        "Lacak status pesanan, kelola pengiriman, dan lihat detail pembelian.",
      button: [
        {
          button: "Pesanan baru",
          eventListener: handleOpenDrawer,
        },
        {
          button: "Kelola transaksi",
          eventListener: "/transactions",
        },
      ],
    },
    {
      label: "Produk",
      icon: "https://res.cloudinary.com/boxity-id/image/upload/v1711653127/svg/loczxkm20okxelzl4tfk.svg",
      information: "Kelola katalog produk, tambah stok, dan atur kategori.",
      button: [
        {
          button: "Lihat produk",
          eventListener: "/transactions",
        },
        {
          button: "Katalog produk",
          eventListener: "/transactions",
        },
      ],
    },
    {
      label: "Laporan",
      icon: "https://res.cloudinary.com/boxity-id/image/upload/v1711653128/svg/pbeivhrxpsjythbsr03v.svg",
      information:
        "Pantau kinerja bisnis Anda dengan laporan yang mudah dipahami dan mudah diakses.",
      button: [
        {
          button: "Lihat laporan penjualan",
          eventListener: "/reports/sales",
        },
        {
          button: "Lihat laporan pembelian",
          eventListener: "/reports/purchases",
        },
      ],
    },
    {
      label: "Logistik",
      icon: "https://res.cloudinary.com/boxity-id/image/upload/v1711653128/svg/v0q2qsjyvxbxrv87jjj9.svg",
      information: "Kelola penerimaan barang, cek stok, dan verifikasi faktur.",
      button: [
        {
          button: "Penerimaan barang",
          eventListener: "/transactions",
        },
        {
          button: "Catatan pengiriman",
          eventListener: "/transactions",
        },
      ],
    },
  ]);

  return (
    <>
      <Drawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        titleDrawer={dataDrawer.titleDrawer}
        bodyDrawer={dataDrawer.bodyDrawer({ setOpenDrawer })}
      />
      <h1 className="text-xl mb-3 font-medium capitalize">Quick access</h1>
      <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {data &&
          data.map((item, index) => (
            <div
              key={index}
              className="border rounded-md p-5 bg-white flex flex-col items-center"
            >
              <img
                src={item.icon}
                alt={item.label}
                className="w-40 h-20 dark:text-white"
              />
              <h2 className="my-3 text-xl font-medium">{item.label}</h2>
              <p className="text-center text-gray-500 text-sm mb-3">
                {item.information}
              </p>
              <div className="flex gap-1">
                <NavLink
                  to={item.button[1].eventListener}
                  className="border py-2 px-3 text-sm text-center rounded-md text-gray-700"
                >
                  {item.button[1].button}
                </NavLink>
                <button
                  style={{ backgroundColor: globalColor }}
                  className="border text-white py-2 px-3 text-sm rounded-md text-gray-700"
                  onClick={item.button[0].eventListener}
                >
                  {item.button[0].button}
                </button>
              </div>
            </div>
          ))}
      </section>
    </>
  );
};
