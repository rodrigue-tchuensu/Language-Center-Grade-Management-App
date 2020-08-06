package de.home.tchuensu.GradeManagementServer.web.exception;

public class StaffNotFoundException extends RuntimeException {

    public StaffNotFoundException() {
        super();
    }

    public StaffNotFoundException(String message) {
        super(message);
    }

    public StaffNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public StaffNotFoundException(Throwable cause) {
        super(cause);
    }
}
