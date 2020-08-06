package de.home.tchuensu.GradeManagementServer.web.exception;

public class StudentNotUpdatedException extends RuntimeException {

    public StudentNotUpdatedException() {
        super();
    }

    public StudentNotUpdatedException(String message) {
        super(message);
    }

    public StudentNotUpdatedException(String message, Throwable cause) {
        super(message, cause);
    }

    public StudentNotUpdatedException(Throwable cause) {
        super(cause);
    }
}
