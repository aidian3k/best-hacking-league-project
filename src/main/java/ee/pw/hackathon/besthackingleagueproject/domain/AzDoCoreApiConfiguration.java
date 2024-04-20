package ee.pw.hackathon.besthackingleagueproject.domain;

import lombok.Getter;
import org.azd.utils.AzDClientApi;
import org.springframework.stereotype.Component;

@Component
public class AzDoCoreApiConfiguration {

    @Getter
    private AzDClientApi azureDevopsApi;

    private final AzureDevopsConfiguration azureDevopsConfiguration;

    public AzDoCoreApiConfiguration(
            AzureDevopsConfiguration azureDevopsConfiguration
    ) {
        this.azureDevopsConfiguration = azureDevopsConfiguration;
        this.azureDevopsApi = getAzDoCoreClient();
    }

    private AzDClientApi getAzDoCoreClientForProject(String projectName) {
        return new AzDClientApi(
                azureDevopsConfiguration.getOrganization(),
                projectName,
                azureDevopsConfiguration.getApiKey()
        );
    }

    private AzDClientApi getAzDoCoreClient() {
        return new AzDClientApi(
                azureDevopsConfiguration.getOrganization(),
                azureDevopsConfiguration.getApiKey()
        );
    }
}
