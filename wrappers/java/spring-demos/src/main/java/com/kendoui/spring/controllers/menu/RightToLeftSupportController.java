package com.kendoui.spring.controllers.menu;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("menu-rtl-controller")
@RequestMapping(value="/menu/")
public class RightToLeftSupportController {
    
    @RequestMapping(value = {"/right-to-left-support"}, method = RequestMethod.GET)
    public String index() {       
        return "menu/right-to-left-support";
    }    
}