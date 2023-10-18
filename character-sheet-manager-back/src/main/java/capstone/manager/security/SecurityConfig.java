package capstone.manager.security;

import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@ConditionalOnWebApplication
public class SecurityConfig {

    private final JwtConvert jwtConverter;

    public SecurityConfig(JwtConvert jwtConverter) {
        this.jwtConverter = jwtConverter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, AuthenticationConfiguration authConfig) throws Exception {

        http.csrf(csrf -> csrf.disable());

        http.cors(cors -> cors.configure(http));

        http.authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.POST, "/api/login").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/register").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/refresh-token").authenticated()
                .requestMatchers(HttpMethod.GET, "/api/game", "/api/game/*").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/game").authenticated()
                .requestMatchers(HttpMethod.PUT, "/api/game/*").authenticated()
                .requestMatchers(HttpMethod.DELETE, "/api/game/*").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/category").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/category").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/category/*").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/category/*").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/availability").permitAll()
                .requestMatchers("/**").denyAll());

        http.addFilter(new JwtRequestFilter(authenticationManager(authConfig), jwtConverter));
        http.sessionManagement(configurer -> configurer
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }
}
