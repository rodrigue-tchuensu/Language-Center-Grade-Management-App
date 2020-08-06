package de.home.tchuensu.GradeManagementServer.model.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;

@Entity
//@Table(name = "role")
@Data
@NoArgsConstructor
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    //@Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @NaturalId
    private RoleNames name;

    public Role(RoleNames name) {
        this.name = name;
    }


}
