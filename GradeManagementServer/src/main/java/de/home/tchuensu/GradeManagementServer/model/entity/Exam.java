package de.home.tchuensu.GradeManagementServer.model.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "exam")
@Data
@AllArgsConstructor
public class Exam {

    @EmbeddedId
    private ExamId idExam;


    public Exam() {}
}

/*  Another way of dealing with composite primary key is to use the @IdClass anotation.
it is somehow similar to the @Embadabble approach.

@Entity
@IdClass(MyKey.class)
public class YourEntity {
   @Id
   private int id;
   @Id
   private int version;

}

public class MyKey implements Serializable {
   private int id;
   private int version;
}

 */