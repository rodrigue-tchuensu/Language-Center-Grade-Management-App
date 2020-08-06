package de.home.tchuensu.GradeManagementServer.model.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SimpleMail {

    private String mailReceiver;
    private String mailSubject;
    private String mailBody;
}
