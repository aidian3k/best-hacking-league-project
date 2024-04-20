package ee.pw.hackathon.besthackingleagueproject.controller;

import ee.pw.hackathon.besthackingleagueproject.service.ProjectsService;
import lombok.RequiredArgsConstructor;
import org.azd.core.types.Project;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
class ProjectsController {
    private final ProjectsService projectsService;

    @GetMapping
    public List<Project> handleGetProjectsRequest() {
        return projectsService.getOrganizationProjects();
    }
}
