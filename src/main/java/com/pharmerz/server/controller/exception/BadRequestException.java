package com.pharmerz.server.controller.exception;

/**
 * Created by ankur on 01-11-2016.
 */
public class BadRequestException extends ControllerException {

    public BadRequestException(String message) {
        super(message);
    }



    public BadRequestException(String message, Throwable cause) {
        super(message, cause);
    }
}
