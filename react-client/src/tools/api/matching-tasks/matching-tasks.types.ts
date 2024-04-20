import { SearchFiltersInput } from "../../../redux/filters/Filters.types";
import { PageWrapper } from "../api-service.types"

export type MatchingTasksRequestBody = {
    pageable: PageWrapper;
    searchFiltersInput: SearchFiltersInput;
}

export type MatchingTasksResponse = {
    author: Author
    projectName: string
    totalNumberOfStoryPoints: number
    totalNumberOfFoundTasks: number
    employeeTitle: string
    matchingTasksIds: number[]
  }
  
  export type Author = {
    continuationToken: string
    displayName: string
    url: string
    _links: Links
    id: string
    uniqueName: string
    imageUrl: string
    descriptor: string
  }
  
  export type Links = {}