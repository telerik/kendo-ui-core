package com.kendoui.spring.controllers.treelist;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.DetailedEmployeeDirectory;
import com.kendoui.spring.models.EmployeeDirectoryDao;


@Controller("treelist-remote-data-controller")
@RequestMapping(value="/treelist/")
public class RemoteDataBindingController {
    
    @Autowired 
    private EmployeeDirectoryDao employeeDirectory;
    
    @RequestMapping(value = "/remote-data-binding", method = RequestMethod.GET)
    public String index() {
        return "treelist/remote-data-binding";
    }
        
    @RequestMapping(value = "/read", method = RequestMethod.POST)
    public @ResponseBody List<DetailedEmployeeDirectory> read(@RequestBody Map<String, Object> model) {
        return employeeDirectory.getByEmployeeId((Integer)model.get("id"));
    }   
}