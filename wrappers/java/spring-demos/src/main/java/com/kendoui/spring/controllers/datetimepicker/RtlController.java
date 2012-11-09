package com.kendoui.spring.controllers.datetimepicker;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("datetimepicker-rtl-controller")
@RequestMapping(value="/web/datetimepicker/")
public class RtlController {
    
    @RequestMapping(value = {"/rtl"}, method = RequestMethod.GET)
    public String index() {       
        return "web/datetimepicker/rtl";
    }    
}