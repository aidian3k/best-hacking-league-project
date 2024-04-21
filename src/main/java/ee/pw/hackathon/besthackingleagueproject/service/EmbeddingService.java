package ee.pw.hackathon.besthackingleagueproject.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmbeddingService {

    private final MediaService mediaService;
    private final ProjectsService projectsService;
}
