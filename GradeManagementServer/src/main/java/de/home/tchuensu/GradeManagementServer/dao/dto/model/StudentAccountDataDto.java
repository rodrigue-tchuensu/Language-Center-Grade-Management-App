package de.home.tchuensu.GradeManagementServer.dao.dto.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
public class StudentAccountDataDto {

    private StudentDto studentDto;
    private Set<RoleDto> rolesDto = new HashSet<>();

    public StudentAccountDataDto(StudentDto studentDto, Set<RoleDto> rolesDto) {
        this.studentDto = studentDto;
        this.rolesDto = rolesDto;
    }
}
