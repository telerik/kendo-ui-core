package com.kendoui.spring.controllers.progressbar;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("progressbar-vertical-controller")
@RequestMapping(value="/progressbar/")
public class VerticalController {
    
    @RequestMapping(value = {"/vertical"}, method = RequestMethod.GET)
    public String index() {
        return "progressbar/vertical";
    }
}