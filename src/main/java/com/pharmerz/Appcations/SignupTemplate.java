package com.pharmerz.Appcations;

/**
 * Created by Amit on 08-04-2017.
 */
public class SignupTemplate {


    public String signupTemplate(String name){

        String template="<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "  <head>\n" +
                "    <meta charset=\"utf-8\">\n" +
                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">\n" +
                "    \n" +
                "    <style>\n" +
                "        \n" +
                "        @font-face {font-family: \"Roboto\";\n" +
                "    src: url(\"http://db.onlinewebfonts.com/t/5673da52c98bb6cb33ada5aaf649703e.eot\");\n" +
                "    src: url(\"http://db.onlinewebfonts.com/t/5673da52c98bb6cb33ada5aaf649703e.eot?#iefix\") format(\"embedded-opentype\"),\n" +
                "    url(\"http://db.onlinewebfonts.com/t/5673da52c98bb6cb33ada5aaf649703e.woff2\") format(\"woff2\"),\n" +
                "    url(\"http://db.onlinewebfonts.com/t/5673da52c98bb6cb33ada5aaf649703e.woff\") format(\"woff\"),\n" +
                "    url(\"http://db.onlinewebfonts.com/t/5673da52c98bb6cb33ada5aaf649703e.ttf\") format(\"truetype\"),\n" +
                "    url(\"http://db.onlinewebfonts.com/t/5673da52c98bb6cb33ada5aaf649703e.svg#Roboto\") format(\"svg\");\n" +
                "}\n" +
                "        \n" +
                "        .template-box{\n" +
                "                 margin-top:20px;\n" +
                "                 margin-bottom:20px;\n" +
                "                  padding: 20px 20px 20px 20px;\n" +
                "                 background-color: #EEEEEE;\n" +
                "                 color:#474747;\n" +
                "                 font-family: \"Roboto\";\n" +
                "                 font-size: 14px;\n" +
                "                 font-weight:400;\n" +
                "                 \n" +
                "        }\n" +
                "        \n" +
                "        .email-content{\n" +
                "                 padding: 20px 20px 20px 10px;\n" +
                "                 \n" +
                "        }\n" +
                "        \n" +
                "        .email-button{\n" +
                "                 background-color: #00B8FE;\n" +
                "                 color: #fff;\n" +
                "                 box-shadow: 1px 3px 1px #888888;\n" +
                "                 padding: 10px;\n" +
                "                  border: 0px;\n" +
                "        }\n" +
                "        \n" +
                "        .email-button:hover{\n" +
                "                  background-color: #00B8FE;\n" +
                "                 color: #fff;\n" +
                "                 box-shadow: 1px 3px 1px #888888;\n" +
                "                 padding: 10px;\n" +
                "                  border: 0px;\n" +
                "        }\n" +
                "        \n" +
                "        </style>\n" +
                "        \n" +
                "  </head>\n" +
                "  <body>\n" +
                "  \n" +
                "        <center><table class=\"template-box\">\n" +
                "        \n" +
                "                <tr>\n" +
                "                        <td colspan=\"2\"  style=\"text-align: center;padding: 10px;background-color: #fff;border: 1px solid #cccccc;border-bottom-width: 0px;\">\n" +
                "                                <a href=\" http://pharmerz.com/\" target=\"_blank\"><img src=\"https://res.cloudinary.com/pharmerzsupport/image/upload/v1496472434/Pharmerz_Logo_hz0y38.png\" alt=\"icon\" style=\"width=30% \"></a>\n" +
                "                        </td>\n" +
                "                </tr>\n" +
                "                \n" +
                "                <tr>\n" +
                "                        <td colspan=\"2\" style=\"text-align: justify;padding: 10px;    text-align: left; background-color: #fff; border: 1px solid #cccccc;border-bottom-width: 0px;border-top-width: 0px;\">\n" +
                "                                <div class=\"email-content\">\n" +
                "                                        <h3 style=\"color:#00B8FE\">Dear "+name+",</h3>\n" +
                "                                        <p style=\"color: #474747\">Thank you for registering with Pharmerz. You're all ready to go!!</p>\n" +
                "                                        <h4 style=\"font-weight:600;margin-bottom: 5px;\">Let's Get Started</h4>\n" +
                "                                        <p style=\"color: #474747\">Individual Buyers and Sellers,Small and Medium Enterprises (SMEs) to large Corporate from Pharmaceutical industry are using Pharmerz to close more deals and build customer relationships.</p>\n" +
                "                                        <p style=\"color: #474747\">We created Pharmerz and it's mobile apps to turn your monotonous B2B trading routine into an enjoyable experience.</p>\n" +
                "                                        <p style=\"color: #474747\">Never loose access to your business enquiries wherever you are!</p>\n" +
                "                                        <p style=\"color: #474747\">This is the app you use to check   your product Enquiries,Quotation updates on daily requirements find suppliers and schedule meeting with just a click.</p>\n" +
                "                                        <p style=\"color: #474747\">Please upload your Product list to explore buyers to go through it.</p>\n" +
                "                                        <div class=\"row\" style=\"text-align:center;margin-top:40px;margin-bottom:30px;\">\n" +
                "                                                 <a href=\" http://www.pharmerz.com\" target=\"_blank\" style=\"cursor:pointer;\">\n" +
                "                                                         <button type=\"button\" class=\"btn email-button\" style=\"background-color: #00B8FE;cursor:pointer;color: #fff;box-shadow: 1px 3px 1px #888888;padding: 10px;width: 240px;height: 45px;border: 0px;\">SIGN IN TO GET STARTED</button>\n" +
                "                                                </a>\n" +
                "                                        </div>\n" +
                "                                        <p style=\"margin-bottom:0px;color: #474747;\">Regards,</p>\n" +
                "                                        <p style=\"margin:0px;color: #474747;\">Pharmerz Support</p>                                        \n" +
                "                                </div>\n" +
                "                        </td>\n" +
                "                </tr>\n" +
                "                \n" +
                "                <tr >\n" +
                "                        <td colspan=\"2\" style=\"text-align:center; font-size:18px;padding: 10px;background-color: #fff;border: 1px solid #cccccc;border-bottom-width: 0px;border-top-width: 0px;\">\n" +
                "                                <p style=\"margin:0px;\">Get the App now</p>\n" +
                "                        </td>\n" +
                "                </tr>\n" +
                "                <tr>\n" +
                "                        <td style=\"text-align:right; font-size:18px;padding: 10px;background-color: #fff;border: 1px solid #cccccc;border-bottom-width: 0px;border-right-width: 0px;border-top-width: 0px;\">\n" +
                "                                <a href=\"https://play.google.com/store/apps/details?id=com.pharmerz.pharmerz&hl=en\" target=\"_blank\"><img src=\"http://res.cloudinary.com/pharmerzsupport/image/upload/v1463566001/android-playstore.png\" alt=\"Play-Store\" style=\"width:40%;\"></a>\n" +
                "                        </td>\n" +
                "                        <td style=\"text-align:left; font-size:18px;padding: 10px;background-color: #fff;border: 1px solid #cccccc;border-bottom-width: 0px;border-left-width: 0px;border-top-width: 0px;\">\n" +
                "                                <a href=\"https://itunes.apple.com/gb/app/pharmerz/id1064115252?mt=8\" target=\"_blank\"><img src=\"https://res.cloudinary.com/pharmerzsupport/image/upload/v1463566057/apple_app_store.png\" alt=\"App-Store\" style=\"width:40%;\"></a>\n" +
                "                        </td>\n" +
                "                </tr>\n" +
                "                <tr>\n" +
                "                        <td colspan=\"2\" style=\"text-align:center; font-size:14px;padding: 8px;background-color: #cccccc;border: 1px solid #cccccc;\">\n" +
                "                                <a style=\" text-decoration:none;color:#5e5e5e;\" href=\"http://www.pharmerz.com\" target=\"_blank\">www.pharmerz.com</a>\n" +
                "                        </td>\n" +
                "                </tr>\n" +
                "          \n" +
                "        </table>\n" +
                "  \n" +
                "  </body>\n" +
                "</html>\n";


        return template;
    }

}
