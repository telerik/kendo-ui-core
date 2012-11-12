package com.kendoui.spring.controllers.slider;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("slider-events-controller")
@RequestMapping(value="/web/slider/")
public class EventsController {
    
    @RequestMapping(value = "/events", method = RequestMethod.GET)
    public String index() {       
        return "web/slider/events";
    }    
}