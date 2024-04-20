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
public class SingleMatchingTaskDetail {
    private String taskId;
    private Long storyPoints;
    private String taskName;
    private String taskDescription; // should be only one matched from the task
    private String taskStatus;
    private String taskUrl;
}
