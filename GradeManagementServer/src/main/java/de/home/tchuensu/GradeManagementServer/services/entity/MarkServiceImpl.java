package de.home.tchuensu.GradeManagementServer.services.entity;

import de.home.tchuensu.GradeManagementServer.dao.dto.model.MarkDto;
import de.home.tchuensu.GradeManagementServer.dao.dto.model.projection.MarkSummary;
import de.home.tchuensu.GradeManagementServer.dao.repository.ExamRepository;
import de.home.tchuensu.GradeManagementServer.dao.repository.MarkRepository;
import de.home.tchuensu.GradeManagementServer.model.entity.*;
import de.home.tchuensu.GradeManagementServer.web.exception.MarkNotUpdatedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.sql.Date;
import java.util.List;

@Service
public class MarkServiceImpl implements MarkService {

    @Autowired
    MarkRepository markRepository;



    @Override
    public Mark create(MarkDto markDto, Staff staff, Student student,Exam exam) {

        // NB: the mark status (FAILED/PASSED) still needs to be taken care of, as well as the mark grade


        // subject names : {Grammar, Listening Comprehension, Reading Comprehension, Text Production}

        // A markId is created prior to the creation and storage of the mark. This is a composite key.
        MarkId markId = new MarkId();

        // Set the subjectName which is part of the composite key.
        markId.setSubjectName(markDto.getSubjectName());

        // Set the exam. The exam entity shares its primary key with the mark entity.
        // It is thus part of the mark composite key
        markId.setExam(exam);

        // Set the Student receiving the mark, the student entity  shares it's primary key with the mark entity.
        // It is thus part of the mark composite key
        markId.setStudent(student);

        // Create the a new mark
        Mark mark = new Mark(
                markId,
                markDto.getScore()
        );

        // Set the staff attributing this mark. This is required to handle a foreignKey constraint between the mark and staff entities
        mark.setStaff(staff);

        // Save the newly created mark to the database.
        return markRepository.save(mark);
    }

    @Override
    public List<Date> getExamDatesForWhichStudentParticipatedInAllSubjectsByStudentNumber(String studentNumber) {
        if(studentNumber != null) {
            return markRepository.findAllExamDatesForWhichStudentParticipatedInAllSubjects(studentNumber);
        }
        return null;
    }

    @Override
    public List<Mark> getMarksByStudentNumberAndByExamDate(String studentNumber, LocalDate examDate) {
        if(studentNumber != null && examDate != null) {
            return markRepository.findAllMarksByStudentNumberAndByExamDate(studentNumber, examDate);
        }
        return null;
    }

    @Override
    public List<MarkSummary> getLatestCompletelyAssessedExamSessionMarksSummaryByStudentNumber(String studentNumber) {
        if(studentNumber != null) {
            return markRepository.findLatestCompletelyAssessedExamSessionMarksByStudentNumber(studentNumber);
        }
        return null;
    }

    @Override
    public List<MarkSummary> getMarksSummaryByStudentNumberAndByExamDate(String studentNumber, LocalDate examDate) {

        if(studentNumber != null && examDate != null) {
            return markRepository.findMarksSummaryByStudentNumberAndByExamDate(studentNumber, examDate);
        }
        return null;
    }

    @Override
    public Mark updateStatus(String markStatus, MarkId markId) {
        if(markStatus != null && markId != null) {
            Mark mark = markRepository.findById(markId).get();
            if(mark != null) {
                mark.setStatus(markStatus);
                return markRepository.save(mark);
            }
            throw new MarkNotUpdatedException();
        }

        throw new MarkNotUpdatedException();
    }

}
