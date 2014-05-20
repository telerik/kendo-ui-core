package com.kendoui.spring.controllers.calendar;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("calendar-navigation-controller")
@RequestMapping(value="/calendar/")
public class KeyboardNavigationController {
    
    @RequestMapping(value = {"/keyboard-navigation"}, method = RequestMethod.GET)
    public String index() {       
        return "calendar/keyboard-navigation";
    }    
}