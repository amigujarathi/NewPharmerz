package com.pharmerz;

/**
 * Created by User on 11-05-2017.
 */
public class Date {



    public static void main(String[] args) {
        String date ="May  9 2017";
        System.out.println(date);
       String[] datearray= date.split(" ");
        System.out.println(datearray);
        System.out.println(datearray[0]+" " +datearray[1]+" "+datearray[2] +" "+datearray[3]);
    }
}
