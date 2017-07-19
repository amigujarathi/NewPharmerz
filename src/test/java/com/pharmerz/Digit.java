package com.pharmerz;

/**
 * Created by User on 24-04-2017.
 */
public class Digit {


    public static void main(String[] args) {


        int[] digits={1,2,3,4,5,6,7,8,9,0};
        System.out.println("Number of possible combinations");

        System.out.println("3 digit combinations");

        for (int i = 0; i < digits.length - 2; i++) {
            for (int j = i + 1; j < digits.length - 1; j++) {
                for (int k = j + 1; k < digits.length; k++) {

                    int r=digits[i]+digits[j]+digits[k];
                    if(r==10){
                        System.out.println("" + digits[i] + digits[j] + digits[k]);
                    }
                }
            }
        }


        System.out.println("2 digit combinations");

        for (int i = 0; i < digits.length - 2; i++) {
            for (int j = i + 1; j < digits.length - 1; j++) {

                    int r=digits[i]+digits[j];
                    if(r==10){
                        System.out.println("" + digits[i] + digits[j] );

                }
            }
        }


        System.out.println("4 digit combination");

        System.out.println("3 digit combinations");

        for (int i = 0; i < digits.length - 2; i++) {
            for (int j = i + 1; j < digits.length - 1; j++) {
                for (int k = j + 1; k < digits.length; k++) {

                    for (int l = j + 1; l < digits.length; l++) {

                        int r=digits[i]+digits[j]+digits[k]+digits[l];
                        if(r==10){
                            System.out.println("" + digits[i] + digits[j] + digits[k] + digits[l]);
                        }

                    }

                }
            }
        }
    }
}
