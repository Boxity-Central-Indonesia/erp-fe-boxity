import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useColor } from "../../../../config/GlobalColour";
import { Drawer } from "../../../../layouts/Drawer";
import { NewOrder } from "./components/newOrder";

export const QuickAcces = () => {
  const { globalColor, changeColor } = useColor();
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false)
  const [dataDrawer, setDataDrawer] = useState({
    titleDrawer: "Cretae new order",
    bodyDrawer: NewOrder
  })


  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  }


  const [data, setData] = useState([
    {
      label: "Transactions",
      icon: "https://res.cloudinary.com/boxity-id/image/upload/v1711653128/svg/o3dvkjrlrlk43ceiyg9b.svg",

      information:
        "Track order status, manage shipments, and view purchase details.",
      button: [
        {
          button: "New order",
          eventListener: handleOpenDrawer,
        },
        {
          button: "Manage transactions",
          eventListener: "/transactions",
        },
      ],
    },
    {
      label: "Products",
      icon: "https://res.cloudinary.com/boxity-id/image/upload/v1711653127/svg/loczxkm20okxelzl4tfk.svg",

      information:
        "Manage product catalog, add stock, and organize categories.",
      button: [
        {
          button: "View product",
          eventListener: "/transactions",
        },
        {
          button: "Product Catalogue",
          eventListener: "/transactions",
        },
      ],
    },
    {
      label: "Reports",
      icon: "https://res.cloudinary.com/boxity-id/image/upload/v1711653128/svg/pbeivhrxpsjythbsr03v.svg",
      information:
        "Monitor your business performance with easy-to-understand and accessible reports.",
      button: [
        {
          button: "See sales report",
          eventListener: "/reports/sales",
        },
        {
          button: "See purchase report",
          eventListener: "/reports/purchases",
        },
      ],
    },
    {
      label: "Logistics",
      icon: "https://res.cloudinary.com/boxity-id/image/upload/v1711653128/svg/v0q2qsjyvxbxrv87jjj9.svg",
      information: "Manage goods receipt, check stock, and verify invoices.",
      button: [
        {
          button: "Goods Receipt",
          eventListener: "/transactions",
        },
        {
          button: "Delivery Notes",
          eventListener: "/transactions",
        },
      ],
    },
  ]);


  const handleButtonClick = (url) => {
    navigate(url); // Menggunakan useNavigate untuk navigasi
  };

  return (
    <>
      <Drawer 
        openDrawer={openDrawer} 
        setOpenDrawer={setOpenDrawer}
        titleDrawer={dataDrawer.titleDrawer}
        bodyDrawer={dataDrawer.bodyDrawer}
      />
      <h1 className="text-xl mb-3 font-medium capitalize">Quick access</h1>
      <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {data &&
          data.map((item, index) => (
            <div key={index} className="border rounded-md p-5 bg-white flex flex-col items-center">
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
                <NavLink to={item.button[1].eventListener} className="border py-2 px-3 text-sm rounded-md text-gray-700">
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
