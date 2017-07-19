package com.pharmerz.server.controller.advice;

import com.pharmerz.server.controller.exception.BadRequestException;
import com.pharmerz.server.controller.exception.ControllerException;
import com.pharmerz.server.controller.exception.ControllerRuntimeException;
import com.pharmerz.dto.ErrorDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 * Created by ankur on 26-10-2016.
 */
@ControllerAdvice
public class RestResponseEntityControllerAdvice extends ResponseEntityExceptionHandler {
    @Autowired
    private MessageSource messages;


    @ExceptionHandler({ BadRequestException.class })
    public ResponseEntity<?> handleBadRequest(BadRequestException ex, WebRequest request) {
        logger.error("400 Status Code", ex);
        Integer code = ex.getCode();
        code = code != null ? code : 400;
        ErrorDto responseDto = new ErrorDto(code, ex.getMessage());
        HttpHeaders headers = new HttpHeaders();
        if(ex.getLocation() != null)
            headers.add("Location", ex.getLocation());
        return handleExceptionInternal(
                ex, responseDto, headers, HttpStatus.BAD_REQUEST, request);
    }




}
