package com.kendoui.spring.models;

public class UploadInitialFile {
    private String name;
    private long size;
    private String extension;
    
    public UploadInitialFile(String name, long size, String extension) {
        this.setName(name);
        this.setSize(size);
        this.setExtension(extension);
    }
    
    public void setName(String name){
        this.name = name;
    }
    
    public void setSize(long size){
        this.size = size;
    }
    
    public void setExtension(String extension){
        this.extension = extension;
    }
    
    public String getName(){
        return this.name;
    }
    
    public long getSize(){
        return this.size;
    }
    
    public String getExtension(){
        return this.extension;
    }
}
