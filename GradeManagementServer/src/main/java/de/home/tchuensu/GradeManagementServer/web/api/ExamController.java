package de.home.tchuensu.GradeManagementServer.web.api;

import de.home.tchuensu.GradeManagementServer.dao.dto.model.ExamDto;
import de.home.tchuensu.GradeManagementServer.dao.dto.model.ScheduledExamsDataDto;
import de.home.tchuensu.GradeManagementServer.services.controller.ExamControllerServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@Controller
@CrossOrigin(origins = "*")
@RequestMapping("exams")
public class ExamController {

    @Autowired
    ExamControllerServiceImpl examControllerService;

    @PostMapping
    public ResponseEntity<List<ExamDto>> create(@RequestHeader("Authorization") String authenticationToken, @RequestBody ScheduledExamsDataDto scheduledExamsDataDto) {

        return  examControllerService.processCreateExam(scheduledExamsDataDto);
    }

    @GetMapping("latest-date")
    public ResponseEntity<LocalDate> getLatestDate(@RequestHeader("Authorization") String authenticationToken) {
       return examControllerService.processGetLatestExamDate();
    }
}
