package ee.pw.hackathon.besthackingleagueproject.configuration;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Clock;
import java.time.LocalDateTime;

@Configuration
@Slf4j
class ClockConfiguration {
    @Bean
    public Clock configureClock() {
        Clock clock = Clock.systemUTC();
        log.debug("Configured clock with UTC time: {}", LocalDateTime.now(clock));

        return clock;
    }
}
