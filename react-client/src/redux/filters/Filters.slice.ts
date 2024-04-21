import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchFiltersInput, ProjectManagementPlatform } from './Filters.types'; // Załóżmy, że importujesz typy SearchFiltersInput i ProjectManagementPlatform

const initialState: SearchFiltersInput = {
    searchText: [],
    startingDate: '',
    endingDate: '',
    projectIds: [],
    isSearchingActiveEmployees: false,
    projectManagementPlatforms: []
};

const searchFiltersSlice = createSlice({
    name: 'searchFilters',
    initialState,
    reducers: {
        setSearchText: (state: SearchFiltersInput, action: PayloadAction<string[]>) => {
            state.searchText = action.payload;
        },
        setStartingDate: (state: SearchFiltersInput, action: PayloadAction<string>) => {
            state.startingDate = action.payload;
        },
        setEndingDate: (state: SearchFiltersInput, action: PayloadAction<string>) => {
            state.endingDate = action.payload;
        },
        setProjectIds: (state: SearchFiltersInput, action: PayloadAction<string[]>) => {
            state.projectIds = action.payload;
        },
        setIsSearchingActiveEmployees: (state: SearchFiltersInput, action: PayloadAction<boolean>) => {
            state.isSearchingActiveEmployees = action.payload;
        },
        setProjectManagementPlatforms: (state: SearchFiltersInput, action: PayloadAction<ProjectManagementPlatform[]>) => {
            state.projectManagementPlatforms = action.payload;
        },
        clearFilters: (state: SearchFiltersInput) => {
            return initialState
        }
    }
});

export const {
    setSearchText,
    setStartingDate,
    setEndingDate,
    setProjectIds,
    setIsSearchingActiveEmployees,
    setProjectManagementPlatforms,
    clearFilters
} = searchFiltersSlice.actions;

export default searchFiltersSlice.reducer;
