package de.home.tchuensu.GradeManagementServer.dao.dto.model;

import lombok.Data;

import java.time.LocalDate;
import java.util.LinkedList;
import java.util.List;

@Data
public class ScheduledExamsDataDto {
    LocalDate examDate;
    List<String> examLevels;

    public ScheduledExamsDataDto(){
        this.examLevels = new LinkedList<>();
    }

    public ScheduledExamsDataDto(LocalDate examDate, List<String> examLevels) {
        this.examDate = examDate;
        this.examLevels = examLevels;
    }
}
