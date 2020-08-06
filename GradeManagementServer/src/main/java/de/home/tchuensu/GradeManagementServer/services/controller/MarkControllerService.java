package de.home.tchuensu.GradeManagementServer.services.controller;

import de.home.tchuensu.GradeManagementServer.dao.dto.model.MarkDto;
import de.home.tchuensu.GradeManagementServer.dao.dto.model.projection.MarkSummary;
import org.springframework.http.ResponseEntity;

import java.sql.Date;
import java.util.List;

public interface MarkControllerService {


    /**
     *
     * @param markDto
     * @return
     */
    public ResponseEntity<MarkDto> processCreateMark(MarkDto markDto);

    public ResponseEntity<List<Date>> processGetExamDates(String  studentNumber);

    public ResponseEntity<List<MarkDto>> processGetMarksByStudentNumberAndByExamDate(String studentNumber, String examDate);

    public ResponseEntity<List<MarkSummary>> processGetLatestCompletelyAssessedMarksByStudentNumber(String studentNumber);

    public ResponseEntity<List<MarkSummary>> processGetMarksByExamSession(String studentNumber, String examDate);

}
