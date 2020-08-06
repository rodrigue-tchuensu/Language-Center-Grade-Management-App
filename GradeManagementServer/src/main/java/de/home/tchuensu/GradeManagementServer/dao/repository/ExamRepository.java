package de.home.tchuensu.GradeManagementServer.dao.repository;

import de.home.tchuensu.GradeManagementServer.model.entity.Exam;
import de.home.tchuensu.GradeManagementServer.model.entity.ExamId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;

public interface ExamRepository extends JpaRepository<Exam, ExamId> {

    @Query(value = " SELECT DISTINCT exam_date FROM exam " +
            "ORDER BY exam.exam_date DESC " +
            "LIMIT 1" , nativeQuery = true)
    LocalDate findLatestExamDate();
}
