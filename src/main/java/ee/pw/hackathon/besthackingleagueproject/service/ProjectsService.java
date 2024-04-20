package ee.pw.hackathon.besthackingleagueproject.service;

import ee.pw.hackathon.besthackingleagueproject.domain.AzDoCoreApiConfiguration;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.azd.core.types.Project;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectsService {

    private final AzDoCoreApiConfiguration azDoCoreApiConfiguration;

    @SneakyThrows
    public List<Project> getOrganizationProjects() {
        return azDoCoreApiConfiguration
                .getAzureDevopsApi()
                .getCoreApi()
                .getProjects()
                .getProjects();
    }
}
