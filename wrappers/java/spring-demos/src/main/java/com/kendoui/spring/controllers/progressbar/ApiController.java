package com.kendoui.spring.controllers.progressbar;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("progressbar-api-controller")
@RequestMapping(value="/progressbar/")
public class ApiController {
    
    @RequestMapping(value = {"/api"}, method = RequestMethod.GET)
    public String index() {       
        return "progressbar/api";
    }    
}