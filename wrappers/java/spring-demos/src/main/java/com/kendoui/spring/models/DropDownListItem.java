package com.kendoui.spring.models;

public class DropDownListItem {
    private String text;
    private String value;
    
    public DropDownListItem() {
        
    }
    
    public DropDownListItem(String text, String value) {
        setValue(value);
        setText(text);
    }
    
    public String getText() {
        return text;
    }
    
    public void setText(String text) {
        this.text = text;
    }
    
    public String getValue() {
        return value;
    }
    
    public void setValue(String value) {
        this.value = value;
    }
}