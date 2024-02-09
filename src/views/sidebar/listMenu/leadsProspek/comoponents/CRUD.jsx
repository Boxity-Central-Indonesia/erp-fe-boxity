import { useState, useEffect, useRef } from "react"
import { getApiData, postApiData, putApiData, deleteApiData } from "../../../../../function/Api"

export const CRUD = () => {
    const [openModal, setOpenModal] = useState()
    const [dataModal, setDataModal] = useState({})
    const [input, setInput] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [responseError, setResponseError] = useState()
    const [validationError, setValidationError] = useState()
    const [modalDelete, setModalDelete] = useState()
    const [idDelete, setIdDelete] = useState()
    const [loading, setLoading] = useState(true)
    const [dataOrder, setDataOrder] = useState()
    const [dataEdit, setDataEdit] = useState({
        nama_prospek: '',
        email_prospek: '',
        nomor_telepon_prospek: '',
        tipe_prospek: '',
        id: '',
    })
    const [refBody, setRefBody] = useState({
        nama_prospekRef: useRef(),
        email_prospekRef: useRef(),
        nomor_telepon_prospekRef: useRef(),
        tipe_prospekRef: useRef(),
        idRef: useRef()
    })
    const handleChange = (event) => {
        // Mendapatkan nama dan nilai input yang berubah
        const { name, value } = event.target;

        // Memperbarui state sesuai dengan nilai input yang berubah
        setDataEdit((prevDataEdit) => ({
            ...prevDataEdit,
            [name]: value,
        }));


    };


    useEffect(() => {
        setInput([
            {
                element: 'input',
                type: 'text',
                name: 'nama_prospek',
                ref: refBody.nama_prospekRef,
                value: dataEdit.nama_prospek,
                label: 'Prospek name',
                htmlFor: 'nama_prospek',
                id: 'nama_prospek',
                onchange: handleChange,
                placeholder: 'Prospek name',
            },
            {
                element: 'input',
                type: 'email',
                name: 'email_prospek',
                ref: refBody.email_prospekRef,
                value: dataEdit.email_prospek,
                label: 'Prospek email',
                htmlFor: 'email_prospek',
                id: 'email_prospek',
                onchange: handleChange,
                placeholder: 'Prospek email',
            },
            {
                element: 'input',
                type: 'text',
                name: 'nomor_telepon_prospek',
                ref: refBody.nomor_telepon_prospekRef,
                value: dataEdit.nomor_telepon_prospek,
                label: 'Prospek number phone',
                htmlFor: 'nomor_telepon_prospek',
                id: 'nomor_telepon_prospek',
                onchange: handleChange,
                placeholder: 'Prospek number phone',
            },
            {
                element: 'select',
                name: 'tipe_prospek',
                ref: refBody.tipe_prospekRef,
                value: dataEdit.tipe_prospek,
                label: 'Prospek type',
                htmlFor: 'tipe_prospek',
                id: 'tipe_prospek',
                dataSelect: [
                    { value: 'perorangan', name: 'perorangan' },
                    { value: 'bisnis', name: 'bisnis' },
                    { value: 'rekomendasi', name: 'rekomendasi' },
                ],
                onchange: handleChange
            },

        ])
    }, [dataEdit])

    useEffect(() => {
        if (!!responseError) {
            setValidationError(
                {
                    nama_prospek: responseError?.nama_prospek?.[0] || '',
                    email_prospek: responseError?.email_prospek?.[0] || '',
                    nomor_telepon_prospek: responseError?.nomor_telepon_prospek?.[0] || '',
                    tipe_prospek: responseError?.tipe_prospek?.[0] || '',
                }
            )
        }
    }, [responseError])

    const READ = () => {
        const [data, setData] = useState()
        useEffect(() => {
            const getData = async () => {
                try {
                    const { data, status } = await getApiData('leads')
                    if (status === 200) {
                        const newData = data.map(item => ({
                            'prospek name': item.nama_prospek,
                            'prospek email': item.email_prospek,
                            'prospek number phone': item.nomor_telepon_prospek,
                            'prospek_type': item.tipe_prospek,
                            id: item.id,

                        }))
                        setData(() => newData)
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            getData()
        }, [refresh])

        useEffect(() => {
            const getDataForSelec = async (endpoint, state) => {
                try {
                    const { data, status } = await getApiData(endpoint)
                    if (status === 200) {
                        const newData = data.map(item => ({
                            id: item.id,
                            name: item.name
                        }))
                        state(() => newData)
                    }
                } catch (error) {
                    console.log(error);
                }
            }

            getDataForSelec('orders', setDataOrder)
        }, [])

        return {
            data
        }
    }

    const CREATE = () => {
        const handleCreate = () => {
            setDataModal({
                labelModal: 'Add leads',
                labelBtnModal: 'Add new leads',
                labelBtnSecondaryModal: 'Back',
                handelBtn: () => create()
            })
            setDataEdit({
                nama_prospek: '',
                email_prospek: '',
                nomor_telepon_prospek: '',
                tipe_prospek: '',
                id: '',
            })
            setValidationError(
                {
                    nama_prospek: '',
                    email_prospek: '',
                    nomor_telepon_prospek: '',
                    tipe_prospek: '',
                    id: '',
                }
            )
            setOpenModal(prevOpenModal => !prevOpenModal)
        }

        const create = async () => {
            setLoading(prevLoading => !prevLoading)
            const dataBody = {
                nama_prospek: refBody.nama_prospekRef.current.value,
                email_prospek: refBody.email_prospekRef.current.value,
                nomor_telepon_prospek: refBody.nomor_telepon_prospekRef.current.value,
                tipe_prospek: refBody.tipe_prospekRef.current.value,
                id: refBody.idRef.current.value,
            }
            try {
                const { status } = await postApiData('leads', dataBody)
                if (status === 201) {
                    setRefresh(!refresh)
                    setOpenModal(prevOpenModal => !prevOpenModal)
                    setLoading(prevLoading => !prevLoading)
                }
            } catch (error) {
                setLoading(prevLoading => !prevLoading)
                setResponseError(error.response.data.errors)
            }
        }


        return {
            handleCreate,
            create
        }
    }

    const EDIT = () => {
        const handleEdit = async (param) => {
            setDataModal({
                labelModal: 'Detail & edit transaction',
                labelBtnModal: 'Save',
                labelBtnSecondaryModal: 'Delete',
                handelBtn: edit
            })

            setValidationError(
                {
                    type: '',
                    date: '',
                    account_id: '',
                    amount: ''
                }
            )


            setOpenModal(prevOpenModal => !prevOpenModal)
            try {
                const { data, status } = await getApiData('leads/' + param)
                if (status === 200) {
                    setDataEdit(
                        {
                            type: data.type,
                            date: data.date,
                            account_id: data.account_id,
                            amount: data.amount,
                            id: data.id
                        }
                    )
                    setIdDelete(data.id)
                }
            } catch (error) {
                console.log(error);
            }
        }

        const edit = async () => {
            setLoading(prevLoading => !prevLoading)
            const dataBody = {
                type: refBody.typeRef.current.value,
                date: refBody.dateRef.current.value,
                account_id: refBody.account_idRef.current.value,
                amount: refBody.amountRef.current.value,
                id: refBody.idRef.current.value
            }
            try {
                const { status } = await putApiData('accounts-transactions/' + refBody.idRef.current.value, dataBody)
                if (status === 201) {
                    setRefresh(!refresh)
                    setOpenModal(prevOpenModal => !prevOpenModal)
                    setLoading(prevLoading => !prevLoading)
                }
            } catch (error) {
                setLoading(prevLoading => !prevLoading)
                setResponseError(error.response.data.errors)
            }
        }

        return {
            handleEdit,
            edit
        }
    }


    const DELETE = () => {
        const openModalDelete = () => {
            setModalDelete(!modalDelete)
            setOpenModal(prevOpenModal => !prevOpenModal)
        }


        const closeModalDelete = () => {
            setModalDelete(!modalDelete)
        }


        const handleDelete = async () => {
            setLoading(prevLoading => !prevLoading)
            try {
                await deleteApiData('accounts-transactions/' + idDelete)
                setRefresh(!refresh)
                setLoading(prevLoading => !prevLoading)
                closeModalDelete()
            } catch (error) {
                console.log(error.response);
            }
        }


        return {
            openModalDelete,
            closeModalDelete,
            handleDelete
        }
    }



    const { data } = READ()
    const { handleCreate } = CREATE()
    const { handleEdit } = EDIT()
    const { openModalDelete, closeModalDelete, handleDelete } = DELETE()



    return {
        data,
        openModal,
        handleCreate,
        dataModal,
        input,
        validationError,
        handleEdit,
        dataEdit,
        refBody,
        openModalDelete,
        closeModalDelete,
        handleDelete,
        modalDelete,
        loading
    }
}