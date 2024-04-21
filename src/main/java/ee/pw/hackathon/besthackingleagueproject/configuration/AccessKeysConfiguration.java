package ee.pw.hackathon.besthackingleagueproject.configuration;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
@ConfigurationProperties(prefix = "access-keys")
public class AccessKeysConfiguration {

	private String openAi;
	private String awsAccessKey;
	private String awsSecretKey;
}
