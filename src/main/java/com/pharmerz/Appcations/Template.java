package com.pharmerz.Appcations;

/**
 * Created by User on 25-04-2017.
 */
public class Template {

    public String meetingTemplate(String body,String name){

        String meeting="<html>\n" +
                "<body>"+body+"\n" +
                "<br>\n" +
                "Please do not reply to this mail. Kindly send your queries or response to  : "+name+"</body>\n" +
                "\n" +
                "\n" +
                "</html>";

    return meeting;
    }


}
