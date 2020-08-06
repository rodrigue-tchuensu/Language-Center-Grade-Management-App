package de.home.tchuensu.GradeManagementServer.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;

import java.time.LocalDate;


@Entity
@Table(name = "student")
@Data
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "student_number")
    private String studentNumber;

    private String firstname;

    private String lastname;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "phone_number")
    private String phoneNumber;


    private String email;

    @Column(name = "current_level")
    private String currentLevel;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "credential_id", referencedColumnName = "id" )
    @JsonBackReference
    private Credential credential;

     // The following piece of commented code can be used in case we want to create a Bidirectional relation
    /*
    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private Set<Mark> marks;    */

    public Student() {}

    public Student(String firstname, String lastname, LocalDate dateOfBirth, String phoneNumber, String email, String currentLevel) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.dateOfBirth = dateOfBirth;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.currentLevel = currentLevel;
        //this.marks = new HashSet<>();
    }

}
