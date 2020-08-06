package de.home.tchuensu.GradeManagementServer.web.exception;

public class CredentialNotReadException extends RuntimeException{
    public CredentialNotReadException() {
        super();
    }

    public CredentialNotReadException(String message) {
        super(message);
    }

    public CredentialNotReadException(String message, Throwable cause) {
        super(message, cause);
    }

    public CredentialNotReadException(Throwable cause) {
        super(cause);
    }
}
