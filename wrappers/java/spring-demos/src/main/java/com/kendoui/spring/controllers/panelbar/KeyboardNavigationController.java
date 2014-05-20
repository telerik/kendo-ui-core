package com.kendoui.spring.controllers.panelbar;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("panelbar-navigation-controller")
@RequestMapping(value="/panelbar/")
public class KeyboardNavigationController {
    
    @RequestMapping(value = {"/keyboard-navigation"}, method = RequestMethod.GET)
    public String index() {       
        return "panelbar/keyboard-navigation";
    }    
}