package de.home.tchuensu.GradeManagementServer.dao.dto.model.projection;

import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDate;

public interface StudentLimitedInfos {

    @Value("#{target.firstname} #{target.lastname}")
    String getFullname();

    String getStudentNumber();
    LocalDate getDateOfBirth();
}
