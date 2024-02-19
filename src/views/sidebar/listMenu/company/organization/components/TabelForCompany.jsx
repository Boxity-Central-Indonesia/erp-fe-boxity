import { Table } from "flowbite-react"


export const TabelForCompany = ({data}) => {
    return (
        <>
        <div className="overflow-x-auto">
        <table className={`w-full ${data.length === 0 ? `` : `hidden`}`}>
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
                </Table.Head>
                <Table.Body className="divide-y">
                {data && data.map((item) => (
                  <Table.Row
                    key={item.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800 border-b"
                  >
                    {Object.keys(item)
                      .filter((key) => key !== "id")
                      .map((key) => (
                        <Table.Cell
                          key={key}
                          className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                        >
                          {item[key]}
                        </Table.Cell>
                      ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
        </div>
        </>
    )
}