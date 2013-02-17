package com.kendoui.spring.models;

import java.util.ArrayList;

public class CategoryItem {
    private String categoryName;
    private ArrayList<SubCategoryItem> subCategories;       
    
    public String getCategoryName()
    {
        return this.categoryName;
    }    
    
    public void setCategoryName(String value)
    {
        this.categoryName = value;
    }
    
    public ArrayList<SubCategoryItem> getSubCategories()
    {        
        return this.subCategories;
    }
    
    public SubCategoryItem AddSubItem()
    {               
        SubCategoryItem item = new SubCategoryItem();
        if(this.subCategories == null){
            this.subCategories = new ArrayList<SubCategoryItem>();
        }
        
        this.subCategories.add(item);
        return item;
    }  
}
