import { Table } from "flowbite-react"
import { useColor } from '../../../../../conifg/GlobalColour';
import { TabelHeadingForCompany } from "./TabelHeadingForCompany";


export const TabelForCompany = ({data, dataHeading, routes, handleEdit}) => {
  const { globalColor, changeColor } = useColor();

    return (
        <>
        <div className="overflow-x-auto">
        < TabelHeadingForCompany toggleOpenModal={dataHeading && dataHeading[0].eventToggleModal} icon={dataHeading && dataHeading[0].icon}
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