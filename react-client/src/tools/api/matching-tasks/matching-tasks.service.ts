import axios from "axios";
import { handleHttpRequest } from "../handleHttpRequest";
import { Page } from "../api-service.types";
import { MatchingTasksRequestBody, MatchingTasksResponse } from "./matching-tasks.types";
import { SearchFiltersInput } from "../../../redux/filters/Filters.types";
import { MatchingTasksTableData } from "../../../components/people-table/columns";

export const getMatchingTasks = async (searchFiltersInput: SearchFiltersInput, page: number = 0, size: number = 10) => {
    const url = `http://localhost:8080/api/tasks/matching-tasks?pageNumber=${page}&pageSize=${size}`;

    const requestBody: MatchingTasksRequestBody = {
        searchFiltersInput
    }

    const getMatchingTasksRequest = axios.post<Page<MatchingTasksResponse>>(url, requestBody);
    const response = await handleHttpRequest(getMatchingTasksRequest);
    if (response.status === 'success') {
        const mappedResponse = mapToDataType(response.data.content);
        return mappedResponse;
    }
    throw new Error('Failed to get matching tasks!');
  }

  const mapToDataType = (matchingTasksResponse: MatchingTasksResponse[]) => {
    const tableDataElems: MatchingTasksTableData[] = matchingTasksResponse.map((res, index) => {
        const tableDataElem: MatchingTasksTableData = {
            key: res.employee.id,
            name: res.employee.displayName,
            picture: res.employee.imageUrl,
            title: res.employeeTitle,
            languages: ['PL', 'ENG'],
            team: res.projectName,
            story_points: res.totalNumberOfStoryPoints,
            actions: [],
            matchingTasksIds: res.matchingTasksIds,
            email: res.employee.uniqueName
        }

        return tableDataElem;
    })

    return tableDataElems;
  }