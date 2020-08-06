package de.home.tchuensu.GradeManagementServer.services.entity;

import de.home.tchuensu.GradeManagementServer.dao.dto.model.RoleDto;
import de.home.tchuensu.GradeManagementServer.model.entity.Role;

public interface RoleService {

    //public Role create(RoleDto role);

    public Role getByName(String name);

    public Role getById(Long id);

    //public Role update();

    //public void delete();
}
