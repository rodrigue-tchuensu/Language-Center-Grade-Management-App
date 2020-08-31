package de.home.tchuensu.GradeManagementServer.dao.dto.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PasswordUpdateDataDto {
    private String username;
    private String currentPassword;
    private String newPassword;
}
