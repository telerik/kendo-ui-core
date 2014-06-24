package com.kendoui.spring.controllers.toolbar;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("toolbar-events-controller")
@RequestMapping(value="/toolbar/")
public class EventsController {
    
    @RequestMapping(value = {"/", "/events"}, method = RequestMethod.GET)
    public String index() {      
        return "toolbar/events";
    }
}