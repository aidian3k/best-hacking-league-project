package ee.pw.hackathon.besthackingleagueproject.domain.employeefinding;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "azure-devops")
@Getter
@Setter
public class AzureDevopsConfiguration {
    private String organization;
    private String apiKey;
}
