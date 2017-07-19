package com.pharmerz.Appcations;

//import static org.hamcrest.CoreMatchers.containsString;
//import static org.junit.Assert.assertEquals;
//import static org.junit.Assert.fail;

import com.pharmerz.service.postmark.PostmarkMailSender;
import com.pharmerz.service.postmark.PostmarkMessage;
//import org.junit.Test;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.mail.MailSendException;

/**
 * Created by User on 17-01-2017.
 */

public class Email {


//    ContactusTemplate ct=new ContactusTemplate();
//    String HTMLBODY =ct.contact_template("Amit Gujarathi","Incrust","amigujarathi@gmail.com","9096120286","shantiban,pune","thanks alot");

    public void SendMail(String TO, String SUBJECT, String HTMLBODY) {

        String TEST_API_KEY = "3b2e23b0-e907-4d7f-8e28-827b85eb95c8";

        String FROM = "support@pharmerz.in";
        PostmarkMailSender mailSender = new PostmarkMailSender(TEST_API_KEY);

        PostmarkMessage m = new PostmarkMessage();
        m.setFrom(FROM);
        m.setTo(TO);
        m.setSubject(SUBJECT);
        m.setHtmlBody(HTMLBODY);
        //m.setText(HTMLBODY);
        // m.setTag("test-utf8");
        mailSender.send(m);
    }

}
