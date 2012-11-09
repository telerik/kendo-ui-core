package com.kendoui.spring.controllers.datepicker;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("datepicker-rtl-controller")
@RequestMapping(value="/web/datepicker/")
public class RtlController {
    
    @RequestMapping(value = {"/rtl"}, method = RequestMethod.GET)
    public String index() {       
        return "web/datepicker/rtl";
    }    
}