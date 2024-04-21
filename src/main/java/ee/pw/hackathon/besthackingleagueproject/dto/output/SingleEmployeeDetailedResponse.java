package ee.pw.hackathon.besthackingleagueproject.dto.output;

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
@Builder
@Jacksonized
public class SingleEmployeeDetailedResponse {

    private ProjectDetailedTaskInformation projectDetailedTaskInformation;
    private List<SingleMatchingTaskDetail> singleMatchingTaskDetail;
}
