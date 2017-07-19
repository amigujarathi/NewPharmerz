package com.pharmerz.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.pharmerz.validation.constraints.Email;
import com.pharmerz.validation.constraints.Password;
import com.pharmerz.validation.constraints.PasswordMatches;
import com.pharmerz.validation.constraints.Username;
import de.malkusch.validation.constraints.age.Adult;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * Created by ankur on 23-10-2016.
 */
@PasswordMatches
public class UserDto {
    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;

    private String middleName;
    @NotBlank
    @Email
    private String email;
    @NotBlank
    @Password
    private String password;
    @NotBlank
    @Password
    private String confirmPass;


    @Username
    private String username;

    @NotNull
    private Gender gender;

    @Adult
    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date dateOfBirth;


    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

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

    public enum Gender{
        MALE, FEMALE, OTHER
    }


    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }
}
