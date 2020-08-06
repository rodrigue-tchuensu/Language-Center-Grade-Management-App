package de.home.tchuensu.GradeManagementServer.services.controller;

import de.home.tchuensu.GradeManagementServer.dao.dto.mapper.StudentMapper;
import de.home.tchuensu.GradeManagementServer.dao.dto.model.CredentialDto;
import de.home.tchuensu.GradeManagementServer.dao.dto.model.StudentAccountDataDto;
import de.home.tchuensu.GradeManagementServer.dao.dto.model.StudentDto;
import de.home.tchuensu.GradeManagementServer.dao.dto.model.projection.StudentLimitedInfos;
import de.home.tchuensu.GradeManagementServer.model.domain.SimpleMail;
import de.home.tchuensu.GradeManagementServer.model.entity.Credential;
import de.home.tchuensu.GradeManagementServer.model.entity.Student;
import de.home.tchuensu.GradeManagementServer.services.entity.CredentialServiceImpl;
import de.home.tchuensu.GradeManagementServer.services.entity.StudentServiceImpl;
import de.home.tchuensu.GradeManagementServer.services.mail.EmailServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class StudentControllerServiceImpl implements  StudentControllerService {

    @Autowired
    StudentServiceImpl studentService;

    @Autowired
    CredentialServiceImpl credentialService;

    @Autowired
    EmailServiceImpl emailService;

    @Transactional
    @Override
    public ResponseEntity<StudentDto> processCreateStudent(StudentAccountDataDto studentAccountDataDto) {

        StudentDto studentDto = studentAccountDataDto.getStudentDto();

        String defaultPassword = credentialService.generatePassword();
        String username        = credentialService.generateUsernames(studentDto.getFirstname(), studentDto.getLastname());

        Credential credential = credentialService.create( new CredentialDto(
                username,
                defaultPassword,
                studentAccountDataDto.getRolesDto())
        );

        // Create and save student data to the database
        Student student = studentService.create(studentDto, credential);

        StudentDto sdtDto = StudentMapper.toDto(student);


        SimpleMail welcomeMail = emailService.generateWelcomeMail(username, defaultPassword);

        // Send the welcome e-mail to the student having this account
        emailService.sendSimpleMessage(studentDto.getEmail(), welcomeMail.getMailSubject(), welcomeMail.getMailBody());

        return new ResponseEntity<>(sdtDto, HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<List<StudentLimitedInfos>> processGetLimitedInfos(Optional<String> level) {

        List<StudentLimitedInfos> studentLimitedInfos;
        if(level.isPresent()) {
            studentLimitedInfos = studentService.getAllLimitedInfosByLevel(level.get());
        } else {
            studentLimitedInfos = studentService.getAllLimitedInfos();
        }

        return new ResponseEntity<>(studentLimitedInfos, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<StudentDto> processGetByStudentNumber(String studentNumber) {
        Student student =  studentService.getByStudentNumber(studentNumber);
        StudentDto studentDto = StudentMapper.toDto(student);
        return new ResponseEntity<>(studentDto, HttpStatus.OK);
    }
}
