package com.pharmerz.dto;

import com.pharmerz.validation.constraints.PasswordMatches;
import org.hibernate.validator.constraints.NotBlank;

/**
 * Created by ankur on 30-10-2016.
 */
@PasswordMatches
public class PasswordResetDto {

    @NotBlank
    private String password;
    @NotBlank
    private String confirmPass;


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPass() {
        return confirmPass;
    }

    public void setConfirmPass(String confirmPass) {
        this.confirmPass = confirmPass;
    }
}
