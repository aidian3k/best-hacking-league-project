import { Table } from "antd";
import data from './data';
import columns from './columns';

const PeopleTable = () => {
  return (
      <>
        <Table dataSource={data} columns={columns} />
      </>
  )
}

export default PeopleTable