package com.pharmerz.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * Created by ankurpathak on 02-02-2016.
 */
public class ErrorDto {
    private Integer code;
    private String message;

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public ErrorDto(Integer code, String message) {
        this.code = code;
        this.message = message;
    }

    public ErrorDto() {
    }
}
