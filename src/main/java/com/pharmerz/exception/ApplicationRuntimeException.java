package com.pharmerz.exception;

/**
 * Created by ankur on 23-10-2016.
 */
public class ApplicationRuntimeException extends RuntimeException {
    public ApplicationRuntimeException(String message) {
        super(message);
    }

    public ApplicationRuntimeException(String message, Throwable cause) {
        super(message, cause);
    }
}
