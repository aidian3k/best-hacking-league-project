package ee.pw.hackathon.besthackingleagueproject.dto.output;

import ee.pw.hackathon.besthackingleagueproject.domain.employeefinding.Employee;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.jackson.Jacksonized;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Jacksonized
@Builder
public class SingleEmployeeMatchingTextResponse {

    private Employee employee;
    private String projectName;
    private double totalNumberOfStoryPoints;
    private Long totalNumberOfFoundTasks;
    private String employeeTitle;
    private List<Integer> matchingTasksIds;
}
