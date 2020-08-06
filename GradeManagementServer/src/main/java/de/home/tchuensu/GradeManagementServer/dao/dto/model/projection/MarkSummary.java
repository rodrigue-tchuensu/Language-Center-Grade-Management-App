package de.home.tchuensu.GradeManagementServer.dao.dto.model.projection;

import java.time.LocalDate;

public interface MarkSummary {

    String getSubjectName();
    String getStatus();
    String getExamLevel();
    LocalDate getExamDate();
    Double getScore();
}
