package com.pharmerz.Appcations;


import com.pharmerz.server.domain.model.Mobile;
import com.pharmerz.service.ClickatellRest;
import com.pharmerz.service.OtpGenerator;

import java.net.UnknownHostException;

/**
 * Created by User on 17-01-2017.
 */
public class Sms {


    Mobile mob;
    OtpGenerator otp;


    public final String APIKEY = "7WkWJyLqdkLMobLSbbXPTU4a5cpvSESN9y2SpriyqXNzDyQLzfkxYo3EhFYB";
    //private String mobile;


    public void sms_generation(String mobile, String Message) {

        System.out.println("\n\nSTARTING WITH TESTING REST:");

        // Create New object (Assign auth straight away.):
        ClickatellRest click = new ClickatellRest(APIKEY);

        // We cannot test for auth, so lets start with balance:
        System.out.println("TESTING GET BALANCE");
        try {
            double response = click.getBalance();
            System.out.println(response);
        } catch (UnknownHostException e) {
            System.out.println("Host could not be found");
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        // Assuming the auth was successful, lets send one message, to one
        // recipient:
        System.out.println("\nTESTING SEND SINGLE MESSAGE");
        try {
            ClickatellRest.Message response = click.sendMessage(mobile, Message);
            System.out.println(response);
            if (response.error != null) {
                System.out.println(response.error);
            } else {
                System.out.println("\nTESTING STOP:");
                System.out.println(click.stopMessage(response.message_id));
                System.out.println("\nTESTING GET STATUS:");
                ClickatellRest.Message msg = click
                        .getMessageStatus(response.message_id);
                System.out.println("ID:" + msg.message_id);
                System.out.println("Status:" + msg.status);
                System.out.println("Status Description:" + msg.statusString);
                System.out.println("Charge:" + msg.charge);
                System.out.println("\nTESTING STOP MESSAGE");
                ClickatellRest.Message msgStatus = click
                        .stopMessage(response.message_id);
                System.out.println("ID:" + msgStatus.message_id);
                System.out.println("Status:" + msgStatus.status);
                System.out.println("Status Description:"
                        + msgStatus.statusString);
            }
        } catch (UnknownHostException e) {
            System.out.println("Host could not be found");
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }


    }

}
