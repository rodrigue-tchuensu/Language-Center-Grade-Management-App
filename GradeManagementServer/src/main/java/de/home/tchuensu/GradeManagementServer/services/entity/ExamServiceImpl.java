package de.home.tchuensu.GradeManagementServer.services.entity;

import de.home.tchuensu.GradeManagementServer.dao.dto.model.ExamDto;
import de.home.tchuensu.GradeManagementServer.dao.repository.ExamRepository;
import de.home.tchuensu.GradeManagementServer.model.entity.Exam;
import de.home.tchuensu.GradeManagementServer.model.entity.ExamId;
import de.home.tchuensu.GradeManagementServer.web.exception.ExamNotFoundException;
import de.home.tchuensu.GradeManagementServer.web.exception.ExamNotCreatedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class ExamServiceImpl implements ExamService {

    @Autowired
    ExamRepository examRepository;

    @Override
    public Exam create(ExamDto examDto) {
        ExamId examId;
        if(examDto != null) {
            examId = new ExamId(
                    examDto.getExamDate(),
                    examDto.getExamLevel()
            );

            //findById(examId).get() == null
            if(!examRepository.existsById(examId) ) {
                Exam exam = new Exam(examId);
                exam = examRepository.save(exam);
                return exam;
            }
            throw new ExamNotCreatedException("The exam could not be created, trying to insert a duplicate id in table \"exam\"");
        }
        throw new ExamNotCreatedException("The exam could not be created, examDto parameter is null");
    }

    @Override
    public Exam getById(ExamId examId) {

        if(examId != null) {
            Exam exam = examRepository.findById(examId).get();
            if(exam != null){
                return exam;
            }
            throw new ExamNotFoundException("The exam with exam id " + examId.getExamDate().toString() + ", " + examId.getExamLevel() +
                    " was not found");
        }
        throw  new ExamNotFoundException("The exam could not be found, the examId parameter used to query the database is null");
    }

    @Override
    public LocalDate getLatestExamDate() {
        return examRepository.findLatestExamDate();
    }
}
