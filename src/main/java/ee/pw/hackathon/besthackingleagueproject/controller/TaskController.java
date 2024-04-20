package ee.pw.hackathon.besthackingleagueproject.controller;

import ee.pw.hackathon.besthackingleagueproject.dto.input.SearchFiltersInput;
import ee.pw.hackathon.besthackingleagueproject.dto.input.SingleEmployeeDetailedFilters;
import ee.pw.hackathon.besthackingleagueproject.dto.output.SingleEmployeeDetailedResponse;
import ee.pw.hackathon.besthackingleagueproject.dto.output.SingleEmployeeMatchingTextResponse;
import ee.pw.hackathon.besthackingleagueproject.service.TaskService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.azd.exceptions.AzDException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@Slf4j
class TaskController {

    private final TaskService taskService;

    @PostMapping("/matching-tasks")
    public ResponseEntity<Page<SingleEmployeeMatchingTextResponse>> handleSearchingForMatchingTextTasks(
            @PageableDefault Pageable pageable,
            @RequestBody SearchFiltersInput searchFiltersInput
    ) throws AzDException {
        return ResponseEntity.ok(
                taskService.getAggregatedResponseBasedOnSearchFilters(
                        searchFiltersInput,
                        pageable
                )
        );
    }

    @GetMapping("/single-employee-details")
    public ResponseEntity<SingleEmployeeDetailedResponse> handleSingleEmployeeDetailedResponse(
            @RequestBody SingleEmployeeDetailedFilters singleEmployeeDetailedFilters
    ) {
        return ResponseEntity.ok(
                taskService.getSingleEmployeeDetailedResponse(
                        singleEmployeeDetailedFilters
                )
        );
    }
}
