package de.home.tchuensu.GradeManagementServer.services.controller;

import de.home.tchuensu.GradeManagementServer.dao.dto.model.StaffAccountDataDto;
import de.home.tchuensu.GradeManagementServer.dao.dto.model.StaffDto;
import de.home.tchuensu.GradeManagementServer.dao.dto.model.projection.StaffLimitedInfos;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface StaffControllerService {

    public ResponseEntity<StaffDto> processCreateStaff(StaffAccountDataDto staffAccountDataDto);
    public ResponseEntity<List<StaffLimitedInfos>> processGetLimitedInfos();
    public ResponseEntity<StaffDto> processGetByStaffNumber(String staffNumber);
}
