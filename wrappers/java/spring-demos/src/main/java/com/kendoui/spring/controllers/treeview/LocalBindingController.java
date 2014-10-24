package com.kendoui.spring.controllers.treeview;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.ui.Model;

import com.kendoui.spring.models.CategoryItem;
import com.kendoui.spring.models.TreeViewItem;

@Controller("treeview-local-binding-controller")
@RequestMapping(value="/treeview/")
public class LocalBindingController {
    
    @RequestMapping(value = {"/local-data-binding"}, method = RequestMethod.GET)
    public String index(Model model) {   
                               
        model.addAttribute("inlineDefault", getDefaultInlineData());
        model.addAttribute("inline", getInlineData());
        return "treeview/local-data-binding";
    } 
    
    
    private List<TreeViewItem> getDefaultInlineData()
    {
        List<TreeViewItem> inlineDefaultData = new ArrayList<TreeViewItem>();
        TreeViewItem furniture = new TreeViewItem();
        inlineDefaultData.add(furniture);
        furniture.setText("Furniture");
        furniture.AddSubItem().setText("Tables & Chairs");
        furniture.AddSubItem().setText("Sofas");
        furniture.AddSubItem().setText("Occasional Furniture");
        
        TreeViewItem decor = new TreeViewItem();
        inlineDefaultData.add(decor);
        decor.setText("Decor");
        decor.AddSubItem().setText("Bed Linen");
        decor.AddSubItem().setText("Curtains & Blinds");
        decor.AddSubItem().setText("Carpets");
        
        return inlineDefaultData;
    }  
    
    private List<CategoryItem> getInlineData()
    {
        List<CategoryItem> inlineData = new ArrayList<CategoryItem>();
        CategoryItem storage = new CategoryItem();
        inlineData.add(storage);
        storage.setCategoryName("Storage");
        storage.AddSubItem().setSubCategoryName("Wall Shelving");
        storage.AddSubItem().setSubCategoryName("Floor Shelving");
        storage.AddSubItem().setSubCategoryName("Kids Storage");
        
        CategoryItem lights = new CategoryItem();
        inlineData.add(lights);
        lights.setCategoryName("Lights");
        lights.AddSubItem().setSubCategoryName("Ceiling");
        lights.AddSubItem().setSubCategoryName("Table");
        lights.AddSubItem().setSubCategoryName("Floor");
        
        return inlineData;
    }    
}

