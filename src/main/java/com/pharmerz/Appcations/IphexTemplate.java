package com.pharmerz.Appcations;

/**
 * Created by User on 08-05-2017.
 */
public class IphexTemplate {

    public String template(String Personname,String Email,String Message){

        String template="<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "  <head>\n" +
                "    <meta charset=\"utf-8\">\n" +
                "    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n" +
                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
                "    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->\n" +
                "    <title>Bootstrap 101 Template</title>\n" +
                "\n" +
                "    <!-- Bootstrap -->\n" +
                "    <link href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\" rel=\"stylesheet\">\n" +
                "\n" +
                "    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->\n" +
                "    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->\n" +
                "    <!--[if lt IE 9]>\n" +
                "      <script src=\"https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js\"></script>\n" +
                "      <script src=\"https://oss.maxcdn.com/respond/1.4.2/respond.min.js\"></script>\n" +
                "    <![endif]-->\n" +
                "  </head>\n" +
                "  <body>\n" +
                "    <center><h3>IPhex</h3></center>\n" +
                "\t<div class=\"container\">\n" +
                "\t\t<div class=\"row\">\n" +
                "\t\t\t<div class=\"col-md-6 col-md-offset-3\">\n" +
                "\t\t\t\t<div>Person Name  : "+Personname+"</div>\n" +
                "\t\t\t\t<div>Email Id  : "+Email+"</div>\n" +
                "\t\t\t\t<div>Message  : "+Message+"</div>\n" +
                "\t\t\t</div>\n" +
                "\t\t</div>\n" +
                "\t</div>\n" +
                "\n" +
                "    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->\n" +
                "    <script src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js\"></script>\n" +
                "    <!-- Include all compiled plugins (below), or include individual files as needed -->\n" +
                "    <script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js\"></script>\n" +
                "  </body>\n" +
                "</html>";
        return template;
    }
}
