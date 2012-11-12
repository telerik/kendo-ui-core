package com.kendoui.spring.controllers.treeview;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.DetailedEmployee;
import com.kendoui.spring.models.EmployeeDao;

@Controller("treeview-remote-binding-controller")
@RequestMapping(value="/web/treeview/")
public class RemoteBindingController {
    @Autowired 
    private EmployeeDao employee;

    @RequestMapping(value = "/remote-data", method = RequestMethod.GET)
    public String index() {
        return "web/treeview/remote-data";
    }
    
    @RequestMapping(value = "/remote-data/read", method = RequestMethod.POST)
    public @ResponseBody List<DetailedEmployee> read(Integer employeeId) {
        return employee.getDetailedListByEmployeeId(employeeId);
    }
}