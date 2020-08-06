package de.home.tchuensu.GradeManagementServer.security;

import de.home.tchuensu.GradeManagementServer.model.entity.RoleNames;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class WebSecurityConfigurationAdapter extends WebSecurityConfigurerAdapter {

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(customUserDetailsService)
                .passwordEncoder(bCryptPasswordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors().and().csrf().disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.GET, "/api/exams/latest-date").permitAll()
                .antMatchers(HttpMethod.POST, SecurityConstants.CREATE_STUDENT_URL, SecurityConstants.CREATE_STAFF_URL).hasAuthority(RoleNames.ROLE_STAFF_ADMIN.name())
                .antMatchers(HttpMethod.POST, SecurityConstants.CREATE_EXAMS_URL).hasAnyAuthority(RoleNames.ROLE_STAFF_ADMIN.name(), RoleNames.ROLE_STAFF_MANAGER.name())
                .antMatchers(HttpMethod.GET, SecurityConstants.GET_STAFF_LIMITED_INFOS_URL).hasAnyAuthority(RoleNames.ROLE_STAFF_ADMIN.name(), RoleNames.ROLE_STAFF_MANAGER.name())
                .antMatchers(HttpMethod.GET, SecurityConstants.GET_STUDENT_LIMITED_INFOS_URL).hasAnyAuthority(RoleNames.ROLE_STAFF_ADMIN.name(), RoleNames.ROLE_STAFF_MANAGER.name(), RoleNames.ROLE_STAFF_TEACHER.name())
                .anyRequest().authenticated()
                .and()
                .addFilter(new JWTAuthenticationFilter(authenticationManager()))
                .addFilter(new JWTAuthorizationFilter(authenticationManager()))
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
        return source;
    }
}
