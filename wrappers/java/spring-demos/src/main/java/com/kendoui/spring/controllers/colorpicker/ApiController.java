package com.kendoui.spring.controllers.colorpicker;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("colorpicker-api-controller")
@RequestMapping(value="/colorpicker")
public class ApiController {
    
    @RequestMapping(value = {"api"}, method = RequestMethod.GET)
    public String index() {       
        return "colorpicker/api";
    }    
}