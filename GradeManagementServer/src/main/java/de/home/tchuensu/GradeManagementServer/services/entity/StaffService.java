package de.home.tchuensu.GradeManagementServer.services.entity;

import de.home.tchuensu.GradeManagementServer.dao.dto.model.StaffDto;
import de.home.tchuensu.GradeManagementServer.dao.dto.model.projection.StaffLimitedInfos;
import de.home.tchuensu.GradeManagementServer.model.entity.Credential;
import de.home.tchuensu.GradeManagementServer.model.entity.Staff;

import java.util.List;

public interface StaffService {

    // Create

    public Staff create(StaffDto staffDto, Credential credential);

    // Read

    public List<Staff> getAll();

    public List<StaffLimitedInfos> getAllLimitedInfos();

    public Staff getByStaffNumber(String staffNumber);

    public Staff getByCredential(Credential credential);

    public boolean checkExistsByCredential(Credential credential);

    // Update

    public Staff updateStaffNumber(String staffNumber, Long id);

    // Delete
}
