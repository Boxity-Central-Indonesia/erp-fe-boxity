import FormInput from "../../../../layouts/FormInput"
import { ModalConfirmDelete, ModalContainer } from "../../../../layouts/ModalContainer"
import TabelComponent from "../../../../layouts/Tabel"
import IconAdd from "../../../../layouts/icons/IconAdd"
import { useEffect, useState, useRef } from "react"
import { TextArea } from "../../../../layouts/FormInput"
import {CRUD} from "./components/CRUD"
import TabelComponentTest from "../../../../layouts/TabelTest"
// import {
//     createColumnHelper,
//     flexRender,
//     getCoreRowModel,
//     useReactTable,
//     getSortedRowModel,
//     // SortingFns,
//     getPaginationRowModel,
//   } from '@tanstack/react-table';

//   const columnHelper = createColumnHelper();

//   const columns = [
//     columnHelper.accessor('name', {
//       cell: (info) => info.getValue(),
//     }),
//     columnHelper.accessor('email', {
//       cell: (info) => info.getValue(),
//     }),
//     columnHelper.accessor('phone', {
//       cell: (info) => info.renderValue(),
//     }),
//     columnHelper.accessor('company', {
//         cell: (info) => info.renderValue(),
//     }),
//     columnHelper.accessor('job title', {
//         cell: (info) => info.renderValue(),
//     }),,
//   ];

const EmployesList= () => {
    const {
        data,
        handelCreate, 
        openModal, 
        dataModal, 
        input, 
        refBody,
        handelEdit,
        dataEdit,
        openModalDelete,
        closeModalDelete,
        handelDelete,
        modalDelete,
        validationError,
    } = CRUD()
    // const [sorting, setSorting] = useState([]);
    

    // const table = useReactTable({
        // data,
        // columns,
        // state: {
        //   sorting,
        // },
        // initialState: {
        //   pagination: {
        //     pageSize: 2,
        //   },
        // },
        // getCoreRowModel: getCoreRowModel(),
        // onSortingChange: setSorting,
        // getSortedRowModel: getSortedRowModel(),
        // getPaginationRowModel: getPaginationRowModel(),
    //   });

    // const {data} = READ()

   


    const dataModalBody = () => {
        return (
            <>
                <form className="">
                    <input type="hidden" name="id" ref={refBody.idRef} value={dataEdit.id}/>
                    <div className="grid gap-4 mb-4 grid-cols-1 lg:grid-cols-3">
                        {input.map( (item, index) => (
                            < FormInput
                            key={item.id}
                            element={item.element}
                            htmlFor={item.htmlFor}
                            label={item.label}
                            type={item.type}
                            name={item.name}
                            referens={item.ref}
                            value={item.value}
                            id={item.id}
                            onChange={(event) => item.onchange(event)}
                            placeholder={item.placeholder} 
                            dataSelect={item.dataSelect}
                            uniqueId={index}
                            validationError={validationError}
                            />
                        ) )}
                        < TextArea 
                        span={`col-span-3`}
                        label={'Notes'}
                        htmlFor={'notes'}
                        id={'notes'}
                        name={'notes'}
                        referens={refBody.notesRef}
                        placeholder={'Write notes here'}
                        />
                </div>
            </form>
            </>
        )
    }

    return(
       <>
        <ModalContainer 
        openModal={openModal}
        onToggleModal={handelCreate}
        modalBody={dataModalBody}
        sizeModal={'6xl'}
        labelModal={dataModal.labelModal}
        labelBtnModal={dataModal.labelBtnModal}
        labelBtnSecondaryModal={dataModal.labelBtnSecondaryModal}
        handelBtnModal={dataModal.handelBtn}
        openModalDelete={openModalDelete}
        />

        < ModalConfirmDelete 
        modalDelete={modalDelete}
        closeModalDelete={closeModalDelete}
        handelDelete={handelDelete}
        />

        < TabelComponentTest 
        data={data}
        dataHeading={dataHeading}
        />
       </>
    )
}


export default EmployesList