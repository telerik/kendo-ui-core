package com.kendoui.spring.controllers.map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("map-bing-controller")
@RequestMapping(value="/map/")
public class BingController {
    @RequestMapping(value = {"/bing"}, method = RequestMethod.GET)
    public String index() {
        return "map/bing";
    }
}