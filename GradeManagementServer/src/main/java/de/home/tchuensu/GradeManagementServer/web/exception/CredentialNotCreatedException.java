package de.home.tchuensu.GradeManagementServer.web.exception;

public class CredentialNotCreatedException extends RuntimeException {

    public CredentialNotCreatedException() {
        super();
    }

    public CredentialNotCreatedException(String message) {
        super(message);
    }

    public CredentialNotCreatedException(String message, Throwable cause) {
        super(message, cause);
    }

    public CredentialNotCreatedException(Throwable cause) {
        super(cause);
    }
}
