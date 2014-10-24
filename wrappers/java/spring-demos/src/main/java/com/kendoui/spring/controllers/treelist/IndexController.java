package com.kendoui.spring.controllers.treelist;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.EmployeeDirectory;
import com.kendoui.spring.models.EmployeeDirectoryDao;


@Controller("treelist-home-controller")
@RequestMapping(value="/treelist/")
public class IndexController {
    @Autowired 
    private EmployeeDirectoryDao employeeDirectory;
    
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index() {
        return "treelist/index";
    }
        
    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public @ResponseBody List<EmployeeDirectory> employeeDirectory() {

        return employeeDirectory.getList();
    }    
}

