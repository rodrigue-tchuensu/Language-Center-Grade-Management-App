package de.home.tchuensu.GradeManagementServer.web.exception;

public class UsernameNotGeneratedException extends RuntimeException {

    public UsernameNotGeneratedException() {
        super();
    }

    public UsernameNotGeneratedException(String message) {
        super(message);
    }

    public UsernameNotGeneratedException(String message, Throwable cause) {
        super(message, cause);
    }

    public UsernameNotGeneratedException(Throwable cause) {
        super(cause);
    }
}
