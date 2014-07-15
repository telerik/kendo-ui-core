package com.kendoui.spring.controllers.diagram;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller("dataviz-diagram-api-controller")
@RequestMapping(value="/diagram/")
public class ApiController {
    @RequestMapping(value = {"/api"}, method = RequestMethod.GET)
    public String index() {
        return "/diagram/api";
    }
}
