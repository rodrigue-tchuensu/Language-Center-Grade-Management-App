package de.home.tchuensu.GradeManagementServer.dao.dto.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CredentialDto {

    private String username;

    @JsonIgnore
    private String passwordHash;

    private Set<RoleDto> roles;
}
