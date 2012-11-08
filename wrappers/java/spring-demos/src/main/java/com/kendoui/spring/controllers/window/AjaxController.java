package com.kendoui.spring.controllers.window;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("window-ajax-controller")
@RequestMapping(value="/web/window/")
public class AjaxController {    
    
    @RequestMapping(value = "/ajax", method = RequestMethod.GET)
    public String index() {
        return "web/window/ajax";
    }
    
    @RequestMapping(value = "/content", method = RequestMethod.GET)
    public String content() {
        return "web/window/ajax_content";
    }
}

