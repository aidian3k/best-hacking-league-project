package ee.pw.hackathon.besthackingleagueproject.dto.output;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.jackson.Jacksonized;

import java.util.List;
import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Jacksonized
public class SingleEmployeeDetailedResponse {
    private Map<ProjectDetailedTaskInformation, List<SingleMatchingTaskDetail>> employeeTaskDetails;
}
