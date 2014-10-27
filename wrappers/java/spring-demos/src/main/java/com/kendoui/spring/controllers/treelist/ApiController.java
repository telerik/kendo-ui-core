package com.kendoui.spring.controllers.treelist;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.EmployeeDirectory;
import com.kendoui.spring.models.EmployeeDirectoryDao;


@Controller("treelist-api-controller")
@RequestMapping(value="/treelist/")
public class ApiController {
    
    @Autowired 
    private EmployeeDirectoryDao employeeDirectory;
    
    @RequestMapping(value = "/api", method = RequestMethod.GET)
    public String index() {
        return "treelist/api";
    }
    
    @RequestMapping(value = "/api/read", method = RequestMethod.POST)
    public @ResponseBody List<EmployeeDirectory> read() {
        return employeeDirectory.getList();
    }      
}

