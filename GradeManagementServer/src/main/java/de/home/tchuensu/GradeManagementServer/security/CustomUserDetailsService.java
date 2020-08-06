package de.home.tchuensu.GradeManagementServer.security;

import de.home.tchuensu.GradeManagementServer.dao.repository.StaffRepository;
import de.home.tchuensu.GradeManagementServer.dao.repository.StudentRepository;
import de.home.tchuensu.GradeManagementServer.model.entity.Credential;
import de.home.tchuensu.GradeManagementServer.model.entity.Role;
import de.home.tchuensu.GradeManagementServer.model.entity.Staff;
import de.home.tchuensu.GradeManagementServer.model.entity.Student;
import de.home.tchuensu.GradeManagementServer.services.entity.CredentialServiceImpl;
import de.home.tchuensu.GradeManagementServer.services.entity.StaffServiceImpl;
import de.home.tchuensu.GradeManagementServer.services.entity.StudentServiceImpl;
import de.home.tchuensu.GradeManagementServer.web.exception.CredentialNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static java.util.Collections.emptyList;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private CredentialServiceImpl credentialService;

    @Autowired
    private StudentServiceImpl studentService;


    @Autowired
    private StaffServiceImpl staffService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Credential credential;
        List<GrantedAuthority> authorities;
        String studentOrStaffNumber = "";
        try {
            credential = credentialService.getByUsername(username);
            authorities = getUserAuthority(credential.getRoles());

            if(studentService.checkExistsByCredential(credential)) {

                Student student = studentService.getByCredential(credential);
                studentOrStaffNumber = student.getStudentNumber();

            } else if(staffService.checkExistsByCredential(credential)) {

                Staff staff = staffService.getByCredential(credential);
                studentOrStaffNumber = staff.getStaffNumber();
            }

        }catch (CredentialNotFoundException cnfe) {
            throw new UsernameNotFoundException(cnfe.getMessage());
        }
        return new CustomUserDetails(credential.getUsername(), credential.getPasswordHash(), studentOrStaffNumber, authorities);
    }

    private List<GrantedAuthority> getUserAuthority(Set<Role> credentialRoles) {
        Set<GrantedAuthority> roles = new HashSet<>();
        credentialRoles.forEach((role) -> {
            roles.add(new SimpleGrantedAuthority(role.getName().name()));
        });
        return new ArrayList<GrantedAuthority>(roles);
    }
}
