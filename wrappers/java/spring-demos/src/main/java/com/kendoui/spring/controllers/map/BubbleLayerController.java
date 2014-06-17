package com.kendoui.spring.controllers.map;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.UrbanArea;
import com.kendoui.spring.models.UrbanAreaDao;

@Controller("map-bubblelayer-controller")
@RequestMapping(value="/map/")
public class BubbleLayerController {
    @Autowired 
    private UrbanAreaDao urbanArea;
    
    @RequestMapping(value = {"/bubble-layer"}, method = RequestMethod.GET)
    public String index() {
        return "/map/bubble-layer";
    }
    
    @RequestMapping(value = "/bubble-layer/read", method = RequestMethod.POST)
    public @ResponseBody List<UrbanArea> read() {
        return urbanArea.getList();
    }
}

