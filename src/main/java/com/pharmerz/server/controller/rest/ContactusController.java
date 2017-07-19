package com.pharmerz.server.controller.rest;

import com.pharmerz.Appcations.ContactusTemplate;
//import com.pharmerz.Appcations.Email;
import com.pharmerz.Appcations.Email;
import com.pharmerz.server.domain.model.Contactus;
import com.pharmerz.service.ContactusService;
import oracle.sql.DATE;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.pharmerz.service.postmark.PostmarkMailSender;
import com.pharmerz.service.postmark.PostmarkMessage;
import sun.util.calendar.BaseCalendar;
import sun.util.calendar.LocalGregorianCalendar;

import java.util.Collection;
import java.util.Date;


/**
 * Created by Amit on 14-01-2017.
 */
@RestController
@RequestMapping("/api/v1/")
public class ContactusController {

    @Autowired
    private ContactusService contactusService;
    Email email = new Email();
    ContactusTemplate contactusTemplate = new ContactusTemplate();


    private String To = "support@pharmerz.com";
    private String Subject = "Pharmerz Contactus ";


/***    To get All ContactUs Objects   *******************/
    /***** url:-/api/v2/contactus   ************************/

    @GetMapping(value = "/contactus", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Collection<Contactus>> getContactuss() {
        Collection<Contactus> contactuses = contactusService.findall();
        System.out.println("*************************************************************");
        System.out.println("from controller findall" + contactuses.iterator());

        return new ResponseEntity<Collection<Contactus>>(contactuses, HttpStatus.OK);
    }


    /***    To Post All ContactUs Objects   *******************/
    /*****     url:-/api/v2/contactus   ************************/

    @PostMapping(value = "/contactus", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Contactus> createContactus(@RequestBody Contactus contactus) {

        String FullName = contactus.getFULL_NAME();
        String Company = contactus.getCOMPANY_NAME();
        String Email = contactus.getEMAIL();
        String Mobile = contactus.getCONTACT_NUMBER();
        String Address = contactus.getADDRESS();
        String Comment = contactus.getCOMMENTS();

        if (FullName == null) {
            FullName = "-";
        }
        if (Company == null) {
            Company = "-";
        }
        if (Email == null) {
            Email = "-";
        }
        if (Mobile == null) {
            Mobile = "-";
        }
        if (Address == null) {
            Address = "-";
        }
        if (Comment == null) {
            Comment = "-";
        }

        String HTMLBODY = contactusTemplate.contact_template(FullName, Company, Email, Mobile, Address, Comment);

        email.SendMail(To, Subject, HTMLBODY);
        Date date = new Date();
        String createddate = date.toString();
        contactus.setCreated(date);
        System.out.println("********************************************date " + date.toString());

        Contactus savecontactus = contactusService.create(contactus);

        return new ResponseEntity<Contactus>(savecontactus, HttpStatus.OK);

    }


}




