// InfoUser.jsx
import { useEffect, useState } from "react";
import FormInput from "../../../layouts/FormInput";
import Button from "../../../layouts/Button";
import IconSave from "../../../layouts/icons/IconSave";
import { getApiData } from "../../../../function/Api";
import { CRUD } from "./components/CRUD";

export const InfoUser = () => {
  const { input, profileData } = CRUD(); // Mengambil input dan profileData dari CRUD

  // Fungsi untuk mengatur nilai pada input berdasarkan profileData
  const setInputValueFromProfileData = (fieldName) => {
    if (profileData && profileData[fieldName]) {
      return profileData[fieldName];
    }
    return ""; // Kembalikan string kosong jika tidak ada data
  };

  return (
    <>
      <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
        <h1 className="text-xl font-semibold mb-3 dark:text-white">
          User Information
        </h1>
        <div className="grid grid-cols-2 gap-6">
          {input &&
            input.map((item, index) => (
              <FormInput
                key={item.id}
                element={item.element}
                htmlFor={item.htmlFor}
                label={item.label}
                type={item.type}
                name={item.name}
                value={setInputValueFromProfileData(item.name)} // Atur nilai dari profileData ke dalam input
                id={item.id}
                placeholder={item.placeholder}
                dataSelect={item.dataSelect}
                uniqueId={index}
              />
            ))}
        </div>
        <div className="mt-4">
          <Button
            label={"Save"}
            bgColour={"primary"}
            icon={IconSave()}
            paddingY={"3"}
            paddingX={"5"}
          />
        </div>
      </div>
    </>
  );
};
