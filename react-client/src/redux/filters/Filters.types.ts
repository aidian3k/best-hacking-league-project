export type SearchFiltersInput = {
    searchText: string[];
    startingDate: Date | null;
    endingDate: Date | null;
    projectIds: string[];
    isSearchingActiveEmployees: boolean;
    projectManagementPlatforms: ProjectManagementPlatform[];
}

export enum ProjectManagementPlatform {
    DEVOPS,
    JIRA
}