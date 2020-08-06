package de.home.tchuensu.GradeManagementServer.dao.dto.model.projection;

import org.springframework.beans.factory.annotation.Value;
import java.time.LocalDate;

public interface StaffLimitedInfos {

    @Value("#{target.firstname} #{target.lastname}")
    String getFullname();

    String getStaffNumber();
    LocalDate getDateOfBirth();
}
