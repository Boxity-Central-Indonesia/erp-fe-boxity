import { data } from "autoprefixer"
import TabelComponent from "../../../../layouts/Tabel"
import { CRUD } from "../locations/components/CRUD"
import { useState } from "react"
import IconAdd from "../../../../layouts/icons/IconAdd"
import FormInput from "../../../../layouts/FormInput"
import { TextArea } from "../../../../layouts/FormInput"
import { ModalContainer } from "../../../../layouts/ModalContainer"


export const WarehousesLocation = () => {
    const {
        data,
        openModal,
        handleCreate,
        input,
        create,
        dataModal,
    } = CRUD()
    const [dataHeading, setDataHeading] = useState( [{
        label: 'Add locations',
        icon: IconAdd(),
        heading: 'Warehouses locations',
        eventToggleModal: handleCreate,
    }]);



    const modalBody = () => {
        return(
            <>
            <form action="">
                <div className="grid grid-cols-1 gap-4 mb-3">
                {input.map((item, index) => (
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
                            onChange={item.onchange}
                            placeholder={item.placeholder} 
                            dataSelect={item.dataSelect}
                            uniqueId={index}
                            // validationError={validationError}
                            />
                        ))}
                </div>
            </form>
            </>
        )
    }

    return (
        <>

        <ModalContainer 
        openModal={openModal}
        onToggleModal={handleCreate}
        modalBody={modalBody}
        sizeModal={'lg'}
        labelModal={dataModal.labelModal}
        labelBtnModal={dataModal.labelBtnModal}
        labelBtnSecondaryModal={dataModal.labelBtnSecondaryModal}
        handelBtnModal={dataModal.handelBtn}
        // openModalDelete={openModalDelete}
        />

        < TabelComponent data={data} dataHeading={dataHeading}/>
        </>
    )
}