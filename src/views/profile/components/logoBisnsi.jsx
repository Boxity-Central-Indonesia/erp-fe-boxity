import Button from "../../layouts/Button";
import IconSave from "../../layouts/icons/IconSave";

export const LogoBisnis = () => {
  return (
    <>
      <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
        <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
          <img
            className="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0"
            src="https://res.cloudinary.com/du0tz73ma/image/upload/v1702886876/phpPKyGgU_n7sta5.png"
            alt="Jese picture"
          />
          <div>
            <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
              Business logo
            </h3>
            <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              JPG, GIF or PNG. Max size of 800K
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
