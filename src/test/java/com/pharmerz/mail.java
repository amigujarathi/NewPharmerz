package com.pharmerz;

import com.pharmerz.Appcations.Email;
import com.pharmerz.Appcations.Template;

/**
 * Created by User on 25-04-2017.
 */
public class mail {

    public static void main(String[] args) {
        Email email=new Email();
        Template t=new Template();
        String body=t.meetingTemplate("hi roshan","amit gujarathi");
        email.SendMail("amigujarathi@gmail.com","Iphex",body);
    }
}