package com.kendoui.spring.controllers.numerictextbox;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("numerictextbox-rtl-controller")
@RequestMapping(value="/numerictextbox/")
public class RightToLeftSupportController {
    
    @RequestMapping(value = {"/right-to-left-support"}, method = RequestMethod.GET)
    public String index() {       
        return "numerictextbox/right-to-left-support";
    }    
}