package com.pharmerz.validation.constraints;


import com.pharmerz.validation.validators.EmailConstraintValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

/**
 * Created by ankur on 23-10-2016.
 */
@Target({ElementType.TYPE, ElementType.FIELD, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = EmailConstraintValidator.class)
@Documented
public @interface Email {
    String message() default "{com.pharmerz.validation.constraints.Email.message}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}