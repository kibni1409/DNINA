import {useCreateTableMutation, useDeleteTableMutation, useGetAllTablesQuery} from "../services/TablesAPI";
import {Button, Card, Input, InputNumber, message, Modal} from "antd";
import {useEffect, useState} from "react";
import {useAddItemMutation, useCheckItemMutation, useRemoveItemMutation} from "../services/ItemAPI";
import {useNavigate} from "react-router-dom";
import Style from './Tables.module.scss'

const Table = ({Table}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState('')
  const [nameItem, setNameItem] = useState('')
  const [messageApi, contextHolder] = message.useMessage();
  const [getItem] = useCheckItemMutation()
  const [addItem] = useAddItemMutation()
  const [removeItem] = useRemoveItemMutation()
  const [deleteTable] = useDeleteTableMutation()


  function handleName(e) {
    setNameItem(e.target.value)
  }

  const showModal = (e) => {
    setType(e.target.innerText)
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    let res = false
    if( type === 'Проверить'){
      res = await getItem({tableName: Table.TableName, value: nameItem})
    }
    if( type === 'Добавить'){
      res = await addItem({tableName: Table.TableName, value: nameItem})
    }
    if( type === 'Удалить'){
      res = await removeItem({tableName: Table.TableName, value: nameItem})
    }
    if(res.data.Value === true) {
      messageApi.open({
        type: 'success',
        content: 'Получилось',
      });
    }
    else {
      messageApi.open({
        type: 'error',
        content: 'Ошибка',
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  async function deleteTableFunc() {
    let res = await deleteTable(Table.TableName)
    if(res.data.Value === true) {
      messageApi.open({
        type: 'success',
        content: 'Получилось',
      });
    }
    else {
      messageApi.open({
        type: 'error',
        content: 'Ошибка',
      });
    }

  }

  return (
    <div key={Table.TableName}>
      {contextHolder}
      <div className={Style.Table}>
      <Card title={Table.TableName} bordered={true} style={{ width: 400 }}>
        <Button type="primary" onClick={showModal}>Проверить</Button>
        <Button type="dashed" onClick={showModal}>Добавить</Button>
        <Button type="primary" danger onClick={showModal}>Удалить</Button>
        <Modal title="Введите элемент" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Input placeholder="Наименование элемента" onChange={handleName} />
        </Modal>
        <p>CountElements: {Table.CountElements}</p>
        <p>CountHashFunc: {Table.CountHashFunc}</p>
        <p>FalsePositiveRate: {Table.FalsePositiveRate}</p>
        <p>TableSize: {Table.TableSize}</p>
        <Button danger onClick={deleteTableFunc}>Удалить таблицу</Button>
      </Card>
      </div>
    </div>
  )
}

const Tables = () => {
  const {data, isLoading} = useGetAllTablesQuery()
  const [addTable] = useCreateTableMutation()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [nameTable, setNameTable] = useState('')
  const [countTable, setCountTable] = useState('')
  const [rateTable, setRateTable] = useState('')

  let user = localStorage.getItem('user')

  useEffect(() => {
    if(user === null) {
      navigate('/')
    }
  }, [user] )

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    let res =  await addTable({
        CountElements: countTable,
        CountHashFunc: 0,
        FalsePositiveRate: rateTable,
        TableName: nameTable,
        TableSize: 0
      })

    if(res.data.Value === true) {
      messageApi.open({
        type: 'success',
        content: 'Получилось',
      });
    }
    else {
      messageApi.open({
        type: 'error',
        content: 'Ошибка',
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={Style.Tables}>
      <Button
        className={Style.LogOut}
        onClick={() => {localStorage.removeItem('user'); navigate('/')}}
      >
        Выход
      </Button>
      <Button
        className={Style.AddTable}
        type='primary'
        onClick={showModal}
      >
        Создать таблицу
      </Button>


      <Modal title="Создание таблицы" open={isModalOpen} onCancel={handleCancel}>
        <Input
          addonBefore='Наименование'
          placeholder="Наименование таблицы"
          onChange={(e) => setNameTable(e.target.value)}
        />
        <InputNumber
          addonBefore='Процент ошибки'
          style={{
            width: 400,
          }}
          defaultValue="0"
          min="0"
          max="1"
          step="0.001"
          stringMode
          onChange={(e) => setRateTable(e)}
        />
        <br/>
        <InputNumber
          style={{
            width: 400,
          }}
          addonBefore='Кол-во элементов'
          defaultValue="100"
          min="100"
          max="1000000000000000000000000000000"
          step="1"
          stringMode
          onChange={(e) => setCountTable(e)}
        />
      </Modal>
      {isLoading
        ? <span>Loading...</span>
        : data.Tables.map((t) => <Table key={t.Nametable} Table={t} />)
      }
    </div>
  )
}

export default Tables
