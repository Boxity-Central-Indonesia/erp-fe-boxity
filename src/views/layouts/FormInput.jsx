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
        selectedValue,
    }
) => {

    const classNameInput = `${element == 'select' ? `hidden` : ``} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`

    const classNameSelect = `${element == 'input' ? `hidden` : ``} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`

    const classNameInputFile = `${element == 'file' ? `` : `hidden`} block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400`

    return (
        <>
          <div key={uniqueId + 3} className="col-span-3 lg:col-span-1">
            <label 
              className={`${type === 'hidden' ? 'hidden' : ``} block mb-2 text-sm font-medium text-gray-900 dark:text-white`}
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
                    value={value ?? ''}
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
                <div key={uniqueId + 3} className="col-span-3 lg:col-span-1">
                  <select
                    key={`${uniqueId}-${id}`}
                    className={classNameSelect}
                    name={name}
                    onChange={onChange}
                    ref={referens}
                    value={value} // Menggunakan value yang diatur dari state
                  >
                    <option value="">Pilih {label}</option> 
                    {dataSelect && dataSelect.map(item => (
                      <option key={`${item.id}-${name}`} value={item.id}>{item.name}</option> 
                    ))}
                  </select>

                  <p className={`text-red-500 mt-2 text-sm ${!!validationError && validationError[name] ? '' : 'hidden'}`}>
                    {!!validationError && validationError[name] ? validationError[name] : ''}
                  </p>
                </div>
              )}

{/*               
              <label classname="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
              <input classname="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file">
              <p classname="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p> */}


              {element === 'file' && (
                <div key={uniqueId + 3} className="col-span-3 lg:col-span-1">
                  <input
                    key={`${uniqueId}-${id}`}
                    type={type}
                    className={classNameInputFile}
                    name={name}
                    id={id}
                    onChange={onChange}
                    ref={referens}
                    value={value} // Menggunakan value yang diatur dari state
                  />
                  {/* <p classname="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p> */}
                  <p className={`text-red-500 mt-2 text-sm ${!!validationError && validationError[name] ? '' : 'hidden'}`}>
                    {!!validationError && validationError[name] ? validationError[name] : ''}
                  </p>
                </div>
              )}
          </div>
        </>
      );
      
      
}


export const TextArea = ({span, label, htmlFor, onChange, name,id, value, referens,  validationError, placeholder}) => {
    return(
        <>
             <div className={span}>
                    <label htmlFor={htmlFor} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
                    <textarea value={value} onChange={onChange} name={name} ref={referens} id={id} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder}></textarea>
                    <p className={`text-red-500 mt-2 text-sm ${!!validationError && validationError[name] ? '' : 'hidden'}`}>
                    {!!validationError && validationError[name] ? validationError[name] : ''}
                  </p>
                </div>
        </>
    )
}

export default FormInput