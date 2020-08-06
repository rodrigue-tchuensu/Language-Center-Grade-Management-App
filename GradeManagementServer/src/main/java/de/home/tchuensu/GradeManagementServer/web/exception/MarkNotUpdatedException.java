package de.home.tchuensu.GradeManagementServer.web.exception;

public class MarkNotUpdatedException extends RuntimeException {

    public MarkNotUpdatedException() {
        super();
    }

    public MarkNotUpdatedException(String message) {
        super(message);
    }

    public MarkNotUpdatedException(String message, Throwable cause) {
        super(message, cause);
    }

    public MarkNotUpdatedException(Throwable cause) {
        super(cause);
    }
}
