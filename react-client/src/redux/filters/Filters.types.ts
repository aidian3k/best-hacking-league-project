export type SearchFiltersInput = {
    searchText: string[];
    startingDate: string;
    endingDate: string;
    projectIds: string[];
    isSearchingActiveEmployees: boolean;
    projectManagementPlatforms: ProjectManagementPlatform[];
}

export enum ProjectManagementPlatform {
    AZURE = 'AZURE',
    JIRA = 'JIRA',
    TRELLO = 'TRELLO'
}