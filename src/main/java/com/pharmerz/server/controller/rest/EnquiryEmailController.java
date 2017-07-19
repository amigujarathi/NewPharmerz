package com.pharmerz.server.controller.rest;

import com.pharmerz.Appcations.Email;
import com.pharmerz.Appcations.EnquiryTemplate;
import com.pharmerz.server.domain.model.EnquiryEmail;
import com.pharmerz.server.domain.repository.IOrganizationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.UUID;

/**
 * Created by User on 31-03-2017.
 */
@RestController
@RequestMapping("/api/v1")
public class EnquiryEmailController {

    @Autowired
    IOrganizationRepository iOrganizationRepository;


    Email email = new Email();
    EnquiryTemplate enquiryTemplate = new EnquiryTemplate();


    @Async
    @PostMapping(value = "/enquiryemail", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<EnquiryEmail> EnquiryEmail(@RequestBody EnquiryEmail enquiryEmail) {

        final String product = enquiryEmail.getProductname();
        System.out.println("product " + product);


        String[] organisationids = enquiryEmail.getOrganisationIds();
        System.out.println(" organisationids.length " + organisationids.length);

        for (int i = 0; i < organisationids.length; i++) {


            String timeStamp = new SimpleDateFormat("dd:MM:yyyy HH:mm:ss").format(Calendar.getInstance().getTime());
            System.out.println(timeStamp);


            String organisationid = organisationids[i];
            System.out.println("organisationid " + organisationid);
            UUID uidorganisationId = UUID.fromString(organisationid);
            System.out.println("uidorganisationId " + uidorganisationId);
            String To = iOrganizationRepository.findOne(uidorganisationId).getUser().getEmail();
            String Subject = "Congratulation Enquiry received on " + timeStamp;
            String body = enquiryTemplate.Enquiry_template(product);
            System.out.println("To " + To);
            System.out.println(" Subject" + Subject);
            System.out.println("body " + body);
            email.SendMail(To, Subject, body);

        }


        return new ResponseEntity<EnquiryEmail>(enquiryEmail, HttpStatus.OK);
    }


}
