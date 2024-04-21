package ee.pw.hackathon.besthackingleagueproject.dto.input;

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
public class SingleEmployeeDetailedFilters {

    private List<Integer> matchingTasksIds;
}
