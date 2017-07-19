package com.pharmerz.server.controller.rest;

import com.pharmerz.security.CustomUserDetails;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


/**
 * Created by ankur on 19-11-2016.
 */
@RestController
@RequestMapping("/user")
public class UserController {
    @GetMapping
    public CustomUserDetails user(){
        CustomUserDetails customUserDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        customUserDetails.getUser().setUserRoles(null);
        return customUserDetails;
    }


}
