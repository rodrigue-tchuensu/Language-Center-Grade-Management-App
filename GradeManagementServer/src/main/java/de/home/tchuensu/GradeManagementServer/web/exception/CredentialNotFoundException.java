package de.home.tchuensu.GradeManagementServer.web.exception;

public class CredentialNotFoundException extends RuntimeException {

    public CredentialNotFoundException() {
        super();
    }

    public CredentialNotFoundException(String message) {
        super(message);
    }

    public CredentialNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public CredentialNotFoundException(Throwable cause) {
        super(cause);
    }
}
