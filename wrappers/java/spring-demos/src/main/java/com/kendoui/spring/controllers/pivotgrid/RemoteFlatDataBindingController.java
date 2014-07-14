package com.kendoui.spring.controllers.pivotgrid;

import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.Customer;
import com.kendoui.spring.models.CustomerDao;
import com.kendoui.spring.models.ProductDao;

@Controller("pivotgrid-remote-flat-data-binding-controller")
@RequestMapping(value="/pivotgrid/")
public class RemoteFlatDataBindingController {
    @Autowired 
    private CustomerDao customer;
    
    @RequestMapping(value = {"/remote-flat-data-binding"}, method = RequestMethod.GET)
    public String index() {        
        return "pivotgrid/remote-flat-data-binding";
    }

    @RequestMapping(value = "/customers", method = RequestMethod.GET)
    public @ResponseBody List<Customer> customers() {
        return customer.getList();
    }
}

