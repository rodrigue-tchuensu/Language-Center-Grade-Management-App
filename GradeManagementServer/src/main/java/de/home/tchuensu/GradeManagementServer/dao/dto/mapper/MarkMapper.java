package de.home.tchuensu.GradeManagementServer.dao.dto.mapper;

import de.home.tchuensu.GradeManagementServer.dao.dto.model.MarkDto;
import de.home.tchuensu.GradeManagementServer.model.entity.Mark;

public class MarkMapper {

    public static MarkDto toDto(Mark mark) {

        return new MarkDto(
                mark.getMarkId().getSubjectName(),
                mark.getScore(),
                mark.getGrade(),
                mark.getMarkId().getStudent().getStudentNumber(),
                mark.getStaff().getStaffNumber(),
                mark.getMarkId().getExam().getIdExam().getExamDate(),
                mark.getMarkId().getExam().getIdExam().getExamLevel()
        );
    }


    public static Mark fromDto(MarkDto markDto) {
        return null;
    }
}
