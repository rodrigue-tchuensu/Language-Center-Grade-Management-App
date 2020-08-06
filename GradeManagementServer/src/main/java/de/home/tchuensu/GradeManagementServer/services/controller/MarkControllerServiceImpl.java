package de.home.tchuensu.GradeManagementServer.services.controller;

import de.home.tchuensu.GradeManagementServer.dao.dto.mapper.MarkMapper;
import de.home.tchuensu.GradeManagementServer.dao.dto.model.MarkDto;
import de.home.tchuensu.GradeManagementServer.dao.dto.model.projection.MarkSummary;
import de.home.tchuensu.GradeManagementServer.dao.repository.ExamRepository;
import de.home.tchuensu.GradeManagementServer.model.domain.ExamsAssesment;
import de.home.tchuensu.GradeManagementServer.model.entity.*;
import de.home.tchuensu.GradeManagementServer.services.entity.ExamServiceImpl;
import de.home.tchuensu.GradeManagementServer.services.entity.MarkServiceImpl;
import de.home.tchuensu.GradeManagementServer.services.entity.StaffServiceImpl;
import de.home.tchuensu.GradeManagementServer.services.entity.StudentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.sql.Date;
import java.util.LinkedList;
import java.util.List;

@Service
public class MarkControllerServiceImpl implements MarkControllerService{

//    @Autowired
//    ExamRepository examRepository;

    @Autowired
    ExamServiceImpl examService;

    @Autowired
    StudentServiceImpl studentService;

    @Autowired
    StaffServiceImpl staffService;

    @Autowired
    MarkServiceImpl markService;

    @Override
    public ResponseEntity<MarkDto> processCreateMark(MarkDto markDto) {

        // Based on the staff number, we get the staff object attributing the mark to the student
        Staff staff = staffService.getByStaffNumber(markDto.getStaffNumber());

        // Based on the student number, we get the student object who will receive the mark
        Student student = studentService.getByStudentNumber(markDto.getStudentNumber());

        // The exam date and the exam level are used to create an ExamId object. This is then used to
        // get the exam for which this mark is issued.
        ExamId examId = new ExamId(markDto.getExamDate(), markDto.getExamLevel());
        Exam exam =  examService.getById(examId);                          //new Exam( new ExamId(LocalDate.parse("2019-10-18"), "B1.1") );

        //exam = examRepository.save(exam);


        // The mark is created and saved in the database. Ths staff, student and exam objects are required for
        // referencing purposes.
        Mark mark = markService.create(markDto, staff, student, exam);

        String markStatus = ExamsAssesment.computeMarkStatus(mark.getScore());

        mark = markService.updateStatus(markStatus, mark.getMarkId());

        MarkDto mkDto = MarkMapper.toDto(mark);

        return new ResponseEntity<>(mkDto, HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<List<Date>> processGetExamDates(String  studentNumber) {
        if(studentService.checkExistsByStudentNumber(studentNumber)) {
            return new ResponseEntity<>(
                    markService.getExamDatesForWhichStudentParticipatedInAllSubjectsByStudentNumber(studentNumber),
                    HttpStatus.OK
            );
        }
        return null;
    }

    @Override
    public ResponseEntity<List<MarkDto>> processGetMarksByStudentNumberAndByExamDate(String studentNumber, String examDate) {
        if(studentService.checkExistsByStudentNumber(studentNumber)) {
            List<Mark> marks = markService.getMarksByStudentNumberAndByExamDate(studentNumber, LocalDate.parse(examDate));
            List<MarkDto> marksDto = new LinkedList<>();
            for(Mark mark : marks) {
                marksDto.add(MarkMapper.toDto(mark));
            }
            return new ResponseEntity<>(marksDto, HttpStatus.OK);
        }
        return null;
    }

    @Override
    public ResponseEntity<List<MarkSummary>> processGetLatestCompletelyAssessedMarksByStudentNumber(String studentNumber) {
        if(studentService.checkExistsByStudentNumber(studentNumber)) {
            return new ResponseEntity<>(
                    markService.getLatestCompletelyAssessedExamSessionMarksSummaryByStudentNumber(studentNumber),
                    HttpStatus.OK
            );
        }
        return null;
    }

    @Override
    public ResponseEntity<List<MarkSummary>> processGetMarksByExamSession(String studentNumber, String examDate) {
        if(studentService.checkExistsByStudentNumber(studentNumber)) {
            return new ResponseEntity<>(
                    markService.getMarksSummaryByStudentNumberAndByExamDate(studentNumber, LocalDate.parse(examDate)),
                    HttpStatus.OK
            );
        }
        return null;
    }
}
