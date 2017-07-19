package com.pharmerz.server.controller.rest;

import com.pharmerz.Appcations.Email;
import com.pharmerz.Appcations.QuotationEmailTemplate;
import com.pharmerz.server.domain.model.QuotationEmail;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Calendar;

/**
 * Created by User on 30-03-2017.
 */
@RestController
@RequestMapping("/api/v1")
public class QuotationEmailController {
    Email email = new Email();
    QuotationEmailTemplate quotationEmailTemplate = new QuotationEmailTemplate();


    @PostMapping(value = "/quotationemail", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<QuotationEmail> QuotationEmail(@RequestBody QuotationEmail quotationEmail) {

        String timeStamp = new SimpleDateFormat("dd:MM:yyyy HH:mm:ss").format(Calendar.getInstance().getTime());
        System.out.println(timeStamp);

        String to = quotationEmail.getReciveremail();
        String product = quotationEmail.getProduct();
        String supplier = quotationEmail.getRecivername();
        String subject = "Congratulation Quotation received on " + timeStamp;
        //  String body="Hello "+recivername+", You have received enquiry for "+product+" in your pharmerz account. Contact to PHARMERZ portal for more details";
        String body = quotationEmailTemplate.Quotation_template(product, supplier);

        email.SendMail(to, subject, body);

        return new ResponseEntity<QuotationEmail>(quotationEmail, HttpStatus.OK);
    }

}
