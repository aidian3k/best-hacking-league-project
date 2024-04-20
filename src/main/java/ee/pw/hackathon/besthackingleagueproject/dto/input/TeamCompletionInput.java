package ee.pw.hackathon.besthackingleagueproject.dto.input;

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
@Builder
@Jacksonized
public class TeamCompletionInput {
    private int teamSize;

}
