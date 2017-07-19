package com.pharmerz.jpa;

import com.pharmerz.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

/**
 * Created by ankur on 13-08-2016.
 */
@Component
public class UsernameAuditorAware implements AuditorAware<String> {

    @Autowired
    private Environment env;

    @Override
    public String getCurrentAuditor() {


        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null){
            Object principal = authentication.getPrincipal();
            if(principal instanceof  CustomUserDetails){
                CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
                return userDetails.getUsername();

            }
        }
        return null;
    }
}
