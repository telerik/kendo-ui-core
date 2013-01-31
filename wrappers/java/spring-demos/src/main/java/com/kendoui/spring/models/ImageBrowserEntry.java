package com.kendoui.spring.models;

public class ImageBrowserEntry {
    
    private String name;
    private String type;
    private long size;

    public ImageBrowserEntry() {
        type = "f";
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public long getSize() {
        return size;
    }

    public void setSize(long size) {
        this.size = size;
    }    
    
}
