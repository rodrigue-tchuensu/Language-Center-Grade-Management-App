package de.home.tchuensu.GradeManagementServer.dao.dto.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MarkDto {
    private String subjectName;
    private Double score;
    private String grade;
    private String studentNumber;
    private String staffNumber;
    private LocalDate examDate;
    private String examLevel;
}
