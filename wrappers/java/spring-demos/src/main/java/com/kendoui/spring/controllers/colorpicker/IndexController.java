package com.kendoui.spring.controllers.colorpicker;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("colorpicker-home-controller")
@RequestMapping(value="/colorpicker/")
public class IndexController {
    
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index() {       
        return "colorpicker/index";
    }    
}