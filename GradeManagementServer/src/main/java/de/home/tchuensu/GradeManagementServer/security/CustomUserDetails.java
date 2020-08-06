package de.home.tchuensu.GradeManagementServer.security;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

public class CustomUserDetails extends User {
    @Getter
    private String studentOrStaffNumber;

    public CustomUserDetails(String username, String password, String studentOrStaffNumber, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
        this.studentOrStaffNumber = studentOrStaffNumber;
    }

}
