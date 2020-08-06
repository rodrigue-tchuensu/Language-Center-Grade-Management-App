package de.home.tchuensu.GradeManagementServer.services.controller;

import de.home.tchuensu.GradeManagementServer.dao.dto.model.ExamDto;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;

public interface ExamControllerService {

    public ResponseEntity<ExamDto> processCreateExam(ExamDto examDto);

    public ResponseEntity<LocalDate> processGetLatestExamDate();
}
