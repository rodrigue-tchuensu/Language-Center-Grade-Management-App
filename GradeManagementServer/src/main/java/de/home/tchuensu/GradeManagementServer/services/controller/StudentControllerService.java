package de.home.tchuensu.GradeManagementServer.services.controller;

import de.home.tchuensu.GradeManagementServer.dao.dto.model.StudentAccountDataDto;
import de.home.tchuensu.GradeManagementServer.dao.dto.model.StudentDto;
import de.home.tchuensu.GradeManagementServer.dao.dto.model.projection.StudentLimitedInfos;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface StudentControllerService {

    public ResponseEntity<StudentDto> processCreateStudent(StudentAccountDataDto studentAccountDataDto);
    public ResponseEntity<List<StudentLimitedInfos>> processGetLimitedInfos(Optional<String> level);
    public ResponseEntity<StudentDto> processGetByStudentNumber(String studentNumber);
}
