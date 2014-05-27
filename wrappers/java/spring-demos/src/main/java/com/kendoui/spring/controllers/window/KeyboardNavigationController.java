package com.kendoui.spring.controllers.window;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("window-navigation-controller")
@RequestMapping(value="/window/")
public class KeyboardNavigationController {    
    
    @RequestMapping(value = "/keyboard-navigation", method = RequestMethod.GET)
    public String index() {
        return "window/keyboard-navigation";
    }
}