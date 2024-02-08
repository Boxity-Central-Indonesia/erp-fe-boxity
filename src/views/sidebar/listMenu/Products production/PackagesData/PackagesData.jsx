import { Table } from "flowbite-react"
import { useEffect, useState } from "react"
import { getApiData } from "../../../../../function/Api";
import { useColor } from "../../../../conifg/GlobalColour";


export const PackagesData = () => {
    const [activeButton, setActiveButton] = useState(0); // Menggunakan angka untuk melacak button yang aktif
    const [data, setData] = useState([])

  const { globalColor, changeColor } = useColor();


  useEffect(() => {
    const getData = async () => {
        try {
            // Panggil fungsi getApiData secara langsung di sini dan tunggu hasilnya
            const { status, data } = await getApiData('packages');
            if (status === 200) {
                // Buat data baru berdasarkan data yang diterima dari panggilan API
                const newData =  dataPackages(data)
                setData(() => newData)
            }
        } catch (error) {
            console.log(error);
        }
    }

    getData()
  }, [])


    const handleClick = async (param, callback) => {
        setActiveButton(param);
        try {
            // Panggil fungsi getApiData secara langsung di sini dan tunggu hasilnya
            const { status, data } = await getApiData(param);
            if (status === 200) {
                const newData = callback(data)
                setData(() => newData)
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    // Fungsi untuk membuat data baru
    const dataPackaging = (data) => {
        return data.map(item => ({
            id: item.id,
            weight: item.weight,
            package: item.package_type
        }));
    };

    const dataPackages = (data) => {
        return data.map(item => ({
            id: item.id,
            'package name': item.package_name,
            'package weight': item.package_weight
        }));
    };

    const dataPackagesProduct = (data) => {
        return data.map(item => ({
            id: item.id,
            'package name': item.package_name,
            'package weight': item.package_weight
        }));
    };

    const TabelHeading = () => {
        return (
            <>
            <section className="p-4">
                <div className="flex relative mb-8 mt-3">
                    <button className={`btn_akses px-8 pb-3 ${activeButton === 'packages' ? 'border-b-4 border-[#9345a3] z-10'
                        : 'border-b-2' }`} onClick={()=> handleClick('packages', dataPackages)}
                        >
                        Packages
                    </button>
                    <button className={`btn_akses px-8 pb-3 ${activeButton === 'packaging' ? 'border-b-4 border-[#9345a3] z-10'
                        : 'border-b-2' }`} onClick={()=> handleClick('packaging', dataPackaging)}
                        >
                        Packaging
                    </button>
                    <button className={`btn_akses px-8 pb-3 ${activeButton === 'packages-product' ? 'border-b-4 border-[#9345a3] z-10'
                        : 'border-b-2' }`} onClick={()=> handleClick('packages-product')}
                        >
                        Package product
                    </button>
                    <hr className="w-full absolute bottom-0 z-0 border-2" />
                </div>
                <div
                    className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4">
                    <div className="w-full md:w-1/2">
                        <form className="flex items-center">
                            <label htmlFor="simple-search" className="sr-only">Search</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300
                                    text-gray-900 text-sm
                                    rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2
                                    dark:bg-gray-700
                                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                    dark:focus:ring-primary-500
                                    dark:focus:border-primary-500" placeholder="Search" required="" />
                            </div>
                        </form>
                    </div>
                    <div
                        className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                        {/* < Button event={()=> toggleOpenModal()} label={label} icon={icon} type={'button'}
                            bgColour={'primary'}
                            paddingY={'2.5'}/>
                            <DropdownComponent /> */}
                            <div className="flex items-center space-x-3 w-full md:w-auto">
                                {/* Elemen-elemen lain seperti tombol Actions, Delete All, dan Filter */}
                            </div>
                    </div>
                </div>
            </section>
            </>
        )
    }

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900 mb-16">
                <h3 className="text-2xl font-semibold mb-3 dark:text-white">Test</h3>
                <div className="mx-auto">
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        {TabelHeading()}
                        <div className="overflow-x-auto">
                            <Table hoverable className='overflow-x-auto min-w-full w-max'>
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
                                        <Table.Cell key={key}
                                            className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {item[key]}
                                        </Table.Cell>
                                        ))}
                                        <Table.Cell className='text-right'>
                                            <button style={{color: globalColor}}
                                                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                                onClick={()=> handleEditClick(item.id, item.company_id)}
                                                >
                                                Edit
                                            </button>
                                        </Table.Cell>
                                    </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </div>
                        <nav className="flex flex-col md:flex-row border-t-2 justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
                            aria-label="Table navigation">
                            {/*
                            <Paginate /> */}
                        </nav>
                    </div>
                </div>
            </section>
        </>
    )
}