package com.pharmerz.validation.constraints;

import com.pharmerz.validation.validators.PasswordConstraintValidator;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.Constraint;
import javax.validation.Payload;
import javax.validation.ReportAsSingleViolation;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

/**
 * Created by ankur on 20-11-2016.
 */
@NotBlank
@Size(min = 6, max = 30)
@Pattern(regexp = "^[a-z][_]?[a-z0-9]+[_]?[a-z0-9]+$")
@Target( { METHOD, FIELD, ANNOTATION_TYPE })
@Retention(RUNTIME)
@Constraint(validatedBy = {})
@Documented
@ReportAsSingleViolation
public @interface Username {

    String message() default "{com.pharmerz.validation.constraints.Username.message}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
