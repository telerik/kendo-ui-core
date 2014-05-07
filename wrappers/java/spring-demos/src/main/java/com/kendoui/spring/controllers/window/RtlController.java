package com.kendoui.spring.controllers.window;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("window-rtl-controller")
@RequestMapping(value="/window/")
public class RtlController {    
    
    @RequestMapping(value = "/rtl", method = RequestMethod.GET)
    public String index() {
        return "window/rtl";
    }
}

