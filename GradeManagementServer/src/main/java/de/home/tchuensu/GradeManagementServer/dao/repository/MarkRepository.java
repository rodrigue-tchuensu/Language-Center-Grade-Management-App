package de.home.tchuensu.GradeManagementServer.dao.repository;

import de.home.tchuensu.GradeManagementServer.dao.dto.model.projection.MarkSummary;
import de.home.tchuensu.GradeManagementServer.model.entity.Mark;
import de.home.tchuensu.GradeManagementServer.model.entity.MarkId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

public interface MarkRepository extends JpaRepository<Mark, MarkId> {

    //@Query("SELECT e.examDate AS examDate FROM Mark m JOIN m.student s JOIN m.exam e WHERE s.studentNumber = ?1")
    //@Query("select e.examDate as examDate from Mark m join m.student s join m.exam e where s.studentNumber = ?1")
    @Query(value =
            "SELECT DISTINCT mark.exam_date FROM mark " +
                    "INNER JOIN ( " +
                    "SELECT  DISTINCT mark.exam_date, COUNT(DISTINCT mark.subject_name) as cnt " +
                    "FROM mark " +
                    "INNER JOIN student " +
                    "ON mark.student_id = student.id " +
                    "WHERE student.student_number = ?1 " +
                    "GROUP BY mark.exam_date " +
                    ") AS exam_dates_count " +
                    "ON mark.exam_date = exam_dates_count.exam_date " +
                    "WHERE exam_dates_count.cnt=4 " +
                    "ORDER BY mark.exam_date DESC"
            , nativeQuery = true)
    List<Date> findAllExamDatesForWhichStudentParticipatedInAllSubjects(String studentNumber);

    @Query(value = "SELECT  * " +
            "FROM mark " +
            "INNER JOIN student ON  mark.student_id = student.id " +
            "INNER JOIN exam ON mark.exam_date = exam.exam_date AND mark.exam_level = exam.exam_level " +
            "WHERE student.student_number = ?1 AND mark.exam_date = ?2", nativeQuery = true)
    List<Mark> findAllMarksByStudentNumberAndByExamDate(String studentNumber, LocalDate examDate);

    @Query(value =
            "SELECT  mark.subject_name AS subjectName, " +
                    "mark.score AS score, mark.status AS status, " +
                    "mark.exam_date AS examDate, mark.exam_level AS examLevel " +
                    "FROM mark " +
                    "INNER JOIN ( " +
                    "SELECT  DISTINCT mark.exam_date, COUNT(DISTINCT mark.subject_name) as cnt " +
                    "FROM mark " +
                    "INNER JOIN student " +
                    "ON mark.student_id = student.id " +
                    "WHERE student.student_number = ?1 " +
                    "GROUP BY mark.exam_date " +
                    ") AS exam_dates_count " +
                    "ON mark.exam_date = exam_dates_count.exam_date " +
                    "WHERE exam_dates_count.cnt=4 " +
                    "ORDER BY mark.exam_date DESC  LIMIT 4"
            , nativeQuery = true)
    List<MarkSummary> findLatestCompletelyAssessedExamSessionMarksByStudentNumber(String studentNumber);

    @Query(value = "SELECT  mark.subject_name AS subjectName, " +
            "mark.score AS score, mark.status AS status, " +
            "mark.exam_date AS examDate, mark.exam_level AS examLevel " +
            "FROM mark " +
            "INNER JOIN student ON  mark.student_id = student.id " +
            "INNER JOIN exam ON mark.exam_date = exam.exam_date AND mark.exam_level = exam.exam_level " +
            "WHERE student.student_number = ?1 AND mark.exam_date = ?2", nativeQuery = true)
    List<MarkSummary> findMarksSummaryByStudentNumberAndByExamDate(String studentNumber, LocalDate examDate);
}
