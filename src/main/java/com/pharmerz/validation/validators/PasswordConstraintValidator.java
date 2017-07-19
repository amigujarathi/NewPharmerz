package com.pharmerz.validation.validators;

import com.google.common.base.Joiner;
import com.pharmerz.validation.constraints.Password;
import org.passay.*;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Arrays;

/**
 * Created by ankur on 20-11-2016.
 */
public class PasswordConstraintValidator implements ConstraintValidator<Password, String> {
    @Override
    public void initialize(Password password) {
    }

    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        PasswordValidator validator = new PasswordValidator(Arrays.asList(
                new LengthRule(8, 30),
                //new UppercaseCharacterRule(1),
                new CharacterRule(EnglishCharacterData.UpperCase,1),
                //new DigitCharacterRule(1),
                new CharacterRule(EnglishCharacterData.LowerCase,1),
                new CharacterRule(EnglishCharacterData.Digit, 1),
                //new SpecialCharacterRule(1),
                new CharacterRule(EnglishCharacterData.Special,1),
                new WhitespaceRule()));

        if(password == null){
            password = "";
        }

        RuleResult result = validator.validate(new PasswordData(password));
        if (result.isValid()) {
            return true;
        }
        context.disableDefaultConstraintViolation();
        context.buildConstraintViolationWithTemplate(
                Joiner.on(",").join(validator.getMessages(result)))
                .addConstraintViolation();
        return false;
    }
}
