package com.pharmerz;

import com.pharmerz.dto.UsernameDto;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.Set;

/**
 * Created by ankur on 20-11-2016.
 */
public class Main {
    public static void main(String[] args) {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<UsernameDto>> violations = validator.validate(new UsernameDto("__ankur"));
        for(ConstraintViolation<UsernameDto> violation : violations){
            System.out.println(violation.getMessage());
        }
    }
}
