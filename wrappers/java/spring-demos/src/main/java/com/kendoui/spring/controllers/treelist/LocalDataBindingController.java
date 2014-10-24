package com.kendoui.spring.controllers.treelist;

import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.EmployeeDirectoryDao;;

@Controller("treelist-local-data-controller")
@RequestMapping(value="/treelist/")
public class LocalDataBindingController {
    @Autowired 
    private EmployeeDirectoryDao employeeDirectory;
    
    @RequestMapping(value = "/local-data-binding", method = RequestMethod.GET)
    public String index(Locale locale, Model model) {
        model.addAttribute("employees", employeeDirectory.getList());
        
        return "treelist/local-data-binding";
    }
}