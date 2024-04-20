import axios from "axios";
import { handleHttpRequest } from "../handleHttpRequest";
import { Page } from "../api-service.types";
import { MatchingTasksRequestBody, MatchingTasksResponse } from "./matching-tasks.types";
import { SearchFiltersInput } from "../../../redux/filters/Filters.types";
import { MatchingTasksTableData } from "../../../components/people-table/columns";

export const getMatchingTasks = async (searchFiltersInput: SearchFiltersInput, page: number = 0, size: number = 10) => {
    const url = 'http://localhost:8080/api/tasks/matching-tasks';

    const requestBody: MatchingTasksRequestBody = {
        pageable: {
            page,
            size,
            sort: []
        },
        searchFiltersInput
    }

    console.log(requestBody.searchFiltersInput);

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
            key: res.author.id,
            name: res.author.displayName,
            picture: res.author.imageUrl,
            title: res.employeeTitle,
            languages: ['PL', 'ENG'],
            team: res.projectName,
            story_points: res.totalNumberOfStoryPoints,
            actions: []
        }

        return tableDataElem;
    })

    return tableDataElems;
  }