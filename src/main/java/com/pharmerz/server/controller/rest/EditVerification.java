package com.pharmerz.server.controller.rest;

import com.pharmerz.server.domain.model.Edit;
import com.pharmerz.server.domain.model.Emails;
import com.pharmerz.server.domain.model.Mobile;
import com.pharmerz.server.domain.repository.EmailsRepository;
import com.pharmerz.server.domain.repository.IUserRepository;
import com.pharmerz.server.domain.repository.MobileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

/**
 * Created by Amit on 23-05-2017.
 */
@RequestMapping("/api/v1")
@RestController
public class EditVerification {


    @Autowired
    EmailsRepository emailsRepository;
    @Autowired
    MobileRepository mobileRepository;
    @Autowired
    IUserRepository iUserRepository;

    UUID emailuserid = null;
    UUID mobileuserid = null;

    @PostMapping("/edituser")
    public ResponseEntity<Edit> getflagId1(@RequestBody Edit edit) {
        UUID userid = edit.getId();


        System.out.println(userid);
        String useridf = userid.toString().replace("-", "").toUpperCase();
        System.out.println(useridf);
        // String email = iUserRepository.findOne(UUID.fromString(userid)).getEmail();
        String email = edit.getEmail();
        System.out.println(email);
        String mobile = edit.getMobile();
        System.out.println(mobile);

        //For email
        Emails emailObj = emailsRepository.findByUserid(useridf);
        System.out.println(emailObj);


        System.out.println(1);
        if (emailObj == null) {
            System.out.println("email object is not present in verification table");

        } else if (emailObj.getEmail().equals(email)) {
            this.emailuserid = emailObj.getId();
            System.out.println(emailuserid);
            System.out.println("same email");


        } else {
            System.out.println(4);
            this.emailuserid = emailObj.getId();
            System.out.println(emailuserid);
            emailsRepository.delete(emailuserid);
            System.out.println("email deleted");
        }

        //For Mobile
        Mobile mobileobj = mobileRepository.findByUserid(useridf);
        System.out.println(mobileobj);


        System.out.println(1);
        if (mobileobj == null) {
            System.out.println("mobile object is not present in verification table");


        } else if (mobileobj.getMob().equals(mobile)) {
            System.out.println(3);
            this.mobileuserid = mobileobj.getId();
            System.out.println(mobileuserid);
            System.out.println("same email");


        } else {
            System.out.println(4);
            this.mobileuserid = mobileobj.getId();
            System.out.println(mobileuserid);
            mobileRepository.delete(mobileuserid);
            System.out.println("mobile deleted");
        }

        return new ResponseEntity<Edit>(HttpStatus.OK);
    }
}
