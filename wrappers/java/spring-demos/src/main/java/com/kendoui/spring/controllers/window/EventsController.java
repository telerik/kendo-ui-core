package com.kendoui.spring.controllers.window;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("window-events-controller")
@RequestMapping(value="/window/")
public class EventsController {    
    
    @RequestMapping(value = "/events", method = RequestMethod.GET)
    public String index() {
        return "window/events";
    }
}

