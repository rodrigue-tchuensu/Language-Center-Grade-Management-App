package de.home.tchuensu.GradeManagementServer.web.api;

import de.home.tchuensu.GradeManagementServer.dao.dto.mapper.MarkMapper;
import de.home.tchuensu.GradeManagementServer.dao.dto.model.MarkDto;
import de.home.tchuensu.GradeManagementServer.dao.dto.model.projection.MarkSummary;
import de.home.tchuensu.GradeManagementServer.dao.repository.MarkRepository;
import de.home.tchuensu.GradeManagementServer.model.entity.Mark;
import de.home.tchuensu.GradeManagementServer.services.controller.MarkControllerServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDate;
import java.util.LinkedList;
import java.util.List;

@Controller
@CrossOrigin(origins = "*")
@RequestMapping("marks")
public class MarkController {

    @Autowired
    MarkControllerServiceImpl markControllerService;

    @Autowired
    MarkRepository markRepository;


    @PostMapping
    public ResponseEntity<MarkDto> create(@RequestHeader("Authorization") String authenticationToken, @RequestBody MarkDto markDto) {
        return markControllerService.processCreateMark(markDto);
    }


    @GetMapping("exam-dates")
    public ResponseEntity<List<Date>> getExamDatesStudentParticipated(@RequestHeader("Authorization") String authenticationToken, @RequestParam("studentNumber")String  studentNumber) {
        return markControllerService.processGetExamDates(studentNumber);
    }

    @GetMapping
    public ResponseEntity<List<MarkDto>> getMarksByStudentNumberAndByExaDate(@RequestHeader("Authorization") String authenticationToken, @RequestParam("studentNumber") String studentNumber, @RequestParam("examDate") String examDate) {
        return markControllerService.processGetMarksByStudentNumberAndByExamDate(studentNumber, examDate);
    }

    @GetMapping("latest-completely-assessed-exam-session")
    public ResponseEntity<List<MarkSummary>> getLatestMarksForAllSubjectsOfATerminatedExamSession(@RequestHeader("Authorization") String authenticationToken, @RequestParam("studentNumber") String studentNumber) {
        return markControllerService.processGetLatestCompletelyAssessedMarksByStudentNumber(studentNumber);
    }

    @GetMapping("exam-report")
    public ResponseEntity<List<MarkSummary>> getMarksReportByExamSession(@RequestHeader("Authorization") String authenticationToken, @RequestParam("studentNumber") String studentNumber, @RequestParam("examDate") String examDate) {
        return markControllerService.processGetMarksByExamSession(studentNumber, examDate);
    }



}
