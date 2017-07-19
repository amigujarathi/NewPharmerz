package com.pharmerz.service;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import java.util.Properties;

/**
 * Input  Fullname,companyName,Emial,Contact number,address,comment
 * mail sender api,credentials,tosend mail id
 * database table where we can save these details.
 * email templete
 * Created by i5 on 1/3/2017.
 */
public class ContactServiceImpl {

    String fullName;
    String companyName;
    String emailId;
    String contactNum;
    String address;
    String comment;

    public static void main(String[] args) {

        final String username = "username@gmail.com";
        final String password = "password";

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.postmarkapp.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props,
                new Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });

//        try {
//
//            Message message;
//            message = new MimeMessage(session);
//            message.setFrom(new InternetAddress("from-email@gmail.com"));
//            message.setRecipients(Message.RecipientType.TO,
//                    InternetAddress.parse("to-email@gmail.com"));
//            message.setSubject("Testing Subject");
//            message.setText("Dear Mail Crawler,"
//                    + "\n\n No spam to my email, please!");
//
//            Transport.send(message);
//
//            System.out.println("Done");
//
//        } catch (MessagingException e) {
//            throw new RuntimeException(e);
//        }
    }


}
