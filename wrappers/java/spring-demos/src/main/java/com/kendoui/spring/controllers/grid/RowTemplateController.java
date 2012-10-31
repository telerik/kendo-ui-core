package com.kendoui.spring.controllers.grid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.CustomerDao;

@Controller("grid-row-template-controller")
@RequestMapping(value="/web/grid/")
public class RowTemplateController {
    @Autowired 
    private CustomerDao customer;
    
    @RequestMapping(value = "/rowtemplate", method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("customers", customer.getList());
        
        return "web/grid/rowtemplate";
    }
}