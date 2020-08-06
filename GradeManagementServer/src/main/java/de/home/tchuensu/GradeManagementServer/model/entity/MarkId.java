package de.home.tchuensu.GradeManagementServer.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;


@Embeddable
@Data
@AllArgsConstructor
public class MarkId implements Serializable {

    @Column(name = "subject_name")
    private String subjectName;

//    @Column(name = "student_id")
//    private Long studentId;
//
//    @Column(name = "exam_date")
//    private LocalDate examDate;
//
//    @Column(name = "exam_level")
//    private String examLevel;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    @MapsId
    @JsonBackReference
    private Student student;


    @ManyToOne()
    @JoinColumns({
            @JoinColumn(name = "exam_date"),
            @JoinColumn(name = "exam_level")
    })
    @MapsId
    @JsonBackReference
    private Exam exam;

    public MarkId() {}

}
