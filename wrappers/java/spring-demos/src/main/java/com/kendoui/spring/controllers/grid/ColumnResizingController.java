package com.kendoui.spring.controllers.grid;

import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.EmployeeDao;

@Controller("grid-column-resizing-controller")
@RequestMapping(value="/web/grid/")
public class ColumnResizingController {
    @Autowired 
    private EmployeeDao employee;
    
    @RequestMapping(value = "/column-resizing", method = RequestMethod.GET)
    public String index(Locale locale, Model model) {
        model.addAttribute("employees", employee.getList());
        
        return "web/grid/column-resizing";
    }
}