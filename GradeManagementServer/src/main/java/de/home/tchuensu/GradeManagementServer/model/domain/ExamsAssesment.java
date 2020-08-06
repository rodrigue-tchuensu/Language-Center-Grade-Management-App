package de.home.tchuensu.GradeManagementServer.model.domain;

import de.home.tchuensu.GradeManagementServer.web.exception.ScoreOutOfBoundException;

public class ExamsAssesment {


    // subject names : {Grammar, Listening Comprehension, Reading Comprehension, Text Production}



    public final Double GRAMMAR_MAX_SCORE                    = 25.0;
    public final Double LISTENING_COMPREHENSION_MAX_SCORE    = 25.0;
    public final Double READING_COMPREHENSION_MAX_SCORE      = 25.0;
    public final Double TEXT_PRODUCTION_MAX_SCORE            = 25.0;

    public static final Double SUBJECT_MAX_SCORE             = 25.0;
    public static final Double SUBJECT_AVERAGE_PASS_SCORE    = 15.0;
    public static final Double EXAM_TOTAL_MAX_SCORE          = 100.0;
    public static final Double EXAM_AVERAGE_PASS_SCORE       = 60.0;

    public static final String PASSED_STATUS = "PASSED";
    public static final String FAILED_STATUS = "FAILED";



    public static String computeMarkStatus(Double score) {
        if(score >= 0 && score <= SUBJECT_MAX_SCORE) {
            if(score >= SUBJECT_AVERAGE_PASS_SCORE && score <= SUBJECT_MAX_SCORE) {
                return PASSED_STATUS;
            } else {
                return FAILED_STATUS;
            }
        }
        throw new ScoreOutOfBoundException("The score for which a mark status is requested is out of the authorized bound." +
                " The authorized scores interval is [0, 25],  the assess score with value=  " + score + "is out of this interval");
    }


    public static String computeExamStatus(Double grammarScore, Double listCompScore, Double readCompScore, Double textProdScore) {


        if ((grammarScore >= 0 && grammarScore <= SUBJECT_MAX_SCORE) && (listCompScore >= 0 && listCompScore <= SUBJECT_MAX_SCORE) &&
                (readCompScore >= 0 && readCompScore <= SUBJECT_MAX_SCORE) && (textProdScore >= 0 && textProdScore <= SUBJECT_MAX_SCORE)) {

            Double totalScore = grammarScore + listCompScore + readCompScore + textProdScore;

            if(totalScore >= EXAM_AVERAGE_PASS_SCORE && totalScore <= EXAM_TOTAL_MAX_SCORE) {
                return PASSED_STATUS;
            } else {
                return FAILED_STATUS;
            }
        }
        throw new ScoreOutOfBoundException("One of the scores to be computed is out of the authorized interval bounds [0, 25]");

    }




































    /*
    // A1 max scored per subject
    public final Double A1_GRAMMAR_MAX_SCORE                    = 40.0;
    public final Double A1_LISTENING_COMPREHENSION_MAX_SCORE    = 20.0;
    public final Double A1_READING_COMPREHENSION_MAX_SCORE      = 20.0;
    public final Double A1_TEXT_PRODUCTION_MAX_SCORE            = 20.0;

    // A2 max scored per subject
    public final Double A2_GRAMMAR_MAX_SCORE                    = 40.0;
    public final Double A2_LISTENING_COMPREHENSION_MAX_SCORE    = 20.0;
    public final Double A2_READING_COMPREHENSION_MAX_SCORE      = 20.0;
    public final Double A2_TEXT_PRODUCTION_MAX_SCORE            = 20.0;

    // B1 max scored per subject
    public final Double B1_GRAMMAR_MAX_SCORE                    = 25.0;
    public final Double B1_LISTENING_COMPREHENSION_MAX_SCORE    = 25.0;
    public final Double B1_READING_COMPREHENSION_MAX_SCORE      = 25.0;
    public final Double B1_TEXT_PRODUCTION_MAX_SCORE            = 25.0;

    // B2 max scored per subject
    public final Double B2_GRAMMAR_MAX_SCORE                    = 20.0;
    public final Double B2_LISTENING_COMPREHENSION_MAX_SCORE    = 25.0;
    public final Double B2_READING_COMPREHENSION_MAX_SCORE      = 30.0;
    public final Double B2_TEXT_PRODUCTION_MAX_SCORE            = 25.0;

    // C1 max scored per subject
    public final Double C1_GRAMMAR_MAX_SCORE                    = 10.0;
    public final Double C1_LISTENING_COMPREHENSION_MAX_SCORE    = 25.0;
    public final Double C1_READING_COMPREHENSION_MAX_SCORE      = 40.0;
    public final Double C1_TEXT_PRODUCTION_MAX_SCORE            = 25.0;

     */


}
