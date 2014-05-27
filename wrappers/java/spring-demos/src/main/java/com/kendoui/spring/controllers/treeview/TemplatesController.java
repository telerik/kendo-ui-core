package com.kendoui.spring.controllers.treeview;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.ui.Model;

import com.kendoui.spring.models.TreeViewItem;

@Controller("treeview-templates-controller")
@RequestMapping(value="/treeview/")
public class TemplatesController {
    
    @RequestMapping(value = {"/templates"}, method = RequestMethod.GET)
    public String index(Model model) {   
                                       
        model.addAttribute("data", getData());
        return "treeview/templates";
    } 
        
    private List<TreeViewItem> getData()
    {
        List<TreeViewItem> data = new ArrayList<TreeViewItem>();
        TreeViewItem documents = new TreeViewItem();
        data.add(documents);
        documents.setFields("1","My Documents", "rootfolder", true);
        
        TreeViewItem project = documents.AddSubItem();
        project.setFields("2", "Kendo UI Project", "folder", true);
        project.AddSubItem().setFields("3", "about.html", "html", false);
        project.AddSubItem().setFields("4,", "index.html", "html", false);
        project.AddSubItem().setFields("5,", "logo.png", "image", false);
        
        TreeViewItem website = documents.AddSubItem();
        website.setFields("6", "New Web Site", "folder", true);
        website.AddSubItem().setFields("7", "mockup.jpg", "image", false);
        website.AddSubItem().setFields("8", "Research.pdf", "pdf", false);
        
        TreeViewItem reports = documents.AddSubItem();
        reports.setFields("9", "Reports", "folder", true);
        reports.AddSubItem().setFields("10", "February.pdf", "pdf", false);
        reports.AddSubItem().setFields("11", "March.pdf", "pdf", false);
        reports.AddSubItem().setFields("5,", "April.pdf", "pdf", false);
        
        return data;
    }       
}