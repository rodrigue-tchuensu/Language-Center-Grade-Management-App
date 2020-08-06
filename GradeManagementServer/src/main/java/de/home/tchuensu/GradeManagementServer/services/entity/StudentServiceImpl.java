package de.home.tchuensu.GradeManagementServer.services.entity;


import de.home.tchuensu.GradeManagementServer.dao.dto.model.StudentDto;
import de.home.tchuensu.GradeManagementServer.dao.dto.model.projection.StudentLimitedInfos;
import de.home.tchuensu.GradeManagementServer.dao.repository.StudentRepository;
import de.home.tchuensu.GradeManagementServer.model.entity.Credential;
import de.home.tchuensu.GradeManagementServer.model.entity.Student;
import de.home.tchuensu.GradeManagementServer.web.exception.StudentNotCreatedException;
import de.home.tchuensu.GradeManagementServer.web.exception.StudentNotFoundException;
import de.home.tchuensu.GradeManagementServer.web.exception.StudentNotUpdatedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class StudentServiceImpl implements  StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    CredentialServiceImpl credentialService;

    private final List<String> POSSIBLE_LEVELS = Arrays.asList("a1", "A1", "a2", "A2","b1", "B1", "b2", "B2", "c1", "C1");

    @Override
    public Student create(StudentDto studentDto, Credential credential) {

        if(studentDto != null) {
            if(credential != null) {
                Student student = new Student(studentDto.getFirstname(), studentDto.getLastname(), studentDto.getDateOfBirth(),
                        studentDto.getPhoneNumber(), studentDto.getEmail(), studentDto.getCurrentLevel() );

                // Associate a credential to the newly created student
                student.setCredential(credential);

                // Save the new student data to the database
                student = studentRepository.save(student);

                // The studentNumber of a student depends on the id of the student in our database
                // So we can only set this field after the student has previously been stored in
                // the database and has been assigned an id.
                student = updateStudentNumber("STN" + student.getId(), student.getId());

                return student;
            }
            throw new StudentNotCreatedException("The student " + studentDto.getFirstname() + " " + studentDto.getLastname() +
                    " Could not be created du missing credentials");
        }
        throw new StudentNotCreatedException("Student creation failed. Missing student data");
    }

    @Override
    public List<Student> getAll() {

        return studentRepository.findAll();
    }

    @Override
    public List<StudentLimitedInfos> getAllLimitedInfos() {
        return studentRepository.findAllStudentProjectionBy();
    }

    @Override
    public List<StudentLimitedInfos> getAllLimitedInfosByLevel(String currentLevel) {
        if(POSSIBLE_LEVELS.contains(currentLevel)) {
            return studentRepository.findByCurrentLevel(currentLevel);
        }
        throw new StudentNotFoundException("The students could not be found, No such student level is available");
    }

    @Override
    public Student getByStudentNumber(String studentNumber) {

        if(studentNumber != null) {
            Student student = studentRepository.findByStudentNumber(studentNumber);
            if(student != null) {
                return student;
            }
            throw new StudentNotFoundException("The student with the student number : " + studentNumber + " was not found");

        }
        throw new StudentNotFoundException("The student could not be found, the studentNumber parameter is null");
    }

    @Override
    public Student getByCredential(Credential credential) {

        if(credentialService.checkExistsById(credential.getId())) {
            if(studentRepository.existsByCredential(credential)) {
                return studentRepository.findByCredential(credential);
            }
            throw new StudentNotFoundException("Student could not be found, the Credential does not match that of a Student");
        }
        throw new StudentNotFoundException("Student Could not be found, credential does not exist");
    }

    @Override
    public boolean checkExistsByCredential(Credential credential) {
        if(credentialService.checkExistsById(credential.getId())){
            return studentRepository.existsByCredential(credential);
        }
            return false;
    }

    @Override
    public boolean checkExistsByStudentNumber(String studentNumber) {
        return studentRepository.existsByStudentNumber(studentNumber);
    }

    @Override
    public Student updateStudentNumber(String studentNumber, Long studentId) {

        if(studentNumber != null && studentId != null){
            Student student = studentRepository.findById(studentId).get();
            if(student != null) {
                student.setStudentNumber(studentNumber);
                return studentRepository.save(student);
            }
            throw new StudentNotUpdatedException("Student update not possible. No student found with id matching studentId:" + studentId);
        }
        throw new StudentNotUpdatedException("The student could not be updated, the studentNumber or studentId is null");
    }
}
