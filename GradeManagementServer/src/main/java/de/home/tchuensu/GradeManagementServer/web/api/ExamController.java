package de.home.tchuensu.GradeManagementServer.web.api;

import de.home.tchuensu.GradeManagementServer.dao.dto.model.ExamDto;
import de.home.tchuensu.GradeManagementServer.services.controller.ExamControllerServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@Controller
@CrossOrigin(origins = "*")
@RequestMapping("exams")
public class ExamController {

    @Autowired
    ExamControllerServiceImpl examControllerService;

    @PostMapping
    public ResponseEntity<ExamDto> create(@RequestHeader("Authorization") String authenticationToken, @RequestBody ExamDto examDto) {

        return  examControllerService.processCreateExam(examDto);
    }

    @GetMapping("latest-date")
    public ResponseEntity<LocalDate> getLatestDate(@RequestHeader("Authorization") String authenticationToken) {
       return examControllerService.processGetLatestExamDate();
    }
}
