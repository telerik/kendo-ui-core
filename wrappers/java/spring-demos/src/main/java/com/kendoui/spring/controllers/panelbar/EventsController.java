package com.kendoui.spring.controllers.panelbar;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("panelbar-events-controller")
@RequestMapping(value="/panelbar/")
public class EventsController {
    
    @RequestMapping(value = "/events", method = RequestMethod.GET)
    public String index() {        
        return "panelbar/events";
    } 
}