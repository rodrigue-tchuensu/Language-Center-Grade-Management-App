package de.home.tchuensu.GradeManagementServer.web.exception;

public class StudentNotCreatedException extends RuntimeException {

    public StudentNotCreatedException() {
        super();
    }

    public StudentNotCreatedException(String message) {
        super(message);
    }

    public StudentNotCreatedException(String message, Throwable cause) {
        super(message, cause);
    }

    public StudentNotCreatedException(Throwable cause) {
        super(cause);
    }
}
