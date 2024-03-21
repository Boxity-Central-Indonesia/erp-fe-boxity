import {getApiData} from "../../../../../../function/Api"
import { useState, useEffect } from "react";
import IconAdd from "../../../../../layouts/icons/IconAdd";

export const ReadProccesActivity = ({
    refresh,
    path,
    setDataHeading
}) => {
    const [data, setData] = useState();
    
    useEffect(() => {
      const getData = async () => {
        try {
          const { data } = await getApiData(path);
          if (path === "processing-activities") {
            const newData = Object.values(data).flatMap(innerObj =>
              Object.values(innerObj).map(item => ({
                'activity type': item[item.length - 1].activity_type,
                'status activity': item[item.length - 1].status_activities,
                'description': item[item.length - 1].details?.description || '--', // Tambahkan penanganan untuk jika details tidak tersedia
                id: item[item.length - 1].id,
              }))
            );
            setData(newData);
            setDataHeading([
              {
                label: "Add new procces activity",
                icon: IconAdd(),
                heading: "Procces activity list",
                information:
                  "This is additional information about the content of this section. You can provide any relevant details or instructions here.",
                eventToggleModal: handleCreate,
                onclick: handleClickHeading,
                showNavHeading: false,
              },
            ]);
          }
        } catch (error) {
          console.error(error);
        }
      };
      getData();
    }, [refresh]);
  
    return { data };
  };