package com.pharmerz.server.controller.rest;

import com.pharmerz.Appcations.Sms;
import com.pharmerz.server.domain.model.Mobile;
import com.pharmerz.server.domain.repository.MobileRepository;
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

/**
 * Created by User on 23-05-2017.
 */


@RestController
@RequestMapping("/api/v1")
public class MobileController2 {


    private String To = null;
    OtpGenerator otp = new OtpGenerator();
    @Autowired
    private MobileRepository mobileRepository;
    Sms sms = new Sms();
    Date date = new Date();
    Timestamp timestamp1 = new Timestamp(date.getTime());
    Calendar cal = Calendar.getInstance();
    SimpleDateFormat format = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");


    @PostMapping(value = "/mobile", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Mobile> createMobile(@RequestBody Mobile mobile) {
        int hashcode = otp.RandomOtp();
        this.To = mobile.getMob();
        String Message = hashcode + " is your Pharmerz verification code ";

        if (mobileRepository.findByUserid(mobile.getUserid()) != null) {
            Mobile mobileprevious = mobileRepository.findByUserid(mobile.getUserid());
            mobileprevious.setMob(mobile.getMob());
            mobileprevious.setHASHCODE("" + hashcode);
            mobileprevious.setUpdated(mobile.getUpdated());
            mobileprevious.setVERIFIED(0);
            mobileRepository.save(mobileprevious);
            sms.sms_generation(To, Message);
            return new ResponseEntity<Mobile>(mobileprevious, HttpStatus.OK);
        } else {
            mobile.setHASHCODE("" + hashcode);
            mobile.setVERIFIED(0);
            mobileRepository.save(mobile);

            sms.sms_generation(To, Message);
            return new ResponseEntity<Mobile>(mobile, HttpStatus.OK);

        }
    }



    @PostMapping(value = "/verifymobile", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Mobile> verifyMobile(@RequestBody Mobile mobile) {

        String userid = mobile.getUserid();
        String userotp = mobile.getHASHCODE();
        Mobile mobileobject = mobileRepository.findByUserid(userid);
        if (mobileobject.getHASHCODE().equals(userotp)) {
            System.out.println("Matched");
            mobileobject.setHASHCODE("");
            mobileobject.setVERIFIED(1);

            mobileRepository.save(mobileobject);
            String Acknowledge = "Thank you for verifying on Pharmerz";
            sms.sms_generation(To, Acknowledge);

            return new ResponseEntity<Mobile>(mobileobject, HttpStatus.OK);

        } else {
            System.out.println("Miss matched");
            return new ResponseEntity<Mobile>(HttpStatus.BAD_REQUEST);
        }
    }



    @GetMapping("/mobileflagverification/{userid}")
    public ResponseEntity<Mobile> getflagId1(@PathVariable String userid) {
        System.out.println(userid);
        Mobile VerificationMobile = mobileRepository.findByUserid(userid);
        System.out.println(VerificationMobile);
        if (VerificationMobile == null) {
            return new ResponseEntity<Mobile>(HttpStatus.BAD_REQUEST);
        } else if (VerificationMobile.getVERIFIED() == 0) {
            return new ResponseEntity<Mobile>(HttpStatus.BAD_REQUEST);
        }else {
            return new ResponseEntity<Mobile>(VerificationMobile, HttpStatus.OK);
        }
    }
}
