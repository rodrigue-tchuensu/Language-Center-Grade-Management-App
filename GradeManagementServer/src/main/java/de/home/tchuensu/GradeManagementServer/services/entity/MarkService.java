package de.home.tchuensu.GradeManagementServer.services.entity;

import de.home.tchuensu.GradeManagementServer.dao.dto.model.MarkDto;
import de.home.tchuensu.GradeManagementServer.dao.dto.model.projection.MarkSummary;
import de.home.tchuensu.GradeManagementServer.model.entity.*;

import java.time.LocalDate;
import java.sql.Date;
import java.util.List;

public interface MarkService {

    // Create
    /**
     *
     * @param markDto
     * @return
     */
    public Mark create(MarkDto markDto, Staff staff, Student student, Exam exam);


    // Read
    public List<Date> getExamDatesForWhichStudentParticipatedInAllSubjectsByStudentNumber(String studentNumber);

    public List<Mark> getMarksByStudentNumberAndByExamDate(String studentNumber, LocalDate examDate);

    public List<MarkSummary> getLatestCompletelyAssessedExamSessionMarksSummaryByStudentNumber(String studentNumber);

    public List<MarkSummary> getMarksSummaryByStudentNumberAndByExamDate(String studentNumber, LocalDate examDate);


    // Update

    /**
     *
     * @param markStatus
     * @param markId
     * @return
     */
    public Mark updateStatus(String markStatus, MarkId markId);

    // Delete


}
