package de.home.tchuensu.GradeManagementServer.web.api;

import de.home.tchuensu.GradeManagementServer.dao.dto.model.PasswordUpdateDataDto;
import de.home.tchuensu.GradeManagementServer.services.controller.CredentialControllerServiceImpl;
import de.home.tchuensu.GradeManagementServer.services.entity.CredentialServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("credentials")
@CrossOrigin(origins = "*")
public class CredentialController {

    @Autowired
    CredentialServiceImpl credentialService;

    @Autowired
    CredentialControllerServiceImpl credentialControllerService;

    @PostMapping
    public ResponseEntity<String> updatePassword(@RequestHeader("Authorization") String authenticationToken, @RequestBody PasswordUpdateDataDto passwordUpdateDataDto) {
        return credentialControllerService.processPasswordUpdate(passwordUpdateDataDto);
    }
}
