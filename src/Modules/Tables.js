import {useGetAllTablesQuery} from "../services/TablesAPI";

const Tables = () => {
  const [allTables] = useGetAllTablesQuery()
  async function AllTables() {
    return await allTables()
  }
  let ElemTables = AllTables()
  console.log(ElemTables)
  return (
    <div>
      Tables
    </div>
  )
}

export default Tables
