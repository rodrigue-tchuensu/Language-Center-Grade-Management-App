package de.home.tchuensu.GradeManagementServer.dao.dto.mapper;

import de.home.tchuensu.GradeManagementServer.dao.dto.model.RoleDto;
import de.home.tchuensu.GradeManagementServer.model.entity.Role;

public class RoleMapper {

    public static RoleDto tDto(Role role) {

        return new RoleDto(role.getName().name());
    }

    //public static Role fromDto(RoleDto){}
}
