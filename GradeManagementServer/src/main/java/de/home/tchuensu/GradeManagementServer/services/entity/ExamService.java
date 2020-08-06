package de.home.tchuensu.GradeManagementServer.services.entity;

import de.home.tchuensu.GradeManagementServer.dao.dto.model.ExamDto;
import de.home.tchuensu.GradeManagementServer.model.entity.Exam;
import de.home.tchuensu.GradeManagementServer.model.entity.ExamId;

import java.time.LocalDate;

public interface ExamService {

    // Create
    /**
     *
     * @param examDto
     * @return
     */
    public Exam create(ExamDto examDto);


    // Read

    //public ExamDto get();

    /**
     *
     * @param examId
     * @return
     */
    public Exam getById(ExamId examId);

    public LocalDate getLatestExamDate();


    // Update


    // Delete
    /**
     *
     * @param examId
     */
    //public void delete(ExamId examId);
}
