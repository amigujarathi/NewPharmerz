package com.pharmerz.server.controller.rest;

import com.pharmerz.Appcations.Email;
import com.pharmerz.Appcations.Sms;
import com.pharmerz.server.domain.model.ForgetPassword;
import com.pharmerz.server.domain.model.User;
import com.pharmerz.server.domain.repository.ForgetPasswordRepository;
import com.pharmerz.server.domain.repository.UserRepository;
import com.pharmerz.service.ForgetPasswordService;
import com.pharmerz.service.OtpGenerator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

/**
 * Created by User on 30-01-2017.
 */
@RestController
@RequestMapping("/api/v1")
public class ForgetPasswordController {
    private static final Logger log = LoggerFactory.getLogger(ForgetPasswordController.class);
    private String To = null;
    private String MobileTO;
    private int flag;
    private String Password = null;
    private UUID ForgetPasswordId;
    private ForgetPassword forgetdataobj;
    private User userobj;

    @Autowired
    private ForgetPasswordService forgetPasswordService;
    OtpGenerator otp = new OtpGenerator();
    @Autowired
    public ForgetPasswordRepository forgetPasswordRepository;
    Email email = new Email();
    Sms sms = new Sms();
    Date date = new Date();
    @Autowired
    private UserRepository userRepository;


    ///api/v2/forgetpassword

    /************************To get All values from Forget Password Table****************************/

    @RequestMapping(value = "/forgetpassword", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Collection<ForgetPassword>> getForgetPasswords() {
        Collection<ForgetPassword> forgetPasswords = forgetPasswordService.findall();
        return new ResponseEntity<Collection<ForgetPassword>>(forgetPasswords, HttpStatus.OK);
    }

    /**********************************To create new forget Password***********************/
/*     /forgetpassword/api/forgetPasswords       */
/*Here Email id jason is input*/
    @PostMapping(value = "/forgetpassword", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ForgetPassword> createForgetPassword(@RequestBody ForgetPassword forgetPassword) {

        /**Initialising Parameters For Email*/

        int hashcode = otp.RandomOtp();
        System.out.println("********************************" + forgetPassword.getEmails());
        this.To = forgetPassword.getEmails();
        String Subject = "Verification OTP from Pharmerz";
        String HtmlBody = hashcode + "Your Verification OTP from Pharmerz ";

        //Console Logs
        System.out.println("************************************************+To " + To);
        System.out.println("************************************************+Subject " + Subject);
        System.out.println("************************************************+HtmlBody " + HtmlBody);
        System.out.println("************************************************+hashcode " + hashcode);
        forgetPassword.setHASHCODE(hashcode + "");

        email.SendMail(To, Subject, HtmlBody);


        if (forgetPasswordRepository.findByEmails(forgetPassword.getEmails()).isPresent() == true) {
            forgetPassword.setId(forgetPasswordRepository.findByEmails(forgetPassword.getEmails()).get().getId());
        }


        ForgetPassword saveForgetPassword = forgetPasswordService.create(forgetPassword);
        System.out.println("************************************************+savemobileobject" + saveForgetPassword);
        return new ResponseEntity<ForgetPassword>(forgetPassword, HttpStatus.OK);


    }

    @PostMapping(value = "/forgetpassword/mobile", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ForgetPassword> createForgetPasswordMobile(@RequestBody ForgetPassword forgetPasswordmobile) {

        int hashcode = otp.RandomOtp();

        this.MobileTO = forgetPasswordmobile.getMOBILE();
        String Message = hashcode + " is your Pharmerz verification code ";
        forgetPasswordmobile.setHASHCODE(hashcode + "");
        sms.sms_generation(MobileTO, Message);


        if (forgetPasswordRepository.findByMobile(forgetPasswordmobile.getMOBILE()).isPresent() == true) {
            forgetPasswordmobile.setId(forgetPasswordRepository.findByMobile(forgetPasswordmobile.getMOBILE()).get().getId());
        }

        ForgetPassword saveForgetPassMobile = forgetPasswordService.create(forgetPasswordmobile);

        return new ResponseEntity<ForgetPassword>(forgetPasswordmobile, HttpStatus.OK);

    }


    public ResponseEntity<ForgetPassword> getObjectUsingEmail(String emails) {

        ForgetPassword forgetPassword = forgetPasswordRepository.findByEmails(emails).get();
        return Optional.ofNullable(forgetPassword)
                .map(result -> new ResponseEntity<>(result, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));

    }


    public ResponseEntity<ForgetPassword> getObjectUsingMobile(String mobile) {

        ForgetPassword forgetPasswordmobile = forgetPasswordRepository.findByMobile(mobile).get();
        return Optional.ofNullable(forgetPasswordmobile)
                .map(result -> new ResponseEntity<>(result, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));

    }


    public ResponseEntity<User> getUserObjectUsingEmail(String email) {

        // ForgetPassword forgetPassword = userRepository.findByEmail( emails).get();
        User user = userRepository.findByEmail(email).get();

        return Optional.ofNullable(user)
                .map(result -> new ResponseEntity<>(result, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));

    }


    public ResponseEntity<User> getUserObjectUsingMobile(String mobile) {


        User usermobile = userRepository.findByMobile(mobile).get();

        return Optional.ofNullable(usermobile)
                .map(result -> new ResponseEntity<>(result, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));

    }


    /*      /forgetpassword/api/verify              *//////
    @PostMapping(value = "/verifyforgetpassword", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ForgetPassword> verifyForgetPassword(@RequestBody ForgetPassword forgetPassword) {

        System.out.println("********************************from frontend otp" + forgetPassword.getHASHCODE());
        String fromotp = forgetPassword.getHASHCODE();
        System.out.println("*********************************from fromform" + fromotp);

        // String email=emails.getUserid();
        ResponseEntity<ForgetPassword> ForgetPasswordData = getObjectUsingEmail(forgetPassword.getEmails());
        //this.forgetdataobj=getObjectUsingEmail(forgetPassword.getEmails());
        ResponseEntity<User> UserData = getUserObjectUsingEmail(forgetPassword.getEmails());
        this.userobj = UserData.getBody();

        Date dateFromDatabase = ForgetPasswordData.getBody().getUpdated();
        this.ForgetPasswordId = ForgetPasswordData.getBody().getId();

//        if ((dateFromDatabase.getYear() - date.getYear()) == 0) {
//
//            if ((dateFromDatabase.getMonth() - date.getMonth()) == 0) {
//
//                if ((dateFromDatabase.getDay() - date.getDay()) == 0) {
//                    if ((dateFromDatabase.getHours() - date.getHours()) <= 4) {
//                        System.out.print("May Be Right otp");

                        if (ForgetPasswordData.getBody().getHASHCODE().equals(fromotp)) {
                            System.out.print("matched");
                            forgetPassword.setId(ForgetPasswordId);
                            //forgetPassword.setUSER_ID(UserData.getBody().getId()+"");
                            forgetPassword.setUSERNAME(UserData.getBody().getUsername());
                            forgetPassword.setEmails(To);
                            forgetPassword.setHASHCODE("");
                            forgetPassword.setFLAG(1);


                            ForgetPassword saveForgetPassword = forgetPasswordService.create(forgetPassword);
                            this.forgetdataobj = saveForgetPassword;
                            flag = saveForgetPassword.getFLAG();

                            return new ResponseEntity<ForgetPassword>(forgetPassword, HttpStatus.OK);

                        } else {
                            System.out.print("miss matched");
                            forgetPasswordService.delete(ForgetPasswordData.getBody().getId());
                            return new ResponseEntity<ForgetPassword>(HttpStatus.BAD_REQUEST);
                        }

//
//                    } else {
//                        System.out.print("Wrong or Old Otp");
//                        forgetPasswordService.delete(ForgetPasswordData.getBody().getId());
//                        return new ResponseEntity<ForgetPassword>(HttpStatus.BAD_REQUEST);
//                    }
//                } else {
//                    System.out.print("Wrong or Old Otp");
//                    forgetPasswordService.delete(ForgetPasswordData.getBody().getId());
//                    return new ResponseEntity<ForgetPassword>(HttpStatus.BAD_REQUEST);
//                }
//
//            } else {
//                System.out.print("Wrong or Old Otp");
//                forgetPasswordService.delete(ForgetPasswordData.getBody().getId());
//                return new ResponseEntity<ForgetPassword>(HttpStatus.BAD_REQUEST);
//            }
//
//        } else {
//            System.out.print("Wrong or Old Otp");
//            forgetPasswordService.delete(ForgetPasswordData.getBody().getId());
//            return new ResponseEntity<ForgetPassword>(HttpStatus.BAD_REQUEST);
//        }

    }


    @PostMapping(value = "/verifyforgetpassword/mobile", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ForgetPassword> verifyForgetPasswordMob(@RequestBody ForgetPassword forgetPasswordmob) {


        String fromotp = forgetPasswordmob.getHASHCODE();

        ResponseEntity<ForgetPassword> ForgetPasswordDataMob = getObjectUsingMobile(forgetPasswordmob.getMOBILE());
        //this.forgetdataobj=getObjectUsingEmail(forgetPassword.getEmails());
        ResponseEntity<User> UserData = getUserObjectUsingMobile(forgetPasswordmob.getMOBILE());
        this.userobj = UserData.getBody();

        Date dateFromDatabase = ForgetPasswordDataMob.getBody().getUpdated();
        this.ForgetPasswordId = ForgetPasswordDataMob.getBody().getId();
        log.error("error log");

//        if ((dateFromDatabase.getYear() - date.getYear()) == 0) {
//
//            if ((dateFromDatabase.getMonth() - date.getMonth()) == 0) {
//
//                if ((dateFromDatabase.getDay() - date.getDay()) == 0) {
//                    if ((dateFromDatabase.getHours() - date.getHours()) <= 4) {
//                        System.out.print("May Be Right otp");

                        if (ForgetPasswordDataMob.getBody().getHASHCODE().equals(fromotp)) {
                            System.out.print("matched");
                            log.error("error log");
                            forgetPasswordmob.setId(ForgetPasswordId);

                            forgetPasswordmob.setUSERNAME(UserData.getBody().getUsername());
                            forgetPasswordmob.setMOBILE(MobileTO);
                            forgetPasswordmob.setHASHCODE("");
                            forgetPasswordmob.setFLAG(1);


                            ForgetPassword saveForgetPassword = forgetPasswordService.create(forgetPasswordmob);
                            this.forgetdataobj = saveForgetPassword;
                            flag = saveForgetPassword.getFLAG();

                            return new ResponseEntity<ForgetPassword>(forgetPasswordmob, HttpStatus.OK);

                        } else {
                            System.out.print("miss matched");
                            forgetPasswordService.delete(ForgetPasswordDataMob.getBody().getId());
                            return new ResponseEntity<ForgetPassword>(HttpStatus.BAD_REQUEST);
                        }


//                    } else {
//                        System.out.print("Wrong or Old Otp");
//                        forgetPasswordService.delete(ForgetPasswordDataMob.getBody().getId());
//                        return new ResponseEntity<ForgetPassword>(HttpStatus.BAD_REQUEST);
//                    }
//                } else {
//                    System.out.print("Wrong or Old Otp");
//                    forgetPasswordService.delete(ForgetPasswordDataMob.getBody().getId());
//                    return new ResponseEntity<ForgetPassword>(HttpStatus.BAD_REQUEST);
//                }
//
//            } else {
//                System.out.print("Wrong or Old Otp");
//                forgetPasswordService.delete(ForgetPasswordDataMob.getBody().getId());
//                return new ResponseEntity<ForgetPassword>(HttpStatus.BAD_REQUEST);
//            }
//
//        } else {
//            System.out.print("Wrong or Old Otp");
//            forgetPasswordService.delete(ForgetPasswordDataMob.getBody().getId());
//            return new ResponseEntity<ForgetPassword>(HttpStatus.BAD_REQUEST);
//        }

    }


    @PostMapping(value = "/updatepassword", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ForgetPassword> updateForgetPassword(@RequestBody ForgetPassword updatePassword) {
        String emailid = updatePassword.getEmails();
        String password = updatePassword.getPASSWORD();

        if (updatePassword.getFLAG() == 1) {

            userobj.setPassword(password);
            userRepository.save(userobj);
            System.out.println("/////////////////////////////////////////");
            System.out.println(userobj.getEmail() + userobj.getFirstName() + userobj.getGender() + userobj.getLastName() + userobj.getMiddleName() + userobj.getMobile() + userobj.getUrl() + userobj.getPassword() + userobj.getUsername() + userobj.getCreatedBy());

            forgetPasswordRepository.delete(forgetdataobj.getId());

            return new ResponseEntity<ForgetPassword>(updatePassword, HttpStatus.OK);
            // return new ResponseEntity<User>(userobj,HttpStatus.OK);
        } else {
            return new ResponseEntity<ForgetPassword>(HttpStatus.BAD_REQUEST);
        }


    }

    @PostMapping(value = "/updatepassword/mobile", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ForgetPassword> updateForgetPasswordMob(@RequestBody ForgetPassword updatePasswordmob) {
        String mobileno = updatePasswordmob.getMOBILE();
        String password = updatePasswordmob.getPASSWORD();


        if (updatePasswordmob.getFLAG() == 1) {


//          //  forgetdataobj.setPASSWORD(password);
//            forgetdataobj.setFLAG(0);
//            ForgetPassword updateForgetPassword =forgetPasswordService.create( forgetdataobj );


            userobj.setPassword(password);
            userRepository.save(userobj);
            System.out.println("/////////////////////////////////////////");
            System.out.println("getId" + userobj.getId() + "getEmail " + userobj.getEmail() + "getFirstName" + userobj.getFirstName() + "getGender" + userobj.getGender() + "getLastName" + userobj.getLastName() + userobj.getMiddleName() + userobj.getMobile() + userobj.getUrl() + userobj.getPassword() + userobj.getUsername() + userobj.getCreatedBy());


            forgetPasswordRepository.delete(forgetdataobj.getId());

            return new ResponseEntity<ForgetPassword>(updatePasswordmob, HttpStatus.OK);
            // return new ResponseEntity<User>(userobj,HttpStatus.OK);
        } else {
            return new ResponseEntity<ForgetPassword>(HttpStatus.BAD_REQUEST);
        }


    }


}
