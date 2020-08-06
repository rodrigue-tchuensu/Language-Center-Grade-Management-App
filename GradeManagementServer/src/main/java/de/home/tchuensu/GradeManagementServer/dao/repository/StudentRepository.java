package de.home.tchuensu.GradeManagementServer.dao.repository;

import de.home.tchuensu.GradeManagementServer.dao.dto.model.projection.StudentLimitedInfos;
import de.home.tchuensu.GradeManagementServer.model.entity.Credential;
import de.home.tchuensu.GradeManagementServer.model.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {

    Student findByStudentNumber(String studentNumber);
    List<StudentLimitedInfos> findAllStudentProjectionBy();
    List<StudentLimitedInfos> findByCurrentLevel(String level);
    boolean existsByCredential(Credential cred);
    Student findByCredential(Credential cred);
    boolean existsByStudentNumber(String studentNumber);

}
