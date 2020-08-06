package de.home.tchuensu.GradeManagementServer.web.exception;

public class ExamNotCreatedException extends RuntimeException {

    public ExamNotCreatedException() {
        super();
    }

    public ExamNotCreatedException(String message) {
        super(message);
    }

    public ExamNotCreatedException(String message, Throwable cause) {
        super(message, cause);
    }

    public ExamNotCreatedException(Throwable cause) {
        super(cause);
    }
}
