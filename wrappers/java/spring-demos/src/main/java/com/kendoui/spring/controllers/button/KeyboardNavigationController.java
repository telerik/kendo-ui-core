package com.kendoui.spring.controllers.button;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("button-navigation-controller")
@RequestMapping(value="/button/")
public class KeyboardNavigationController {
    
    @RequestMapping(value = {"/keyboard-navigation"}, method = RequestMethod.GET)
    public String index() {       
        return "button/keyboard-navigation";
    }    
}