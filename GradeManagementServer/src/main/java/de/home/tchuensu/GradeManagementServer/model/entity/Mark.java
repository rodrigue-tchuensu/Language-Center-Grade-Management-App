package de.home.tchuensu.GradeManagementServer.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import de.home.tchuensu.GradeManagementServer.model.domain.ExamsAssesment;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "mark")
@Data
public class Mark {

    @EmbeddedId
    private MarkId markId;

    private Double score;

    private String grade;

    private String status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "staff_id", referencedColumnName = "id")
    @JsonBackReference
    private Staff staff;


    public Mark() {
        this.status = ExamsAssesment.FAILED_STATUS;
    }

    public Mark(MarkId markId, Double score) {

        this.markId = markId;
        this.score = score;
        this.status = ExamsAssesment.FAILED_STATUS;
    }
}
