package de.home.tchuensu.GradeManagementServer.web.api;

import de.home.tchuensu.GradeManagementServer.dao.dto.mapper.StudentMapper;
import de.home.tchuensu.GradeManagementServer.dao.dto.model.StudentAccountDataDto;
import de.home.tchuensu.GradeManagementServer.dao.dto.model.StudentDto;
import de.home.tchuensu.GradeManagementServer.dao.dto.model.projection.StudentLimitedInfos;
import de.home.tchuensu.GradeManagementServer.dao.repository.StudentRepository;
import de.home.tchuensu.GradeManagementServer.model.entity.Student;
import de.home.tchuensu.GradeManagementServer.services.controller.StudentControllerServiceImpl;
import de.home.tchuensu.GradeManagementServer.services.entity.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("students")
@CrossOrigin(origins = "*")
public class StudentController {

    @Autowired
    StudentService studentService;

    @Autowired
    StudentControllerServiceImpl studentControllerService;

    @Autowired
    StudentRepository studentRepository;

    @PostMapping
    public ResponseEntity<StudentDto> addStudent(@RequestHeader("Authorization") String authenticationToken, @RequestBody StudentAccountDataDto studentAccountDataDto) {
        return studentControllerService.processCreateStudent(studentAccountDataDto);
    }

    @GetMapping
    public ResponseEntity<List<Student> > getAll() {

        List<Student> students = studentService.getAll();
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    @GetMapping("limitedInfos")
    public ResponseEntity<List<StudentLimitedInfos>> getStudentLimitedInfos(@RequestHeader("Authorization") String authenticationToken, @RequestParam("level") Optional<String> level) {
        return studentControllerService.processGetLimitedInfos(level);
    }

    @GetMapping("{studentNumber}")
    public ResponseEntity<StudentDto> getByStudentNumber(@RequestHeader("Authorization") String authenticationToken, @PathVariable String studentNumber) {
        return studentControllerService.processGetByStudentNumber(studentNumber);
    }


}
