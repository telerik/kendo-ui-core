package com.kendoui.spring.controllers.window;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("window-ajax-controller")
@RequestMapping(value="/window/")
public class AjaxController {    
    
    @RequestMapping(value = "/ajax", method = RequestMethod.GET)
    public String index() {
        return "window/ajax";
    }
    
    @RequestMapping(value = "/content", method = RequestMethod.GET)
    public String content() {
        return "window/ajax_content";
    }
    
    @RequestMapping(value = "/content1", method = RequestMethod.GET)
    public String content1() {
        return "window/ajax_content1";
    }
}

