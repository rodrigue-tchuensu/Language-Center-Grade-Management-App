package de.home.tchuensu.GradeManagementServer.dao.repository;

import de.home.tchuensu.GradeManagementServer.model.entity.Role;
import de.home.tchuensu.GradeManagementServer.model.entity.RoleNames;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByName(RoleNames roleName);
}
