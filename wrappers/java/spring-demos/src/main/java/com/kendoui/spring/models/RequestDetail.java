package com.kendoui.spring.models;

public class RequestDetail {
    private String caption;
    private Integer elapsed;
    private String summary;
    
    public RequestDetail(String caption, int elapsed) {
        setCaption(caption);
        setElapsed(new Integer(elapsed));
    }
    
    public RequestDetail(String caption, String summary)
    {
        setCaption(caption);
        setSummary(summary);
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public Integer getElapsed() {
        return elapsed;
    }

    public void setElapsed(Integer elapsed) {
        this.elapsed = elapsed;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }
}
