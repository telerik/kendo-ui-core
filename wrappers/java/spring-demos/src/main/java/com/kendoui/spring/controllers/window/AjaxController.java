package com.kendoui.spring.controllers.window;

import java.util.Locale;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("window-ajax-controller")
@RequestMapping(value="/web/window/")
public class AjaxController {    
    
    @RequestMapping(value = "/ajax", method = RequestMethod.GET)
    public String index(Locale locale, Model model) {
        return "web/window/ajax";
    }
    
    @RequestMapping(value = "/content", method = RequestMethod.GET)
    public String content(Locale locale, Model model) {
        return "web/window/ajax_content";
    }
}

