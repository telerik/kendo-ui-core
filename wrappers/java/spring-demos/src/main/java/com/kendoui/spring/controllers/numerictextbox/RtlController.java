package com.kendoui.spring.controllers.numerictextbox;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("numerictextbox-rtl-controller")
@RequestMapping(value="/web/numerictextbox/")
public class RtlController {
    
    @RequestMapping(value = {"/rtl"}, method = RequestMethod.GET)
    public String index() {       
        return "web/numerictextbox/rtl";
    }    
}