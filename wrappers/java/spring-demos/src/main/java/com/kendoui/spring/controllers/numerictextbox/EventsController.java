package com.kendoui.spring.controllers.numerictextbox;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("numerictextbox-events-controller")
@RequestMapping(value="/numerictextbox/")
public class EventsController {
    
    @RequestMapping(value = {"/events"}, method = RequestMethod.GET)
    public String index() {       
        return "numerictextbox/events";
    }
}