package ee.pw.hackathon.besthackingleagueproject.dto.input;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.jackson.Jacksonized;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Jacksonized
@Builder
class SingleEmployeeDetailedFilters {

	private List<String> matchingTasksIds;
}
