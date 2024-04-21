package ee.pw.hackathon.besthackingleagueproject.dto.input;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.jackson.Jacksonized;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Jacksonized
public class EmbeddingsFilterInput {

    @NotNull
    private String projectName;

    @NotNull
    private String textToSearch;
}
