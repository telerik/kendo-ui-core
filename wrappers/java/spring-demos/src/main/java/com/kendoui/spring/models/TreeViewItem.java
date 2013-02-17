package com.kendoui.spring.models;

import java.util.ArrayList;

public class TreeViewItem {
    
    private String id;
    private String text;
    private Boolean expanded;
    private String spriteCssClass;
    private ArrayList<TreeViewItem> items;       
    
    public String getText()
    {
        return this.text;
    }
    
    public void setText(String value)
    {
        this.text = value;
    }
    
    public String getId()
    {
        return this.id;
    }
    
    public void setId(String value)
    {
        this.id = value;
    }
    
    public Boolean getExpanded()
    {
        return this.expanded;
    }
    
    public void setExpanded(Boolean value)
    {
        this.expanded = value;
    }
    
    public String getSpriteCssClass()
    {
        return this.spriteCssClass;
    }
    
    public void setSpriteCssClass(String value)
    {
        this.spriteCssClass = value;
    }
    
    public ArrayList<TreeViewItem> getItems()
    {        
        return this.items;
    }  

    public void setFields(String id, String text, String spriteCssClass, Boolean expanded)
    {
        this.setId(id);
        this.setText(text);
        this.setSpriteCssClass(spriteCssClass);
        this.setExpanded(expanded);
    }
    
    public TreeViewItem AddSubItem()
    {               
        TreeViewItem item = new TreeViewItem();
        if(this.items == null){
            this.items = new ArrayList<TreeViewItem>();
        }
        
        this.items.add(item);
        return item;
    }    
}
