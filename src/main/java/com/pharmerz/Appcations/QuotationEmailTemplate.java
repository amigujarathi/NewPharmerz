package com.pharmerz.Appcations;

/**
 * Created by Amit on 31-03-2017.
 */
public class QuotationEmailTemplate {

    public String Quotation_template(String ProductName, String Suplier) {

        String template = "<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "<head>\n" +
                "  <meta charset=\"utf-8\">\n" +
                "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
                "  <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\">\n" +
                "  <script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js\"></script>\n" +
                "  <script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js\"></script>\n" +
                "  <style>\n" +
                "\t.font_Class{\n" +
                "\t\tfont-weight:normal;\n" +
                "\t}\n" +
                "\t.BodyClass{\n" +
                "\t\tpadding-top: 64px;\n" +
                "\t}\n" +
                "\ta{\n" +
                "\t\n" +
                "\ttext-underline: none;\n" +
                "\tcolor:white;\n" +
                "\t\n" +
                "\t}\n" +
                "\ta:hover{\n" +
                "\t\n" +
                "\ttext-underline: none;\n" +
                "\tcolor:white;\n" +
                "\t\n" +
                "\t}\n" +
                "\tbutton{\n" +
                "\t\tborder: 1px solid #5cb85c;\n" +
                "\t\tbackground-color: #5cb85c;\n" +
                "\t\theight: 35px;\n" +
                "\t\tcolor: #fff;\n" +
                "\t}\n" +
                "  </style>\n" +
                "</head>\n" +
                "<body class=\"BodyClass\">\n" +
                "\t<div class=\"container\">\n" +
                "\t\t\t<div class=\"row\">\n" +
                "\t\t\t<div class=\"container\">\n" +
                "\t\t\t\t<div class=\"col-md-12 col-lg-12 col-sm-12 col-xs-12 text-left\">\n" +
                "\t\t\t\t\t<b>\n" +
                "\t\t\t\t\t\tQuotation \n" +
                "\t\t\t\t\t<b>\n" +
                "\t\t\t\t\t<hr>\n" +
                "\t\t\t\t</div>\n" +
                "\t\t\t\t<div class=\"col-md-12 col-lg-12 col-sm-12 col-xs-12 text-left\">\n" +
                "\t\t\t\t\t<div>\n" +
                "\t\t\t\t\t\tTo " + Suplier + "<b><Receiver Supplier Name></b>, \n" +
                "\t\t\t\t\t\t\n" +
                "\t\t\t\t\t</div>\n" +
                "\t\t\t\t\t<div class=\"font_Class\">\n" +
                "\t\t\t\t\t\t<br>\n" +
                "\t\t\t\t\t\tYou have received quotation for <b>" + ProductName + "</b> in your Pharmerz Account.\n" +
                "\t\t\t\t\t\t<br>\n" +
                "\t\t\t\t\t\tTo get more details,\n" +
                "\t\t\t\t\t\t<br><br><br>\n" +
                "\t\t\t\t\t\t<a href=\"http://www.pharmerz.com\" target=\"_blank\" style=\"text-decoration: none;\">\n" +
                "\t\t\t\t\t\t\t<button>\n" +
                "\t\t\t\t\t\t\t\tLogin to Pharmerz\n" +
                "\t\t\t\t\t\t\t</button>\n" +
                "\t\t\t\t\t\t</a>\n" +
                "\t\t\t\t\t\t<br><br>\n" +
                "\t\t\t\t\t\t<footer>\n" +
                "\t\t\t\t\t\t\tThanks,\n" +
                "\t\t\t\t\t\t\t<br>\n" +
                "\t\t\t\t\t\t\tPharmerz Team\n" +
                "\t\t\t\t\t\t</footer>\n" +
                "\t\t\t\t\t</div>\n" +
                "\t\t\t\t</div>\n" +
                "\t\t\t\t<!--<div class=\"col-md-12 col-lg-12 col-sm-12 col-xs-12 text-left\">\n" +
                "\t\t\t\t\t<div class=\"col-md-1 col-lg-1 col-sm-1 col-xs-1\"></div>\n" +
                "\t\t\t\t\t<div class=\"col-md-10 col-lg-10 col-sm-10 col-xs-10 text-right\">\n" +
                "\t\t\t\t\t\t<hr>\n" +
                "\t\t\t\t\t\t<p class=\"font_Class\">\n" +
                "\t\t\t\t\t\t\tYou have received Quotation for <b>Product Name</b> <img src=\"ccccc\"/>\n" +
                "\t\t\t\t\t\t</p>\n" +
                "\t\t\t\t\t\t\n" +
                "\t\t\t\t\t</div>\n" +
                "\t\t\t  </div>-->\n" +
                "\t\t\t  </div>\n" +
                "\t\t</div>\n" +
                "\t</div>\n" +
                "</body>\n" +
                "</html>";
        return template;
    }
}
