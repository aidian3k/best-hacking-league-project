package ee.pw.hackathon.besthackingleagueproject.controller;

import ee.pw.hackathon.besthackingleagueproject.domain.embeddings.media.Media;
import ee.pw.hackathon.besthackingleagueproject.service.MediaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/media")
class MediaController {

    private final MediaService mediaService;

    @PostMapping(
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            value = "/upload-image"
    )
    public ResponseEntity<Media> uploadImage(
            @RequestParam("file") MultipartFile multipartFile
    ) {
        Media media = mediaService.uploadImage(multipartFile);

        return new ResponseEntity<>(media, HttpStatus.OK);
    }

    @GetMapping(value = "/get-file")
    public ResponseEntity<byte[]> downloadFile(
            @RequestParam("file-name") String fileName
    ) {
        byte[] imageBytes = mediaService.getFileFromS3Bucket(fileName);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        httpHeaders.setContentDisposition(
                ContentDisposition.attachment().filename(fileName).build()
        );

        return new ResponseEntity<>(imageBytes, httpHeaders, HttpStatus.OK);
    }
}
