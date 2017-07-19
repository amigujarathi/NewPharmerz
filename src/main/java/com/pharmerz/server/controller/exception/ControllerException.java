package com.pharmerz.server.controller.exception;


import com.pharmerz.exception.ApplicationException;

/**
 * Created by ankur on 30-10-2016.
 */
public class ControllerException extends ApplicationException {
    private String location;

    private Integer code;

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }


    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public ControllerException(String message) {
        super(message);
    }


    public ControllerException(String message, Throwable cause) {
        super(message, cause);
    }
}
