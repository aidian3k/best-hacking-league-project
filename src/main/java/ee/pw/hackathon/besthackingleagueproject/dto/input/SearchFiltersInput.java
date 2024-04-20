package ee.pw.hackathon.besthackingleagueproject.dto.input;

import ee.pw.hackathon.besthackingleagueproject.domain.ProjectManagementPlatform;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class SearchFiltersInput {

    private List<String> searchText;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime startingDate;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime endingDate;

    private List<String> projectIds;
    private boolean isSearchingActiveEmployees;
    private List<ProjectManagementPlatform> projectManagementPlatforms;
}
