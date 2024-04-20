package ee.pw.hackathon.besthackingleagueproject.dto.output;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.jackson.Jacksonized;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Jacksonized
@Builder
public class ProjectDetailedTaskInformation {
    private String projectName;
    private Long totalNumberOfTasks;
    private double totalNumberOfStoryPoints;
}
