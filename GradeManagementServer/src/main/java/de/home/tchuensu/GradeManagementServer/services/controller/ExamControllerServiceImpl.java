package de.home.tchuensu.GradeManagementServer.services.controller;

import de.home.tchuensu.GradeManagementServer.dao.dto.mapper.ExamMapper;
import de.home.tchuensu.GradeManagementServer.dao.dto.model.ExamDto;
import de.home.tchuensu.GradeManagementServer.model.entity.Exam;
import de.home.tchuensu.GradeManagementServer.services.entity.ExamServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class ExamControllerServiceImpl implements ExamControllerService {

    @Autowired
    ExamServiceImpl examService;

    @Override
    public ResponseEntity<ExamDto> processCreateExam(ExamDto examDto) {

        Exam exam = examService.create(examDto);
        ExamDto exmDto = ExamMapper.toDto(exam);
        return new ResponseEntity<>(exmDto, HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<LocalDate> processGetLatestExamDate() {
        LocalDate latestDate = examService.getLatestExamDate();
        return new ResponseEntity<>(latestDate, HttpStatus.OK);
    }
}
