package com.kendoui.spring.controllers.datetimepicker;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("datetimepicker-navigation-controller")
@RequestMapping(value="/datetimepicker/")
public class KeyboardNavigationController {
    
    @RequestMapping(value = {"/keyboard-navigation"}, method = RequestMethod.GET)
    public String index() {       
        return "datetimepicker/keyboard-navigation";
    }    
}