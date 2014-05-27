package com.kendoui.spring.controllers.slider;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("slider-events-controller")
@RequestMapping(value="/slider/")
public class EventsController {
    
    @RequestMapping(value = "/events", method = RequestMethod.GET)
    public String index() {       
        return "slider/events";
    }    
}