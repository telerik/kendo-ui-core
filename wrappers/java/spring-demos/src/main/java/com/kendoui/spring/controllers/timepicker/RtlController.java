package com.kendoui.spring.controllers.timepicker;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("timepicker-rtl-controller")
@RequestMapping(value="/web/timepicker/")
public class RtlController {
    
    @RequestMapping(value = {"/rtl"}, method = RequestMethod.GET)
    public String index() {       
        return "web/timepicker/rtl";
    }    
}