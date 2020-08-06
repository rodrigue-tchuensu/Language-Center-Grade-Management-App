package de.home.tchuensu.GradeManagementServer.dao.dto.model;


import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
public class StaffDto {
    private String staffNumber;
    private String firstname;
    private String lastname;
    private LocalDate dateOfBirth;
    private String phoneNumber;
    private String email;
    private String officePhoneNumber;
    private String officeNumber;

    public StaffDto(String firstname, String lastname, LocalDate dateOfBirth, String phoneNumber, String email, String officePhoneNumber, String officeNumber) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.dateOfBirth = dateOfBirth;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.officePhoneNumber = officePhoneNumber;
        this.officeNumber = officeNumber;
    }

}
