package com.kendoui.spring.controllers.panelbar;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("panelbar-rtl-controller")
@RequestMapping(value="/web/panelbar/")
public class RtlController {
    
    @RequestMapping(value = {"/rtl"}, method = RequestMethod.GET)
    public String index() {       
        return "web/panelbar/rtl";
    }    
}