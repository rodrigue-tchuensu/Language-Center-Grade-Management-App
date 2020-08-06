package de.home.tchuensu.GradeManagementServer.dao.dto.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@NoArgsConstructor
public class StudentDto {

    private String studentNumber;
    private String firstname;
    private String lastname;
    private LocalDate dateOfBirth;
    private String phoneNumber;
    private String email;
    private String currentLevel;

    public StudentDto(String firstname, String lastname, LocalDate dateOfBirth, String phoneNumber, String email, String currentLevel) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.dateOfBirth = dateOfBirth;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.currentLevel = currentLevel;
    }
}
