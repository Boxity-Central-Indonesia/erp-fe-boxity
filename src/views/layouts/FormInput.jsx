import { fa } from "@faker-js/faker";
import { useRef, useState } from "react";
// import uuid from 'uuid-random';

const FormInput = ({
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
  disabled,
  selectedValue,
}) => {
  const [selectedRadio, setSelectedRadio] = useState(value); // State untuk menyimpan nilai radio yang dipilih

  const classNameInput = `${
    element == "select" ? `hidden` : ``
  } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`;

  const classNameSelect = `${
    element == "input" ? `hidden` : ``
  } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`;

  const classNameInputFile = `${
    element == "file" ? `` : `hidden`
  } block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400`;

  const classNameInputRadio = `${
    element == "radio" ? `` : `hidden`
  } w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`;

  return (
    <>
      <div key={uniqueId + 3} className="col-span-1">
        <label
          className={`${
            type === "hidden" ? "hidden" : ``
          } block mb-2 text-sm font-medium text-gray-900 dark:text-white`}
          htmlFor={htmlFor}
        >
          {label}
        </label>

        {element === "input" && (
          <>
            <input
              key={`${uniqueId++}-${id}`}
              type={type}
              name={name}
              ref={referens}
              value={value ?? ""}
              id={id}
              onChange={onChange}
              placeholder={placeholder}
              className={classNameInput}
            />
            <p
              className={`text-red-500 mt-2 text-sm ${
                !!validationError && validationError[name] ? "" : "hidden"
              }`}
            >
              {!!validationError && validationError[name]
                ? validationError[name]
                : ""}
            </p>
          </>
        )}
        {element === "select" && (
          <div key={uniqueId + 3} className="col-span-1">
            <select
              key={`${uniqueId}-${id}`}
              className={classNameSelect}
              name={name}
              onChange={onChange}
              ref={referens}
              value={value} // Menggunakan value yang diatur dari state
              disabled={disabled}
            >
              <option value="">Pilih {label}</option>
              {dataSelect &&
                dataSelect.map((item) => (
                  <option key={`${item.id}-${name}`} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>

            <p
              className={`text-red-500 mt-2 text-sm ${
                !!validationError && validationError[name] ? "" : "hidden"
              }`}
            >
              {!!validationError && validationError[name]
                ? validationError[name]
                : ""}
            </p>
          </div>
        )}

        {element === "file" && (
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
            <p
              className={`text-red-500 mt-2 text-sm ${
                !!validationError && validationError[name] ? "" : "hidden"
              }`}
            >
              {!!validationError && validationError[name]
                ? validationError[name]
                : ""}
            </p>
          </div>
        )}
        {element === "radio" && (
          <div key={uniqueId + 3} className="flex items-center gap-3">
            {dataSelect &&
              dataSelect.map((item) => (
                <div key={item.id} className="flex items-center">
                  <input
                    id={`${id}-${item.id}`}
                    type="radio"
                    value={item.name}
                    name={name}
                    ref={item.ref}
                    checked={value == item.name}
                    onChange={onChange}
                    className={classNameInputRadio}
                  />
                  <label
                    htmlFor={`${id}-${item.id}`}
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {item.name}
                  </label>
                </div>
              ))}
            {/* <div className="flex items-center">
                      <input
                          id={`${id}-productionOrder`} 
                          type="radio" 
                          value={'Production Order'}
                          name={name}
                          ref={referens}
                          checked={value == 'Production Order'}
                          onChange={onChange}
                          className={classNameInputRadio} 
                      />
                      <label
                          htmlFor={`${id}-productionOrder`}
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                          {'Production Order'}
                      </label>
                  </div>
                  <div className="flex items-center">
                      <input
                          id={`${id}-directOrder`} 
                          type="radio" 
                          value={'Direct Order'}
                          name={name}
                          ref={referens}
                          checked={value == 'Direct Order'}
                          onChange={onChange}
                          className={classNameInputRadio} 
                      />
                      <label
                          htmlFor={`${id}-directOrder`}
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                          {'Direct Order'}
                      </label>
                  </div> */}
          </div>
        )}
      </div>
    </>
  );
};

export const TextArea = ({
  span,
  label,
  htmlFor,
  onChange,
  name,
  id,
  value,
  referens,
  validationError,
  placeholder,
  rows,
}) => {
  return (
    <>
      <div className={span}>
        <label
          htmlFor={htmlFor}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        <textarea
          value={value}
          onChange={onChange}
          name={name}
          ref={referens}
          id={id}
          rows={`${rows ?? `4`}`}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
        ></textarea>
        <p
          className={`text-red-500 mt-2 text-sm ${
            !!validationError && validationError[name] ? "" : "hidden"
          }`}
        >
          {!!validationError && validationError[name]
            ? validationError[name]
            : ""}
        </p>
      </div>
    </>
  );
};

export function RadioButtons({
  id,
  name,
  selectedOption,
  setSelectedOption,
  referens,
  onChange,
  classNameInputRadio,
}) {
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onChange(event); // Propagating the change event to the parent component
  };

  return (
    <form className="flex items-center gap-3">
      <div className="flex items-center">
        <input
          id={`${id}-productionOrder`}
          type="radio"
          value={"Production Order"}
          name={name}
          ref={referens}
          checked={selectedOption === "Production Order"}
          onChange={handleChange}
          className={classNameInputRadio}
        />
        <label
          htmlFor={`${id}-productionOrder`}
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {"Production Order"}
        </label>
      </div>
      <div className="flex items-center">
        <input
          id={`${id}-directOrder`}
          type="radio"
          value={"Direct Order"}
          name={name}
          ref={referens}
          checked={selectedOption === "Direct Order"}
          onChange={handleChange}
          className={classNameInputRadio}
        />
        <label
          htmlFor={`${id}-directOrder`}
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {"Direct Order"}
        </label>
      </div>
    </form>
  );
}

export default FormInput;
