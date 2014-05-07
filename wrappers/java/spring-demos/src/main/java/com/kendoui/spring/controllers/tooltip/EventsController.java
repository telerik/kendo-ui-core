package com.kendoui.spring.controllers.tooltip;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("tooltip-events-controller")
@RequestMapping(value="/tooltip/")
public class EventsController {    
    
    @RequestMapping(value = "/events", method = RequestMethod.GET)
    public String index() {
        return "tooltip/events";
    }
}

