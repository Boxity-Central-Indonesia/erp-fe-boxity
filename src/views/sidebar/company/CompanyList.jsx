import { useState, useRef } from "react";
import TabelComponent from "../layouts/Tabel";
import IconAdd from "../layouts/icons/IconAdd";
import ModalContainer from "../layouts/ModalContainer";
import { Label, TextInput } from "flowbite-react";

const CompanyList = () => {
    const [openModal, setOpenModal] = useState(false);

    const toggleOpenModal = () => {
        setOpenModal(!openModal);
    };

    const dataTabelHeading = [
        {
          label: 'Add company',
          icon: IconAdd(),
          heading: 'Company list',
          eventToggleModal: toggleOpenModal
        }
    ]

    const dataTabel = [
        { id: 1, Company: 'PT Boxity Central Indonesia', email: 'boxitycentralindonesia@gmail.com', alamat: 'Grand silifi tower Jakarta Barat', nomor_handphone: '083183512679' },
    ]

    const dataModalBody = () => {
        return (
            <div className="space-y-6">
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="name" value="Company name" />
                    </div>
                    <TextInput id="name" placeholder="Company name" required />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="email" value="Email" />
                    </div>
                    <TextInput id="email" placeholder="name@company.com" required />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="Address" value="Adsress" />
                    </div>
                    <TextInput id="Address" type="text" required  placeholder='Company address'/>
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="phone" value="Phone" />
                    </div>
                    <TextInput id="phone" type="text" required  placeholder='Company phone'/>
                  </div>
                </div>
          )
    }

    return (
        <>
            < ModalContainer 
                openModal={openModal}
                onToggleModal={toggleOpenModal}
                modalBody={dataModalBody}
                sizeModal={'md'}
                labelModal={'Add company'}
                labelBtnModal={'Add new user'}
            />
            < TabelComponent data={dataTabel} toggleOpenModal={toggleOpenModal} dataHeading={dataTabelHeading} />
        </>
    )

}


export default CompanyList