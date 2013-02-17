package com.kendoui.spring.models;

import java.util.ArrayList;

public class TreeViewItem {
    
    private String text;
    private ArrayList<TreeViewItem> items;       
    
    public String getText()
    {
        return this.text;
    }
    
    public void setText(String value)
    {
        this.text = value;
    }
    
    public ArrayList<TreeViewItem> getItems()
    {        
        return this.items;
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
