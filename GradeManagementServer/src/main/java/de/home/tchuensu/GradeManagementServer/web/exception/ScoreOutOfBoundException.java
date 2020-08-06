package de.home.tchuensu.GradeManagementServer.web.exception;

public class ScoreOutOfBoundException extends RuntimeException {

    public ScoreOutOfBoundException() {
        super();
    }

    public ScoreOutOfBoundException(String message) {
        super(message);
    }

    public ScoreOutOfBoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public ScoreOutOfBoundException(Throwable cause) {
        super(cause);
    }
}
