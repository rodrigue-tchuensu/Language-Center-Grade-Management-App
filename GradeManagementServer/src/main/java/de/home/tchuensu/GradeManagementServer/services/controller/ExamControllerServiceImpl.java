package de.home.tchuensu.GradeManagementServer.services.controller;

import de.home.tchuensu.GradeManagementServer.dao.dto.mapper.ExamMapper;
import de.home.tchuensu.GradeManagementServer.dao.dto.model.ExamDto;
import de.home.tchuensu.GradeManagementServer.dao.dto.model.ScheduledExamsDataDto;
import de.home.tchuensu.GradeManagementServer.model.entity.Exam;
import de.home.tchuensu.GradeManagementServer.services.entity.ExamServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.LinkedList;
import java.util.List;

@Service
public class ExamControllerServiceImpl implements ExamControllerService {

    @Autowired
    ExamServiceImpl examService;

    @Override
    public ResponseEntity<List<ExamDto>> processCreateExam(ScheduledExamsDataDto scheduledExamsDataDto ) {

        List<ExamDto> examsList = new LinkedList<>();
        LocalDate examDate = scheduledExamsDataDto.getExamDate();

        for(String level : scheduledExamsDataDto.getExamLevels()) {
            System.out.println("the value of level is:" + level);
            Exam exam = examService.create(new ExamDto(examDate, level));
            examsList.add(ExamMapper.toDto(exam));
        }
        return new ResponseEntity<>(examsList , HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<LocalDate> processGetLatestExamDate() {
        LocalDate latestDate = examService.getLatestExamDate();
        return new ResponseEntity<>(latestDate, HttpStatus.OK);
    }
}
