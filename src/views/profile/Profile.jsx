import { FotoProfile } from "./components/fotoProfile";
import { InfoBisnsi } from "./components/infoBisnis";
import { InfoUser } from "./components/infoUser";
import { LogoBisnis } from "./components/logoBisnsi";

function Profile() {
  return (
    <section className="mb-20">
      <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-4 xl:gap-4 dark:bg-gray-900">
        <div className="mb-4 col-span-full xl:mb-2">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
            User settings
          </h1>
        </div>
        <div className="col-span-full xl:col-span-2">
          <FotoProfile />
          <InfoUser />
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
