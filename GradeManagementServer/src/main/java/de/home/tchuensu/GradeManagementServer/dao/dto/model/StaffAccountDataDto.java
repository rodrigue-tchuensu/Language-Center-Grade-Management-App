package de.home.tchuensu.GradeManagementServer.dao.dto.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
public class StaffAccountDataDto {

    private StaffDto staffDto;
    private Set<RoleDto> rolesDto = new HashSet<>();

    public StaffAccountDataDto(StaffDto staffDto, Set<RoleDto> rolesDto) {
        this.staffDto = staffDto;
        this.rolesDto = rolesDto;
    }
}
