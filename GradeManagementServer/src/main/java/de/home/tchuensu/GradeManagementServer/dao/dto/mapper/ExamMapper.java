package de.home.tchuensu.GradeManagementServer.dao.dto.mapper;

import de.home.tchuensu.GradeManagementServer.dao.dto.model.ExamDto;
import de.home.tchuensu.GradeManagementServer.model.entity.Exam;

public class ExamMapper {

    public static ExamDto toDto(Exam exam) {

        return new ExamDto(
                exam.getIdExam().getExamDate(),
                exam.getIdExam().getExamLevel()
        );
    }
}
