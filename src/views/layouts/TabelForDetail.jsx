import { Table } from "flowbite-react"
import { useColor } from '../conifg/GlobalColour';
import { TabelHeadingForDetail } from "./TabelHeadingForDetail";

export const TabelForDetail = ({data, dataHeading, routes, handleEdit}) => {
  const { globalColor, changeColor } = useColor();

    if (!data) {
    // Tampilkan pesan "Loading..." jika data masih undifined
    return (
        <div role="status" className="max-w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
            <div className="flex items-center justify-between">
                <div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
                <div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
                <div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
                <div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
                <div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    )
      }


    return (
        <>
        <div className="overflow-x-auto">
        < TabelHeadingForDetail toggleOpenModal={dataHeading && dataHeading[0].eventToggleModal} icon={dataHeading && dataHeading[0].icon}
            label={dataHeading && dataHeading[0].label}
            handleClickHeading={dataHeading && dataHeading[0].onclick} showNavHeading={dataHeading && dataHeading[0].showNavHeading}
            dataNavHeading={dataHeading && dataHeading[0].dataNavHeading} routes={routes}/>
          <table className={`w-full ${data && data.length === 0 ? `` : `hidden`}`}>
            <tbody>
              <tr className='w-full flex justify-center border-t-[1px] border-b'>
                <td className='flex gap-1 py-8'>
                  <p className='flex items-center text-gray-700 text-sm'>
                    No data found
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <Table>
            <Table.Head className="border-b">
              {data &&
              data[0] &&
              Object.keys(data[0]).map(
              (key) =>
              key !== "id" &&
              data[0][key] !== null && (
              <Table.HeadCell key={key}>{key}</Table.HeadCell>
              )
              )}
              <Table.HeadCell className={`${data && data.length === 0 ? `hidden` : ``}`}>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {data && data.map((item) => (
              <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800 border-b">
                {Object.keys(item)
                .filter((key) => key !== "id")
                .map((key) => (
                <Table.Cell key={key} className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {item[key]}
                </Table.Cell>
                ))}
                <Table.Cell>
                  <button onClick={() => handleEdit(item.id, routes)}>
                    <svg style={{color: globalColor}} className="w-6 h-6 dark:text-white" aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z">

                      </path>
                    </svg>
                  </button>
                </Table.Cell>
              </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        </>
    )
}