package com.kendoui.spring.controllers.numerictextbox;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("numerictextbox-navigation-controller")
@RequestMapping(value="/numerictextbox/")
public class KeyboardNavigationController {
    
    @RequestMapping(value = {"/keyboard-navigation"}, method = RequestMethod.GET)
    public String index() {       
        return "numerictextbox/keyboard-navigation";
    }    
}