// Tabel.jsx
import React from 'react';
import { Table } from 'flowbite-react';
import Paginate from './Paginate';
import TabelHeading from './TabelHeading';
import { useColor } from '../conifg/GlobalColour';

const TabelComponent = ({ data, dataHeading, handelEdit })  => {

  const { globalColor, changeColor } = useColor();

  const handleEditClick = (param, param2) => {
    handelEdit(param, param2)
  }

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
    <section className="bg-gray-50 dark:bg-gray-900">
      <h3 className="text-2xl font-semibold mb-3 dark:text-white">{dataHeading[0].heading}</h3>
      <div className="mx-auto">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          < TabelHeading toggleOpenModal={dataHeading[0].eventToggleModal} icon={dataHeading[0].icon}
            label={dataHeading[0].label} />
          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                {data && data[0] && Object.keys(data[0]).map((key) => (
                key !== 'id' && data[0][key] !== null && (
                <Table.HeadCell key={key}>{key}</Table.HeadCell>
                )
                ))}
                <Table.HeadCell>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {data.map((item) => (
                  <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    {Object.keys(item)
                      .filter((key) => key !== 'id')
                      .map((key) => (
                        <Table.Cell key={key} className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {item[key]}
                        </Table.Cell>
                      ))}
                    <Table.Cell  className='text-right'>
                      <button
                        style={{color: globalColor}}
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                        onClick={() => handleEditClick(item.id, item.company_id)}
                      >
                        Edit
                      </button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
          <nav
            className="flex flex-col md:flex-row border-t-2 justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation">
            <Paginate />
          </nav>
        </div>
      </div>
    </section>
  );
}

export default TabelComponent;
