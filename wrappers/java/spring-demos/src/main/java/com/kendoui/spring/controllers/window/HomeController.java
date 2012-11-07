package com.kendoui.spring.controllers.window;

import java.util.Locale;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("window-home-controller")
@RequestMapping(value="/web/window/")
public class HomeController {    
    
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index(Locale locale, Model model) {
        return "web/window/index";
    }
}

