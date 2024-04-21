package ee.pw.hackathon.besthackingleagueproject.configuration;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class AmazonConfiguration {

    private final AccessKeysConfiguration accessKeysConfiguration;

    @Bean
    public AmazonS3 amazonS3Service() {
        var credentialsProvider = new BasicAWSCredentials(
                accessKeysConfiguration.getAwsAccessKey(),
                accessKeysConfiguration.getAwsSecretKey()
        );

        return AmazonS3ClientBuilder
                .standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentialsProvider))
                .withRegion(Regions.EU_WEST_1)
                .build();
    }
}
