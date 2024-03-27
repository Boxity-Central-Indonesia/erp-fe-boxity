import React, { useEffect, useState } from "react";
import Button from "../../layouts/Button";
import IconSave from "../../layouts/icons/IconSave";
import { getApiData } from "../../../function/Api";

export const FotoProfile = () => {
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const { data, status } = await getApiData("profile");
        if (
          status === 200 &&
          data &&
          data.length > 0 &&
          data[0].photo_profile
        ) {
          setProfilePicture(data[0].photo_profile);
        }
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    };

    fetchProfilePicture();
  }, []);

  console.log(profilePicture);

  return (
    <>
      <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
        <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
          <img
            className="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0"
            src={profilePicture}
            alt="User's picture"
          />
          <div>
            <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
              Profile picture
            </h3>
            <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              JPG, GIF, or PNG. Max size of 800K
            </div>
            <div className="flex items-center space-x-4">
              <Button
                label={"Upload picture"}
                bgColour={"primary"}
                paddingY={"2"}
                icon={IconSave()}
              />
              <Button label={"Delete"} bgColour={"secondary"} paddingY={"2"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
