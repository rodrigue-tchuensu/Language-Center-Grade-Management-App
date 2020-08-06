package de.home.tchuensu.GradeManagementServer.services.entity;

import de.home.tchuensu.GradeManagementServer.dao.dto.model.StudentDto;
import de.home.tchuensu.GradeManagementServer.dao.dto.model.projection.StudentLimitedInfos;
import de.home.tchuensu.GradeManagementServer.model.entity.Credential;
import de.home.tchuensu.GradeManagementServer.model.entity.Student;

import java.util.List;

public interface StudentService {

    // Create

    /**
     *
     * Create and store a new Student in the database.
     * Creates the credentials associated to the student as well
     *
     * @param studentDto
     * @return
     */
    public Student create(StudentDto studentDto, Credential credential);

    // Read

    /**
     *
     * @return
     */
    public List<Student> getAll();

    public List<StudentLimitedInfos> getAllLimitedInfos();

    public List<StudentLimitedInfos> getAllLimitedInfosByLevel(String currentLevel);


    /**
     *
     * Get the student whose studentNumber matches that given as parameter
     *
     * @param studentNumber
     * @return
     */
    public Student getByStudentNumber(String studentNumber);

    public Student getByCredential(Credential credential);

    boolean checkExistsByCredential(Credential credential);

    boolean checkExistsByStudentNumber(String studentNumber);

    //public Student getById(Long id);

    // Update

    /**
     *
     * Set the studentNumber of the student having the id @param studentId to that of the @param studentNumber
     *
     * @param studentNumber
     * @param studentId
     * @return
     */
    public Student updateStudentNumber(String studentNumber, Long studentId);

    // Delete

}
