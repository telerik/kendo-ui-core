package com.kendoui.spring.controllers.editor;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("editor-events-controller")
@RequestMapping(value="/editor/")
public class EventsController {
    
    @RequestMapping(value = "/events", method = RequestMethod.GET)
    public String index() {       
        return "editor/events";
    }    
}