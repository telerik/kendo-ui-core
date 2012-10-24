package com.kendoui.spring.controllers.autocomplete;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("autocoplete-remotedata-controller")
@RequestMapping(value="/web/autocomplete/")
public class RemoteDataController {
    
    @RequestMapping(value = {"/remotedatasource"}, method = RequestMethod.GET)
    public String index() {       
        return "web/autocomplete/remotedatasource";
    }    
}