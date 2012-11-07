package com.kendoui.spring.controllers.window;

import java.util.Locale;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("window-api-controller")
@RequestMapping(value="/web/window/")
public class ApiController {    
    
    @RequestMapping(value = "/api", method = RequestMethod.GET)
    public String index(Locale locale, Model model) {
        return "web/window/api";
    }
}

