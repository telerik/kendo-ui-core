package com.kendoui.spring.models;

public class WebSiteStats {
    private String description;
    private int visitors;
    
    public WebSiteStats(String description, int visitors){
        this.setDescription(description);
        this.setVisitors(visitors);
    }
    
    
    
    public String getDescription(){
        return this.description;
    }
    
    public void setDescription(String description){
        this.description = description;
    }
    
    public int getVisitors(){
        return this.visitors;
    }
    
    public void setVisitors(int visitors){
        this.visitors = visitors;
    }
}
