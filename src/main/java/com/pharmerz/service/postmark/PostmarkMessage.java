package com.pharmerz.service.postmark;
import org.springframework.mail.SimpleMailMessage;


/**
 * Created by User on 12-01-2017.
 */
public class PostmarkMessage extends SimpleMailMessage  {


    private String tag;

    private String htmlBody;

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getTag() {
        return tag;
    }

    public String getHtmlBody() {
        return htmlBody;
    }

    public void setHtmlBody(String htmlBody) {
        this.htmlBody = htmlBody;
    }
}
