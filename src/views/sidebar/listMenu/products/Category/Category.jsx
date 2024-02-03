import { data } from "autoprefixer"
import TabelComponent from "../../../../layouts/Tabel"
import { CRUD } from "./components/CRUD"
import { useState } from "react"
import { ModalConfirmDelete, ModalContainer } from "../../../../layouts/ModalContainer"
import FormInput from "../../../../layouts/FormInput"
import { TextArea } from "../../../../layouts/FormInput"
import IconAdd from "../../../../layouts/icons/IconAdd"



export const Category = () => {
    const {
        data,
        handleCreate,
        create,
        openModal,
        dataModal,
        input,
        refBody,
        validationError,
        handleEdit,
        edit,
        dataEdit,
        handleChange,
        openModalDelete,
        modalDelete,
        closeModalDelete,
        handleDelete
    } = CRUD()
    const [dataHeading, setDataHeading] = useState( [{
        label: 'Add category',
        icon: IconAdd(),
        heading: 'Category product',
        eventToggleModal: handleCreate,
    }]);


    const modalBody = () => {
        return(
            <>
                <form action="">
                    <input type="hidden" name="id" ref={refBody.idRef} value={dataEdit.id}/>
                    <div className="grid gap-4 mb-3 grid-cols-1">
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
                            validationError={validationError}
                            />
                        ))}

                        < TextArea 
                            span={`col-span-full`}
                            label={'Description'}
                            htmlFor={'description'}
                            id={'description'}
                            name={'description'}
                            value={dataEdit.description}
                            referens={refBody.descriptionRef}
                            placeholder={'Write description here'}
                            validationError={validationError}
                            onChange={handleChange}
                        />
                    </div>
                </form>
            </>
        )
    }
    return (
        <>
            < ModalContainer 
            openModal={openModal}
            onToggleModal={handleCreate}
            modalBody={modalBody}
            sizeModal={'lg'}
            labelModal={dataModal.labelModal}
            labelBtnModal={dataModal.labelBtnModal}
            labelBtnSecondaryModal={dataModal.labelBtnSecondaryModal}
            handelBtnModal={dataModal.handelBtn}
            openModalDelete={openModalDelete}
            />

            < ModalConfirmDelete
             modalDelete={modalDelete} 
             closeModalDelete={closeModalDelete} 
             handelDelete={handleDelete}
            />

            < TabelComponent data={data} dataHeading={dataHeading} handelEdit={handleEdit} />
        </>
    )
}