package com.kendoui.spring.controllers.notification;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("notification-position_stacking-controller")
@RequestMapping(value="/notification/")
public class PositionStackingController {
    
    @RequestMapping(value = {"/", "/position-stacking"}, method = RequestMethod.GET)
    public String index() {       
        return "notification/position-stacking";
    }    
}