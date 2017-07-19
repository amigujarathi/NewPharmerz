package com.pharmerz.server.controller.rest;

import com.pharmerz.Appcations.Email;
import com.pharmerz.server.domain.model.Emails;
import com.pharmerz.server.domain.repository.EmailsRepository;
import com.pharmerz.server.domain.repository.IUserRepository;
import com.pharmerz.service.OtpGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

/**
 * Created by User on 23-05-2017.
 */


@RestController
@RequestMapping("/api/v1")
public class EmailController2 {

    private String To = null;
    OtpGenerator otp = new OtpGenerator();
    @Autowired
    private EmailsRepository emailsRepository;
    @Autowired
    IUserRepository iUserRepository;
    Email email = new Email();
    Date date = new Date();
    Timestamp timestamp1 = new Timestamp(date.getTime());
    Calendar cal = Calendar.getInstance();
    SimpleDateFormat format = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");


    @PostMapping(value = "/emails", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Emails> createEmails(@RequestBody Emails emails) {
        int hashcode = otp.RandomOtp();
        this.To = emails.getEmail();
        String Subject = "Verification OTP from Pharmerz";
        String HtmlBody = hashcode + " is your Pharmerz verification code .";

            if (emailsRepository.findByUserid(emails.getUserid()) != null) {
                Emails emailprevious = emailsRepository.findByUserid(emails.getUserid());
                emailprevious.setEmail(emails.getEmail());
                emailprevious.setHASHCODE("" + hashcode);
                emailprevious.setUpdated(emails.getUpdated());
                emailprevious.setVERIFIED(0);
                emailsRepository.save(emailprevious);
                email.SendMail(To, Subject, HtmlBody);
                return new ResponseEntity<Emails>(emailprevious, HttpStatus.OK);
            } else {
                emails.setHASHCODE("" + hashcode);
                emails.setVERIFIED(0);
                emailsRepository.save(emails);

                email.SendMail(To, Subject, HtmlBody);
                return new ResponseEntity<Emails>(emails, HttpStatus.OK);

            }

    }


    @PostMapping(value = "/verifyemails", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Emails> verifyEmail(@RequestBody Emails emails) {

        String userid = emails.getUserid();
        String userotp = emails.getHASHCODE();
        Emails emailobject = emailsRepository.findByUserid(userid);
        if (emailobject.getHASHCODE().equals(userotp)) {
            System.out.println("Matched");
            emailobject.setHASHCODE("");
            emailobject.setVERIFIED(1);

            emailsRepository.save(emailobject);
            String Subject = "Pharmerz Thanknote";
            String Acknowledge = "Thank you for verifying on Pharmerz";
            email.SendMail(To, Subject, Acknowledge);

            return new ResponseEntity<Emails>(emailobject, HttpStatus.OK);

        } else {
            System.out.println("Miss matched");
            return new ResponseEntity<Emails>(HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/emailflagverification/{userid}")
    public ResponseEntity<Emails> getflagId1(@PathVariable String userid) {
        System.out.println(userid);
        Emails VerificationEmails = emailsRepository.findByUserid(userid);
        System.out.println(VerificationEmails);
        if (VerificationEmails == null) {
            return new ResponseEntity<Emails>(HttpStatus.BAD_REQUEST);
        } else if (VerificationEmails.getVERIFIED() == 0) {
            return new ResponseEntity<Emails>(HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<Emails>(VerificationEmails, HttpStatus.OK);
        }
    }
}
