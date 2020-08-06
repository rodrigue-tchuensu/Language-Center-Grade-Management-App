package de.home.tchuensu.GradeManagementServer.dao.dto.mapper;

import de.home.tchuensu.GradeManagementServer.dao.dto.model.CredentialDto;
import de.home.tchuensu.GradeManagementServer.dao.dto.model.RoleDto;
import de.home.tchuensu.GradeManagementServer.model.entity.Credential;
import de.home.tchuensu.GradeManagementServer.model.entity.Role;

import java.util.HashSet;
import java.util.Set;

public class CredentialMapper {

    public static CredentialDto toDto(Credential credential) {

        Set<RoleDto> credRoles = new HashSet<>();
        for(Role role  : credential.getRoles()){
            credRoles.add(RoleMapper.tDto(role));
        }

        return new CredentialDto(
                credential.getUsername(),
                credential.getPasswordHash(),
                credRoles
                );
    }


    /*public static Credential fromDto() {
        return null;
    }*/

}
