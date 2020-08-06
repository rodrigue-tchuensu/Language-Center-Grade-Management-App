package de.home.tchuensu.GradeManagementServer.model.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;


@Embeddable
@Data
@AllArgsConstructor
public class ExamId implements Serializable {

    @Column(name = "exam_date")
    private LocalDate examDate;

    @Column(name = "exam_level")
    private String examLevel;

    public ExamId(){}


      /*
    public ExamId(Date examDate, char examLevel) {
        this.examDate = examDate;
        this.examLevel = examLevel;
    }

    public Date getExamDate() {
        return examDate;
    }

    public void setExamDate(Date examDate) {
        this.examDate = examDate;
    }

    public char getExamLevel() {
        return examLevel;
    }

    public void setExamLevel(char examLevel) {
        this.examLevel = examLevel;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ExamId)) return false;
        ExamId examId = (ExamId) o;
        return getExamLevel() == examId.getExamLevel() &&
                getExamDate().equals(examId.getExamDate());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getExamDate(), getExamLevel());
    }
    */

}
