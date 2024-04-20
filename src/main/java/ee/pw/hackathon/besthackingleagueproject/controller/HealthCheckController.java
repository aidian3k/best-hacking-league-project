package ee.pw.hackathon.besthackingleagueproject.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/api/v1/health")
class HealthCheckController {
    @GetMapping
    public String healthCheck(


    ) {
        return "Working!";
    }
}
