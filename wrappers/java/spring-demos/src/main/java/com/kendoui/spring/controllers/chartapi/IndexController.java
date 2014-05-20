package com.kendoui.spring.controllers.chartapi;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-api-home-controller")
@RequestMapping(value = "/chart-api/")
public class IndexController {
    @RequestMapping(value = { "/", "/index" }, method = RequestMethod.GET)
    public String index() {
        return "/chart-api/index";
    }
}
