package com.pharmerz.validation.validators;

import com.pharmerz.validation.constraints.Email;
import org.apache.commons.validator.routines.EmailValidator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

/**
 * Created by ankur on 23-10-2016.
 */
public class EmailConstraintValidator implements ConstraintValidator<Email, String> {
    @Override
    public void initialize(Email email) {

    }

    @Override
    public boolean isValid(String email, ConstraintValidatorContext constraintValidatorContext) {
        return EmailValidator.getInstance().isValid(email);
    }
}
