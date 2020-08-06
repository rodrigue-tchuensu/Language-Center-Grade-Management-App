package de.home.tchuensu.GradeManagementServer.dao.dto.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExamDto {

    private LocalDate examDate;
    private String examLevel;
}
