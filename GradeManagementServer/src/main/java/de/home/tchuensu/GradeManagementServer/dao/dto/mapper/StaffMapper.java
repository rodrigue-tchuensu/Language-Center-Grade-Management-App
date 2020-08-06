package de.home.tchuensu.GradeManagementServer.dao.dto.mapper;

import de.home.tchuensu.GradeManagementServer.dao.dto.model.StaffDto;
import de.home.tchuensu.GradeManagementServer.model.entity.Staff;

public class StaffMapper {

    public static StaffDto toDto(Staff staff) {

        StaffDto staffDto = new StaffDto(
                staff.getFirstname(),
                staff.getLastname(),
                staff.getDateOfBirth(),
                staff.getPhoneNumber(),
                staff.getEmail(),
                staff.getOfficePhoneNumber(),
                staff.getOfficeNumber()
        );

        if(staff.getStaffNumber() != null) {
            staffDto.setStaffNumber(staff.getStaffNumber());
        }

        return staffDto;
    }

    public static Staff fromDto(StaffDto staffDto) {
        return null;
    }
}
