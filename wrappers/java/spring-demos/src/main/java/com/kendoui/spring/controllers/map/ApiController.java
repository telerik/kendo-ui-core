package com.kendoui.spring.controllers.map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("map-api-controller")
@RequestMapping(value="/map/")
public class ApiController {
    @RequestMapping(value = {"/api"}, method = RequestMethod.GET)
    public String index() {
        return "map/api";
    }
}

