package com.pharmerz.Appcations;


/**
 * Created by Amit on 18-01-2017.
 */
public class ContactusTemplate {


    public String contact_template(String Full_name, String Company, String Email, String Mobile, String Address, String Comment) {

        String template = "\n" +
                "<!doctype html>\n" +
                "<html>\n" +
                "<head>\n" +
                "   <title>Offline Message</title>\n" +
                "   \n" +
                "   <link href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\" rel=\"stylesheet\" integrity=\"sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u\" crossorigin=\"anonymous\">\n" +
                " <style>\n" +
                "\t.tablestr{\n" +
                "\t\tborder:1px solid #ddd;\"\n" +
                "\t}\n" +
                "\t.maintablestr{\n" +
                "\t\tborder:1px solid #ddd;\"\n" +
                "\t\ttext-align:center;\n" +
                "\t\tmargin-bottom:10px;\n" +
                "\t}\n" +
                "\t.user_guide_label{\n" +
                "\t\tfont-family: Helvetica,Arial,sans-serif;\n" +
                "\t\tfont-weight: bold;\n" +
                "\t\tcolor: rgb(82,82,82);\n" +
                "\t\tpadding-left: 15px;\n" +
                "\t}\n" +
                "\t.user_information{\n" +
                "\t\tfont-family: Helvetica,Arial,sans-serif;\n" +
                "\t\tcolor: rgb(82,82,82);\n" +
                "\t}\n" +
                "\t.tblmsg_heading{\n" +
                "\t\ttext-align:center;\n" +
                "\t\tfont-family: Helvetica,Arial,sans-serif;\n" +
                "\t\tfont-weight: bold;\n" +
                "\t\tcolor: rgb(82,82,82);\n" +
                "\t}\n" +
                "\t.tblmsg_subheading{\n" +
                "\t\ttext-align:center;\n" +
                "\t\tfont-family: Helvetica,Arial,sans-serif;\n" +
                "\t\tfont-weight: bold;\n" +
                "\t\tcolor: rgb(82,82,82);\n" +
                "\t}\n" +
                "\t.div_width_adj{\n" +
                "\t\twidth:800px;\n" +
                "\t\tmargin:0 auto;\n" +
                "\t}\n" +
                "\t.table>tbody>tr>td{\n" +
                "\t\tborder-top: none !important;\n" +
                "\t}\n" +
                "\t.table{\n" +
                "\t\tmargin-bottom: 0px !important;\n" +
                "\t}\n" +
                "\t@media screen and (max-width: 567px){\n" +
                "\t\t.div_width_adj{\n" +
                "\t\twidth:400px;\n" +
                "\t\tmargin:0 auto;\n" +
                "\t}\n" +
                "\t}\n" +
                "\t\n" +
                "\t.brand-logo {\n" +
                "    font-family: RalewaySemiBold;\n" +
                "    font-size: 22px;\n" +
                "    color: #0099cc;\n" +
                "    padding-top: 9px;\n" +
                "}\n" +
                "</style>\n" +
                "</head>\n" +
                "<body>\n" +
                "\t<div>\n" +
                "\t\t<center><img src=\"http://res.cloudinary.com/pharmerzsupport/image/upload/v1472557805/pharmerz_logo2_20_fjoqgc.png\" style=\"width:20%;\"></center>\n" +
                "\t</div>\n" +
                "\t<div class=\"div_width_adj\" style=\"\">\n" +
                "\t\n" +
                "\t\n" +
                "\t\n" +
                "\t\n" +
                "\t  <p style=\"text-align:center;\"> Message From " + Full_name + "</p>\n" +
                "\t  <table class=\"table table-responsive\" style=\"border:1px solid #ccc;width:60%;\" align=\"center\">\n" +
                "        <tr>\n" +
                "           <td class=\"user_guide_label\">\n" +
                "\t\t\t\t<p style=\"padding-left:15px;\"> Full Name :  </p>\n" +
                "            </td>\n" +
                "\t\t\t<td class=\"user_information\">\n" +
                "\t\t\t\t<p>" + Full_name + "</p>\n" +
                "            </td>\n" +
                "\t\t</tr>\n" +
                "\t\t\n" +
                "\t\t<tr>\n" +
                "           <td class=\"user_guide_label\">\n" +
                "\t\t\t\t<p style=\"padding-left:15px;\"> Email :  </p>\n" +
                "            </td>\n" +
                "\t\t\t<td class=\"user_information\">\n" +
                "\t\t\t\t<p>" + Email + "</p>\n" +
                "            </td>\n" +
                "\t\t</tr>\n" +
                "\t\t\n" +
                "\t\t<tr>\n" +
                "           <td class=\"user_guide_label\">\n" +
                "\t\t\t\t<p style=\"padding-left:15px;\">Company Name :  </p>\n" +
                "            </td>\n" +
                "\t\t\t<td class=\"user_information\">\n" +
                "\t\t\t\t<p>" + Company + "</p>\n" +
                "            </td>\n" +
                "\t\t</tr>\n" +
                "\t\t\n" +
                "\t\t<tr>\n" +
                "           <td class=\"user_guide_label\">\n" +
                "\t\t\t\t<p style=\"padding-left:15px;\"> Contact Number :  </p>\n" +
                "            </td>\n" +
                "\t\t\t<td class=\"user_information\">\n" +
                "\t\t\t\t<p> " + Mobile + "</p>\n" +
                "            </td>\n" +
                "\t\t</tr>\n" +
                "\t\t\n" +
                "\t\t<tr>\n" +
                "           <td class=\"user_guide_label\">\n" +
                "\t\t\t\t<p style=\"padding-left:15px;\">  Address :  </p>\n" +
                "            </td>\n" +
                "\t\t\t<td class=\"user_information\">\n" +
                "\t\t\t\t<p>" + Address + "</p>\n" +
                "            </td>\n" +
                "\t\t</tr>\n" +
                "\t\t\t\n" +
                "\t\t<tr>\n" +
                "           <td class=\"user_guide_label\">\n" +
                "\t\t\t\t<p style=\"padding-left:15px;\"> Comment :  </p>\n" +
                "            </td>\n" +
                "\t\t\t<td class=\"user_information\">\n" +
                "\t\t\t\t<p>" + Comment + "</p>\n" +
                "            </td>\n" +
                "\t\t</tr>\n" +
                "     </table>\n" +
                "\t </div>\n" +
                "</body>\n" +
                "</html>";
        return template;
    }
}
