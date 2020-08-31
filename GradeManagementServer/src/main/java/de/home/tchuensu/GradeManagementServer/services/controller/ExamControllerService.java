package de.home.tchuensu.GradeManagementServer.services.controller;

import de.home.tchuensu.GradeManagementServer.dao.dto.model.ExamDto;
import de.home.tchuensu.GradeManagementServer.dao.dto.model.ScheduledExamsDataDto;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.List;

public interface ExamControllerService {

    public ResponseEntity<List<ExamDto>> processCreateExam(ScheduledExamsDataDto scheduledExamsDataDto);

    public ResponseEntity<LocalDate> processGetLatestExamDate();
}
