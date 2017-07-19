package com.pharmerz.service;

import java.util.Random;

/**
 * Created by Amit on 10-01-2017.
 */
public class OtpGenerator {
    Random random = new Random();

    public OtpGenerator() {
    }

    public int RandomOtp() {
        Random rnd = new Random();
        int ran = 100000 + rnd.nextInt(900000);
        return ran;
    }
}
