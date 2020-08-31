package de.home.tchuensu.GradeManagementServer.services.controller;

import de.home.tchuensu.GradeManagementServer.dao.dto.model.PasswordUpdateDataDto;
import de.home.tchuensu.GradeManagementServer.services.entity.CredentialServiceImpl;
import de.home.tchuensu.GradeManagementServer.web.exception.CredentialNotUpdatedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CredentialControllerServiceImpl implements CredentialControllerService {

    @Autowired
    CredentialServiceImpl credentialService;

    @Override
    public ResponseEntity<String> processPasswordUpdate(PasswordUpdateDataDto updateDataDto) {
        if(!credentialService.checkExistsByUsernameAndPassword(updateDataDto.getUsername(), updateDataDto.getCurrentPassword())){
            throw new CredentialNotUpdatedException("current password incorrect ");
        }
        credentialService.updatePassword(updateDataDto.getUsername(), updateDataDto.getNewPassword());

        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
