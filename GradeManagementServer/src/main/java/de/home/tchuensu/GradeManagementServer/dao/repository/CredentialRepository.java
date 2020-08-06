package de.home.tchuensu.GradeManagementServer.dao.repository;

import de.home.tchuensu.GradeManagementServer.model.entity.Credential;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CredentialRepository  extends JpaRepository<Credential, Long> {

    Credential findByUsername(String username);
}
