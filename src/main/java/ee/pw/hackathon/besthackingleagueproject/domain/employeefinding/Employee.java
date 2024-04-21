package ee.pw.hackathon.besthackingleagueproject.domain.employeefinding;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode
public class Employee {

    private String id;
    private String displayName;
    private String imageUrl;
    private String uniqueName;
    private String employeeTitle;
}
