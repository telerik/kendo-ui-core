package com.kendoui.spring.models;

public class BlogComments {
    
    private String blog; 
    private int day;
    private int value;
    
    public BlogComments(String blog, int day, int value) {
        setBlog(blog);
        setDay(day);
        setValue(value);
    }
    
    public String getBlog() {
        return blog;
    }

    public void setBlog(String blog) {
        this.blog = blog;
    }
    
    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }
    
    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }
}
