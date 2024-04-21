import { GetProp, TablePaginationConfig, TableProps } from "antd";
import { MatchingTasksTableData } from "./columns"

export type PeopleTableProps = {
    data: MatchingTasksTableData[];
    loading: boolean;
    displayDetails: () => void;
}

export type TableParams = {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
  }