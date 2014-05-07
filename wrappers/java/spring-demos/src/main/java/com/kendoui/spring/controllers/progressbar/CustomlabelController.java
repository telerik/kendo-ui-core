package com.kendoui.spring.controllers.progressbar;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("progressbar-customlabel-controller")
@RequestMapping(value="/progressbar/")
public class CustomlabelController {
    
    @RequestMapping(value = {"/customlabel"}, method = RequestMethod.GET)
    public String index() {       
        return "progressbar/customlabel";
    }    
}