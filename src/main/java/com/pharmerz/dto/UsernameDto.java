package com.pharmerz.dto;

import com.pharmerz.validation.constraints.Username;

/**
 * Created by ankur on 20-11-2016.
 */
public class UsernameDto {

    @Username
    public String username;

    public UsernameDto(String username) {
        this.username = username;
    }
}
