package ee.pw.hackathon.besthackingleagueproject.configuration;

import com.azure.ai.openai.OpenAIClient;
import com.azure.ai.openai.OpenAIClientBuilder;
import com.azure.core.credential.KeyCredential;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class OpenAiConfiguration {

    private final AccessKeysConfiguration accessKeysConfiguration;

    @Bean
    public OpenAIClient configureOpenAIClient() {
        return new OpenAIClientBuilder()
                .credential(new KeyCredential(accessKeysConfiguration.getOpenAi()))
                .buildClient();
    }
}
