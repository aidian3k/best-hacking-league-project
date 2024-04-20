package ee.pw.hackathon.besthackingleagueproject.service;

import ee.pw.hackathon.besthackingleagueproject.domain.AzDoCoreApiConfiguration;
import ee.pw.hackathon.besthackingleagueproject.dto.input.SearchFiltersInput;
import ee.pw.hackathon.besthackingleagueproject.dto.output.SingleEmployeeMatchingTextResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.azd.common.types.Author;
import org.azd.core.types.Project;
import org.azd.exceptions.AzDException;
import org.azd.work.types.TeamSettingsIteration;
import org.azd.workitemtracking.WorkItemTrackingApi;
import org.azd.workitemtracking.types.WorkItem;
import org.azd.workitemtracking.types.WorkItemFields;
import org.azd.workitemtracking.types.WorkItemQueryResult;
import org.azd.workitemtracking.types.WorkItemReference;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class TaskService {

    private final AzDoCoreApiConfiguration azDoCoreApiConfiguration;
    private final ProjectsService projectsService;

    @AllArgsConstructor
    @Getter
    @Setter
    static class ProjectIterations {

        private String projectId;
        private List<TeamSettingsIteration> iterations;
    }

    public Page<SingleEmployeeMatchingTextResponse> getAggregatedResponseBasedOnSearchFilters(
            SearchFiltersInput searchFiltersInput,
            Pageable pageable
    ) throws AzDException {
        List<String> projectIdsString = CollectionUtils.isEmpty(
                searchFiltersInput.getProjectIds()
        )
                ? projectsService
                .getOrganizationProjects()
                .stream()
                .map(Project::getId)
                .toList()
                : searchFiltersInput
                .getProjectIds()
                .stream()
                .map(String::valueOf)
                .toList();

        String query = "SELECT * FROM workitems WHERE";

        if (searchFiltersInput.getStartingDate() != null) {
            query +=
                    String.format(
                            " [System.ChangedDate] >= '%s'",
                            searchFiltersInput.getStartingDate()
                    );
        }

        if (searchFiltersInput.getEndingDate() != null) {
            query +=
                    String.format(
                            " AND [System.ChangedDate] <= '%s'",
                            searchFiltersInput.getEndingDate()
                    );
        }
        query += " ORDER BY [System.ChangedDate] DESC";
        final String finalQuery = query;

        List<WorkItemReference> workItems = projectIdsString
                .stream()
                .map(projectName -> {
                    try {
                        String teamId = azDoCoreApiConfiguration
                                .getAzureDevopsApi()
                                .getCoreApi()
                                .getProject(projectName)
                                .getDefaultTeam()
                                .getId();
                        azDoCoreApiConfiguration.getAzureDevopsApi().setProject(projectName);
                        final WorkItemTrackingApi workItemTrackingApi = azDoCoreApiConfiguration
                                .getAzureDevopsApi()
                                .getWorkItemTrackingApi();

                        return workItemTrackingApi.queryByWiql(teamId, finalQuery);
                    } catch (AzDException e) {
                        throw new RuntimeException(e);
                    }
                })
                .map(WorkItemQueryResult::getWorkItems)
                .flatMap(List::stream)
                .toList();

        azDoCoreApiConfiguration.getAzureDevopsApi().setProject(null);
        final WorkItemTrackingApi workItemTrackingApi = azDoCoreApiConfiguration
                .getAzureDevopsApi()
                .getWorkItemTrackingApi();

        List<WorkItem> foundWorkItems = workItemTrackingApi
                .getWorkItems(
                        workItems
                                .stream()
                                .map(WorkItemReference::getId)
                                .mapToInt(i -> i)
                                .toArray()
                )
                .getWorkItems();

        List<WorkItem> filteredWorkItemsBySearchText = foundWorkItems
                .stream()
                .filter(workItem -> {
                    final WorkItemFields workItemFields = workItem.getFields();

                    return (
                            workFieldContainsTextBasedOnSearchText(
                                    workItemFields.getSystemTitle(),
                                    searchFiltersInput.getSearchText()
                            ) ||
                                    workFieldContainsTextBasedOnSearchText(
                                            workItemFields.getSystemTags(),
                                            searchFiltersInput.getSearchText()
                                    ) ||
                                    workFieldContainsTextBasedOnSearchText(
                                            workItemFields.getSystemDescription(),
                                            searchFiltersInput.getSearchText()
                                    ) ||
                                    workFieldContainsTextBasedOnSearchText(
                                            workItemFields.getAcceptanceCriteria(),
                                            searchFiltersInput.getSearchText()
                                    )
                    );
                })
                .toList();

        Map<Author, List<WorkItem>> workItemsGroupedByAuthor = filteredWorkItemsBySearchText
                .stream()
                .collect(
                        Collectors.groupingBy(workItem -> {
                            final WorkItemFields workItemFields = workItem.getFields();

                            return workItemFields.getSystemAssignedTo();
                        })
                );

        List<SingleEmployeeMatchingTextResponse> singleEmployeeMatchingTextResponses = workItemsGroupedByAuthor
                .entrySet()
                .stream()
                .map(entry -> {
                    final Author author = entry.getKey();
                    final List<WorkItem> authorWorkItems = entry.getValue();

                    return SingleEmployeeMatchingTextResponse
                            .builder()
                            .author(author)
                            .projectName(
                                    authorWorkItems.get(0).getFields().getSystemTeamProject()
                            )
                            .totalNumberOfStoryPoints(
                                    authorWorkItems
                                            .stream()
                                            .map(workItem -> workItem.getFields().getStoryPoints())
                                            .mapToDouble(Double::doubleValue)
                                            .sum()
                            )
                            .totalNumberOfFoundTasks((long) authorWorkItems.size())
                            .employeeTitle("Junior Developer")
                            .matchingTasksIds(
                                    authorWorkItems
                                            .stream()
                                            .map(workItem -> workItem.getFields().getSystemId())
                                            .toList()
                            )
                            .build();
                })
                .toList();

        return new PageImpl<>(
                singleEmployeeMatchingTextResponses,
                pageable,
                singleEmployeeMatchingTextResponses.size()
        );
    }

    private boolean workFieldContainsTextBasedOnSearchText(
            String workField,
            List<String> searchTexts
    ) {
        if (workField == null) {
            return false;
        }

        return searchTexts
                .stream()
                .anyMatch(searchText ->
                        searchText.toLowerCase().contains(workField.toLowerCase())
                );
    }
}
