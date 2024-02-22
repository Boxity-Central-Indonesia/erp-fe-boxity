import { Table } from "flowbite-react"
import { useColor } from '../../../../../conifg/GlobalColour';
import TabelHeading from "../../../../../layouts/TabelHeading";



export const TabelForCompany = ({data, dataHeading, routes}) => {
  const { globalColor, changeColor } = useColor();

    return (
        <>
        <div className="overflow-x-auto">
        {/* < TabelHeading toggleOpenModal={dataHeading && dataHeading[0].eventToggleModal} icon={dataHeading && dataHeading[0].icon}
            label={dataHeading && dataHeading[0].label}
            handleClickHeading={dataHeading && dataHeading[0].onclick} showNavHeading={dataHeading && dataHeading[0].showNavHeading}
            dataNavHeading={dataHeading && dataHeading[0].dataNavHeading} routes={routes}/> */}
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
                  <span style={{ color: globalColor }} className="font-medium hover:underline dark:text-cyan-500">
                    Edit
                  </span>
                </Table.Cell>
              </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        </>
    )
}