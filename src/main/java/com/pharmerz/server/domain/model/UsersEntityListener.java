package com.pharmerz.server.domain.model;

import com.pharmerz.Appcations.Email;
import com.pharmerz.Appcations.SignupTemplate;

import javax.persistence.PrePersist;

/**
 * Created by Amit on 06-04-2017.
 */
public class UsersEntityListener {

    @PrePersist
    public void SendEmailstoUser(User user){
        String to=user.getEmail();
        String name=user.getFirstName();
        String subject="Thank u for joining Pharmerz team !!!";

        SignupTemplate signupTemplate=new SignupTemplate();

        String body= signupTemplate.signupTemplate(name);

        Email email = new Email();
        email.SendMail(to,subject,body);
    }
}
