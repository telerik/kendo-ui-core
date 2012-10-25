package com.kendoui.spring.controllers.autocomplete;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("autocomplete-template-controller")
@RequestMapping(value="/web/autocomplete/")
public class TemplateController {
    
    @RequestMapping(value = {"/template"}, method = RequestMethod.GET)
    public String index() {       
        return "web/autocomplete/template";
    }    
}