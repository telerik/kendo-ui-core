package com.kendoui.spring.controllers.sortable;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("sortable-events-controller")
@RequestMapping(value="/sortable/")
public class EventsController {    
    
    @RequestMapping(value = {"/", "/events"}, method = RequestMethod.GET)
    public String index() {
        return "sortable/events";
    }
    
}