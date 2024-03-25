import { useEffect } from "react";
import Button from "../../../../../layouts/Button";
import { TabelForDetail } from "../../../../../layouts/TabelForDetail";

export const ProccesActivityDetail = ({
  data,
  defaultEdit,
  handleEdit,
  dataHeading,
  dataTabelProccesActivity
}) => {

    const dataTabelForDetail = dataTabelProccesActivity && dataTabelProccesActivity.map(item => ({
      'activity type': item.activity_type.replace(/_/g, ' ') || '--',
      'status activities': item.status_activities || '--'
  }));
  

  return (
    <>
      <h1 className="text-2xl my-5 dark:text-white font-semibold">
        Procces activity detail
      </h1>
      <section className="bg-white dark:bg-gray-800 dark:text-white rounded-md shadow-md p-5 mb-16">
        <div className="grid lg:grid-cols-2 text-base">
          <div className="col-span-1">
            <table className={`w-full`}>
              <tbody>
                <tr className="">
                  <td className="py-3">Actifity type</td>
                  <td>
                    {" "}
                    : <span className="ml-5 capitalize">{data?.activity_type.replace(/_/g, ' ') || "--"}</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3">Order type</td>
                  <td>
                    {" "}
                    : <span className="ml-5">{data?.order?.order_type || "--"}</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3">Description</td>
                  <td>
                    {" "}
                    : <span className="ml-5">{data?.details?.description || "--"}</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3">Unloading time</td>
                  <td>
                    {" "}
                    : <span className="ml-5">{data?.details?.unloading_time || "--"}</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3">Number of rack</td>
                  <td>
                    {" "}
                    : <span className="ml-5">{data?.details?.number_of_rack || "--"}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-span-1">
            <table className={`w-full`}>
              <tbody>
                <tr className="">
                  <td className="py-3">Number of animals</td>
                  <td>
                    {" "}
                    : <span className="ml-5">{data?.details?.number_of_animals || "--"}</span>
                  </td>
                </tr>
                <tr className="">
                  <td className="py-3">Note</td>
                  <td>
                    {" "}
                    : <span className="ml-5">{data?.details?.note || "--"}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <Button bgColour={""} label={"Back"} paddingX={"4"} paddingY={"2.5"} event={()=> defaultEdit(true)}
            icon={
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M5 12h14M5 12l4-4m-4 4 4 4" />
            </svg>
            }
            />
            <Button bgColour={"primary"} label={"Edit"} paddingX={"4"} event={()=> handleEdit(data.id,
              "processing-activities/{{processID}}")}
              paddingY={"2.5"}
              icon={
              <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z" />
              </svg>
              }
              />
        </div>
        <hr className="my-7" />
        <div className="grid grid-cols-1">
          <div>
            {/* <h2 className="text-xl font-medium dark:text-white mb-4">
              Company branch
            </h2> */}
            <TabelForDetail data={dataTabelForDetail} dataHeading={dataHeading} handleEdit={handleEdit} routes={""}
              hidden={true} hiddenBtnEdit={true} />
          </div>
        </div>
        <hr className="my-7" />
      </section>
    </>
  );
};
