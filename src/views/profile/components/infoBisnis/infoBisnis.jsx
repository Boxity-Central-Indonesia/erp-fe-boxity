import { useEffect, useState } from "react"
import FormInput, { TextArea } from "../../../layouts/FormInput"
import Button from "../../../layouts/Button"
import IconSave from "../../../layouts/icons/IconSave"


export const InfoBisnsi = () => {

    const[input, setInput] = useState([])

    useEffect(() => {
        setInput([
            {
                element: 'input',
                type: 'text',
                name: 'business_name',
                // ref: refBody.nameRef,
                // value: dataEdit.business_name,
                label: 'Business name',
                htmlFor: 'business_name',
                id: 'business_name',
                // onchange: handleChange,
                placeholder: 'Business name',
            },
            {
                element: 'input',
                type: 'text',
                name: 'business_address',
                // ref: refBody.nameRef,
                // value: dataEdit.business_address,
                label: 'Business address',
                htmlFor: 'business_address',
                id: 'business_address',
                // onchange: handleChange,
                placeholder: 'Business address',
            },
            {
                element: 'input',
                type: 'email',
                name: 'business_email',
                // ref: refBody.nameRef,
                // value: dataEdit.business_email,
                label: 'Business email',
                htmlFor: 'business_email',
                id: 'business_email',
                // onchange: handleChange,
                placeholder: 'Business email',
            },
            {
                element: 'input',
                type: 'text',
                name: 'website',
                // ref: refBody.nameRef,
                // value: dataEdit.website,
                label: 'Website',
                htmlFor: 'website',
                id: 'website',
                // onchange: handleChange,
                placeholder: 'Website',
            },
            {
                element: 'input',
                type: 'text',
                name: 'number_phone',
                // ref: refBody.nameRef,
                // value: dataEdit.number_phone,
                label: 'Business number phone',
                htmlFor: 'number_phone',
                id: 'number_phone',
                // onchange: handleChange,
                placeholder: 'Business number phone',
            },
            {
                element: 'input',
                type: 'text',
                name: 'leaders_name',
                // ref: refBody.nameRef,
                // value: dataEdit.leaders_name,
                label: 'Leaders name',
                htmlFor: 'leaders_name',
                id: 'leaders_name',
                // onchange: handleChange,
                placeholder: 'Leaders name',
            },
            {
                element: 'input',
                type: 'text',
                name: 'bank_account_name',
                // ref: refBody.nameRef,
                // value: dataEdit.bank_account_name,
                label: 'Bank account name',
                htmlFor: 'bank_account_name',
                id: 'bank_account_name',
                // onchange: handleChange,
                placeholder: 'Bank account name',
            },
            {
                element: 'input',
                type: 'text',
                name: 'bank_branch',
                // ref: refBody.nameRef,
                // value: dataEdit.bank_branch,
                label: 'Bank branch',
                htmlFor: 'bank_branch',
                id: 'bank_branch',
                // onchange: handleChange,
                placeholder: 'Bank branch',
            },
            {
                element: 'input',
                type: 'text',
                name: 'bank_account_number',
                // ref: refBody.nameRef,
                // value: dataEdit.bank_account_number,
                label: 'Bank Account Number',
                htmlFor: 'bank_account_number',
                id: 'bank_account_number',
                // onchange: handleChange,
                placeholder: 'Bank Account Number',
            },
            {
                element: 'input',
                type: 'text',
                name: 'on_behalf_of',
                // ref: refBody.nameRef,
                // value: dataEdit.on_behalf_of,
                label: 'On behalf of',
                htmlFor: 'on_behalf_of',
                id: 'on_behalf_of',
                // onchange: handleChange,
                placeholder: 'On behalf of',
            },
        ])
    }, [])

    return (
        <>
        <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <h1 className="text-xl font-semibold mb-3 dark:text-white">Business Information</h1>
            <div className="grid grid-cols-2 gap-6">
                {input.map( (item, index) => (
                            < FormInput
                            key={item.id}
                            element={item.element}
                            htmlFor={item.htmlFor}
                            label={item.label}
                            type={item.type}
                            name={item.name}
                            // referens={item.ref}
                            // value={item.value}
                            id={item.id}
                            // onChange={(event) => item.onchange(event)}
                            placeholder={item.placeholder} 
                            dataSelect={item.dataSelect}
                            uniqueId={index}
                            // validationError={validationError}
                            />
                        ) )}
                    < TextArea 
                    span={`col-span-full`}
                    label={`Message`}
                    htmlFor={'message'}
                    id={'message'}
                    name={`message`}
                    // referens={refBody.descriptionRef}
                    placeholder={`Write message here`}
                    />
            </div>
            <div className="mt-4">
                <Button 
                label={'Save'}
                bgColour={'primary'}
                icon={IconSave()}
                paddingY={'3'}
                paddingX={'5'}
                />
            </div>
        </div>
        </>
    )
}