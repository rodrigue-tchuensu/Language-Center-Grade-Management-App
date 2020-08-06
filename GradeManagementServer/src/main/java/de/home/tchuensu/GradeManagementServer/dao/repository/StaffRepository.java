package de.home.tchuensu.GradeManagementServer.dao.repository;

import de.home.tchuensu.GradeManagementServer.dao.dto.model.projection.StaffLimitedInfos;
import de.home.tchuensu.GradeManagementServer.model.entity.Credential;
import de.home.tchuensu.GradeManagementServer.model.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StaffRepository extends JpaRepository<Staff, Long> {

    Staff findByStaffNumber(String staffNumber);
    List<StaffLimitedInfos> findAllStaffProjectionBy();
    boolean existsByCredential(Credential cred);
    Staff findByCredential(Credential cred);
}
