package com.pharmerz.server.controller.exception;


import com.pharmerz.exception.ApplicationRuntimeException;

/**
 * Created by ankur on 30-10-2016.
 */
public class ControllerRuntimeException extends ApplicationRuntimeException {
    private String location;

    public String getLocation() {
        return location;
    }

    private Integer code;

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }



    public ControllerRuntimeException(String message) {
        super(message);
    }

    public ControllerRuntimeException(String message, Throwable cause) {
        super(message, cause);
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
