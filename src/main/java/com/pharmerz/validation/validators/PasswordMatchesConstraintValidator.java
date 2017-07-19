package com.pharmerz.validation.validators;

import com.pharmerz.dto.PasswordResetDto;
import com.pharmerz.dto.UserDto;
import com.pharmerz.validation.constraints.PasswordMatches;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

/**
 * Created by ankur on 23-10-2016.
 */
public class PasswordMatchesConstraintValidator implements ConstraintValidator<PasswordMatches, Object> {
    @Override
    public void initialize(PasswordMatches passwordMatches) {

    }

    @Override
    public boolean isValid(Object objectDto, ConstraintValidatorContext constraintValidatorContext) {
        if(objectDto instanceof UserDto){
            UserDto userDto = (UserDto) objectDto;
            String password = userDto.getPassword() ;
            if(password == null)
                password = "";
            return password.equals(userDto.getConfirmPass());
        }else if(objectDto instanceof PasswordResetDto){
            PasswordResetDto passwordResetDto = (PasswordResetDto) objectDto;
            return passwordResetDto.getPassword().equals(passwordResetDto.getConfirmPass());
        }
        return false;
    }
}
