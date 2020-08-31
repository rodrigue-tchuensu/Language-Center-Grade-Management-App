package de.home.tchuensu.GradeManagementServer.web.exception;

public class CredentialNotUpdatedException extends RuntimeException {
    public CredentialNotUpdatedException() {
        super();
    }

    public CredentialNotUpdatedException(String message) {
        super(message);
    }

    public CredentialNotUpdatedException(String message, Throwable cause) {
        super(message, cause);
    }

    public CredentialNotUpdatedException(Throwable cause) {
        super(cause);
    }
}
