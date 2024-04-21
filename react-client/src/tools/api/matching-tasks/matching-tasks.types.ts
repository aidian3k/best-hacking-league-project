import { SearchFiltersInput } from "../../../redux/filters/Filters.types";
import { PageWrapper } from "../api-service.types"

export type MatchingTasksRequestBody = {
    pageable?: PageWrapper;
    searchFiltersInput: SearchFiltersInput;
}

export type MatchingTasksResponse = {
    employee: Employee
    projectName: string
    totalNumberOfStoryPoints: number
    totalNumberOfFoundTasks: number
    employeeTitle: string
    matchingTasksIds: number[]
  }
  
export type Employee = {
    id: string;
    displayName: string;
    imageUrl: string;
    uniqueName: string;
    employeeTitle: string;
}
  
export type Links = {}