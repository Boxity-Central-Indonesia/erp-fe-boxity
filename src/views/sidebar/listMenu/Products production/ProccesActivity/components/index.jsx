import { ReadProccesActivity } from "./ReadProccesActivity";
import { modalProccesActivities } from "./modalProccesActivities";
import { editProccesActivity } from "./EditProccesActivity";
import { deleteProccesActivities } from "./deleteProccesActivities";
import { useState, useEffect } from "react";
import { getApiData } from "../../../../../../function/Api";
import { json } from "react-router-dom";

export const index = () => {
    const [dataHeading, setDataHeading] = useState([])
    const [defaultEdit, setDefaultEdit] = useState(true);
    const [data, setData] = useState('');
    const [dataDetail, setDataDetail] = useState({})
    const [modalDelete, setModalDelete] = useState();
    const [idDelete, setIdDelete] = useState()
    const [dataOrder, setDataOrder] = useState([])
    const [dataProduct, setDataProduct] = useState([])
    const [dataFindProcces, setDataFindProcces] = useState()
    const [dataDetailsActivity, setDataDetailsActivity] = useState({})
    const [dataProccesActivity, setDataProccesActivity] = useState()
    const [dataTabelProccesActivity, setDataTabelProccesActivity] = useState()
    const [dataProcces, setDataProcces] = useState([
      {
          activity_type: "weight_based_ordering",
          details: [
              'ordered_weight',
              'required_by_date',
              'note'               
          ]
      },
      {
          activity_type: "unloading",
          details: [
              'unloading_time',
              'number_of_animals',
              'number_of_rack',
              'note'               
          ]
      },
      {
          activity_type: "weighing",
          details: [
              'actual_weight',
              'note'               
          ]
      },
      {
          activity_type: "slaughtering",
          details: [
              'method',
              'number_of_animals',
              'note'               
          ]
      },
      {
          activity_type: "scalding",
          details: [
              'temperature',
              'duration',
              'note'               
          ]
      },
      {
          activity_type: "feather_removal",
          details: [
              'method',
              'efficiency_rate',
              'note'               
          ]
      },
      {
          activity_type: "carcass_washing",
          details: [
              'method',
              'water_temperature',
              'note'               
          ]
      },
      {
          activity_type: "viscera_removal",
          details: [
              'method',
              'note'               
          ]
      },
      {
          activity_type: "viscera_handling",
          details: [
              'storage_condition',
              'usage',
              'note'               
          ]
      },
      {
          activity_type: "carcass_washing_post",
          details: [
              'method',
              'chemicals_used',
              'note'        
          ]
      },
      {
          activity_type: "carcass_grading",
          details: [
              'grade',
              'criteria',
              'note'        
          ]
      },
      {
          activity_type: "carcass_weighing",
          details: [
              'weight_before_cutting',
              'weight_after_cutting',
              'note'        
          ]
      },
      {
          activity_type: "deboning",
          details: [
              'time_spent',
              'efficiency',
              'note'        
          ]
      },
      {
          activity_type: "parting",
          details: [
              'parts_produced',
              'note'        
          ]
      },
      {
          activity_type: "cut_weighing",
          details: [
              'total_weight',
              'note'        
          ]
      },
      {
          activity_type: "packaging",
          details: [
              'packaging_material',
              'quantity_packed',
              'note'        
          ]
      },
      {
          activity_type: "packaging_weighing",
          details: [
              'average_weight_per_package',
              'note'        
          ]
      },
    ])

 
    useEffect(() => {
        document.title = 'Proses aktifitas - DHKJ Manufacturer'
        const fetchData = async () => {
          try {
            const { data, status } = await getApiData("orders");
            if (status === 200) {
              const newData = data.map((item) => ({
                id: item.id,
                name: item.kode_order,
              }));
              setDataOrder(newData);
            }
          } catch (error) {
            console.log(error);
          }
          try {
            const { data, status } = await getApiData("products");
            if (status === 200) {
              const newData = data.map((item) => ({
                id: item.id,
                name: item.name,
              }));
              setDataProduct(newData);
            }
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
      }, []);



    // modal company

    const {
        setDataModal,
        dataModal,
        setOpenModal,
        openModal,
        dataModalBody,
        loading,
        refresh,
        setRefresh,
        setDataEdit,
        refBody,
        setResponseError,
        setLoading,
        setParameter,
    } = modalProccesActivities({
        defaultEdit, 
        setDefaultEdit,
        dataOrder,
        dataProduct,
        dataProcces,
        dataFindProcces,
        setDataFindProcces,
        dataDetailsActivity,
        setDataDetailsActivity
    })

    // modal company end


    useEffect(() => {
        // setDataTabelProccesActivity(dataProccesActivity?.[dataDetail?.order_id]?.[dataDetail?.product_id]);
        const getDataProcecesActivity = async () => {
            try {
               if(dataDetail?.order_id !== undefined){
                const {data, status} = await getApiData('processing-activities/by-order/' + dataDetail?.order_id)
                if(status === 200){
                    setDataTabelProccesActivity(data)
                }
               }
            } catch (error) {
                console.log(error);
            }
        }
        
        getDataProcecesActivity()

    }, [dataProccesActivity, refresh])


    // hapus data detailActivity saat modal di triger

    useEffect(() => {
        localStorage.removeItem("dataDetailsActivity")
    }, [openModal])

    // hapus data detailActivity saat modal di triger


    // store dataDetailActivity to localstorage

    useEffect(() => {
        localStorage.setItem('dataDetailsActivity', JSON.stringify(dataDetailsActivity))
    }, [dataDetailsActivity])

    // store dataDetailActivity to localstorage end

    // edit procces

    const {
        handleEdit,
    } = editProccesActivity({
        setDefaultEdit, 
        refresh, 
        setRefresh,
        setDataDetail,
        dataDetail,
        defaultEdit,
        setOpenModal,
        setDataModal,
        setDataEdit,
        refBody,
        setResponseError,
        setLoading,
        setIdDelete,
        dataDetailsActivity,
        dataProcces,
        setDataFindProcces,
        dataFindProcces,
        setDataDetailsActivity,
        setDataProccesActivity
    })


    // read company

    ReadProccesActivity({
        refresh, 
        setDataHeading, 
        setOpenModal, 
        openModal,
        data,
        setData,
        setParameter,
        setLoading
    })

    // read company end

    // edit procces end

    // delete company

    const {
        openModalDelete,
        closeModalDelete,
        handleDelete
    } = deleteProccesActivities({
        setModalDelete,
        setOpenModal,
        idDelete,
        setDefaultEdit,
        setRefresh
    })

    // delete company end
    
    
    return{
        data,
        dataHeading,
        dataModal,
        openModal,
        setOpenModal,
        dataModalBody,
        loading,
        defaultEdit,
        setDefaultEdit,
        handleEdit,
        dataDetail,
        modalDelete,
        openModalDelete,
        closeModalDelete,
        handleDelete,
        dataTabelProccesActivity,
        setRefresh,
        setLoading
    }
}