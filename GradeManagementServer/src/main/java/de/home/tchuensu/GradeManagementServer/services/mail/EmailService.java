package de.home.tchuensu.GradeManagementServer.services.mail;

import de.home.tchuensu.GradeManagementServer.model.domain.SimpleMail;

public interface EmailService {

    /**
     *
     * @param to
     * @param subject
     * @param text
     */
    public void sendSimpleMessage(String to, String subject, String text);

    /**
     *
     * @param username
     * @param password
     * @return
     */
    public SimpleMail generateWelcomeMail(String username, String password);
}