package de.home.tchuensu.GradeManagementServer.services.entity;

import de.home.tchuensu.GradeManagementServer.dao.dto.model.StaffDto;
import de.home.tchuensu.GradeManagementServer.dao.dto.model.projection.StaffLimitedInfos;
import de.home.tchuensu.GradeManagementServer.dao.repository.StaffRepository;
import de.home.tchuensu.GradeManagementServer.model.entity.Credential;
import de.home.tchuensu.GradeManagementServer.model.entity.Staff;
import de.home.tchuensu.GradeManagementServer.web.exception.StaffNotCreatedException;
import de.home.tchuensu.GradeManagementServer.web.exception.StaffNotFoundException;
import de.home.tchuensu.GradeManagementServer.web.exception.StaffNotUpdatedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StaffServiceImpl  implements StaffService {

    @Autowired
    StaffRepository staffRepository;

    @Autowired
    CredentialServiceImpl credentialService;

    @Override
    public Staff create(StaffDto staffDto, Credential credential) {

        if(staffDto != null) {
            if(credential != null) {

                Staff staff = new Staff(staffDto.getFirstname(), staffDto.getLastname(), staffDto.getDateOfBirth(),
                        staffDto.getPhoneNumber(), staffDto.getEmail(), staffDto.getOfficePhoneNumber(),
                        staffDto.getOfficeNumber() );

                // Associate a credential to the newly created Staff
                staff.setCredential(credential);

                // Save the new staff data to the database
                staff = staffRepository.save(staff);

                // Set the staffNumber of the new staff member
                staff = updateStaffNumber("STFN" + staff.getId(), staff.getId());

                return staff;
            }
            throw new StaffNotCreatedException("Staff creation failed !!! Missing Credential");
        }
        throw new StaffNotCreatedException("Staff creation failed !!! Missing staff data");
    }

    @Override
    public List<Staff> getAll() {

        return staffRepository.findAll();
    }

    @Override
    public List<StaffLimitedInfos> getAllLimitedInfos() {

        return staffRepository.findAllStaffProjectionBy();
    }

    @Override
    public Staff getByCredential(Credential credential) {

        if(credentialService.checkExistsById(credential.getId())) {
            if(staffRepository.existsByCredential(credential)) {
                return staffRepository.findByCredential(credential);
            }
            throw new StaffNotFoundException("Staff could not be found, the Credential does not match that of a Staff");
        }
        throw new StaffNotFoundException("Staff could be found, no such credential exist");
    }

    @Override
    public boolean checkExistsByCredential(Credential credential) {
        if(credentialService.checkExistsById(credential.getId())) {
            return staffRepository.existsByCredential(credential);
        }
        return false;
    }

    @Override
    public Staff getByStaffNumber(String staffNumber) {

        if(staffNumber != null) {
            Staff staff = staffRepository.findByStaffNumber(staffNumber);
            if(staff != null){
                return staff;
            }
            throw new StaffNotFoundException("The staff with the number : " + staffNumber + " was not found");
        }
        throw new StaffNotFoundException("The staff could not be found, the staffNumber parameter is null");
    }

    @Override
    public Staff updateStaffNumber(String staffNumber, Long staffId) {

        if(staffNumber != null && staffId != null ) {
            Staff staff = staffRepository.findById(staffId).get();
            if(staff != null) {
                staff.setStaffNumber(staffNumber);
                return staffRepository.save(staff);
            }
            throw new StaffNotFoundException("No staff found with the id matching staffId:" + staffId);
        }
        throw new StaffNotUpdatedException("The staff could not be updated, the staffNumber or staffId parameter is null");
    }
}
