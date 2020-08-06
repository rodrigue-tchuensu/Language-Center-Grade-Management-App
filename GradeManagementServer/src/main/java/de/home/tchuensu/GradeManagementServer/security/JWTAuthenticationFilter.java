package de.home.tchuensu.GradeManagementServer.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.home.tchuensu.GradeManagementServer.dao.dto.model.AuthenticationData;
import de.home.tchuensu.GradeManagementServer.web.exception.CredentialNotReadException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.crypto.SecretKey;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private AuthenticationManager authenticationManager;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }



    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        try {
            AuthenticationData authenticationData = new ObjectMapper()
                    .readValue(request.getInputStream(), AuthenticationData.class);

            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authenticationData.getUsername(),
                            authenticationData.getPassword(),
                            new ArrayList<>()
                    )
            );
        } catch(IOException e) {
            throw new CredentialNotReadException("The Credentials could not be read");
        }

    }


    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {

        SecretKey key = Keys.hmacShaKeyFor(SecurityConstants.SECRET.getBytes(StandardCharsets.UTF_8)); //or HS384 or HS512
        String secretString = Encoders.BASE64.encode(key.getEncoded());

        if(authResult.getPrincipal() != null) {

            CustomUserDetails user = (CustomUserDetails)authResult.getPrincipal();
            String username = user.getUsername();

            if(username != null && username.length() > 0) {

                List<String> roles = new ArrayList<>();

                user.getAuthorities().stream().forEach(authority ->
                        roles.add(authority.getAuthority()));

                 String token = Jwts.builder()
                        .setHeaderParam("typ", "jwt")
                        .claim("roles", roles)
                        .setSubject(username)
                        .claim("studentOrStaffNumber", user.getStudentOrStaffNumber())
                        .setExpiration(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME))
                        .signWith(key)
                        .compact();

                response.addHeader(SecurityConstants.HEADER_STRING, SecurityConstants.TOKEN_PREFIX + token);

                response.setHeader("Access-Control-Expose-Headers" ,"Authorization");
            }
        }
    }
}
