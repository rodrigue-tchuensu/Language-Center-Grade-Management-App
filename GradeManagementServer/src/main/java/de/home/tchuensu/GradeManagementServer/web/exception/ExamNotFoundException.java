package de.home.tchuensu.GradeManagementServer.web.exception;

public class ExamNotFoundException extends RuntimeException {

    public ExamNotFoundException() {
        super();
    }

    public ExamNotFoundException(String message) {
        super(message);
    }

    public ExamNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public ExamNotFoundException(Throwable cause) {
        super(cause);
    }
}
