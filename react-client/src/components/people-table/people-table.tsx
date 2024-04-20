import { Table } from "antd";
import data from './data';
import columns from './columns';

const PeopleTable = () => {
  return (
      <>
        <Table style={{width: '75%'}} dataSource={data} columns={columns} />
      </>
  )
}

export default PeopleTable;