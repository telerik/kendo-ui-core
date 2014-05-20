package com.kendoui.spring.controllers.datepicker;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("datepicker-navigation-controller")
@RequestMapping(value="/datepicker/")
public class KeyboardNavigationController {
    
    @RequestMapping(value = {"/keyboard-navigation"}, method = RequestMethod.GET)
    public String index() {       
        return "datepicker/keyboard-navigation";
    }    
}