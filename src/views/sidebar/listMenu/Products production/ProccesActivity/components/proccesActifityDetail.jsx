import { useEffect, useState } from "react";
import Button from "../../../../../layouts/Button";
import { TabelForDetail } from "../../../../../layouts/TabelForDetail";

export const ProccesActivityDetail = ({
  data,
  defaultEdit,
  handleEdit,
  dataHeading,
  dataTabelProccesActivity,
  setLoading,
  setRefresh
}) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const formattedData = dataTabelProccesActivity?.map((item) => {
      const details = item.details;
      const detailsArray = [];

      for (const [key, value] of Object.entries(details)) {
        const formattedKey = key.replace(/_/g, " ");
        detailsArray.push(`${formattedKey}: ${value}`);
      }

      const detailsString = detailsArray.join("<br />");

      return {
        "activities name": item.activity_type.replace(/_/g, " ") || "--",
        status: item.status_activities || "--",
        date: item.created_at || "--",
        description:
          <div dangerouslySetInnerHTML={{ __html: detailsString }} /> || "--",
      };
    });

    setTableData(formattedData || []);
  }, [dataTabelProccesActivity]);

  const handleRefresh = () => {
    setRefresh(prevRefresh => !prevRefresh)
    setLoading(false)
  }

  return (
    <>
     <div className="flex gap-5 items-center my-5">
        <h1 className="text-2xl dark:text-white font-semibold">
          Detail proses aktifitas
        </h1>
        <div onClick={() => handleRefresh()} className="flex gap-1 items-center cursor-pointer">
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"/>
            </svg>
            <p>Refresh</p>
          </div>
      </div>
      <section className="p-5 mb-7 bg-white rounded-md shadow-md dark:bg-gray-800 dark:text-white">
        <div className="grid text-base lg:grid-cols-2">
          <div className="col-span-1">
            <table className={`w-full`}>
              <tbody>
                <tr>
                  <td className="py-1">Transaction code</td>
                  <td>
                    {" "}
                    :{" "}
                    <span className="ml-5">
                      {data?.order?.kode_order || "--"}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-1">Detail order</td>
                  <td>
                    {" "}
                    :{" "}
                    <span className="ml-5">{data?.order?.details || "--"}</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-1">Product ordered</td>
                  <td>
                    {" "}
                    :{" "}
                    <span className="ml-5">{data?.product?.name || "--"}</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-1">Product type</td>
                  <td>
                    {" "}
                    :{" "}
                    <span className="ml-5">
                      {data?.product?.animal_type || "--"} |{" "}
                      {data?.product?.type || ""}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-span-1">
            <table className={`w-full`}>
              <tbody>
                <tr className="">
                  <td className="py-1">Last Activity</td>
                  <td>
                    {" "}
                    :{" "}
                    <span className="ml-5 capitalize">
                      {data?.activity_type?.replace(/_/g, " ") || "--"}
                    </span>
                  </td>
                </tr>
                <tr className="">
                  <td className="py-1">Last activity date</td>
                  <td>
                    {" "}
                    :{" "}
                    <span className="ml-5 capitalize">
                      {data?.created_at || "--"}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-1">Description</td>
                  <td>
                    {" "}
                    :{" "}
                    <span className="ml-5">
                      {data?.details?.description || data?.details?.note}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <Button
            bgColour={""}
            label={"Back"}
            paddingX={"4"}
            paddingY={"2.5"}
            event={() => defaultEdit(true)}
            icon={
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 30 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h14M5 12l4-4m-4 4 4 4"
                />
              </svg>
            }
          />
          <Button
            bgColour={"primary"}
            label={"Edit"}
            paddingX={"4"}
            event={() =>
              handleEdit(data.id, "processing-activities/{{processID}}")
            }
            paddingY={"2.5"}
            icon={
              <svg
                className="w-6 h-6 text-white dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 30 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z"
                />
              </svg>
            }
          />
        </div>
      </section>
       <div className="bg-white rounded-md border shadow-md mb-16">
        <div className="grid grid-cols-1">
            <div>
              <TabelForDetail
                data={tableData}
                dataHeading={dataHeading}
                handleEdit={handleEdit}
                routes={""}
                hidden={true}
                hiddenBtnEdit={true}
              />
            </div>
          </div>
       </div>
    </>
  );
};
