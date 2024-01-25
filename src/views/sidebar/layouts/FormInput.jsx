import { useRef, useState } from "react"

const FormInput = (
    {   
        element,
        type,
        name,
        referens,
        value,
        label,
        htmlFor,
        id,
        onChange,
        placeholder,
        dataSelect,
        uniqueId,
        validationError,
    }
) => {

    const classNameInput = `${element == 'select' ? `hidden` : ``} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`

    const classNameSelect = `${element == 'input' ? `hidden` : ``} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`

    return (
        <>
          <div key={uniqueId + 3}>
            <label 
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor={htmlFor}
            >
              {label}
            </label>
      
            {element === 'input' && (
              <>
                <input 
                    key={`${uniqueId++}-${id}`}
                    type={type}
                    name={name} 
                    ref={referens}
                    value={value}
                    id={id}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={classNameInput}
                />
                 <p className={`text-red-500 mt-2 text-sm ${!!validationError && validationError[name] ? '' : 'hidden'}`}>
                    {!!validationError && validationError[name] ? validationError[name] : ''}
                </p>
              </>
            )}

      
            {element === 'select' && (
             <>
                 <select
                key={`${uniqueId}-${id}`}
                className={classNameSelect}
                onChange={onChange}
                ref={referens}
                value={value}
              >
                <option value="">Pilih {label}</option> 
                {dataSelect && dataSelect.map(item => (
                  <option key={`${item.id}-${name}`} value={item.id}>{item.name}</option> 
                ))}
              </select>

              <p className={`text-red-500 mt-2 text-sm ${!!validationError && validationError[name] ? '' : 'hidden'}`}>
                    {!!validationError && validationError[name] ? validationError[name] : ''}
                </p>
             </> 
            )}
          </div>
        </>
      );
      
      
}


export const TextArea = ({span, label, htmlFor, onChange, name,id, value, referens, placeholder}) => {
    return(
        <>
             <div className={`col-span-${span || `1`}`}>
                    <label htmlFor={htmlFor} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
                    <textarea value={value} onChange={onChange} name={name} ref={referens} id={id} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder}></textarea>
                </div>
        </>
    )
}

export default FormInput