import { FotoProfile } from "./components/fotoProfile";
import { InfoBisnsi } from "./components/infoBisnis/infoBisnis";
import { InfoUser } from "./components/infoUser/infoUser";
import { LogoBisnis } from "./components/logoBisnsi";
import { useState } from "react";

function Profile() {
  const [profilePicture, setProfilePicture] = useState("");

  return (
    <section className="mb-20">
      <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-4 xl:gap-4 dark:bg-gray-900">
        <div className="mb-4 col-span-full xl:mb-2">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
            User settings
          </h1>
        </div>
        <div className="col-span-full xl:col-span-2">
          <FotoProfile setProfilePicture={setProfilePicture} profilePicture={profilePicture}/>
          <InfoUser setProfilePicture={setProfilePicture}/>
        </div>
        <div className="col-span-full xl:col-span-2">
          <LogoBisnis />
          <InfoBisnsi />
        </div>
      </div>
    </section>
  );
}

export default Profile;
