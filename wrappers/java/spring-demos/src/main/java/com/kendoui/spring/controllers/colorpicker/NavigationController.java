package com.kendoui.spring.controllers.colorpicker;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("colorpicker-navigation-controller")
@RequestMapping(value="/colorpicker/")
public class NavigationController {
    
    @RequestMapping(value = {"/navigation"}, method = RequestMethod.GET)
    public String index() {       
        return "colorpicker/navigation";
    }    
}