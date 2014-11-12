package com.kendoui.spring.controllers.diagram;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.DiagramDataRepository;
import com.kendoui.spring.models.OrgChartItem;

@Controller("dataviz-diagram-home-controller")
@RequestMapping(value="/diagram/")
public class IndexController {
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index() {
        return "/diagram/index";
    }
    
    @RequestMapping(value = "/index/read", method = RequestMethod.POST)
    public @ResponseBody List<OrgChartItem> read() {
        return DiagramDataRepository.OrgChart();
    }
}