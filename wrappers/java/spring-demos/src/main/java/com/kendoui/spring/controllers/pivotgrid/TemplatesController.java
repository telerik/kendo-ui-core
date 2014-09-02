package com.kendoui.spring.controllers.pivotgrid;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller("pivotgrid-templates-controller")
@RequestMapping(value="/pivotgrid/")
public class TemplatesController {
    
    @RequestMapping(value = {"/templates"}, method = RequestMethod.GET)
    public String index() {
        return "pivotgrid/templates";
    }
}

