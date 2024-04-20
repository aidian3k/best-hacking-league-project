package ee.pw.hackathon.besthackingleagueproject.dto.output;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.jackson.Jacksonized;
import org.azd.common.types.Author;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Jacksonized
@Builder
public class SingleEmployeeMatchingTextResponse {

    private Author author;
    private String projectName;
    private double totalNumberOfStoryPoints;
    private Long totalNumberOfFoundTasks;
    private String employeeTitle;
    private List<Integer> matchingTasksIds;
}
