import FormInput from "../../../../layouts/FormInput"
import { ModalConfirmDelete, ModalContainer } from "../../../../layouts/ModalContainer"
import TabelComponent from "../../../../layouts/Tabel"
import IconAdd from "../../../../layouts/icons/IconAdd"
import { useEffect, useState, useRef } from "react"
import { TextArea } from "../../../../layouts/FormInput"
import {CRUD} from "./components/CRUD"

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


    // const {data} = READ()

    const [dataHeading, setDataHeading] = useState( [{
        label: 'Add Employes',
        icon: IconAdd(),
        heading: 'Employes list',
        eventToggleModal: handelCreate,
    }]);

   


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

        < TabelComponent data={data} dataHeading={dataHeading} handelEdit={handelEdit}/>
       </>
    )
}


export default EmployesList