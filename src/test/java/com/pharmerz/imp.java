package com.pharmerz;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;

/**
 * Created by Amit on 10-05-2017.
 */
public class imp {

    static final double _eQuatorialEarthRadius = 6378.1370D;
    static final double _d2r = (Math.PI / 180D);
    static final DecimalFormat df = new DecimalFormat("###");
    static final DecimalFormat dfOne = new DecimalFormat("###.#");

    public static void main(String[] args) {
//        String timeStamp = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new java.util.Date());
//        System.out.println(timeStamp);

        Double distance = HaversineInMetres(18.503088, 73.797350999999, 18.503088, 73.797351);
        Double distance1 = HaversineInMetres(18.516422, 73.856103, 18.665559, 73.76415);
        System.out.println("Diffrence between two distance = "+distance);
        System.out.println("Diffrence between two distance = "+distance1);
        Double finaldistance=trimValue(distance);
        Double finaldistance1=trimValue(distance1);

        System.out.println("Final Distance ="+finaldistance);
        System.out.println("Final Distance ="+finaldistance1);



    }

    public static double HaversineInMetres(double lat1, double long1, double lat2, double long2) {
        System.out.println("First Cordinate "+lat1+" "+long1);
        System.out.println("First Cordinate "+lat2+" "+long2);
        double dlong = (long2 - long1) * _d2r;
        double dlat = (lat2 - lat1) * _d2r;
        double a = Math.pow(Math.sin(dlat / 2D), 2D) + Math.cos(lat1 * _d2r) * Math.cos(lat2 * _d2r)
                * Math.pow(Math.sin(dlong / 2D), 2D);
        double c = 2D * Math.atan2(Math.sqrt(a), Math.sqrt(1D - a));
        double d = _eQuatorialEarthRadius * c;

        Double dist = (1000D * d);
        return dist;
    }


    public static double trimValue(double value) {
        return Double.parseDouble(df.format(value));
    }


}