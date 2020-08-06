package de.home.tchuensu.GradeManagementServer.services.mail;


import de.home.tchuensu.GradeManagementServer.model.domain.SimpleMail;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.stereotype.Service;


@Service //("EmailService")
public class EmailServiceImpl implements EmailService {

    @Autowired
    public JavaMailSender emailSender;


    public void sendSimpleMessage(String to, String subject, String text) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);

            emailSender.send(message);

        } catch (MailException exception) {
            exception.printStackTrace();
        }
    }

    @Override
    public SimpleMail generateWelcomeMail(String username, String defaultPassword) {

        final String MAIL_SUBJECT = "Welcome to the German Language Learning Center of EXCELLENCE (G.L.L.C.E)";

        final String MAIL_BODY_MSG = "Welcome to the German Language Learning Center of EXCELLENCE (G.L.L.C.E) \n" +
                "Your account has successfully been created. \n" +
                "To access your account you should use the following login data; \n\n" +
                "USERNAME:  " + username + " \n\n" +
                "PASSWORD:  " + defaultPassword + " \n\n" +
                "We wish you all the best during your stay in our center. \n" +
                "\nYour  GLLCE Team";

        SimpleMail simpleMail = new SimpleMail();

        simpleMail.setMailBody(MAIL_BODY_MSG);
        simpleMail.setMailSubject(MAIL_SUBJECT);

        return simpleMail;
    }

}