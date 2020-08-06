package de.home.tchuensu.GradeManagementServer.dao.dto.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationData {
    private String username;
    private String password;
}
