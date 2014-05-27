package com.kendoui.spring.controllers.map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("map-events-controller")
@RequestMapping(value="/map/")
public class EventsController {
    @RequestMapping(value = {"/events"}, method = RequestMethod.GET)
    public String index() {
        return "map/events";
    }
}

