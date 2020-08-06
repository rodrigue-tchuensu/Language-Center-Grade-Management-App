package de.home.tchuensu.GradeManagementServer.web.exception;

public class StaffNotUpdatedException extends RuntimeException {

    public StaffNotUpdatedException() {
        super();
    }

    public StaffNotUpdatedException(String message) {
        super(message);
    }

    public StaffNotUpdatedException(String message, Throwable cause) {
        super(message, cause);
    }

    public StaffNotUpdatedException(Throwable cause) {
        super(cause);
    }
}
