package de.home.tchuensu.GradeManagementServer.services.controller;

import de.home.tchuensu.GradeManagementServer.dao.dto.model.PasswordUpdateDataDto;
import org.springframework.http.ResponseEntity;

public interface CredentialControllerService {

    ResponseEntity<String> processPasswordUpdate(PasswordUpdateDataDto updateDataDto);
}
