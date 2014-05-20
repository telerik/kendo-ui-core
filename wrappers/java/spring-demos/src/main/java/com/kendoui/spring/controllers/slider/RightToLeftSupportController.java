package com.kendoui.spring.controllers.slider;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("slider-rtl-controller")
@RequestMapping(value="/slider/")
public class RightToLeftSupportController {
    
    @RequestMapping(value = "/right-to-left-support", method = RequestMethod.GET)
    public String index() {       
        return "slider/right-to-left-support";
    }    
}