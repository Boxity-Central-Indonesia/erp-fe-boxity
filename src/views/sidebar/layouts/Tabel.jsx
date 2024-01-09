// Tabel.jsx
import React from 'react';
import { Table } from 'flowbite-react';
import Paginate from './Paginate';
import TabelHeading from './TabelHeading';

const TabelComponent = ({ data, toggleOpenModal, dataHeading })  => {

  console.log(dataHeading);
  

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <h3 className="text-2xl font-semibold mb-3 dark:text-white">{dataHeading[0].heading}</h3>
      <div className="mx-auto">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          < TabelHeading 
          toggleOpenModal={dataHeading[0].eventToggleModal}
          icon={dataHeading[0].icon}
            label={dataHeading[0].label}
          />
          <div className="overflow-x-auto">
          <Table hoverable>
          <Table.Head>
            {Object.keys(data[0]).map((key) => (
              key !== 'id' && <Table.HeadCell key={key}>{key}</Table.HeadCell>
            ))}
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data.map((item) => (
              <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                {Object.keys(item)
                  .filter((key) => key !== 'id') // Filter properti 'id'
                  .map((key) => (
                    <Table.Cell key={key} className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {item[key]}
                    </Table.Cell>
                  ))}
                <Table.Cell className='text-right'>
                  <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          </Table>
          </div>
          <nav className="flex flex-col md:flex-row border-t-2 justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
            <Paginate />
          </nav>
        </div>
      </div>
    </section>
  );
}

export default TabelComponent;
