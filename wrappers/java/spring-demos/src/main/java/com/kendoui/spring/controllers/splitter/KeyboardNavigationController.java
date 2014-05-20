package com.kendoui.spring.controllers.splitter;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("splitter-navigation-controller")
@RequestMapping(value="/splitter/")
public class KeyboardNavigationController {
    
    @RequestMapping(value = "/keyboard-navigation", method = RequestMethod.GET)
    public String index() {       
        return "splitter/keyboard-navigation";
    }    
}