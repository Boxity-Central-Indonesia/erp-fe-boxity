import {deleteApiData} from "../../function/Api"



export const Delete = ({
    endPoint,
}) => {
    const destroy = async () => {
        try {
            await deleteApiData(endPoint)
        } catch (error) {
            console.log(error);
        }
    }
    destroy()
}