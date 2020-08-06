package de.home.tchuensu.GradeManagementServer.web.exception;

public class StaffNotCreatedException extends RuntimeException {

    public StaffNotCreatedException() {
        super();
    }

    public StaffNotCreatedException(String message) {
        super(message);
    }

    public StaffNotCreatedException(String message, Throwable cause) {
        super(message, cause);
    }

    public StaffNotCreatedException(Throwable cause) {
        super(cause);
    }
}
