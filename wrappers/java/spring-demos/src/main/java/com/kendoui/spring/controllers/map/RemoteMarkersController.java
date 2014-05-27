package com.kendoui.spring.controllers.map;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.MapDataRepository;
import com.kendoui.spring.models.Marker;

@Controller("map-remotemarkers-controller")
@RequestMapping(value="/map/")
public class RemoteMarkersController {
    @RequestMapping(value = {"/remote-markers"}, method = RequestMethod.GET)
    public String index() {
        return "/map/remote-markers";
    }
    
    @RequestMapping(value = "/remote-markers/read", method = RequestMethod.POST)
    public @ResponseBody List<Marker> read() {
        return MapDataRepository.StoreLocations();
    }
}

