package de.home.tchuensu.GradeManagementServer.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Credential {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Getter
    private Long id;

    @Getter
    @Setter
    private String username;

    @Column(name = "password_hash")
    @Getter
    @Setter
    private String passwordHash;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "credential_roles",
            joinColumns= @JoinColumn(name = "credential_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    @OneToOne(mappedBy = "credential", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private Student student;

    @OneToOne(mappedBy = "credential", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonManagedReference
    private Staff staff;

    public Credential(){}

    public Credential(String username, String passwordHash) {
        this.username = username;
        this.passwordHash = passwordHash;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

}
