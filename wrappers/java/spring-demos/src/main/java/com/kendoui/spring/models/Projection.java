package com.kendoui.spring.models;

import java.util.Date;

public class Projection {
    private String title;
    private Date start;
    private Date end;
    private String imdb;
    private String image;
    
    public Date getStart() {
        return start;
    }
    public void setStart(Date startTime) {
        this.start = startTime;
    }
    public String getImage() {
        return image;
    }
    public void setImage(String image) {
        this.image = image;
    }
    public String getImdb() {
        return imdb;
    }
    public void setImdb(String imdb) {
        this.imdb = imdb;
    }
    public Date getEnd() {
        return end;
    }
    public void setEnd(Date endTime) {
        this.end = endTime;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
}
