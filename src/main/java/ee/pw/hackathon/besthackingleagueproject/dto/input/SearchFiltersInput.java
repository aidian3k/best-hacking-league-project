package ee.pw.hackathon.besthackingleagueproject.dto.input;

import ee.pw.hackathon.besthackingleagueproject.domain.employeefinding.ProjectManagementPlatform;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.jackson.Jacksonized;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Builder
@NoArgsConstructor
@Jacksonized
public class SearchFiltersInput {

    private List<String> searchText;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate startingDate;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate endingDate;

    private List<String> projectIds;
    private boolean isSearchingActiveEmployees;
    private List<ProjectManagementPlatform> projectManagementPlatforms;
}
