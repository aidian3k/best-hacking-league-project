package ee.pw.hackathon.besthackingleagueproject.service;

import ee.pw.hackathon.besthackingleagueproject.domain.AzDoCoreApiConfiguration;
import ee.pw.hackathon.besthackingleagueproject.domain.Employee;
import ee.pw.hackathon.besthackingleagueproject.dto.input.SearchFiltersInput;
import ee.pw.hackathon.besthackingleagueproject.dto.input.SingleEmployeeDetailedFilters;
import ee.pw.hackathon.besthackingleagueproject.dto.output.ProjectDetailedTaskInformation;
import ee.pw.hackathon.besthackingleagueproject.dto.output.SingleEmployeeDetailedResponse;
import ee.pw.hackathon.besthackingleagueproject.dto.output.SingleEmployeeMatchingTextResponse;
import ee.pw.hackathon.besthackingleagueproject.dto.output.SingleMatchingTaskDetail;
import ee.pw.hackathon.besthackingleagueproject.helpers.PageUtilities;
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

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
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

        String query = "SELECT * FROM workitems";

        if (
                searchFiltersInput.getStartingDate() != null ||
                        searchFiltersInput.getEndingDate() != null
        ) {
            query += " WHERE";
        }

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

        Map<Employee, List<WorkItem>> workItemsGroupedByAuthor = filteredWorkItemsBySearchText
                .stream()
                .collect(
                        Collectors.groupingBy(workItem -> {
                            final WorkItemFields workItemFields = workItem.getFields();
                            final Author author = workItemFields.getSystemAssignedTo();

                            final Employee employee = Employee
                                    .builder()
                                    .uniqueName(author.getUniqueName())
                                    .displayName(author.getDisplayName())
                                    .imageUrl(author.getImageUrl())
                                    .id(author.getId())
                                    .employeeTitle("Junior Developer")
                                    .build();

                            return employee;
                        })
                );

        List<SingleEmployeeMatchingTextResponse> singleEmployeeMatchingTextResponses = workItemsGroupedByAuthor
                .entrySet()
                .stream()
                .map(entry -> {
                    final Employee employee = entry.getKey();
                    final List<WorkItem> authorWorkItems = entry.getValue();

                    return SingleEmployeeMatchingTextResponse
                            .builder()
                            .employee(employee)
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
                                    authorWorkItems.stream().map(WorkItem::getId).toList()
                            )
                            .build();
                })
                .toList();

        return new PageImpl<>(
                PageUtilities.getPage(
                        singleEmployeeMatchingTextResponses,
                        pageable.getPageNumber() + 1,
                        pageable.getPageSize()
                ),
                pageable,
                singleEmployeeMatchingTextResponses.size()
        );
    }

    public List<SingleEmployeeDetailedResponse> getSingleEmployeeDetailedResponse(
            SingleEmployeeDetailedFilters singleEmployeeDetailedFilters
    ) {
        final WorkItemTrackingApi workItemTrackingApi = azDoCoreApiConfiguration
                .getAzureDevopsApi()
                .getWorkItemTrackingApi();

        final List<Integer> matchingTaskIds = singleEmployeeDetailedFilters.getMatchingTasksIds();

        List<WorkItem> matchingWorkItems = matchingTaskIds
                .stream()
                .map(workItemId -> {
                    try {
                        return workItemTrackingApi.getWorkItem(workItemId);
                    } catch (AzDException e) {
                        throw new RuntimeException(e);
                    }
                })
                .toList();

        Map<String, List<SingleMatchingTaskDetail>> employeeMatchDetailsBasedOnProjectName = matchingWorkItems
                .stream()
                .collect(
                        Collectors.groupingBy(
                                workItem -> workItem.getFields().getSystemTeamProject(),
                                Collectors.mapping(
                                        workItem ->
                                                SingleMatchingTaskDetail
                                                        .builder()
                                                        .taskId(workItem.getId())
                                                        .taskTitle(workItem.getFields().getSystemTitle())
                                                        .taskDescription(workItem.getFields().getSystemDescription())
                                                        .taskTags(workItem.getFields().getSystemTags())
                                                        .taskUrl(workItem.getUrl())
                                                        .taskStatus(workItem.getFields().getSystemState())
                                                        .changedDate(
                                                                ZonedDateTime
                                                                        .parse(
                                                                                workItem.getFields().getSystemChangedDate(),
                                                                                DateTimeFormatter.ISO_DATE_TIME
                                                                        )
                                                                        .toLocalDateTime()
                                                        )
                                                        .build(),
                                        Collectors.toList()
                                )
                        )
                );

        Map<ProjectDetailedTaskInformation, List<SingleMatchingTaskDetail>> employeeDetailsMap = new HashMap<>();

        employeeMatchDetailsBasedOnProjectName.forEach(
                (projectName, singleMatchingTaskDetails) -> {
                    ProjectDetailedTaskInformation projectDetailedTaskInformation = ProjectDetailedTaskInformation
                            .builder()
                            .projectName(projectName)
                            .totalNumberOfTasks((long) singleMatchingTaskDetails.size())
                            .totalNumberOfStoryPoints(
                                    singleMatchingTaskDetails
                                            .stream()
                                            .filter(taskDetails ->
                                                    Objects.nonNull(taskDetails.getStoryPoints())
                                            )
                                            .mapToDouble(SingleMatchingTaskDetail::getStoryPoints)
                                            .sum()
                            )
                            .build();

                    employeeDetailsMap.put(
                            projectDetailedTaskInformation,
                            employeeMatchDetailsBasedOnProjectName
                                    .get(projectName)
                                    .stream()
                                    .sorted((o1, o2) -> {
                                        if (o1.getChangedDate().isBefore(o2.getChangedDate())) {
                                            return 1;
                                        } else if (o1.getChangedDate().isEqual(o2.getChangedDate())) {
                                            return 0;
                                        }

                                        return -1;
                                    })
                                    .toList()
                    );
                }
        );

        return employeeDetailsMap
                .entrySet()
                .stream()
                .map(entry -> {
                    final ProjectDetailedTaskInformation projectDetailedTaskInformation = entry.getKey();
                    final List<SingleMatchingTaskDetail> singleMatchingTaskDetails = entry.getValue();

                    return SingleEmployeeDetailedResponse
                            .builder()
                            .projectDetailedTaskInformation(projectDetailedTaskInformation)
                            .singleMatchingTaskDetail(singleMatchingTaskDetails)
                            .build();
                })
                .toList();
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
                        workField.toLowerCase().contains(searchText.toLowerCase())
                );
    }
}
