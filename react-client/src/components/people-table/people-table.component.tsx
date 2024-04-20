import { Table } from "antd";
import columns from './columns';
import { PeopleTableProps } from "./people-table.types";
import { FC } from "react";

const PeopleTable: FC<PeopleTableProps> = ({ data }) => {
  return (
      <>
        <Table style={{width: '75%'}} dataSource={data} columns={columns} />
      </>
  )
}

export default PeopleTable;