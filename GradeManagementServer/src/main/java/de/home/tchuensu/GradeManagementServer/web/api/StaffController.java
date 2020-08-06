package de.home.tchuensu.GradeManagementServer.web.api;

import de.home.tchuensu.GradeManagementServer.dao.dto.mapper.StaffMapper;
import de.home.tchuensu.GradeManagementServer.dao.dto.model.StaffAccountDataDto;
import de.home.tchuensu.GradeManagementServer.dao.dto.model.StaffDto;
import de.home.tchuensu.GradeManagementServer.dao.dto.model.projection.StaffLimitedInfos;
import de.home.tchuensu.GradeManagementServer.model.entity.Staff;
import de.home.tchuensu.GradeManagementServer.services.controller.StaffControllerServiceImpl;
import de.home.tchuensu.GradeManagementServer.services.entity.StaffServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@CrossOrigin(origins = "*")
@RequestMapping("staffs")
public class StaffController {

    @Autowired
    private StaffControllerServiceImpl staffControllerService;

    @Autowired
    private StaffServiceImpl staffService;

    @PostMapping
    public ResponseEntity<StaffDto> addStaff(@RequestHeader("Authorization") String authenticationToken, @RequestBody StaffAccountDataDto staffAccountDataDto) {
        return staffControllerService.processCreateStaff(staffAccountDataDto);
    }

    @GetMapping
    public ResponseEntity<List<Staff>> get(@RequestHeader("Authorization") String authenticationToken) {

        List staffs = staffService.getAll();
        return new ResponseEntity<>(staffs, HttpStatus.OK);
    }

    @GetMapping("limitedInfos")
    public ResponseEntity<List<StaffLimitedInfos>> getStaffLimitedInfos(@RequestHeader("Authorization") String authenticationToken) {
        return staffControllerService.processGetLimitedInfos();
    }

    @GetMapping("{staffNumber}")
    public ResponseEntity<StaffDto> getByStaffNumber(@RequestHeader("Authorization") String authenticationToken, @PathVariable String staffNumber){
        return staffControllerService.processGetByStaffNumber(staffNumber);
    }
}
