package de.home.tchuensu.GradeManagementServer.services.controller;

import de.home.tchuensu.GradeManagementServer.dao.dto.mapper.StaffMapper;
import de.home.tchuensu.GradeManagementServer.dao.dto.model.CredentialDto;
import de.home.tchuensu.GradeManagementServer.dao.dto.model.StaffAccountDataDto;
import de.home.tchuensu.GradeManagementServer.dao.dto.model.StaffDto;
import de.home.tchuensu.GradeManagementServer.dao.dto.model.projection.StaffLimitedInfos;
import de.home.tchuensu.GradeManagementServer.model.domain.SimpleMail;
import de.home.tchuensu.GradeManagementServer.model.entity.Credential;
import de.home.tchuensu.GradeManagementServer.model.entity.RoleNames;
import de.home.tchuensu.GradeManagementServer.model.entity.Staff;
import de.home.tchuensu.GradeManagementServer.services.entity.CredentialServiceImpl;
import de.home.tchuensu.GradeManagementServer.services.entity.StaffServiceImpl;
import de.home.tchuensu.GradeManagementServer.services.mail.EmailServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StaffControllerServiceImpl implements StaffControllerService {


    @Autowired
    StaffServiceImpl staffService;

    @Autowired
    CredentialServiceImpl credentialService;

    @Autowired
    EmailServiceImpl emailService;

    @Transactional
    @Override
    public ResponseEntity<StaffDto> processCreateStaff(StaffAccountDataDto staffAccountDataDto) {

        StaffDto staffDto = staffAccountDataDto.getStaffDto();

        String defaultPassword = credentialService.generatePassword();
        String username        = credentialService.generateUsernames(staffDto.getFirstname(), staffDto.getLastname());
        Credential credential = credentialService.create( new CredentialDto(
                username,
                defaultPassword,
                staffAccountDataDto.getRolesDto())
        );

        // Create and save staff data to the database
        Staff staff = staffService.create(staffDto, credential);

        StaffDto stfDto = StaffMapper.toDto(staff);

        SimpleMail welcomeMail = emailService.generateWelcomeMail(username, defaultPassword);

        // Send the welcome e-mail to the staff having this account
        emailService.sendSimpleMessage(staffDto.getEmail(), welcomeMail.getMailSubject(), welcomeMail.getMailBody());

        return new ResponseEntity<>(stfDto, HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<List<StaffLimitedInfos>> processGetLimitedInfos() {
        List<StaffLimitedInfos> staffLimitedInfosList= staffService.getAllLimitedInfos();
        return new ResponseEntity<>(staffLimitedInfosList, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<StaffDto> processGetByStaffNumber(String staffNumber) {
        Staff staff = staffService.getByStaffNumber(staffNumber);
        StaffDto staffDto = StaffMapper.toDto(staff);
        return new ResponseEntity<>(staffDto, HttpStatus.OK);
    }
}
