package com.kendoui.spring.controllers.map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("map-geojson-controller")
@RequestMapping(value="/map/")
public class GeoJsonController {
    @RequestMapping(value = {"/geojson"}, method = RequestMethod.GET)
    public String index() {
        return "map/geojson";
    }
}

