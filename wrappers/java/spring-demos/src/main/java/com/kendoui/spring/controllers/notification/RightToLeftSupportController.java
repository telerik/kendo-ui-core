package com.kendoui.spring.controllers.notification;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("notification-rtl-controller")
@RequestMapping(value="/notification/")
public class RightToLeftSupportController {
    
    @RequestMapping(value = {"/", "/right-to-left-support"}, method = RequestMethod.GET)
    public String index() {       
        return "notification/right-to-left-support";
    }    
}