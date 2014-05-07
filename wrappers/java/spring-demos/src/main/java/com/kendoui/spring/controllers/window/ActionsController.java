package com.kendoui.spring.controllers.window;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("window-actions-controller")
@RequestMapping(value="/window/")
public class ActionsController {    
    
    @RequestMapping(value = "/actions", method = RequestMethod.GET)
    public String index() {
        return "window/actions";
    }
}

