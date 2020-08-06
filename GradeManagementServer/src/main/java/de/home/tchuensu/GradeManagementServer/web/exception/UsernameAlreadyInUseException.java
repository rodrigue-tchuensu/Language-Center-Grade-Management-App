package de.home.tchuensu.GradeManagementServer.web.exception;

public class UsernameAlreadyInUseException extends RuntimeException {

    public UsernameAlreadyInUseException() {
        super();
    }

    public UsernameAlreadyInUseException(String message) {
        super(message);
    }

    public UsernameAlreadyInUseException(String message, Throwable cause) {
        super(message, cause);
    }

    public UsernameAlreadyInUseException(Throwable cause) {
        super(cause);
    }
}
