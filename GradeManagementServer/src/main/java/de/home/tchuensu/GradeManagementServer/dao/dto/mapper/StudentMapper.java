package de.home.tchuensu.GradeManagementServer.dao.dto.mapper;

import de.home.tchuensu.GradeManagementServer.dao.dto.model.StudentDto;
import de.home.tchuensu.GradeManagementServer.model.entity.Student;

public class StudentMapper {

    public static StudentDto toDto(Student student) {

        StudentDto studentDto = new StudentDto(
                student.getFirstname(),
                student.getLastname(),
                student.getDateOfBirth(),
                student.getPhoneNumber(),
                student.getEmail(),
                student.getCurrentLevel()
        );

        if(student.getStudentNumber() != null){
            studentDto.setStudentNumber(student.getStudentNumber());
        }

        return studentDto;
    }

    public static Student fromDto(StudentDto studentDto) {
        return null;
    }

}
